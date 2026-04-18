import { useAuth } from "@/context/auth.context";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({
	children,
}: {
	children: JSX.Element;
}) => {
	const { user } = useAuth();
	if (!user) return <Navigate to="/login" replace />;
	return children;
};
