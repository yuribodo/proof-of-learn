import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
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
import { useMutation } from "@tanstack/react-query";
import type { RegisterDTO } from "@/@types/auth";
import { authService } from "@/services/authService";

type FormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const { mutate, isPending } = useMutation({
		mutationFn: (data: RegisterDTO) => authService.register(data),
	});

	const form = useForm<FormData>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			// wallet_address: null,
		},
		resolver: zodResolver(registerSchema),
	});

	const handleSubmit = form.handleSubmit((formData) => {
		mutate(formData);
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="block text-[#E0E0E0]/80 mb-1">
								Name
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
									placeholder="Your name"
									className="w-full bg-[#1E1E24] text-[#E0E0E0] placeholder-[#E0E0E0]/60 border border-[rgba(255,255,255,0.1)] rounded-md p-3 h-14 focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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
				{/*
				<FormField
					control={form.control}
					name="wallet_address"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="block text-[#E0E0E0]/80 mb-1">
								Wallet Address (Optional)
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
									placeholder="Your wallet address"
									value={form.watch("wallet_address") ?? ""}
									className="w-full bg-[#1E1E24] text-[#E0E0E0] placeholder-[#E0E0E0]/60 border border-[rgba(255,255,255,0.1)] rounded-md p-3 h-14 focus:outline-none focus:ring-2 focus:ring-[#6D4AFF]"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}

				<Button
					type="submit"
					size="lg"
					className="w-full bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer transform transition-transform duration-200 hover:scale-105"
					disabled={isPending}
				>
					Sign Up
				</Button>
			</form>
		</Form>
	);
}
