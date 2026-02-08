import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
               <img src="../public/Screenshot 2026-02-06 114953.png" alt="Logo" className="h-16 w-15 rounded-full object-cover" />
              <span className="text-2xl font-bold text-white">Evenza</span>
            </Link>
            <p className="text-sm text-gray-400">
              Your ultimate platform for discovering and booking amazing events across Nepal.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-400 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-400 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-400 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-teal-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm hover:text-teal-400 transition-colors duration-300">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm hover:text-teal-400 transition-colors duration-300">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-teal-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm hover:text-teal-400 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-teal-400 transition-colors duration-300">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-teal-400 transition-colors duration-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-teal-400 transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-400" />
                <span>Chabahil, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-teal-400" />
                <span>+977 9876540347</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-teal-400" />
                <span>evenzao@info.com.np</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Evenza. All rights reserved. Made with ❤️ in Nepal.</p>
        </div>
      </div>
    </footer>
  );
}
