import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Stepper from "./Stepper";
import CoreStep from "./CoreStep";
import StepExpertise from "./ExpertiseStep";
import PreferencesStep from "./PreferencesStep";
import { useRoadmapForm } from "@/stores/roadmapStores";
import type { RoadmapFormDTO } from "@/@types/roadmap";

interface CreateRoadmapFormProps {
	onSubmit: (data: RoadmapFormDTO) => Promise<void>;
	isLoading: boolean;
}

export function CreateRoadmapForm({ onSubmit, isLoading }: CreateRoadmapFormProps) {
	const { setRoadmapForm } = useRoadmapForm();
	const [formVersion, setFormVersion] = useState(0);

	useEffect(() => {
		setRoadmapForm({
			theme: null,
			learningGoal: null,
			knowledgeLevel: null,
			timeCommitment: null,
			learningStyle: null,
		});
	}, [setRoadmapForm]);

	const handleFinish = async (data: RoadmapFormDTO) => {
		await onSubmit(data);
		setRoadmapForm({
			theme: null,
			learningGoal: null,
			knowledgeLevel: null,
			timeCommitment: null,
			learningStyle: null,
		});
		setFormVersion((v) => v + 1);
	};

	const steps = [
		{ label: "Core Info", content: <CoreStep /> },
		{ label: "Expertise", content: <StepExpertise /> },
		{ label: "Preferences", content: <PreferencesStep onFinish={handleFinish} isLoading={isLoading} /> },
	];

	return (
		<motion.div
			key={formVersion}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<Stepper steps={steps} />
		</motion.div>
	);
}
