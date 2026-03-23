import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { CTAButton } from '../components/ui/CTAButton';

export function SponsorPage() {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-bold tracking-wide text-white md:text-5xl lg:text-6xl">
            {t('sponsor.heroTitle')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
            {t('sponsor.heroSub')}
          </p>
        </div>
      </section>

      <Section title={t('sponsor.programTitle')} subtitle={t('sponsor.programSub')}>
        <div className="rounded-xl border border-gold/30 bg-gold/5 p-8 md:p-12">
          <p className="text-center text-lg text-gray-300">
            {t('sponsor.programBody')}
          </p>
        </div>
      </Section>

      <Section title={t('sponsor.benefitsTitle')} subtitle={t('sponsor.benefitsSub')}>
        <ul className="space-y-4">
          <li className="flex items-start gap-3 rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 p-4">
            <span className="text-gold">✓</span>
            <div>
              <strong className="text-white">{t('sponsor.benefit1Title')}</strong>
              <p className="text-sm text-gray-400">{t('sponsor.benefit1Desc')}</p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 p-4">
            <span className="text-gold">✓</span>
            <div>
              <strong className="text-white">{t('sponsor.benefit2Title')}</strong>
              <p className="text-sm text-gray-400">{t('sponsor.benefit2Desc')}</p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-charcoal-50/30 bg-charcoal-100/30 p-4">
            <span className="text-gold">✓</span>
            <div>
              <strong className="text-white">{t('sponsor.benefit3Title')}</strong>
              <p className="text-sm text-gray-400">{t('sponsor.benefit3Desc')}</p>
            </div>
          </li>
        </ul>
      </Section>

      <Section title={t('sponsor.whoHelpsTitle')} subtitle={t('sponsor.whoHelpsSub')}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6">
            <h3 className="font-heading text-xl font-bold text-gold">{t('sponsor.sponsorsVendorsTitle')}</h3>
            <p className="mt-2 text-gray-400">
              {t('sponsor.sponsorsVendorsDesc')}
            </p>
          </div>
          <div className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6">
            <h3 className="font-heading text-xl font-bold text-gold">{t('sponsor.creatorsTitle')}</h3>
            <p className="mt-2 text-gray-400">
              {t('sponsor.creatorsDesc')}
            </p>
          </div>
        </div>
      </Section>

      <section className="border-t border-charcoal-50/20 bg-charcoal-400 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            {t('sponsor.applyTitle')}
          </h2>
          <p className="mt-4 text-gray-400">
            {t('sponsor.applySub')}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CTAButton to="/order" variant="primary">
              {t('sponsor.orderWithCode')}
            </CTAButton>
            <Link to="/" className="rounded-md border border-charcoal-50/50 px-6 py-3 text-gray-400 transition hover:text-white">
              {t('sponsor.returnHome')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
