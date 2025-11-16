import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../Header";
import { vi } from "vitest";

// Mock AuthContext with mutable return so tests can flip auth state
let mockAuth = {
	isAuthenticated: false,
	signOut: vi.fn(),
};

vi.mock("../../contexts/AuthContext", () => ({
	useAuth: () => mockAuth,
}));

function renderHeader() {
	const setAuthModalMode = vi.fn();
	const setShowAuthModal = vi.fn();
	const utils = render(<Header setAuthModalMode={setAuthModalMode} setShowAuthModal={setShowAuthModal} />);
	return { setAuthModalMode, setShowAuthModal, ...utils };
}

describe("Header", () => {
	beforeEach(() => {
		mockAuth = { isAuthenticated: false, signOut: vi.fn() };
	});

	it("shows Login when unauthenticated and opens modal on click", async () => {
		const user = userEvent.setup();
		const { setAuthModalMode, setShowAuthModal, getByText, getByRole } = renderHeader();
		expect(getByText("foo-rum")).toBeInTheDocument();
		const loginBtn = getByRole("button", { name: /login/i });
		await user.click(loginBtn);
		expect(setAuthModalMode).toHaveBeenCalledWith("signin");
		expect(setShowAuthModal).toHaveBeenCalledWith(true);
	});

	it("shows Sign Out when authenticated and calls signOut", async () => {
		const user = userEvent.setup();
		mockAuth.isAuthenticated = true;
		const { getByRole } = renderHeader();
		const signOutBtn = getByRole("button", { name: /sign out/i });
		await user.click(signOutBtn);
		expect(mockAuth.signOut).toHaveBeenCalled();
	});
});
