import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-charcoal-50/20 bg-charcoal-400">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <p className="mb-4 text-center text-sm text-gray-400">
          <span className="font-semibold text-gold">Hustle Print Hub</span> — Official HustleFanz Print Sponsor
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-gold">Home</Link>
          <Link to="/order" className="hover:text-gold">Order</Link>
          <Link to="/sponsor" className="hover:text-gold">Sponsor</Link>
        </div>
        <p className="mt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Hustle Print Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
