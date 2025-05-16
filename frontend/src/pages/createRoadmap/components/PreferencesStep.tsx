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
import { useFormContext } from "react-hook-form";
import type { FormData } from "./CreateRoadmapForm";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { LearningStyleLabels } from "@/@types/roadmap";

export default function PreferencesStep() {
	const form = useFormContext<FormData>();

	return (
		<div className="flex flex-col gap-4">
			<FormField
				control={form.control}
				name="preferencesStep.learningStyle"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Preferred Learning Style</FormLabel>
						<FormControl>
							<Select
								onValueChange={field.onChange}
								value={field.value}
								defaultValue={field.value}
							>
								<SelectTrigger className="min-w-xs">
									<SelectValue placeholder="Select a learning style" />
								</SelectTrigger>
								<SelectContent className="bg-zinc-900 text-white">
									{Object.entries(LearningStyleLabels).map(([value, label]) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
