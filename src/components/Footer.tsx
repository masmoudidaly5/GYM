import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Mail, Globe, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Dumbbell className="text-emerald-400 w-8 h-8" />
              <span className="font-bold text-xl tracking-wider text-white">
                O-ZONE PREMIUM GYM
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Unlock your peak performance. High-end equipment, expert personal training, and a supportive community. Elevate your fitness journey at the most premium gym in the city.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Website</span>
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Community</span>
                <Users className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <span className="sr-only">Contact</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/reservation" className="text-gray-400 hover:text-white transition-colors">Book a Class</Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-400 hover:text-white transition-colors">Training Programs</Link>
              </li>
              <li>
                <Link to="/membership" className="text-gray-400 hover:text-white transition-colors">Membership Plans</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">Success Stories</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Opening Hours
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Mon - Thu</span>
                <span>10:00 AM - Midnight</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat</span>
                <span>10:00 AM - 2:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 PM - Midnight</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-500 shrink-0" />
                <span>789 Fitness Blvd, Iron City, Elite 5500</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-500 shrink-0" />
                <span>+1 (555) O-ZONE-FIT</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-500 shrink-0" />
                <span>join@ozone-gym.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} O-ZONE Premium Gym. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
