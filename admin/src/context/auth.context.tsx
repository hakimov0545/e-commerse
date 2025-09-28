// src/context/AuthContext.tsx
import {
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";
import {
	useLoginMutation,
	useLogoutMutation,
	useRefreshMutation,
} from "../services/auth.api";
import type { ReactNode } from "react";
import type { IUser } from "@/types";
import type IAuthResponse from "@/types";
import type ILoginRequest from "@/types";

interface AuthContextType {
	user: IUser | null;
	accessToken: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(
		null
	);
	const [loading, setLoading] = useState(true);

	const [loginMutation] = useLoginMutation();
	const [logoutMutation] = useLogoutMutation();
	const [refreshMutation] = useRefreshMutation();

	useEffect(() => {
		// Restore user and accessToken from localStorage on mount
		const storedUser = localStorage.getItem("user");
		const storedAccessToken = localStorage.getItem("accessToken");
		if (storedUser) setUser(JSON.parse(storedUser));
		if (storedAccessToken) setAccessToken(storedAccessToken);

		const refreshToken = localStorage.getItem("refreshToken");
		if (refreshToken) {
			refreshMutation({ refreshToken })
				.unwrap()
				.then((data: IAuthResponse) => {
					setAccessToken(data.accessToken);
					setUser(data.user);
					localStorage.setItem(
						"refreshToken",
						data.refreshToken
					);
					localStorage.setItem(
						"user",
						JSON.stringify(data.user)
					);
					localStorage.setItem(
						"accessToken",
						data.accessToken
					);
				})
				.catch(() => {
					localStorage.removeItem("refreshToken");
					// Do not remove user and accessToken, keep persistent login
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, [refreshMutation]);

	const login = async (email: string, password: string) => {
		const res = await loginMutation({
			email,
			password,
		} as ILoginRequest).unwrap();
		setUser(res.user as IUser);
		setAccessToken(res.accessToken);
		localStorage.setItem("refreshToken", res.refreshToken);
		localStorage.setItem("user", JSON.stringify(res.user));
		localStorage.setItem("accessToken", res.accessToken);
	};

	const logout = async () => {
		await logoutMutation().unwrap();
		setUser(null);
		setAccessToken(null);
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("user");
		localStorage.removeItem("accessToken");
	};

	return (
		<AuthContext.Provider
			value={{ user, accessToken, login, logout, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx)
		throw new Error("useAuth must be used within AuthProvider");
	return ctx;
};

export default AuthProvider;
