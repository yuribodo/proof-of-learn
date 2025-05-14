import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { RoadmapsPage } from '@/pages/RoadmapsPage';
import { RoadmapDetailPage } from '@/pages/RoadmapDetailPage';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/roadmaps" element={<RoadmapsPage />} />
				<Route path="/roadmap/:id" element={<RoadmapDetailPage />} />
			</Routes>
		</BrowserRouter>
	);
}
