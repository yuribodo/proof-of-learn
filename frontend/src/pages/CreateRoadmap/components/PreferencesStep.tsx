import {
	Form,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { LearningStyleLabels, type RoadmapFormDTO } from "@/@types/roadmap";
import type { z } from "zod";
import { preferencesStepSchema } from "../schema/CreateRoadmapSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoadmapForm } from "@/stores/roadmapStores";
import { useMutation } from "@tanstack/react-query";
import { roadmapService } from "@/services/roadmapService";

type FormData = z.infer<typeof preferencesStepSchema>;

export default function PreferencesStep() {
	const { roadmapForm, setRoadmapForm } = useRoadmapForm();

	const form = useForm<FormData>({
		defaultValues: {
			learningStyle: roadmapForm.learningStyle ?? undefined,
		},
		resolver: zodResolver(preferencesStepSchema),
	});

	const { mutate, isPending, isSuccess } = useMutation({
		mutationFn: (data: RoadmapFormDTO) => {
			return roadmapService.createRoadmap(data);
		},
	});

	const handleSubmit = form.handleSubmit((formData) => {
		setRoadmapForm({
			learningStyle: formData.learningStyle,
		});
		const updatedForm = {
			...roadmapForm,
			learningStyle: formData.learningStyle,
		};
		mutate(updatedForm as RoadmapFormDTO);
	});

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<FormField
					control={form.control}
					name="learningStyle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Preferred Learning Style</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={form.watch("learningStyle") ?? ""}
									defaultValue={field.value}
								>
									<SelectTrigger className="min-w-xs">
										<SelectValue placeholder="Select a learning style" />
									</SelectTrigger>
									<SelectContent className="bg-zinc-900 text-white">
										{Object.entries(LearningStyleLabels).map(
											([value, label]) => (
												<SelectItem key={value} value={value}>
													{label}
												</SelectItem>
											),
										)}
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
			</form>
		</Form>
	);
}
