## Objectif
Recréer le site sur la base du zip F.MotivTech, le migrer de **TanStack Start (SSR)** vers **Vite SPA + react-router-dom** (déployable Vercel), et lui donner la nouvelle identité **Eurisstech** (design system noir + cyan #00b4d8).

---

## Étape 1 — Nettoyage et migration de la stack

1. **Supprimer** TanStack Start :
   - Dépendances retirées : `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `@lovable.dev/vite-tanstack-config`, `nitro`.
   - Fichiers supprimés : `src/start.ts`, `src/server.ts`, `src/router.tsx`, `src/routeTree.gen.ts`, `src/routes/__root.tsx`, `src/routes/README.md`, `src/integrations/supabase/auth-attacher.ts`, `auth-middleware.ts`, `client.server.ts`, `src/lib/api/`, `src/lib/config.server.ts`, `src/lib/error-page.ts`.
2. **Installer** : `react-router-dom@6`, et réécrire `vite.config.ts` (juste `@vitejs/plugin-react` + `@tailwindcss/vite` + `vite-tsconfig-paths`).
3. **Nouveau entrypoint** : `index.html` à la racine + `src/main.tsx` qui monte `<BrowserRouter>` + `<App/>` + `QueryClientProvider` + `<Toaster/>`.
4. **`src/App.tsx`** : déclare toutes les routes en `<Routes>/<Route>` : `/`, `/about`, `/contact`, `/shop`, `/shop/:slug`, `/cart`, `/checkout`, `/account`, `/blog`, `/blog/:slug`, `/mentions-legales`, `/privacy`, `/terms`, NotFound. Layout commun = `<Navbar/> + <PromoBanner/> + <Outlet/> + <Footer/> + <WhatsAppButton/>`.
5. **`vercel.json`** : rewrite `/(.*) → /index.html` pour le SPA fallback.

## Étape 2 — Import du contenu F.MotivTech

Copier depuis le zip vers `src/` :
- `lib/products.ts`, `lib/cart.tsx`, `lib/auth.tsx`, `lib/i18n.tsx`, `lib/utils.ts` (intacts, juste retirer `.server`/server-fn).
- `components/layout/*`, `components/brand/Logo.tsx`, `components/ui/*` (shadcn intact).
- `integrations/supabase/client.ts` (uniquement le client navigateur publishable key — réutilise les credentials du `.env` F.MotivTech via `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`).
- `integrations/lovable/index.ts` si utilisé par l'auth Google ; sinon retirer.
- `hooks/use-mobile.tsx`.
- Tous les `src/assets/**` (images blog, services, hero, founder, etc.).
- Toutes les pages : convertir chaque `src/routes/*.tsx` (TanStack `createFileRoute`) en composant React simple dans `src/pages/*.tsx` ; remplacer `<Link to>` de TanStack par `react-router-dom`, `useParams` de TanStack par celui de react-router, `useNavigate` idem. Retirer les `head()`/`loader` ; placer le SEO via `<title>`/`<meta>` en `useEffect` ou via une mini-helper `setHead()`.

Toutes les pages **shop/cart/checkout/blog/account** sont conservées fonctionnellement et bénéficient automatiquement des nouveaux tokens CSS. Ajustements visuels ciblés (cards, boutons, espacements) pour qu'elles soient cohérentes Eurisstech.

## Étape 3 — Design System Eurisstech

**`src/styles.css`** réécrit :
```
--background:#0a0a0a; --surface:#111111; --surface-2:#1a1a1a;
--foreground:#f5f5f5; --primary:#00b4d8; --primary-hover:#0096c7;
--border:#222222; --muted:#666666; --radius:6px;
font-family: Inter, sans-serif; ombres légères, pas de glow.
```
Tous les tokens shadcn (`--card`, `--popover`, `--accent`, `--ring`…) sont mappés sur ces valeurs en oklch. Import Inter via Google Fonts dans `index.html`. Mode dark forcé par défaut (pas de toggle).

## Étape 4 — Composants rebrandés

- **`Logo.tsx`** : texte pur « Eurisstech » (Inter 700, tracking serré, point cyan final), pas d'image.
- **`Navbar.tsx`** : barre fine 64 px, fond `--background` avec border-bottom 1 px `--border`, liens uppercase légers, CTA cyan minimal.
- **`PromoBanner.tsx`** : bandeau ultra-fin avec rotation des messages Eurisstech (« Innovating the Digital Future », « Calavi · Bénin », « +229 01 41 67 57 84 »).
- **`Footer.tsx`** : 4 colonnes (Brand + slogan, Services, Contact, Légal) + barre © 2026 Eurisstech. Réseaux : Facebook, LinkedIn, Instagram, GitHub, TikTok.
- **`WhatsAppButton.tsx`** : numéro `+22901416757 84`, bulle cyan fixe bottom-right.

## Étape 5 — Pages clés rebrandées

- **`pages/index.tsx`** (Home) : hero plein écran « Innovating the Digital Future », sous-titre, 2 CTA (Voir services / Nous contacter). Section 8 services (Web, Mobile, IA, Cybersécurité, Cloud, UI/UX, Maintenance, Graphisme/Affiche) en grille 4 cols. Bloc « Pourquoi Eurisstech » + CTA final.
- **`pages/about.tsx`** : présentation Eurisstech (version premium fournie), section Fondateur **Euriss Mahunan FANOU** (photo `founder.jpg`, bio, valeurs : Innovation · Performance · Sécurité).
- **`pages/contact.tsx`** : formulaire (nom, email, sujet, message) + colonne infos (email, support, téléphone, Calavi/Bénin, horaires Lun-Dim 08h-18h, réseaux sociaux).
- **`pages/mentions-legales.tsx` · `privacy.tsx` · `terms.tsx`** : textes adaptés à Eurisstech (raison sociale, contact, juridiction Bénin).

## Étape 6 — Vérifications

- Build `vite build` sans erreur, prévisualisation OK.
- Toutes les routes navigables sans 404.
- `vercel.json` présent pour le déploiement Vercel.

---

### Détails techniques

- **Aucun SSR/server-fn** : tout devient client-side. Les anciens `createServerFn` qui touchaient Supabase sont remplacés par des appels directs au client browser Supabase (publishable key, RLS appliquée).
- **Auth Google** : si présente dans F.MotivTech, on garde `lovable.auth.signInWithOAuth('google')` côté client.
- **i18n** : `src/lib/i18n.tsx` (Context React) conservé tel quel, on met juste à jour les chaînes de texte FR/EN avec le wording Eurisstech.
- **products.ts** : intact, aucune modification.
- **shadcn/ui** : intact, ne dépend que des tokens CSS.

### Ce qui n'est PAS fait
- Pas de nouveau schéma Supabase (on réutilise celui de F.MotivTech via les credentials existantes — il faudra que tu colles `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` dans les variables d'env Vercel).
- Pas de tests automatisés ajoutés.
- Pas de génération de nouvelles images (réutilisation des assets du zip).
