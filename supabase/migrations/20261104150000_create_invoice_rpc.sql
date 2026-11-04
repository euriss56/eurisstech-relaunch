-- EURISS TECH invoice creation RPC. Apply this in Supabase SQL Editor.
CREATE OR REPLACE FUNCTION public.create_invoice(
  _client_id uuid, _issue_date date, _due_date date, _tax_rate numeric, _notes text, _items jsonb
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_year integer; v_seq integer; v_number text; v_subtotal numeric(14,2) := 0;
  v_tax numeric(14,2); v_invoice_id uuid; v_item jsonb;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Accès réservé à l’administrateur';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.clients WHERE id = _client_id) THEN RAISE EXCEPTION 'Client introuvable'; END IF;
  IF _items IS NULL OR jsonb_typeof(_items) <> 'array' OR jsonb_array_length(_items) = 0 THEN
    RAISE EXCEPTION 'Une facture doit contenir au moins une ligne';
  END IF;
  IF COALESCE(_tax_rate,0) < 0 OR COALESCE(_tax_rate,0) > 100 THEN RAISE EXCEPTION 'Taux de taxe invalide'; END IF;
  v_year := EXTRACT(YEAR FROM COALESCE(_issue_date,CURRENT_DATE))::integer;
  INSERT INTO public.invoice_counters(year,last_number) VALUES(v_year,1)
  ON CONFLICT(year) DO UPDATE SET last_number=public.invoice_counters.last_number+1
  RETURNING last_number INTO v_seq;
  v_number := 'FAC-' || v_year::text || '-' || lpad(v_seq::text,3,'0');
  FOR v_item IN SELECT value FROM jsonb_array_elements(_items) LOOP
    IF NULLIF(trim(v_item->>'description'),'') IS NULL OR COALESCE((v_item->>'quantity')::numeric,0)<=0
      OR COALESCE((v_item->>'unit_price')::numeric,-1)<0 THEN RAISE EXCEPTION 'Ligne de facture invalide'; END IF;
    v_subtotal := v_subtotal + ROUND((v_item->>'quantity')::numeric*(v_item->>'unit_price')::numeric,2);
  END LOOP;
  v_tax := ROUND(v_subtotal*COALESCE(_tax_rate,0)/100,2);
  INSERT INTO public.invoices(number,client_id,issue_date,due_date,subtotal,tax,total,notes)
  VALUES(v_number,_client_id,COALESCE(_issue_date,CURRENT_DATE),_due_date,v_subtotal,v_tax,v_subtotal+v_tax,_notes)
  RETURNING id INTO v_invoice_id;
  FOR v_item IN SELECT value FROM jsonb_array_elements(_items) LOOP
    INSERT INTO public.invoice_items(invoice_id,description,quantity,unit_price,total)
    VALUES(v_invoice_id,trim(v_item->>'description'),(v_item->>'quantity')::numeric,(v_item->>'unit_price')::numeric,
      ROUND((v_item->>'quantity')::numeric*(v_item->>'unit_price')::numeric,2));
  END LOOP;
  RETURN v_invoice_id;
END; $$;
REVOKE ALL ON FUNCTION public.create_invoice(uuid,date,date,numeric,text,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_invoice(uuid,date,date,numeric,text,jsonb) TO authenticated;
