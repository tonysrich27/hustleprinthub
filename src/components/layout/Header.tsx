import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal-50/20 bg-charcoal/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          to="/"
          className="font-heading text-xl font-bold tracking-wide text-gold md:text-2xl"
        >
          Hustle Print Hub
        </Link>

        <nav className="hidden items-center gap-4 md:flex md:gap-8">
          <Link to="/" className="text-sm text-gray-300 transition hover:text-gold md:text-base">
            Home
          </Link>
          <Link to="/order" className="text-sm text-gray-300 transition hover:text-gold md:text-base">
            Order
          </Link>
          <Link to="/sponsor" className="text-sm text-gray-300 transition hover:text-gold md:text-base">
            Sponsor
          </Link>
          <Link
            to="/order"
            className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-charcoal transition hover:bg-gold-300"
          >
            Start Order
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-gray-400 hover:text-gold md:hidden"
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
        <nav className="flex flex-col gap-2 border-t border-charcoal-50/20 bg-charcoal px-4 py-4 md:hidden">
          <Link to="/" className="py-2 text-gray-300 hover:text-gold" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/order" className="py-2 text-gray-300 hover:text-gold" onClick={() => setMobileMenuOpen(false)}>
            Order
          </Link>
          <Link to="/sponsor" className="py-2 text-gray-300 hover:text-gold" onClick={() => setMobileMenuOpen(false)}>
            Sponsor
          </Link>
          <Link
            to="/order"
            className="mt-2 rounded-md bg-gold py-3 text-center font-semibold text-charcoal"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start Order
          </Link>
        </nav>
      )}
    </header>
  );
}
