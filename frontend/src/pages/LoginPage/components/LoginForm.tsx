import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas/loginSchema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import type { LoginDTO } from "@/@types/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthProvider";
import { toast } from 'sonner';

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const navigate = useNavigate();

	const { signin } = useContext(AuthContext);

	const { mutate, isPending } = useMutation({
		mutationFn: (data: LoginDTO) => authService.login(data),
		onSuccess: (data) => {
			const token = data.accessToken;

			if (token) {
				signin(token);
				console.log("Successful to sign in");
			} else {
				console.error("Authentication Error");
			}

			navigate("/roadmaps");
		},
		onError: (error: any) => {
			console.error("Failed to sign in", error);
			const apiMessage = error?.response?.data?.error;
			toast.error(apiMessage || 'Login failed. Please check your credentials.');
		},
	});

	const form = useForm<FormData>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginSchema),
	});

	const handleSubmit = form.handleSubmit((formData) => {
		mutate(formData);
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="block text-[#E0E0E0]/80 mb-1">
								Email
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
									placeholder="your@email"
									className="w-full bg-[#1E1E24] text-[#E0E0E0] placeholder-[#E0E0E0]/60 border border-[rgba(255,255,255,0.1)] rounded-md p-3 h-14 focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="block text-[#E0E0E0]/80 mb-1">
								Password
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="password"
									placeholder="********"
									className="w-full bg-[#1E1E24] text-[#E0E0E0] placeholder-[#E0E0E0]/60 border border-[rgba(255,255,255,0.1)] rounded-md p-3 h-14 focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					size="lg"
					className="w-full bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer transform transition-transform duration-200 hover:scale-105"
					disabled={isPending}
				>
					Sign In
				</Button>
			</form>
		</Form>
	);
}
