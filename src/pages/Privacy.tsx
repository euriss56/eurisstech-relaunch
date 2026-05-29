import { Shield, Lock, Eye, Trash2, Mail, Phone, MapPin, Server } from "lucide-react";

({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — F.MotivTech" },
      { name: "description", content: "Politique de confidentialité de F.MotivTech. Découvrez comment nous protégeons vos données personnelles." },
      { property: "og:title", content: "Politique de confidentialité — F.MotivTech" },
      { property: "og:description", content: "Découvrez comment F.MotivTech protège vos données personnelles." },
    ],
  }),
  component: PrivacyPage,
});

function Privacy() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-surface">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Politique de confidentialité
            </h1>
            <p className="mt-4 text-muted-foreground">
              Votre vie privée est importante. Découvrez comment nous collectons, utilisons et protégeons vos données.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Introduction */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              La présente politique de confidentialité décrit les pratiques de <strong className="text-foreground">F.MotivTech</strong> en matière de collecte,
              d'utilisation et de protection de vos données personnelles lorsque vous utilisez notre site et nos services.
              En accédant à notre site, vous acceptez les pratiques décrites dans cette politique.
            </p>
          </div>

          {/* Données collectées */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Données que nous collectons</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>Nous collectons les types de données suivants :</p>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  <strong className="text-foreground">Informations de contact :</strong> nom, prénom, adresse email,
                  numéro de téléphone, lorsque vous remplissez notre formulaire de contact ou passez commande.
                </li>
                <li>
                  <strong className="text-foreground">Données de commande :</strong> services commandés, montants,
                  historique d'achats, informations de paiement (via Mobile Money).
                </li>
                <li>
                  <strong className="text-foreground">Données techniques :</strong> adresse IP, type de navigateur,
                  langue préférée, pages visitées, temps passé sur le site.
                </li>
                <li>
                  <strong className="text-foreground">Préférences :</strong> langue choisie, contenu du panier,
                  préférences de navigation.
                </li>
              </ul>
            </div>
          </div>

          {/* Utilisation des données */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Server className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Comment nous utilisons vos données</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>Vos données sont utilisées pour les finalités suivantes :</p>
              <ul className="ml-4 list-disc space-y-2">
                <li>Répondre à vos demandes et vous contacter concernant vos projets</li>
                <li>Traiter et suivre vos commandes de services</li>
                <li>Personnaliser votre expérience sur le site</li>
                <li>Améliorer nos services et le fonctionnement du site</li>
                <li>Vous envoyer des informations sur nos offres (avec votre consentement)</li>
                <li>Assurer la sécurité du site et prévenir la fraude</li>
              </ul>
            </div>
          </div>

          {/* Protection des données */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Sécurité et protection</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
                vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
              <p>
                Vos données sont stockées sur des serveurs sécurisés via <strong className="text-foreground">Lovable Cloud</strong>,
                avec chiffrement en transit (HTTPS/TLS) et contrôles d'accès stricts.
              </p>
              <p>
                L'authentification est gérée via des tokens JWT sécurisés avec des politiques de sécurité
                au niveau de la base de données (RLS).
              </p>
            </div>
          </div>

          {/* Conservation */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Trash2 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Durée de conservation</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Nous conservons vos données personnelles uniquement le temps nécessaire aux finalités pour lesquelles
                elles ont été collectées :
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li><strong className="text-foreground">Données de contact :</strong> 3 ans après votre dernier contact</li>
                <li><strong className="text-foreground">Données de commande :</strong> 5 ans (obligations comptables)</li>
                <li><strong className="text-foreground">Données techniques :</strong> 13 mois maximum</li>
              </ul>
              <p>
                Passé ce délai, vos données sont anonymisées ou supprimées de manière sécurisée.
              </p>
            </div>
          </div>

          {/* Vos droits */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Vos droits</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>Conformément à la réglementation en vigueur, vous disposez des droits suivants :</p>
              <ul className="ml-4 list-disc space-y-1">
                <li><strong className="text-foreground">Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong className="text-foreground">Droit de rectification :</strong> corriger des données inexactes</li>
                <li><strong className="text-foreground">Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong className="text-foreground">Droit d'opposition :</strong> vous opposer au traitement</li>
                <li><strong className="text-foreground">Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez-nous directement via les coordonnées ci-dessous.
              </p>
            </div>
          </div>

          {/* Partage des données */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Partage des données</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Nous ne vendons, n'échangeons ni ne transférons vos données personnelles à des tiers,
                sauf dans les cas suivants :
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Avec votre consentement explicite</li>
                <li>Pour répondre à une obligation légale</li>
                <li>Pour protéger nos droits, notre propriété ou notre sécurité</li>
              </ul>
              <p className="mt-3">
                Nos sous-traitants techniques (hébergement, paiement) sont soumis à des obligations
                contractuelles strictes de confidentialité.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">Contact — Délégué à la protection des données</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Pour toute question relative à la protection de vos données :
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href="mailto:frejustegfm123@gmail.com" className="inline-flex items-center gap-2 text-primary hover:underline">
                <Mail className="h-4 w-4" /> frejustegfm123@gmail.com
              </a>
              <a href="tel:+2290146379989" className="inline-flex items-center gap-2 text-primary hover:underline">
                <Phone className="h-4 w-4" /> +229 01 46 37 99 89
              </a>
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> Cotonou, République du Bénin
              </span>
            </div>
          </div>

          {/* Date de mise à jour */}
          <p className="text-center text-xs text-muted-foreground">
            Dernière mise à jour : 29 mai 2025
          </p>
        </div>
      </section>
    </div>
  );
}

export default Privacy;
