import { useState } from "react";
import PostEditor from "../components/PostEditor";
import Post, { Post as PostType } from "../components/Post";
import AuthModal from "../components/AuthModal";
import Header from "../components/Header";

// Sample posts
const SAMPLE_POSTS: PostType[] = [
	{
		id: "1",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		author: "Theresa Webb",
		timestamp: new Date(Date.now() - 300000),
		emoji: "😉",
	},
	{
		id: "2",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		author: "John Doe",
		timestamp: new Date(Date.now() - 7200000),
		emoji: "✌️",
	},
	{
		id: "3",
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		author: "Jane Doe",
		timestamp: new Date(Date.now() - 86400000),
		emoji: "💀",
	},
];

export default function Feed() {
	const [posts, setPosts] = useState<PostType[]>(SAMPLE_POSTS);
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");

	console.log("check here authModalMode");
	console.log(authModalMode);

	const handlePostCreated = (newPost: PostType) => {
		setPosts([newPost, ...posts]);
	};

	const handleUnauthenticatedAction = () => {
		setAuthModalMode("signin");
		setShowAuthModal(true);
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<Header setAuthModalMode={setAuthModalMode} setShowAuthModal={setShowAuthModal} />
			{/* Main Content */}
			<main className="max-w-4xl mx-auto px-4 py-6">
				<PostEditor onPostCreated={handlePostCreated} onUnauthenticatedAction={handleUnauthenticatedAction} />

				<div>
					{posts.map((post) => (
						<Post key={post.id} post={post} />
					))}
				</div>
			</main>

			<AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode={authModalMode} />
		</div>
	);
}
