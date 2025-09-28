import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/auth.context";
import { useToast } from "@/context/toast.context";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const { login, user, accessToken } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { showToast } = useToast();
	useEffect(() => {
		if (user && accessToken) {
			navigate("/dashboard");
		}
	}, [user, accessToken, navigate]);
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
		} catch (err: any) {
			let message =
				"Login failed. Please check your credentials.";
			if (err?.data?.message) message = err.data.message;
			else if (err?.message) message = err.message;
			showToast({ type: "error", message });
		}
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Login Card */}
				<Card className="border-border/50 shadow-lg">
					<CardHeader className="space-y-1 pb-6">
						<CardTitle className="text-2xl font-semibold text-center">
							Sign in
						</CardTitle>
						<CardDescription className="text-center text-muted-foreground">
							Enter your credentials to access your
							account
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form
							onSubmit={handleSubmit}
							className="space-y-6"
						>
							{/* Email Field */}
							<div className="space-y-2">
								<Label
									htmlFor="email"
									className="text-sm font-medium text-foreground"
								>
									Email address
								</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										) => setEmail(e.target.value)}
										className="pl-10 h-12 bg-card border-border/50 focus:border-primary transition-colors"
										required
									/>
								</div>
							</div>

							{/* Password Field */}
							<div className="space-y-2">
								<Label
									htmlFor="password"
									className="text-sm font-medium text-foreground"
								>
									Password
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										id="password"
										type={
											showPassword
												? "text"
												: "password"
										}
										placeholder="Enter your password"
										value={password}
										onChange={(
											e: React.ChangeEvent<HTMLInputElement>
										) =>
											setPassword(
												e.target.value
											)
										}
										className="pl-10 pr-10 h-12 bg-card border-border/50 focus:border-primary transition-colors"
										required
									/>
									<button
										type="button"
										onClick={() =>
											setShowPassword(
												!showPassword
											)
										}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
							</div>

							{/* Forgot Password */}
							<div className="flex justify-end">
								<button
									type="button"
									className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
								>
									Forgot password?
								</button>
							</div>

							{/* Submit Button */}
							<Button
								type="submit"
								className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
							>
								Sign in
							</Button>
						</form>
					</CardContent>
				</Card>
				<div className="text-center mt-8">
					<p className="text-xs text-muted-foreground">
						By signing in, you agree to our{" "}
						<button className="text-primary hover:text-primary/80 transition-colors">
							Terms of Service
						</button>{" "}
						and{" "}
						<button className="text-primary hover:text-primary/80 transition-colors">
							Privacy Policy
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
