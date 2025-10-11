import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";

export function AppSidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  console.log("user", user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Function to return Tailwind classes based on active state
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded transition ${
      isActive ? "bg-blue-800 font-bold" : "hover:bg-blue-600"
    }`;

  return (
    <aside className="flex flex-col h-screen w-64 bg-blue-700 text-white shadow-lg">
      {/* Logo */}
      <div className="px-6 py-4 text-2xl font-bold border-b border-blue-600">
        My Bank
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink to="/" className={linkClasses} end>
          My Account
        </NavLink>
        <NavLink to="/beneficiaries" className={linkClasses}>
          Beneficiaries
        </NavLink>
        <NavLink to="/fund-transfer" className={linkClasses}>
          Fund Transfer
        </NavLink>
        {user?.isAdmin && (
          <NavLink to="/users" className={linkClasses}>
            Users
          </NavLink>
        )}
      </nav>

      {/* Logout at bottom */}
      <div className="px-4 py-6 border-t border-blue-600">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
