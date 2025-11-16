import { ReactNode, useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
			onClick={onClose}
		>
			<div
				className="rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-scale-in"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
