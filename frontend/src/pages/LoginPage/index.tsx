import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";

export function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#121212]">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="bg-[#2A2D3E] p-8 rounded-[12px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] w-full max-w-md"
			>
				<h2 className="text-2xl font-heading font-semibold text-[#E0E0E0] mb-6 text-center">
					Entrar
				</h2>
				<LoginForm />
				<p className="text-center text-[#E0E0E0]/80 mt-4">
					Don't have an account?{" "}
					<Link
						to="/register"
						className="text-[#6D4AFF] hover:underline cursor-pointer"
					>
						Sign Up
					</Link>
				</p>
			</motion.div>
		</div>
	);
}
