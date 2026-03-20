import { type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Section({ children, className = '', title, subtitle }: SectionProps) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && (
              <h2 className="font-heading text-3xl font-bold tracking-wide text-white md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-gray-400 md:text-lg">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
