import {
	Home,
	Inbox,
	Users,
	ShoppingCart,
	SquarePen,
	ChartColumnStacked,
	Heart,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Categories",
		url: "/categories",
		icon: ChartColumnStacked,
	},
	{
		title: "Products",
		url: "/products",
		icon: Inbox,
	},
	{
		title: "Orders",
		url: "/orders",
		icon: ShoppingCart,
	},
	{
		title: "Reviews",
		url: "/reviews",
		icon: SquarePen,
	},
	{
		title: "Users",
		url: "/users",
		icon: Users,
	},
	{
		title: "Wishlist",
		url: "/wishlist",
		icon: Heart,
	},
];

export function AppSidebar() {
	const location = useLocation();
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Pages</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => {
								const selected =
									location.pathname === item.url;
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											className={
												selected
													? "bg-primary text-white font-semibold shadow-md hover:bg-primary/90 hover:text-white"
													: ""
											}
										>
											<a href={item.url}>
												<item.icon />
												<span>
													{item.title}
												</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
