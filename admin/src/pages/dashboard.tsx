import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetDashboardDataQuery } from "@/services/dashboard.api";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import {
	Users,
	ShoppingCart,
	Package,
	Star,
	DollarSign,
	Folder,
} from "lucide-react";

const COLORS = [
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#8884d8",
];

function Dashboard() {
	const [period, setPeriod] = useState("month");
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");

	const { data, isLoading, error } = useGetDashboardDataQuery({
		period,
		fromDate: fromDate || undefined,
		toDate: toDate || undefined,
	});

	if (isLoading) {
		return (
			<div className="p-6">
				<p>Loading dashboard data...</p>
			</div>
		);
	}

	if (error) {
		console.error(error);
		return (
			<div className="p-6">
				<p className="text-red-500">
					Error loading dashboard data
				</p>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="p-6">
				<p>No data available</p>
			</div>
		);
	}

	const {
		stats,
		revenueStats,
		orderStatusStats,
		revenueByDate,
		ordersByDate,
		topProducts,
		recentOrders,
		productsByCategory,
	} = data;

	const statCards = [
		{
			title: "Total Users",
			value: stats.totalUsers,
			icon: Users,
			color: "text-blue-600",
			bgColor: "bg-blue-100",
		},
		{
			title: "Total Products",
			value: stats.totalProducts,
			icon: Package,
			color: "text-green-600",
			bgColor: "bg-green-100",
		},
		{
			title: "Total Orders",
			value: stats.totalOrders,
			icon: ShoppingCart,
			color: "text-purple-600",
			bgColor: "bg-purple-100",
		},
		{
			title: "Total Reviews",
			value: stats.totalReviews,
			icon: Star,
			color: "text-yellow-600",
			bgColor: "bg-yellow-100",
		},
		{
			title: "Total Revenue",
			value: `$${stats.totalRevenue.toLocaleString()}`,
			icon: DollarSign,
			color: "text-emerald-600",
			bgColor: "bg-emerald-100",
		},
		{
			title: "Categories",
			value: stats.totalCategories,
			icon: Folder,
			color: "text-indigo-600",
			bgColor: "bg-indigo-100",
		},
	];

	return (
		<div className="p-6 space-y-6">
			{/* Header with Filters */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">Dashboard</h1>
					<p className="text-gray-500 mt-1">
						Overview of your e-commerce platform
					</p>
				</div>

				{/* Filters */}
				<div className="flex flex-wrap gap-4">
					<div className="flex flex-col gap-2">
						<Label htmlFor="period">Period</Label>
						<Select
							value={period}
							onValueChange={setPeriod}
						>
							<SelectTrigger
								id="period"
								className="w-[140px]"
							>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="day">
									Today
								</SelectItem>
								<SelectItem value="week">
									Last Week
								</SelectItem>
								<SelectItem value="month">
									Last Month
								</SelectItem>
								<SelectItem value="year">
									Last Year
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="fromDate">From Date</Label>
						<Input
							id="fromDate"
							type="date"
							value={fromDate}
							onChange={(e) =>
								setFromDate(e.target.value)
							}
							className="w-[160px]"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="toDate">To Date</Label>
						<Input
							id="toDate"
							type="date"
							value={toDate}
							onChange={(e) =>
								setToDate(e.target.value)
							}
							className="w-[160px]"
						/>
					</div>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
				{statCards.map((stat) => (
					<Card key={stat.title}>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-600">
								{stat.title}
							</CardTitle>
							<div
								className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}
							>
								<stat.icon className="h-4 w-4" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stat.value}
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Revenue Stats */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Revenue Overview</CardTitle>
						<CardDescription>
							Revenue for the selected period
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-600">
									Total Revenue
								</span>
								<span className="text-2xl font-bold text-green-600">
									$
									{revenueStats.revenue.toLocaleString()}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-600">
									Total Orders
								</span>
								<span className="text-xl font-semibold">
									{revenueStats.orders}
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-gray-600">
									Average Order Value
								</span>
								<span className="text-lg font-medium">
									$
									{revenueStats.orders > 0
										? (
												revenueStats.revenue /
												revenueStats.orders
										  ).toFixed(2)
										: "0.00"}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Order Status</CardTitle>
						<CardDescription>
							Distribution of orders by status
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{orderStatusStats.map((stat) => (
								<div
									key={stat.status}
									className="flex justify-between items-center"
								>
									<span className="text-sm capitalize">
										{stat.status}
									</span>
									<div className="flex items-center gap-4">
										<span className="text-sm font-medium">
											{stat.count} orders
										</span>
										<span className="text-sm text-gray-600">
											$
											{stat.totalAmount.toLocaleString()}
										</span>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Row 1 */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{/* Revenue Chart */}
				<Card>
					<CardHeader>
						<CardTitle>Revenue Over Time</CardTitle>
						<CardDescription>
							Daily revenue for the selected period
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer
							width="100%"
							height={300}
						>
							<LineChart data={revenueByDate}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="date"
									tick={{ fontSize: 12 }}
								/>
								<YAxis tick={{ fontSize: 12 }} />
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="revenue"
									stroke="#0088FE"
									strokeWidth={2}
									name="Revenue ($)"
								/>
								<Line
									type="monotone"
									dataKey="orders"
									stroke="#00C49F"
									strokeWidth={2}
									name="Orders"
								/>
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Orders Chart */}
				<Card>
					<CardHeader>
						<CardTitle>Orders Over Time</CardTitle>
						<CardDescription>
							Daily order count for the selected period
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer
							width="100%"
							height={300}
						>
							<BarChart data={ordersByDate}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="date"
									tick={{ fontSize: 12 }}
								/>
								<YAxis tick={{ fontSize: 12 }} />
								<Tooltip />
								<Legend />
								<Bar
									dataKey="count"
									fill="#8884d8"
									name="Orders"
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Charts Row 2 */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{/* Products by Category */}
				<Card>
					<CardHeader>
						<CardTitle>Products by Category</CardTitle>
						<CardDescription>
							Distribution of products across categories
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer
							width="100%"
							height={300}
						>
							<PieChart>
								<Pie
									data={productsByCategory as any}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={(entry: any) => {
										const percent = entry.percent;
										const categoryName =
											entry.categoryName;
										return `${categoryName}: ${(
											(percent || 0) * 100
										).toFixed(0)}%`;
									}}
									outerRadius={80}
									fill="#8884d8"
									dataKey="count"
								>
									{productsByCategory.map(
										(_entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={
													COLORS[
														index %
															COLORS.length
													]
												}
											/>
										)
									)}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Top Products */}
				<Card>
					<CardHeader>
						<CardTitle>Top Selling Products</CardTitle>
						<CardDescription>
							Best performing products by quantity sold
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer
							width="100%"
							height={300}
						>
							<BarChart
								data={topProducts}
								layout="vertical"
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis type="number" />
								<YAxis
									dataKey="productName"
									type="category"
									width={120}
									tick={{ fontSize: 11 }}
								/>
								<Tooltip />
								<Legend />
								<Bar
									dataKey="totalQuantity"
									fill="#00C49F"
									name="Quantity Sold"
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Recent Orders Table */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Orders</CardTitle>
					<CardDescription>
						Latest orders from your store
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b">
									<th className="text-left p-2">
										Order ID
									</th>
									<th className="text-left p-2">
										User
									</th>
									<th className="text-left p-2">
										Status
									</th>
									<th className="text-left p-2">
										Total
									</th>
									<th className="text-left p-2">
										Date
									</th>
								</tr>
							</thead>
							<tbody>
								{recentOrders
									.slice(0, 10)
									.map((order: any) => (
										<tr
											key={order._id}
											className="border-b hover:bg-gray-50"
										>
											<td className="p-2 font-mono text-xs">
												{order._id.slice(-8)}
											</td>
											<td className="p-2">
												{typeof order.user ===
												"object"
													? order.user.name
													: "Unknown"}
											</td>
											<td className="p-2">
												<span
													className={`px-2 py-1 rounded text-xs capitalize ${
														order.status ===
														"delivered"
															? "bg-green-100 text-green-800"
															: order.status ===
															  "pending"
															? "bg-yellow-100 text-yellow-800"
															: order.status ===
															  "cancelled"
															? "bg-red-100 text-red-800"
															: "bg-blue-100 text-blue-800"
													}`}
												>
													{order.status}
												</span>
											</td>
											<td className="p-2 font-semibold">
												$
												{order.totalAmount.toLocaleString()}
											</td>
											<td className="p-2 text-gray-600">
												{new Date(
													order.createdAt
												).toLocaleDateString()}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default Dashboard;
