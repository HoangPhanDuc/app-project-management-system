export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">Project Management System</h2>
          <p className="text-sm text-gray-400">Manage your tasks efficiently</p>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Help
          </a>
        </div>
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Project Management System. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
