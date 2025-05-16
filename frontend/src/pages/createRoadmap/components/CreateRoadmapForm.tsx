import { z } from "zod";
import CoreStep from "./CoreStep";
import StepExpertise from "./ExpertiseStep";
import PreferencesStep from "./PreferencesStep";
import Stepper from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	coreStepSchema,
	expertiseStepSchema,
	preferencesStepSchema,
} from "../schema/CreateRoadmapSchema";
import { motion } from "framer-motion";

const schema = z.object({
	coreStep: coreStepSchema,
	expertiseStep: expertiseStepSchema,
	preferencesStep: preferencesStepSchema,
});

export type FormData = z.infer<typeof schema>;

export default function CreateRoadmapForm() {
	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			coreStep: {
				theme: "",
				learningGoal: "",
			},
			expertiseStep: {
				knowledgeLevel: "",
				timeCommitment: 1,
			},
			preferencesStep: {
				learningStyle: "",
			},
		},
	});

	const handleSubmit = form.handleSubmit((formData) => {
		console.log({
			...formData.coreStep,
			...formData.expertiseStep,
			...formData.preferencesStep,
		});
	});

	return (
		<motion.div
			className="self-center mt-10 rounded-md bg-zinc-900 p-5"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
		>
			<FormProvider {...form}>
				<form onSubmit={handleSubmit}>
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
				</form>
			</FormProvider>
		</motion.div>
	);
}
