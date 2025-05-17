import { useForm } from "react-hook-form";
import {
	StepperFooter,
	StepperNextButton,
	StepperPreviousButton,
} from "./Stepper";
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
import { KnowledgeLevelLabels } from "@/@types/roadmap";
import type { z } from "zod";
import { expertiseStepSchema } from "../schema/CreateRoadmapSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoadmapForm } from "@/stores/roadmapStores";
import { useStepper } from "@/hooks/useStepper";

type FormData = z.infer<typeof expertiseStepSchema>;

export default function StepExpertise() {
	const { roadmapForm, setRoadmapForm } = useRoadmapForm();

	const form = useForm<FormData>({
		defaultValues: {
			knowledgeLevel: roadmapForm.knowledgeLevel ?? undefined,
			timeCommitment: roadmapForm.timeCommitment ?? 1,
		},
		resolver: zodResolver(expertiseStepSchema),
	});

	const { nextStep } = useStepper();

	const handleSubmit = form.handleSubmit((formData) => {
		setRoadmapForm({
			knowledgeLevel: formData.knowledgeLevel,
			timeCommitment: formData.timeCommitment,
		});
		nextStep();
	});

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<FormField
					control={form.control}
					name="knowledgeLevel"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Knowledge Level</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={form.watch("knowledgeLevel") ?? ""}
									defaultValue={field.value}
								>
									<SelectTrigger className="min-w-xs">
										<SelectValue placeholder="Select a learning style" />
									</SelectTrigger>
									<SelectContent className="bg-zinc-900 text-white">
										{Object.entries(KnowledgeLevelLabels).map(
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
				<FormField
					control={form.control}
					name="timeCommitment"
					render={({ field }) => (
						<FormItem className="max-w-xs">
							<FormLabel>Time Commitment</FormLabel>
							<FormControl>
								<Input
									type="number"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
									placeholder="e.g., 2"
									min={1}
									max={24}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<StepperFooter>
					<StepperPreviousButton />
					<StepperNextButton preventDefault type="submit" />
				</StepperFooter>
			</form>
		</Form>
	);
}
