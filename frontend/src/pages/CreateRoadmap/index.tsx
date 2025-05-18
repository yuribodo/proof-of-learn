import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { roadmapService } from "@/services/roadmapService";
import { CreateRoadmapForm } from "./components/CreateRoadmapForm";
import type { RoadmapFormDTO } from "@/@types/roadmap";
import { motion } from "framer-motion";
import { Loader2, ChevronLeft } from "lucide-react";

export function CreateRoadmap() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	async function handleCreateRoadmap(data: RoadmapFormDTO) {
		try {
			setIsLoading(true);
			await roadmapService.createRoadmap(data);

			toast.success("Roadmap successfully created!", { description: "Your roadmap has been created and is ready for use." });

			navigate("/roadmaps?created=1");
		} catch (error) {
			toast.error("Error creating roadmap", { description: "An error occurred while creating your roadmap. Try again." });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-[#121212] text-[#E0E0E0] px-8 py-8 flex flex-col items-center justify-center">
			<nav className="w-full max-w-lg mb-6">
				<button
					type="button"
					onClick={() => navigate('/roadmaps')}
					className="flex items-center text-sm text-[#E0E0E0] hover:text-white cursor-pointer"
				>
					<ChevronLeft className="w-5 h-5 mr-2" />
					Back to Roadmaps
				</button>
			</nav>
			<motion.h1
				className="text-3xl font-bold mb-6 text-center"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
			>
				Create Your Roadmap!
			</motion.h1>
			<div className="w-full max-w-lg p-6 bg-[#1f1f1f] rounded-lg shadow-lg relative">
				<CreateRoadmapForm onSubmit={handleCreateRoadmap} isLoading={isLoading} />
				{isLoading && (
					<div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center rounded-lg">
						<Loader2 className="animate-spin h-8 w-8 text-white mb-2" />
						<p className="text-white text-center">Creating roadmap, wait...</p>
					</div>
				)}
			</div>
		</div>
	);
}
