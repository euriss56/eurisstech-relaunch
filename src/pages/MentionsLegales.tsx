import { Shield, MapPin, Mail, Phone, Building2, FileText, Scale } from "lucide-react";


function MentionsLegales() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-surface">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10">
              <Scale className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Mentions légales
            </h1>
            <p className="mt-4 text-muted-foreground">
              Informations légales et éditoriales du site F.MotivTech
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Éditeur du site */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Éditeur du site</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Le site <strong className="text-foreground">fmotivtech.com</strong> est édité par :
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li><strong className="text-foreground">Raison sociale :</strong> F.MotivTech</li>
                <li><strong className="text-foreground">Forme juridique :</strong> Entreprise individuelle</li>
                <li><strong className="text-foreground">Représentant légal :</strong> Fréjuste GNIMADI</li>
                <li><strong className="text-foreground">Siège social :</strong> Cotonou, République du Bénin</li>
                <li><strong className="text-foreground">Email :</strong> frejustegfm123@gmail.com</li>
                <li><strong className="text-foreground">Téléphone :</strong> +229 01 46 37 99 89</li>
              </ul>
            </div>
          </div>

          {/* Hébergement */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Hébergement</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Le site est hébergé par <strong className="text-foreground">Lovable Cloud</strong>,
                fournisseur d'hébergement cloud sécurisé.
              </p>
              <p>
                Les données sont stockées dans des centres de données conformes aux normes de sécurité internationales.
              </p>
            </div>
          </div>

          {/* Propriété intellectuelle */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Propriété intellectuelle</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                L'ensemble des éléments constituant le site (textes, images, graphismes, logos, icônes, etc.)
                est la propriété exclusive de <strong className="text-foreground">F.MotivTech</strong>.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation ou exploitation,
                totale ou partielle, des éléments du site est interdite sans l'autorisation écrite préalable de F.MotivTech.
              </p>
              <p>
                Toute utilisation non autorisée constitue une contrefaçon et expose son auteur à des poursuites judiciaires.
              </p>
            </div>
          </div>

          {/* Données personnelles */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Données personnelles</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Les informations collectées sur ce site (nom, email, téléphone) sont utilisées uniquement
                pour répondre à vos demandes et traiter vos commandes.
              </p>
              <p>
                Conformément à la loi, vous disposez d'un droit d'accès, de rectification et de suppression
                de vos données. Pour l'exercer, contactez-nous :
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm">
                <a href="mailto:frejustegfm123@gmail.com" className="inline-flex items-center gap-2 text-primary hover:underline">
                  <Mail className="h-4 w-4" /> frejustegfm123@gmail.com
                </a>
                <a href="tel:+2290146379989" className="inline-flex items-center gap-2 text-primary hover:underline">
                  <Phone className="h-4 w-4" /> +229 01 46 37 99 89
                </a>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Le site utilise des cookies techniques nécessaires à son bon fonctionnement
                (préférences de langue, panier, session utilisateur).
              </p>
              <p>
                Aucun cookie de traçage publicitaire ou analytique tiers n'est déposé sans votre consentement.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Pour toute question relative aux mentions légales, contactez-nous :
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
        </div>
      </section>
    </div>
  );
}

export default MentionsLegales;
