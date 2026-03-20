import { Link } from 'react-router-dom';
import { type ReactNode } from 'react';

interface CTAButtonProps {
  children: ReactNode;
  to?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function CTAButton({
  children,
  to,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: CTAButtonProps) {
  const baseStyles =
    'cta-premium inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal';
  const primaryStyles = 'bg-gold text-charcoal hover:bg-gold-300 hover:shadow-gold-lg';
  const secondaryStyles =
    'border-2 border-gold text-gold hover:bg-gold/10 hover:border-gold-300';

  const styles = `${baseStyles} ${
    variant === 'primary' ? primaryStyles : secondaryStyles
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
