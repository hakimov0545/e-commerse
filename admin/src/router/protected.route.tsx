import { useAuth } from "@/context/auth.context";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
	children,
}: {
	children: JSX.Element;
}) => {
	const { user, accessToken, loading } = useAuth();
	if (loading) return <div>Loading...</div>;
	if (!user || !accessToken)
		return <Navigate to="/login" replace />;
	return children;
};
