REVOKE EXECUTE ON FUNCTION public.grant_owner_admin() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;