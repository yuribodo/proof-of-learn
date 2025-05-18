import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";

export function useUser() {
	return useQuery({
		queryKey: ["users", "me"],
		queryFn: () => authService.me(),
		enabled: !!localStorage.getItem("accessToken"),
		staleTime: 1000 * 60 * 5,
	});
}
