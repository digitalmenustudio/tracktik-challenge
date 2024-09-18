export default function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-600 py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Tracktik. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="#"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    );
  }
  