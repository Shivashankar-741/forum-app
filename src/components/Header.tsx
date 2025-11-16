import { useAuth } from "../contexts/AuthContext";
import FeedLogo from "../assets/svg/feedlogo.svg?react";
import LoginIcon from "../assets/svg/login.svg?react";

export default function Header({
	setAuthModalMode,
	setShowAuthModal,
}: {
	setAuthModalMode: (mode: "signin" | "signup") => void;
	setShowAuthModal: (show: boolean) => void;
}) {
	const { isAuthenticated, signOut } = useAuth();

	return (
		<header className="bg-white sticky top-0 z-40">
			<div className="max-w-8xl mx-auto px-6 py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<FeedLogo className="w-8 h-auto" />
						<h1
							style={{
								fontSize: "16px",
							}}
							className="text-xl font-semibold text-gray-900"
						>
							foo-rum
						</h1>
					</div>
					{isAuthenticated ? (
						<button onClick={signOut} className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded-lg transition-all">
							Sign Out
						</button>
					) : (
						<button
							onClick={() => {
								setAuthModalMode("signin");
								setShowAuthModal(true);
							}}
							className="flex items-center space-x-2 px-4 py-2 text-gray-900 hover:text-gray-700 transition-all font-inter font-semibold text-sm leading-none tracking-normal"
							style={{
								fontFamily: "Inter, sans-serif",
								fontWeight: 600,
								fontSize: "14px",
								lineHeight: "100%",
								letterSpacing: "0%",
							}}
						>
							<span>Login</span>
							<LoginIcon className="w-4 h-4" />
						</button>
					)}
				</div>
			</div>
		</header>
	);
}
