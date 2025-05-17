import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RegisterForm from "./components/registerForm";

export function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#121212]">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="bg-[#2A2D3E] p-8 rounded-[12px] shadow-[0_8px_16px_rgba(0,0,0,0.2)] w-full max-w-md"
			>
				<h2 className="text-2xl font-heading font-semibold text-[#E0E0E0] mb-6 text-center">
					Register
				</h2>
				<RegisterForm />
				<p className="text-center text-[#E0E0E0]/80 mt-4">
					Already have an acccount?{" "}
					<Link
						to="/login"
						className="text-[#6D4AFF] hover:underline cursor-pointer"
					>
						Sign In
					</Link>
				</p>
			</motion.div>
		</div>
	);
}
