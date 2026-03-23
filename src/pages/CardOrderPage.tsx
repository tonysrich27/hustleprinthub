import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CTAButton } from '../components/ui/CTAButton';

export function CardOrderPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('500');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Business cards quote', { name, email, quantity, notes });
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-charcoal-50/20 bg-charcoal-400/50 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
            {t('order.cardsTitle')}
          </h1>
          <p className="mt-2 text-gray-400">
            {t('order.cardsSub')}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 py-12">
        <form onSubmit={handleSubmit} className="rounded-xl border border-charcoal-50/30 bg-charcoal-100/30 p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                {t('order.cardsForm.name')}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-charcoal-50/40 bg-charcoal-100 px-4 py-3 text-white placeholder-gray-500 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
                placeholder={t('order.cardsForm.namePlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                {t('order.cardsForm.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-charcoal-50/40 bg-charcoal-100 px-4 py-3 text-white placeholder-gray-500 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
                placeholder={t('order.cardsForm.emailPlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">
                {t('order.cardsForm.quantity')}
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-1 w-full rounded-lg border border-charcoal-50/40 bg-charcoal-100 px-4 py-3 text-white focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
              >
                <option value="250">250</option>
                <option value="500">500</option>
                <option value="1000">1,000</option>
                <option value="2500">2,500</option>
                <option value="5000">5,000</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-300">
                {t('order.cardsForm.notes')}
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-charcoal-50/40 bg-charcoal-100 px-4 py-3 text-white placeholder-gray-500 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
                placeholder={t('order.cardsForm.notesPlaceholder')}
              />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <CTAButton type="submit" variant="primary">
              {t('common.requestQuote')}
            </CTAButton>
          </div>
        </form>
      </div>
    </div>
  );
}
