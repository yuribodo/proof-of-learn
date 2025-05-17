import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import CreateRoadmap from "./pages/CreateRoadmap";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { RoadmapsPage } from "@/pages/RoadmapsPage";
import { RoadmapDetailPage } from "@/pages/RoadmapDetailPage";
import { AuthGuard } from "./contexts/auth/AuthGuard";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import { Toaster } from "sonner";

export default function App() {
	return (
		<AuthProvider>
			<Toaster position="top-right" />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					<Route element={<AuthGuard />}>
						<Route path="/roadmaps" element={<RoadmapsPage />} />
						<Route path="/roadmap/:id" element={<RoadmapDetailPage />} />
						<Route path="/create-roadmap/" element={<CreateRoadmap />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
