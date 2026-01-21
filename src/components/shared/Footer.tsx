import Link from "next/link";

export default function Footer() {
  const homeLinks = [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Discipline System", href: "/discipline-system" },
    { label: "Learning Hub", href: "/learning-hub" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQs", href: "/faqs" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "WhatsApp: +91 9867299047", href: "https://wa.me/919867299047" },
    { label: "Careers", href: "/careers" },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="mb-4">
                <h2 className="text-2xl font-bold">
                  <span className="text-white">BitsOf</span>
                  <span className="text-blue-500">Trade</span>
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Discipline • Journal • Learning
                </p>
              </div>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Built for discipline, not dopamine.
            </p>
            <p className="text-blue-400 text-sm font-medium">
              Trade less. Think clearer.
            </p>
          </div>

          {/* Home Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Home</h3>
            <ul className="space-y-3">
              {homeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-6">
          {/* Disclaimer */}
          <p className="text-gray-500 text-xs mb-4">
            BitsOfTrade does not provide investment advice. All content is
            educational and behavior-focused. Trading involves risk. Please
            trade responsibly.
          </p>

          {/* Copyright */}
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} BitsOfTrade. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
