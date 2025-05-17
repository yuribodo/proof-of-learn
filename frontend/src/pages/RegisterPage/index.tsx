import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		// TODO: implement register logic
	}

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
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="name" className="block text-[#E0E0E0]/80 mb-1">
							Name
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Your name"
							className="w-full bg-[#1E1E24] text-[#E0E0E0] placeholder-[#E0E0E0]/60 border border-[rgba(255,255,255,0.1)] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]"
						/>
					</div>
					<div>
						<label htmlFor="email" className="block text-[#E0E0E0]/80 mb-1">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="your@email"
							className="w-full bg-[#1E1E24] text-[#E0E0E0] placeholder-[#E0E0E0]/60 border border-[rgba(255,255,255,0.1)] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-[#E0E0E0]/80 mb-1">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="********"
							className="w-full bg-[#1E1E24] text-[#E0E0E0] placeholder-[#E0E0E0]/60 border border-[rgba(255,255,255,0.1)] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]"
						/>
					</div>
					<Button
						type="submit"
						size="lg"
						className="w-full bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer transform transition-transform duration-200 hover:scale-105"
					>
						Sign Up
					</Button>
				</form>
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
