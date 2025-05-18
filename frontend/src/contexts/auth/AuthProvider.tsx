import { createContext, useCallback, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { toast } from "sonner";

interface AuthContextValue {
	signedIn: boolean;
	signin(accessToken: string): void;
	signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [signedIn, setSignedIn] = useState<boolean>(() => {
		const storedAccessToken = localStorage.getItem("accessToken");
		return !!storedAccessToken;
	});

	const queryClient = useQueryClient();

	const { isError, isFetching, isSuccess } = useQuery({
		queryKey: ["users", "me"],
		queryFn: () => authService.me(),
		enabled: signedIn,
		staleTime: Number.POSITIVE_INFINITY,
	});

	const signin = useCallback((accessToken: string) => {
		localStorage.setItem("accessToken", accessToken);
		setSignedIn(true);
	}, []);

	const signout = useCallback(() => {
		localStorage.removeItem("accessToken");
		// Remove the query from cache when signing out
		queryClient.removeQueries({ queryKey: ["users", "me"] });
		setSignedIn(false);
	}, [queryClient]);

	useEffect(() => {
		if (isError) {
			toast.error(isError.valueOf);
			console.error("Authentication error");
			signout();
		}
	}, [isError, signout]);

	return (
		<AuthContext.Provider
			value={{
				signedIn: isSuccess && signedIn,
				signin,
				signout,
			}}
		>
			{!isFetching && children}
		</AuthContext.Provider>
	);
}
