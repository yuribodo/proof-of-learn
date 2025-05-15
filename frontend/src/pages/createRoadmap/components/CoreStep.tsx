import { StepperFooter, StepperNextButton } from "./Stepper";
import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormData } from "./CreateRoadmapForm";

export default function CoreStep() {
	const form = useFormContext<FormData>();

	return (
		<div className="flex flex-col gap-4">
			<FormField
				control={form.control}
				name="coreStep.theme"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Theme</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder="What will be your roadmap's theme?"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="coreStep.learningGoal"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Learning Goal</FormLabel>
						<FormControl>
							<Input {...field} placeholder="What is your learning goal?" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<StepperFooter>
				<StepperNextButton />
			</StepperFooter>
		</div>
	);
}
