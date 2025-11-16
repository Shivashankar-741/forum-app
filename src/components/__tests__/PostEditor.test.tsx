import { render } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import PostEditor from "../PostEditor";
import { vi } from "vitest";

let mockAuth = {
	isAuthenticated: false,
};

vi.mock("../../contexts/AuthContext", () => ({
	useAuth: () => mockAuth,
}));

describe("PostEditor", () => {
	beforeEach(() => {
		mockAuth = { isAuthenticated: false };
	});

	it("disables Publish when content is empty", () => {
		const { getByRole } = render(<PostEditor onPostCreated={vi.fn()} onUnauthenticatedAction={vi.fn()} />);
		const publishBtn = getByRole("button", { name: /publish/i });
		expect(publishBtn).toBeDisabled();
	});

	it("calls onUnauthenticatedAction when unauthenticated user tries to publish", async () => {
		const onPostCreated = vi.fn();
		const onUnauth = vi.fn();
		const { getByPlaceholderText, getByRole } = render(
			<PostEditor onPostCreated={onPostCreated} onUnauthenticatedAction={onUnauth} />
		);
		const textarea = getByPlaceholderText(/how are you feeling today\?/i) as HTMLTextAreaElement;
		await userEvent.type(textarea, "Hello world");
		const publishBtn = getByRole("button", { name: /publish/i });
		expect(publishBtn).toBeEnabled();
		await userEvent.click(publishBtn);
		expect(onUnauth).toHaveBeenCalled();
		expect(onPostCreated).not.toHaveBeenCalled();
	});

	it("publishes and clears content when authenticated", async () => {
		mockAuth.isAuthenticated = true;
		const onPostCreated = vi.fn();
		const onUnauth = vi.fn();
		const { getByPlaceholderText, getByRole } = render(
			<PostEditor onPostCreated={onPostCreated} onUnauthenticatedAction={onUnauth} />
		);
		const textarea = getByPlaceholderText(/how are you feeling today\?/i) as HTMLTextAreaElement;
		await userEvent.type(textarea, "Something meaningful");
		const publishBtn = getByRole("button", { name: /publish/i });
		await userEvent.click(publishBtn);
		await waitFor(() => expect(onPostCreated).toHaveBeenCalledTimes(1));
		await waitFor(() =>
			expect((getByPlaceholderText(/how are you feeling today\?/i) as HTMLTextAreaElement).value).toBe("")
		);
		expect(onUnauth).not.toHaveBeenCalled();
	});
});
