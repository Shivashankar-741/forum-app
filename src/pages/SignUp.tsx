import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import AuthModal from "../components/AuthModal";

export default function SignUp() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [authMode, setAuthModalMode] = useState<"signin" | "signup">("signup");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Header setAuthModalMode={setAuthModalMode} setShowAuthModal={setShowAuthModal} />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          navigate("/");
        }}
        initialMode={authMode}
      />
    </div>
  );
}

