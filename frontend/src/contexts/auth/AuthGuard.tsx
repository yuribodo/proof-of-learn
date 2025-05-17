import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { AuthContext } from "./AuthProvider";

export function AuthGuard() {
	const { signedIn } = useContext(AuthContext);
	const { isFetching, isError } = useUser();

	if (isFetching) {
		return <div>Checking auth...</div>;
	}

	if (!signedIn || isError) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
