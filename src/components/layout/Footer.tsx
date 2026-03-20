import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-charcoal-50/30 bg-charcoal-400">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <p className="mb-4 mt-8 text-center text-sm text-gray-400">
          <span className="font-heading font-bold tracking-widest text-gold">HUSTLE PRINT HUB</span>
          <span className="mx-2">—</span>
          <span>Official HustleFanz Print Sponsor</span>
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <Link to="/" className="font-medium transition hover:text-gold">Home</Link>
          <Link to="/order" className="font-medium transition hover:text-gold">Order</Link>
          <Link to="/sponsor" className="font-medium transition hover:text-gold">Sponsor</Link>
        </div>
        <p className="mt-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Hustle Print Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
