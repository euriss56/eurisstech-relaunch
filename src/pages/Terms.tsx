import { FileText, CheckCircle, AlertTriangle, XCircle, Mail, Phone, MapPin } from "lucide-react";


function Terms() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-surface">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10">
              <FileText className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Conditions d'utilisation
            </h1>
            <p className="mt-4 text-muted-foreground">
              Veuillez lire attentivement ces conditions avant d'utiliser nos services.
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
              Les présentes conditions d'utilisation régissent l'accès et l'utilisation du site
              <strong className="text-foreground"> fmotivtech.com </strong>et des services proposés par
              <strong className="text-foreground"> F.MotivTech</strong>. En accédant au site ou en utilisant nos services,
              vous acceptez sans réserve l'ensemble de ces conditions. Si vous n'acceptez pas ces conditions,
              veuillez ne pas utiliser notre site.
            </p>
          </div>

          {/* 1. Services */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">1. Description des services</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                F.MotivTech propose des services de création digitale comprenant :
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Créations graphiques : logos, affiches, flyers, brochures, cartes de visite, bâches, roll-up, calendriers, packaging, t-shirts, identité visuelle</li>
                <li>Sites web : sites vitrines, landing pages, blogs, e-commerce, portfolios, dashboards, SaaS</li>
                <li>Solutions basées sur l'Intelligence Artificielle</li>
                <li>Conseil en stratégie digitale et identité de marque</li>
              </ul>
              <p>
                Les descriptions et tarifs des services sont disponibles sur la page Boutique.
                F.MotivTech se réserve le droit de modifier ses offres à tout moment.
              </p>
            </div>
          </div>

          {/* 2. Commandes */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">2. Commandes et paiement</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">2.1 Processus de commande :</strong> Les commandes se passent via le panier en ligne.
                Après validation du panier, le paiement s'effectue par Mobile Money (MTN Mobile Money ou Moov Money)
                via les numéros indiqués sur la page de paiement.
              </p>
              <p>
                <strong className="text-foreground">2.2 Paiement :</strong> Le client doit effectuer le transfert Mobile Money manuellement
                puis renseigner la référence de la transaction sur la page de checkout. La commande sera traitée
                après vérification du paiement.
              </p>
              <p>
                <strong className="text-foreground">2.3 Tarifs :</strong> Les prix sont indiqués en Francs CFA (XOF) et sont sujets à modification.
                Le prix applicable est celui en vigueur au moment de la commande.
              </p>
              <p>
                <strong className="text-foreground">2.4 Confirmation :</strong> Une confirmation de commande est envoyée au client
                via WhatsApp après réception du paiement.
              </p>
            </div>
          </div>

          {/* 3. Livraison */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">3. Livraison et délais</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">3.1 Livraison des fichiers :</strong> Les créations graphiques sont livrées
                sous forme de fichiers numériques (PDF, PNG, JPG, AI, PSD selon le service) via email ou WhatsApp.
              </p>
              <p>
                <strong className="text-foreground">3.2 Mise en ligne :</strong> Les sites web sont déployés sur l'hébergement
                convenu et les accès sont transmis au client.
              </p>
              <p>
                <strong className="text-foreground">3.3 Délais :</strong> Les délais de livraison sont indicatifs :
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Logos et cartes de visite : 24-48h</li>
                <li>Affiches, flyers, brochures : 2-5 jours ouvrés</li>
                <li>Identité visuelle complète : 5-10 jours ouvrés</li>
                <li>Sites web vitrines : 7-14 jours ouvrés</li>
                <li>Sites web complexes : 14-30 jours ouvrés</li>
              </ul>
              <p>
                Ces délais peuvent varier en fonction de la complexité du projet et de la réactivité du client
                pour fournir les éléments nécessaires.
              </p>
            </div>
          </div>

          {/* 4. Révisions */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">4. Révisions et modifications</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">4.1 Révisions incluses :</strong> Chaque service inclut un nombre défini de révisions :
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Logos : 3 révisions</li>
                <li>Affiches/flyers : 2 révisions</li>
                <li>Sites web : révisions pendant la période de développement</li>
              </ul>
              <p>
                <strong className="text-foreground">4.2 Révisions supplémentaires :</strong> Au-delà du nombre inclus,
                des frais supplémentaires peuvent s'appliquer selon la nature des modifications demandées.
              </p>
              <p>
                <strong className="text-foreground">4.3 Changement de brief :</strong> Toute modification substantielle
                du cahier des charges initial après le début du projet peut entraîner des frais supplémentaires
                et un allongement des délais.
              </p>
            </div>
          </div>

          {/* 5. Propriété intellectuelle */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">5. Propriété intellectuelle</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">5.1 Transfert de droits :</strong> Après paiement intégral,
                les droits d'utilisation des créations sont transférés au client pour un usage exclusif.
                F.MotivTech se réserve le droit d'utiliser les créations à des fins de portfolio et promotion,
                sauf demande explicite de confidentialité.
              </p>
              <p>
                <strong className="text-foreground">5.2 Contenu fourni par le client :</strong> Le client garantit
                détenir tous les droits sur les éléments (textes, images, logos) qu'il fournit pour le projet.
                F.MotivTech ne saurait être tenu responsable de tout litige lié à ces éléments.
              </p>
              <p>
                <strong className="text-foreground">5.3 Stock images :</strong> Les images utilisées proviennent
                de banques d'images libres de droits ou sont fournies par le client. Le client est responsable
                des licences d'images spécifiques qu'il demande d'utiliser.
              </p>
            </div>
          </div>

          {/* 6. Responsabilité */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">6. Limitation de responsabilité</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                F.MotivTech s'engage à fournir ses services avec diligence et professionnalisme.
                Cependant, notre responsabilité ne saurait être engagée en cas de :
              </p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Force majeure ou cas fortuit</li>
                <li>Interruption des services de téléphonie mobile (MTN, Moov) affectant le paiement</li>
                <li>Retard dû à l'absence de réponse ou de fourniture d'éléments par le client</li>
                <li>Problèmes techniques indépendants de notre volonté</li>
                <li>Utilisation des livrables de manière non conforme à leur destination</li>
              </ul>
              <p>
                Le montant total de notre responsabilité est limité au montant payé par le client pour le service concerné.
              </p>
            </div>
          </div>

          {/* 7. Remboursement */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">7. Remboursement et annulation</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">7.1 Avant début du projet :</strong> Annulation possible avec remboursement intégral
                si le travail n'a pas encore commencé.
              </p>
              <p>
                <strong className="text-foreground">7.2 Pendant le projet :</strong> En cas d'annulation après le début du travail,
                un remboursement proportionnel au travail non réalisé peut être accordé, sous réserve d'acceptation de F.MotivTech.
              </p>
              <p>
                <strong className="text-foreground">7.3 Après livraison :</strong> Aucun remboursement n'est possible
                une fois les livrables finalisés et approuvés par le client.
              </p>
              <p>
                <strong className="text-foreground">7.4 Non-satisfaction :</strong> En cas de litige,
                F.MotivTech s'engage à proposer des révisions ou corrections pour satisfaire le client dans la mesure du raisonnable.
              </p>
            </div>
          </div>

          {/* 8. Comportement utilisateur */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">8. Comportement des utilisateurs</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>En utilisant notre site, vous vous engagez à :</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Fournir des informations exactes et complètes lors de vos commandes</li>
                <li>Ne pas utiliser le site à des fins illégales ou frauduleuses</li>
                <li>Ne pas tenter d'accéder de manière non autorisée à nos systèmes</li>
                <li>Ne pas perturber le fonctionnement du site</li>
                <li>Respecter la propriété intellectuelle de F.MotivTech et des tiers</li>
              </ul>
              <p>
                En cas de non-respect, F.MotivTech se réserve le droit de suspendre ou supprimer votre compte
                et de refuser toute future prestation.
              </p>
            </div>
          </div>

          {/* 9. Loi applicable */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">9. Droit applicable et juridiction</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Les présentes conditions sont régies par le droit de la République du Bénin.
                En cas de litige, une solution amiable sera recherchée en priorité.
                À défaut d'accord, les tribunaux compétents de Cotonou seront seuls habilités à connaître du litige.
              </p>
            </div>
          </div>

          {/* 10. Modification */}
          <div className="rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">10. Modification des conditions</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                F.MotivTech se réserve le droit de modifier ces conditions d'utilisation à tout moment.
                Les modifications prendront effet dès leur publication sur le site. Il est de votre responsabilité
                de consulter régulièrement cette page.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Pour toute question concernant ces conditions d'utilisation :
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

          {/* Date */}
          <p className="text-center text-xs text-muted-foreground">
            Dernière mise à jour : 29 mai 2025
          </p>
        </div>
      </section>
    </div>
  );
}

export default Terms;
