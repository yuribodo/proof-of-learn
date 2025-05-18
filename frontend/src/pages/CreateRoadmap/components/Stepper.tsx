import { Button } from "@/components/ui/button";
import { StepperContext } from "@/contexts/StepperContext";
import { useStepper } from "@/hooks/useStepper";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
		setCurrentStep((prevState) => Math.min(steps.length - 1, prevState + 1));
	}, [steps]);

	return (
		<StepperContext.Provider value={{ previousStep, nextStep }}>
			<div>
				<ul className="space-x-6">
					{steps.map((step, index) => (
						<li
							key={step.label}
							className={cn(
								"inline-block text-sm px-4 py-2 rounded-md transition-colors duration-200",
								index === currentStep
									? "bg-[#6D4AFF] text-white font-semibold"
									: "bg-transparent text-[#A1A1AA] hover:text-[#E0E0E0]"
							)}
						>
							{String(index + 1).padStart(2, "0")}. {step.label}
						</li>
					))}
				</ul>

				<AnimatePresence initial={false} mode="popLayout">
					<motion.div
						key={currentStep}
						className="mt-10"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
					>
						{steps[currentStep].content}
					</motion.div>
				</AnimatePresence>
			</div>
		</StepperContext.Provider>
	);
}

export function StepperFooter({ children }: { children: React.ReactNode }) {
	return <footer className="flex gap-8 mt-6 justify-end">{children}</footer>;
}

export function StepperPreviousButton() {
	const { previousStep } = useStepper();

	return (
		<Button
			size="sm"
			type="button"
			onClick={previousStep}
			className="border-1 border-[#6D4AFF] hover:bg-[#6D4AFF] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer"
		>
			Previous
		</Button>
	);
}

export function StepperNextButton({
	size = "sm",
	type = "button",
	preventDefault = false,
}: Omit<React.ComponentPropsWithoutRef<typeof Button>, "onClick"> & {
	preventDefault?: boolean;
}) {
	const { nextStep } = useStepper();

	const nextStepHandler = !preventDefault ? nextStep : undefined;
	return (
		<Button
			size={size}
			type={type}
			onClick={nextStepHandler}
			className="bg-[#6D4AFF] cursor-pointer hover:bg-transparent hover:scale-110 hover:border-1 hover:border-[#6D4AFF] transition-transform duration-200 ease-in-out"
		>
			Next
		</Button>
	);
}

export function StepperFinishButton({ disabled = false }: { disabled?: boolean }) {
	return (
		<Button
			size="sm"
			type="submit"
			disabled={disabled}
			className="bg-[#6D4AFF] cursor-pointer hover:bg-transparent hover:scale-110 hover:border-1 hover:border-[#6D4AFF] transition-transform duration-200 ease-in-out"
		>
			Submit
		</Button>
	);
}
