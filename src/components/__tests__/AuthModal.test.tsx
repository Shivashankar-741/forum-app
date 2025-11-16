import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthModal from "../AuthModal";
import { vi } from "vitest";

let mockAuth = {
	signIn: vi.fn(),
	signUp: vi.fn(),
};

vi.mock("../../contexts/AuthContext", () => ({
	useAuth: () => mockAuth,
}));

describe("AuthModal", () => {
	beforeEach(() => {
		mockAuth = {
			signIn: vi.fn().mockResolvedValue(true),
			signUp: vi.fn().mockResolvedValue(true),
		};
	});

	it("shows error when signup passwords don't match", async () => {
		const onClose = vi.fn();
		const { getByLabelText, getByRole, findByText } = render(
			<AuthModal isOpen={true} onClose={onClose} initialMode="signup" />
		);
		await userEvent.type(getByLabelText(/email or username/i), "x@y.com");
		await userEvent.type(getByLabelText(/^password$/i), "one");
		await userEvent.type(getByLabelText(/repeat password/i), "two");
		await userEvent.click(getByRole("button", { name: /sign up/i }));
		expect(await findByText(/passwords do not match/i)).toBeInTheDocument();
		expect(onClose).not.toHaveBeenCalled();
	});

	it("closes on successful sign in", async () => {
		const onClose = vi.fn();
		mockAuth.signIn = vi.fn().mockResolvedValue(true);
		const { getByLabelText, getByRole } = render(<AuthModal isOpen={true} onClose={onClose} initialMode="signin" />);
		await userEvent.type(getByLabelText(/email or username/i), "demo@example.com");
		await userEvent.type(getByLabelText(/^password$/i), "password123");
		await userEvent.click(getByRole("button", { name: /sign in/i }));
		// Flush microtasks to allow async handlers to run
		await Promise.resolve();
		await Promise.resolve();
		expect(onClose).toHaveBeenCalled();
	});
});
