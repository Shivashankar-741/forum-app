import { useAuth } from "../contexts/AuthContext";
import HeartIcon from "../assets/svg/heart.svg?react";
import RepliesIcon from "../assets/svg/replies.svg?react";
import ShareIcon from "../assets/svg/share.svg?react";

export interface Post {
	id: string;
	content: string;
	author: string;
	timestamp: Date;
	emoji?: string;
}

interface PostProps {
	post: Post;
}

export default function Post({ post }: PostProps) {
	const { isAuthenticated } = useAuth();

	const handleInteraction = () => {
		if (!isAuthenticated) {
			return;
		}
		alert("Function not implemented");
	};

	const formatTime = (date: Date) => {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);

		if (minutes < 1) return "Just now";
		if (minutes < 60) return `${minutes} mins ago`;
		return date.toLocaleDateString();
	};

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<div
			className="w-full rounded-[21px] mb-6"
			style={{ background: "#00000008", transform: "rotate(0deg)", opacity: 1 }}
		>
			<div className="pt-[7px] pb-[20px] px-[7px]">
				<div
					className="w-full rounded-[18px] border bg-white px-6 pb-6 pt-5"
					style={{
						borderColor: "#FFFFFF",
						borderWidth: "1px",
						opacity: 1,
						transform: "rotate(0deg)",
						boxShadow: "0px 4px 9px 0px #0000000D",
					}}
				>
					<div className="flex items-start space-x-4">
						<div className="flex-shrink-0 flex flex-col items-center">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mb-2">
								{getInitials(post.author)}
							</div>
							{post.emoji && (
								<span className="relative inline-block w-[30px] h-[30px]">
									<span
										className="absolute inset-0 rounded-[18.5px] opacity-100"
										style={{ background: "#F2F2F2", transform: "rotate(0deg)" }}
									/>
									<span className="relative flex items-center justify-center w-full h-full text-2xl leading-none">
										{post.emoji}
									</span>
								</span>
							)}
						</div>
						<div className="flex-1 min-w-0">
							<div className="mb-3">
								<h3 className="font-semibold text-gray-900 text-sm mb-1">{post.author}</h3>
								<span className="text-gray-500 text-sm">{formatTime(post.timestamp)}</span>
							</div>
							<div className="mb-4">
								<p
									style={{
										fontFamily: "Inter, sans-serif",
										fontWeight: 500,
										fontSize: "14px",
										lineHeight: "21px",
										letterSpacing: "0%",
									}}
									className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap"
								>
									{post.content}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-3 flex items-center space-x-6 text-gray-600 px-[15px]">
					<button
						onClick={handleInteraction}
						className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
						aria-label="Like"
					>
						<HeartIcon className="w-4 h-4" />
					</button>
					<button
						onClick={handleInteraction}
						className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
						aria-label="Comment"
					>
						<RepliesIcon className="w-4 h-4" />
					</button>
					<button
						onClick={handleInteraction}
						className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
						aria-label="Share"
					>
						<ShareIcon className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
}
