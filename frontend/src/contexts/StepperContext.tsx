import { createContext } from "react";

interface IStepperContextValue {
	previousStep: () => void;
	nextStep: () => void;
}

export const StepperContext = createContext({} as IStepperContextValue);
