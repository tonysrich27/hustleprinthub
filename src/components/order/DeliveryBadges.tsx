import { useTranslation } from 'react-i18next';

export type DeliveryBadge = 'sameDay' | 'nextDay' | 'fastTurnaround';

interface DeliveryBadgesProps {
  badges: DeliveryBadge[];
  className?: string;
}

const BADGE_CONFIG: Record<
  DeliveryBadge,
  { icon: string; labelKey: string; className: string }
> = {
  sameDay: {
    icon: '⚡',
    labelKey: 'delivery.sameDay',
    className: 'bg-gold/20 text-gold border-gold/40',
  },
  nextDay: {
    icon: '🚚',
    labelKey: 'delivery.nextDay',
    className: 'bg-gold/20 text-gold border-gold/40',
  },
  fastTurnaround: {
    icon: '📦',
    labelKey: 'delivery.fastTurnaround',
    className: 'border-charcoal-50/50 text-gray-300',
  },
};

export function DeliveryBadges({ badges, className = '' }: DeliveryBadgesProps) {
  const { t } = useTranslation();
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badge) => {
        const config = BADGE_CONFIG[badge];
        return (
          <span
            key={badge}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${config.className}`}
          >
            <span>{config.icon}</span>
            {t(config.labelKey)}
          </span>
        );
      })}
    </div>
  );
}
