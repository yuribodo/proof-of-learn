import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	StepperFinishButton,
	StepperFooter,
	StepperPreviousButton,
} from "./Stepper";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { FormData } from "./CreateRoadmapForm";

export default function PreferencesStep() {
	const form = useFormContext<FormData>();

	return (
		<div className="flex flex-col">
			<FormField
				control={form.control}
				name="preferencesStep.learningStyle"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Preferred Learning Style</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder="What is your preferred learning style?"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<StepperFooter>
				<StepperPreviousButton />
				<StepperFinishButton />
			</StepperFooter>
		</div>
	);
}
