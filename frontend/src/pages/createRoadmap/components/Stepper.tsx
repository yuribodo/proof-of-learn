import { Button } from "@/components/ui/button";
import { StepperContext } from "@/contexts/StepperContext";
import { useStepper } from "@/hooks/useStepper";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

type Props = {
	initialStep?: number;
	steps: {
		label: string;
		content: React.ReactNode;
	}[];
};
export default function Stepper({ steps, initialStep = 0 }: Props) {
	const [currentStep, setCurrentStep] = useState(initialStep);

	const previousStep = useCallback(() => {
		setCurrentStep((prevState) => Math.max(0, prevState - 1));
	}, []);

	const nextStep = useCallback(() => {
		setCurrentStep((prevState) => Math.min(steps.length - 1, prevState - 1));
	}, [steps]);

	return (
		<StepperContext.Provider value={{ previousStep, nextStep }}>
			<div>
				<ul className="space-x-5">
					{steps.map((step, index) => (
						<li
							key={step.label}
							className={cn(
								"inline-block text-xs px-2 py-1 rounded-md",
								index === currentStep && "text-white font-semibold",
							)}
						>
							{String(index + 1).padStart(2, "0")}. {step.label}
						</li>
					))}
				</ul>

				<div className="mt-10">{steps[currentStep].content}</div>
			</div>
		</StepperContext.Provider>
	);
}

export function StepperFooter({ children }: { children: React.ReactNode }) {
	return <footer className="flex gap-6 mt-6">{children}</footer>;
}

export function StepperPreviousButton() {
	const { previousStep } = useStepper();

	return (
		<Button size="sm" type="button" onClick={previousStep}>
			Previous
		</Button>
	);
}

export function StepperNextButton() {
	const { nextStep } = useStepper();

	return (
		<Button size="sm" type="button" onClick={nextStep}>
			Next
		</Button>
	);
}

export function StepperFinishButton() {
	return (
		<Button size="sm" type="submit">
			Finish
		</Button>
	);
}
