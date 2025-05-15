import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import CreateRoadmap from "./pages/createRoadmap";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/create-roadmap/" element={<CreateRoadmap />} />
			</Routes>
		</BrowserRouter>
	);
}
