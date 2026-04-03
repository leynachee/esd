const Footer = () => {
  return (
    <footer className="bg-dark-100 border-t border-dark-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-gold-300 mb-4">FreelanceHub</h3>
            <p className="text-gray-400 text-sm">
              Connect with top freelancers or find your next gig.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-100 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/explore" className="text-gray-400 hover:text-gold-300 text-sm">Browse Gigs</a></li>
              <li><a href="/post-gig" className="text-gray-400 hover:text-gold-300 text-sm">Post a Gig</a></li>
              <li><a href="/how-it-works" className="text-gray-400 hover:text-gold-300 text-sm">How It Works</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-100 font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-400 hover:text-gold-300 text-sm">Help Center</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-gold-300 text-sm">Contact Us</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-gold-300 text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gray-100 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-gray-400 hover:text-gold-300 text-sm">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-gold-300 text-sm">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-50 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 FreelanceHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;