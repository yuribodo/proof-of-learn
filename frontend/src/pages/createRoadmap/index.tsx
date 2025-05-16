import CreateRoadmapForm from "./components/CreateRoadmapForm";
import { motion } from "framer-motion";

export default function CreateRoadmap() {
	return (
		<div className="min-h-screen bg-[#121212] text-[#E0E0E0] px-8 py-8 flex flex-col">
			<motion.h1
				className="text-3xl font-bold mb-6 text-center"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
			>
				Create Your Roadmap!
			</motion.h1>
			<CreateRoadmapForm />
		</div>
	);
}
