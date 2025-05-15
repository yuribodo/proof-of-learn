import { useFormContext } from "react-hook-form";
import {
	StepperFooter,
	StepperNextButton,
	StepperPreviousButton,
} from "./Stepper";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormData } from "./CreateRoadmapForm";

export default function StepExpertise() {
	const form = useFormContext<FormData>();

	return (
		<div className="flex flex-col gap-4">
			<FormField
				control={form.control}
				name="expertiseStep.knowledgeLevel"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Knowledge Level</FormLabel>
						<FormControl>
							<Input {...field} placeholder="What is your knowledge level?" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="expertiseStep.timeCommitment"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Time Commitment</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder="How many hours a day will you be studying?"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<StepperFooter>
				<StepperPreviousButton />
				<StepperNextButton />
			</StepperFooter>
		</div>
	);
}
