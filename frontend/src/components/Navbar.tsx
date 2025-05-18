import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Navbar() {
  const { signedIn, signout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    signout();
    navigate('/');
  }

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#121212]/80 border-b border-white/10 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold text-[#6D4AFF] tracking-tight flex items-center gap-2">
          <img src="/iconlogo.svg" alt="Proof of Learn Logo" className="h-8 w-8" />
          Proof of Learn
        </Link>
        <div className="flex gap-2">
          {!signedIn && location.pathname !== '/login' && (
            <Button asChild variant="ghost" className="text-[#6D4AFF] hover:bg-[#6D4AFF]/10 hover:text-white">
              <Link to="/login">Login</Link>
            </Button>
          )}
          {!signedIn && location.pathname !== '/register' && (
            <Button asChild className="bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white">
              <Link to="/register">Register</Link>
            </Button>
          )}
          {signedIn && (
            <Button onClick={handleLogout} className="bg-[#EF4444] text-white hover:bg-[#b91c1c] cursor-pointer">
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
