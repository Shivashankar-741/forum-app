import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./Modal";
import ModalIcon from "../assets/svg/modal-icon.svg?react";

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
	initialMode?: "signin" | "signup";
}

export default function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
	const [mode, setMode] = useState<"signin" | "signup">(initialMode);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signIn, signUp } = useAuth();

	useEffect(() => {
		setMode(initialMode);
		setEmail("");
		setPassword("");
		setRepeatPassword("");
		setError("");
	}, [initialMode, isOpen]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			let success = false;
			if (mode === "signin") {
				success = await signIn(email, password);
			} else {
				if (password !== repeatPassword) {
					setError("Passwords do not match");
					setLoading(false);
					return;
				}
				success = await signUp(email, password, email.split("@")[0]);
			}

			if (success) {
				onClose();
				setEmail("");
				setPassword("");
				setRepeatPassword("");
			} else {
				setError(mode === "signin" ? "Invalid email or password" : "Email already exists or invalid input");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="bg-[#EBEBEB] rounded-[30px] pt-4 px-4 pb-3">
				<div className="bg-white rounded-2xl pt-6 px-6 pb-8">
					{/* Icon */}
					<div className="flex justify-center mb-4">
						<span className="w-12 h-12 rounded-full bg-[#F8F8F8] flex items-center justify-center">
							<ModalIcon className="w-6 h-6" />
						</span>
					</div>

					{/* Title */}
					<h2
						className="text-center mb-2"
						style={{
							fontFamily: "Inter, sans-serif",
							fontWeight: 700,
							fontSize: "20px",
							lineHeight: "21px",
							letterSpacing: "0%",
							color: "#000000",
						}}
					>
						{mode === "signin" ? "Sign in to continue" : "Create an account to continue"}
					</h2>

					{/* Subtitle */}
					<p
						className="text-center mb-6"
						style={{
							fontFamily: "Inter, sans-serif",
							fontWeight: 400,
							fontSize: "14px",
							lineHeight: "21px",
							letterSpacing: "0%",
							color: "#0000007A",
						}}
					>
						{mode === "signin"
							? "Sign in to access all the features on this app"
							: "Create an account to access all the features on this app"}
					</p>

					<form onSubmit={handleSubmit} className="space-y-[15px]">
						{/* Email or username */}
						<div>
							<label
								htmlFor="email"
								className="block mb-2"
								style={{
									fontFamily: "Inter, sans-serif",
									fontWeight: 600,
									fontSize: "14px",
									lineHeight: "21px",
									letterSpacing: "0%",
									color: "#000000",
								}}
							>
								Email or username
							</label>
							<input
								id="email"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#5057EA] focus:border-transparent outline-none transition-all"
								placeholder="Enter your email or username"
							/>
						</div>

						{/* Password */}
						<div>
							<label
								htmlFor="password"
								className="block mb-2"
								style={{
									fontFamily: "Inter, sans-serif",
									fontWeight: 600,
									fontSize: "14px",
									lineHeight: "21px",
									letterSpacing: "0%",
									color: "#000000",
								}}
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#5057EA] focus:border-transparent outline-none transition-all"
								placeholder="Enter your password"
							/>
						</div>

						{/* Repeat password - only for signup */}
						{mode === "signup" && (
							<div>
								<label
									htmlFor="repeatPassword"
									className="block mb-2"
									style={{
										fontFamily: "Inter, sans-serif",
										fontWeight: 600,
										fontSize: "14px",
										lineHeight: "21px",
										letterSpacing: "0%",
										color: "#000000",
									}}
								>
									Repeat password
								</label>
								<input
									id="repeatPassword"
									type="password"
									value={repeatPassword}
									onChange={(e) => setRepeatPassword(e.target.value)}
									required
									className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#5057EA] focus:border-transparent outline-none transition-all"
									placeholder="Enter your password again"
								/>
							</div>
						)}

						{error && <div className="text-red-600 text-sm animate-slide-down">{error}</div>}

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-[#5057EA] to-[#6C5CE7] text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#5057EA] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
							style={{
								fontFamily: "Inter, sans-serif",
								fontWeight: 600,
								fontSize: "14px",
								lineHeight: "100%",
							}}
						>
							{loading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
						</button>
					</form>
				</div>

				{/* Footer  */}
				<div className="mt-4 text-center pb-2">
					<button
						type="button"
						onClick={() => {
							setMode(mode === "signin" ? "signup" : "signin");
							setError("");
							setPassword("");
							setRepeatPassword("");
						}}
						className="text-gray-600 text-sm"
					>
						{mode === "signin" ? (
							<>
								Do not have an account? <span className="text-blue-600 font-medium">Sign Up</span>
							</>
						) : (
							<>
								Already have an account? <span className="text-blue-600 font-medium">Sign In</span>
							</>
						)}
					</button>
				</div>
			</div>
		</Modal>
	);
}
