import { type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Section({ children, className = '', title, subtitle }: SectionProps) {
  return (
    <section className={`relative py-14 md:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {(title || subtitle) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="font-heading text-3xl font-bold tracking-[0.08em] text-white md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-gray-400 md:text-lg lg:max-w-2xl lg:mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
