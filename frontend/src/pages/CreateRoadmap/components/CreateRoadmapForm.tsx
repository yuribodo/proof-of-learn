import CoreStep from "./CoreStep";
import StepExpertise from "./ExpertiseStep";
import PreferencesStep from "./PreferencesStep";
import Stepper from "./Stepper";
import { motion } from "framer-motion";

export default function CreateRoadmapForm() {
	return (
		<motion.div
			className="self-center mt-10 rounded-md bg-zinc-900 p-5"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
		>
			<Stepper
				steps={[
					{ label: "Core Learning Focus", content: <CoreStep /> },
					{
						label: "Expertise and Availability",
						content: <StepExpertise />,
					},
					{ label: "Learning Preferences", content: <PreferencesStep /> },
				]}
			/>
		</motion.div>
	);
}
