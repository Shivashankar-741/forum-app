import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BoldIcon from "../assets/svg/bold.svg?react";
import ItalicIcon from "../assets/svg/italic.svg?react";
import UnderlineIcon from "../assets/svg/underline.svg?react";
import ListUlIcon from "../assets/svg/list-ul.svg?react";
import ListOlIcon from "../assets/svg/list-ol.svg?react";
import CodeIcon from "../assets/svg/code.svg?react";
import QuoteIcon from "../assets/svg/quote.svg?react";
import DeleteIcon from "../assets/svg/delete.svg?react";
import SmileyIcon from "../assets/svg/smiley.svg?react";
import PlusIcon from "../assets/svg/plus.svg?react";
import MicIcon from "../assets/svg/mic.svg?react";
import VideoIcon from "../assets/svg/video.svg?react";
import PostSubmitIcon from "../assets/svg/postsubmit.svg?react";
import ChevronDownIcon from "../assets/svg/chevron-down.svg?react";

interface Post {
	id: string;
	content: string;
	author: string;
	timestamp: Date;
	emoji?: string;
}

interface PostEditorProps {
	onPostCreated: (post: Post) => void;
	onUnauthenticatedAction: () => void;
}

export default function PostEditor({ onPostCreated, onUnauthenticatedAction }: PostEditorProps) {
	const { isAuthenticated } = useAuth();
	const [content, setContent] = useState("");
	const [isPublishing, setIsPublishing] = useState(false);
	const maxLength = 499;

	const handlePublish = async () => {
		if (!isAuthenticated) {
			onUnauthenticatedAction();
			return;
		}

		if (!content.trim()) return;

		setIsPublishing(true);
		await new Promise((resolve) => setTimeout(resolve, 500));

		const newPost: Post = {
			id: Date.now().toString(),
			content: content.trim(),
			author: "You",
			timestamp: new Date(),
			emoji: "😉",
		};

		onPostCreated(newPost);
		setContent("");
		setIsPublishing(false);
	};

	const handleToolbarButton = () => {
		if (!isAuthenticated) {
			onUnauthenticatedAction();
			return;
		}
		alert("Function not implemented");
	};

	const handleActionButton = () => {
		if (!isAuthenticated) {
			onUnauthenticatedAction();
			return;
		}
		alert("Function not implemented");
	};

	const handleClear = () => {
		if (!isAuthenticated) {
			onUnauthenticatedAction();
			return;
		}
		setContent("");
	};

	return (
		<div
			className="w-full rounded-[21px] mb-6"
			style={{ background: "#00000008", transform: "rotate(0deg)", opacity: 1 }}
		>
			<div className="pt-[7px] pb-[20px] px-[7px]">
				{/* Inner card */}
				<div
					className="w-full rounded-[18px] border bg-white px-6 pt-5 pb-6"
					style={{
						borderColor: "#FFFFFF",
						borderWidth: "1px",
						boxShadow: "0px 4px 9px 0px #0000000D",
					}}
				>
					{/* Toolbar */}
					<div className="flex items-center justify-between mb-4 pb-4 -mx-6 pl-4 pr-6">
						<div className="flex items-center space-x-[10px] bg-[#00000008] rounded-[10px] py-1 pl-2 pr-6">
							<button
								onClick={handleToolbarButton}
								className="flex items-center space-x-1 px-3 py-1.5 text-[16px] leading-[24px] font-medium tracking-[-0.01em] text-gray-900 bg-white rounded-md shadow-sm transition-all"
							>
								<span>Paragraph</span>
								<ChevronDownIcon className="w-[14px] h-[14px]" />
							</button>
							<span className="w-px h-5 bg-gray-200 mx-[10px]" />
							<button
								onClick={handleToolbarButton}
								className="p-1.5 text-gray-800 hover:bg-gray-100 rounded-md bg-white shadow-sm transition-all"
								aria-label="Bold"
							>
								<BoldIcon className="w-[18px] h-[18px]" />
							</button>
							<span className="w-px h-5 bg-gray-200 mx-[10px]" />
							<button
								onClick={handleToolbarButton}
								className="p-1.5 text-gray-800 hover:bg-gray-100 rounded transition-all"
								aria-label="Italic"
							>
								<ItalicIcon className="w-[18px] h-[18px]" />
							</button>
							<button
								onClick={handleToolbarButton}
								className="p-1.5 text-gray-800 hover:bg-gray-100 rounded transition-all"
								aria-label="Underline"
							>
								<UnderlineIcon className="w-[18px] h-[18px]" />
							</button>
							<span className="w-px h-5 bg-gray-200 mx-[10px]" />
							<button
								onClick={handleToolbarButton}
								className="p-1.5 text-gray-800 hover:bg-gray-100 rounded transition-all"
								aria-label="Unordered list"
							>
								<ListUlIcon className="w-[18px] h-[18px]" />
							</button>
							<button
								onClick={handleToolbarButton}
								className="p-1.5 text-gray-800 hover:bg-gray-100 rounded transition-all"
								aria-label="Ordered list"
							>
								<ListOlIcon className="w-[18px] h-[18px]" />
							</button>
							<span className="w-px h-5 bg-gray-200 mx-[10px]" />
							<button
								onClick={handleToolbarButton}
								className="p-1.5 text-gray-800 hover:bg-gray-100 rounded transition-all"
								aria-label="Code"
							>
								<QuoteIcon className="w-[18px] h-[18px]" />
							</button>
							<button
								onClick={handleToolbarButton}
								className="p-1.5 text-gray-800 hover:bg-gray-100 rounded transition-all"
								aria-label="Code"
							>
								<CodeIcon className="w-[18px] h-[18px]" />
							</button>
						</div>
						<div className="flex items-center space-x-2">
							<button
								onClick={handleClear}
								className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded transition-all"
								aria-label="Delete"
							>
								<DeleteIcon className="w-5 h-5" />
							</button>
						</div>
					</div>

					{/* Input Area */}
					<div className="relative">
						<div className="absolute left-[-2px] top-3 z-10">
							<button
								onClick={handleActionButton}
								className="text-gray-400 hover:text-gray-600 transition-colors"
								aria-label="Emoji"
							>
								<SmileyIcon className="w-5 h-5" />
							</button>
						</div>
						<textarea
							value={content}
							onChange={(e) => {
								if (e.target.value.length <= maxLength) {
									setContent(e.target.value);
								}
							}}
							placeholder="How are you feeling today?"
							className="w-full pl-7 pr-4 py-3 bg-white border-0 rounded-lg focus:ring-0 focus:border-transparent outline-none resize-none transition-all min-h-[120px] text-gray-900 placeholder:text-gray-400"
							rows={4}
						/>
					</div>
					{/* Action Bar moved inside inner card with top border */}
					<div className="mt-4 pt-4 border-t border-gray-200 -mx-6 pl-4 pr-6 flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<button
								onClick={handleActionButton}
								className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
								aria-label="Add"
							>
								<PlusIcon className="w-4 h-4" />
							</button>
							<button
								onClick={handleActionButton}
								className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
								aria-label="Microphone"
							>
								<MicIcon className="w-4 h-4" />
							</button>
							<button
								onClick={handleActionButton}
								className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
								aria-label="Camera"
							>
								<VideoIcon className="w-4 h-4" />
							</button>
						</div>
						<button
							onClick={handlePublish}
							disabled={!content.trim() || isPublishing}
							className="w-10 h-10 flex items-center justify-center text-white bg-[#5057EA] rounded-lg hover:bg-[#4047D9] focus:outline-none focus:ring-2 focus:ring-[#5057EA] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
							aria-label="Publish"
						>
							<PostSubmitIcon className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
