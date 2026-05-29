import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Palette, Zap, ShieldCheck, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { PRODUCTS, formatXOF } from "@/lib/products";
import heroBg from "@/assets/hero-bg-light.jpg";
import catGraphic from "@/assets/cat-graphic.jpg";
import catWeb from "@/assets/cat-web.jpg";
import buildingAerial from "@/assets/building-aerial.jpg";

({
  head: () => ({
    meta: [
      { title: "F.MotivTech — Identité visuelle & sites web pro au Bénin" },
      { name: "description", content: "Studio digital au Bénin : logos, affiches, flyers à partir de 1000F. Sites web professionnels à partir de 100 000F." },
      { property: "og:title", content: "F.MotivTech — Identité visuelle & sites web pro" },
      { property: "og:description", content: "Créations graphiques et web sur mesure au Bénin." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const } }),
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={heroBg} alt="" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-x-0 top-0 h-[600px] gradient-radial-primary opacity-50" />

        <div className="container relative mx-auto px-4 py-24 sm:py-32 md:py-40">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Bénin · Studio digital
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-gradient sm:text-6xl md:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link to="/shop">
                <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-95 glow-primary">
                  {t("hero.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-border bg-surface/60 backdrop-blur hover:bg-surface">
                  {t("hero.cta2")}
                </Button>
              </Link>
            </div>

            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-2 sm:gap-6">
              {[
                { Icon: Zap, label: "Livraison express" },
                { Icon: ShieldCheck, label: "Qualité pro" },
                { Icon: Globe2, label: "Multilingue" },
              ].map(({ Icon, label }, i) => (
                <motion.div key={label} custom={i + 2} initial="hidden" animate="show" variants={fadeUp}
                  className="glass flex flex-col items-center gap-2 rounded-xl p-4 text-center">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 py-20">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("services.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("services.subtitle")}</p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { img: catGraphic, Icon: Palette, key: "graphic", from: 1000, href: "/shop", cat: "graphic" as const },
            { img: catWeb, Icon: Code2, key: "web", from: 100000, href: "/shop", cat: "web" as const },
          ].map((c, i) => (
            <motion.div key={c.key} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <Link
                to={`/shop?cat=${c.cat}`}
                className="group relative block overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all hover:border-primary/50 hover:shadow-elegant"
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                </div>
                <div className="relative p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg gradient-primary text-primary-foreground">
                      <c.Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-bold">{t(`services.${c.key}.title`)}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{t(`services.${c.key}.desc`)}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t("services.from")} <span className="font-semibold text-foreground">{formatXOF(c.from)}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      {t("services.discover")} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t("shop.title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("shop.subtitle")}</p>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex">
            {t("services.discover")} →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p, i) => (
            <motion.div key={p.slug} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <Link
                to={`/shop/${p.slug}`}
                className="group block h-full overflow-hidden rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-card"
              >
                <div className="h-32 w-full overflow-hidden rounded-lg bg-surface-elevated">
                  <img src={p.image} alt={p.name[lang]} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 line-clamp-1 font-semibold">{p.name[lang]}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.short[lang]}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{t("services.from")}</span>
                  <span className="font-bold text-primary">{formatXOF(p.priceFrom)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border p-10 text-center md:p-16">
          <img src={buildingAerial} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/90" />
          <div className="absolute inset-0 gradient-radial-primary opacity-40" />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">Prêt à élever votre marque ?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Discutons de votre projet et obtenez un devis sous 24h.</p>
            <Link to="/contact" className="mt-7 inline-flex">
              <Button size="lg" className="gradient-primary text-primary-foreground glow-primary">
                {t("hero.cta2")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
