import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal-50/30 bg-charcoal/98 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          to="/"
          className="font-heading text-xl font-bold tracking-[0.12em] text-gold transition hover:text-gold-300 md:text-2xl"
        >
          HUSTLE PRINT HUB
        </Link>

        <nav className="hidden items-center gap-6 md:flex md:gap-8">
          <Link to="/" className="text-sm font-medium text-gray-300 transition hover:text-gold md:text-base">
            Home
          </Link>
          <Link to="/order" className="text-sm font-medium text-gray-300 transition hover:text-gold md:text-base">
            Order
          </Link>
          <Link to="/sponsor" className="text-sm font-medium text-gray-300 transition hover:text-gold md:text-base">
            Sponsor
          </Link>
          <Link
            to="/order"
            className="cta-premium rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-charcoal transition hover:bg-gold-300"
          >
            Start Order
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition hover:bg-charcoal-50/30 hover:text-gold md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-charcoal-50/30 bg-charcoal-100/80 px-4 py-4 backdrop-blur-md md:hidden">
          <Link to="/" className="rounded-lg py-3 px-3 text-gray-300 transition hover:bg-charcoal-50/30 hover:text-gold" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/order" className="rounded-lg py-3 px-3 text-gray-300 transition hover:bg-charcoal-50/30 hover:text-gold" onClick={() => setMobileMenuOpen(false)}>
            Order
          </Link>
          <Link to="/sponsor" className="rounded-lg py-3 px-3 text-gray-300 transition hover:bg-charcoal-50/30 hover:text-gold" onClick={() => setMobileMenuOpen(false)}>
            Sponsor
          </Link>
          <Link
            to="/order"
            className="mt-2 rounded-lg bg-gold py-3 text-center font-bold text-charcoal"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start Order
          </Link>
        </nav>
      )}
    </header>
  );
}
