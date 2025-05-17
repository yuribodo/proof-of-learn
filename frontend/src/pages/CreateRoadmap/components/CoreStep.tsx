import { StepperFooter, StepperNextButton } from "./Stepper";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ThemeLabels } from "@/@types/roadmap";
import type { z } from "zod";
import { coreStepSchema } from "../schema/CreateRoadmapSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoadmapForm } from "@/stores/roadmapStores";
import { useStepper } from "@/hooks/useStepper";

type FormData = z.infer<typeof coreStepSchema>;

export default function CoreStep() {
	const { roadmapForm, setRoadmapForm } = useRoadmapForm();

	const form = useForm<FormData>({
		defaultValues: {
			theme: roadmapForm.theme ?? undefined,
			learningGoal: roadmapForm.learningGoal ?? "",
		},
		resolver: zodResolver(coreStepSchema),
	});

	const { nextStep } = useStepper();

	const handleSubmit = form.handleSubmit((formData) => {
		setRoadmapForm({
			theme: formData.theme,
			learningGoal: formData.learningGoal,
		});
		nextStep();
	});

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<FormField
					control={form.control}
					name="theme"
					render={({ field }) => (
						<FormItem className="min-w-xs">
							<FormLabel>Theme</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={form.watch("theme") ?? ""}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a learning style" />
									</SelectTrigger>
									<SelectContent className="bg-zinc-900 text-white">
										{Object.entries(ThemeLabels).map(([value, label]) => (
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
				<FormField
					control={form.control}
					name="learningGoal"
					render={({ field }) => (
						<FormItem className="max-w-xs">
							<FormLabel>Learning Goal</FormLabel>
							<FormControl>
								<Input {...field} placeholder="What is your learning goal?" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<StepperFooter>
					<StepperNextButton
						preventDefault
						type="submit"
						disabled={form.formState.isSubmitting}
					/>
				</StepperFooter>
			</form>
		</Form>
	);
}
