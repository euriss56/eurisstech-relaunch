CREATE OR REPLACE FUNCTION public.create_order_with_items(
  _total numeric, _customer_name text, _customer_phone text,
  _payment_method text, _payment_phone text, _payment_reference text, _items jsonb
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_order_id uuid;
  v_item jsonb;
  v_sum numeric(14,2) := 0;
  v_qty integer;
  v_price numeric(14,2);
BEGIN
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'Connexion requise.'; END IF;
  IF NULLIF(trim(_customer_name), '') IS NULL
    OR NULLIF(trim(_customer_phone), '') IS NULL
    OR NULLIF(trim(_payment_method), '') IS NULL
    OR NULLIF(trim(_payment_phone), '') IS NULL
    OR NULLIF(trim(_payment_reference), '') IS NULL THEN
    RAISE EXCEPTION 'Informations de commande incomplètes.';
  END IF;
  IF _total IS NULL OR _total <= 0 THEN RAISE EXCEPTION 'Montant invalide.'; END IF;
  IF _items IS NULL OR jsonb_typeof(_items) <> 'array' OR jsonb_array_length(_items) = 0 THEN
    RAISE EXCEPTION 'La commande doit contenir au moins un article.';
  END IF;

  FOR v_item IN SELECT value FROM jsonb_array_elements(_items) LOOP
    v_qty := (v_item->>'qty')::integer;
    v_price := (v_item->>'unit_price')::numeric;
    IF NULLIF(trim(v_item->>'product_slug'), '') IS NULL
      OR NULLIF(trim(v_item->>'product_name'), '') IS NULL
      OR v_qty IS NULL OR v_qty <= 0 OR v_price IS NULL OR v_price < 0 THEN
      RAISE EXCEPTION 'Article de commande invalide.';
    END IF;
    v_sum := v_sum + v_qty * v_price;
  END LOOP;
  IF ROUND(v_sum, 2) <> ROUND(_total, 2) THEN
    RAISE EXCEPTION 'Le total ne correspond pas aux articles.';
  END IF;

  INSERT INTO public.orders (
    user_id,total,currency,customer_name,customer_phone,payment_method,payment_phone,payment_reference,status
  ) VALUES (
    v_user_id,_total,'XOF',trim(_customer_name),trim(_customer_phone),
    trim(_payment_method),trim(_payment_phone),trim(_payment_reference),'pending'
  ) RETURNING id INTO v_order_id;

  FOR v_item IN SELECT value FROM jsonb_array_elements(_items) LOOP
    INSERT INTO public.order_items(order_id,product_slug,product_name,qty,unit_price)
    VALUES (
      v_order_id,trim(v_item->>'product_slug'),trim(v_item->>'product_name'),
      (v_item->>'qty')::integer,(v_item->>'unit_price')::numeric
    );
  END LOOP;
  RETURN v_order_id;
END;
$$;
REVOKE ALL ON FUNCTION public.create_order_with_items(numeric,text,text,text,text,text,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_order_with_items(numeric,text,text,text,text,text,jsonb) TO authenticated;
