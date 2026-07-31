function Navbar() {
  return (
    <div className="h-16 border-b flex items-center justify-between px-6 bg-white">
      <h2 className="text-xl font-semibold">
        Admin Panel
      </h2>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;