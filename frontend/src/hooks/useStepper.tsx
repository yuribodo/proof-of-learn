import { useContext } from "react";
import { StepperContext } from "../contexts/StepperContext";

export function useStepper() {
	return useContext(StepperContext);
}
