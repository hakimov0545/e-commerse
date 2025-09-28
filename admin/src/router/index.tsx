import { AppSidebar } from "@/components/app.sidebar";
import {
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import LoginPage from "@/pages/login";
import { Outlet, useRoutes } from "react-router-dom";
import { ProtectedRoute } from "./protected.route";
import { AdminRoute } from "./admin.route";
import Dashboard from "@/pages/dashboard";
import { useAuth } from "@/context/auth.context";
import { Button } from "@/components/ui/button";
import OrdersPage from "@/pages/orders";
import CategoriesPage from "@/pages/categories";
import ProductsPage from "@/pages/products";
import ReviewsPage from "@/pages/reviews";
import UsersPage from "@/pages/users";
import WishlistPage from "@/pages/wishlist";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

function Router() {
	const { logout } = useAuth();
	const routes = [
		{
			path: "/login",
			element: <LoginPage />,
		},
		{
			element: (
				<SidebarProvider>
					<AppSidebar />
					<main className="min-h-screen w-full">
						<div className="flex justify-between items-center p-4 border-b border-border/50 w-full shadow-2xs bg-gray-50">
							<SidebarTrigger />
							<Tooltip>
								<TooltipTrigger>
									<Button
										onClick={logout}
										variant="outline"
									>
										<LogOut />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Logout</p>
								</TooltipContent>
							</Tooltip>
						</div>

						<ProtectedRoute>
							<AdminRoute>
								<Card className="m-4 p-4 bg-accent">
									<Outlet />
								</Card>
							</AdminRoute>
						</ProtectedRoute>
					</main>
				</SidebarProvider>
			),
			children: [
				{
					path: "/dashboard",
					element: <Dashboard />,
				},
				{
					path: "/orders",
					element: <OrdersPage />,
				},
				{
					path: "/categories",
					element: <CategoriesPage />,
				},
				{
					path: "/products",
					element: <ProductsPage />,
				},
				{
					path: "/reviews",
					element: <ReviewsPage />,
				},
				{
					path: "/users",
					element: <UsersPage />,
				},
				{
					path: "/wishlist",
					element: <WishlistPage />,
				},
			],
		},
	];

	const element = useRoutes(routes);
	return element;
}

export default Router;
