import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Over Ons', href: '/over-ons' },
  { name: 'Diensten', href: '/diensten' },
  { name: 'Moskeeën', href: '/moskeeen' },
  { name: 'Governance', href: '/governance' },
  { name: 'Steun Ons', href: '/steun-ons' },
  { name: 'Contact', href: '/contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#0F3640] dark:text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 top-20 z-40 bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-6 space-y-6 h-full border-t border-gray-100 dark:border-gray-800">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-2xl font-semibold text-[#0F3640] dark:text-white hover:text-[#C9A983] dark:hover:text-[#C9A983] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
            <a
              href="/steun-ons"
              className="w-full text-center bg-transparent border-2 border-[#C9A983] text-[#C9A983] px-6 py-3 rounded-full font-bold text-lg transition"
            >
              Steun Ons
            </a>
            <a
              href="/contact"
              className="w-full text-center bg-[#1D5C6B] hover:bg-[#267A8A] text-white px-6 py-3 rounded-full font-bold text-lg transition shadow-lg"
            >
              Plan een Intake
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
