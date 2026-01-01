import AddOrderModal from "@/components/order/add.modal";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	useGetAllOrdersQuery,
	useUpdateOrderStatusMutation,
	useDeleteOrderMutation,
} from "@/services/order.api";
import { Trash2, Filter, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import * as XLSX from "xlsx";
import type { IOrder } from "@/types";

function OrdersPage() {
	const getTodayDate = () => {
		const today = new Date();
		return today.toISOString().split("T")[0];
	};

	const [fromDate, setFromDate] = useState(getTodayDate());
	const [toDate, setToDate] = useState(getTodayDate());
	const [appliedFromDate, setAppliedFromDate] = useState(
		getTodayDate()
	);
	const [appliedToDate, setAppliedToDate] = useState(
		getTodayDate()
	);
	const [status, setStatus] = useState("");
	const [appliedStatus, setAppliedStatus] = useState("");
	const [filterOpen, setFilterOpen] = useState(false);

	const {
		data: orders,
		isLoading,
		error,
	} = useGetAllOrdersQuery(
		{
			fromDate: appliedFromDate,
			toDate: appliedToDate,
			status: appliedStatus || undefined,
		},
		{ skip: false }
	);
	const [updateStatus] = useUpdateOrderStatusMutation();
	const [deleteOrder] = useDeleteOrderMutation();

	const exportToExcel = () => {
		if (!orders || orders.length === 0) return;

		const data = orders.map((o) => ({
			OrderId: o._id,
			User: o.user?.name || o.user || "-",
			Email: o.user?.email || "-",
			Products: o.products
				.map(
					(p: any) =>
						`${p.product?.name || p.product} (x${
							p.quantity
						})`
				)
				.join("; "),
			Address: o.address || "-",
			Total: o.totalAmount ?? 0,
			Status: o.status,
			Date: new Date(o.createdAt).toLocaleString(),
		}));

		const ws = XLSX.utils.json_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Orders");
		const filename = `orders_${new Date().toLocaleString()}.xlsx`;
		XLSX.writeFile(wb, filename);
	};

	const handleApplyFilter = () => {
		setAppliedFromDate(fromDate);
		setAppliedToDate(toDate);
		setAppliedStatus(status);
		setFilterOpen(false);
	};

	if (isLoading) return <p>Loading...</p>;

	if (error) {
		console.log(error);
		throw new Error("Error");
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "shipped":
				return "bg-blue-100 text-blue-800";
			case "delivered":
				return "bg-green-100 text-green-800";
			case "cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const grandTotal =
		orders?.reduce(
			(sum: number, order: IOrder) =>
				sum + (order.totalAmount || 0),
			0
		) || 0;

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-xl font-bold">Orders</h1>
				<div className="flex gap-2">
					<Dialog
						open={filterOpen}
						onOpenChange={setFilterOpen}
					>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								className="gap-2"
							>
								<Filter className="w-4 h-4" />
								Today
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Filter Orders by Date
								</DialogTitle>
							</DialogHeader>
							<div className="space-y-4">
								<div>
									<label className="text-sm font-medium mb-2 block">
										From Date
									</label>
									<Input
										type="date"
										value={fromDate}
										onChange={(e) =>
											setFromDate(
												e.target.value
											)
										}
										className="w-full"
									/>
								</div>
								<div>
									<label className="text-sm font-medium mb-2 block">
										To Date
									</label>
									<Input
										type="date"
										value={toDate}
										onChange={(e) =>
											setToDate(e.target.value)
										}
										className="w-full"
									/>
								</div>
								<div>
									<label className="text-sm font-medium mb-2 block">
										Status
									</label>
									<Select
										value={status || "all"}
										onValueChange={(val) =>
											setStatus(
												val === "all"
													? ""
													: val
											)
										}
									>
										<SelectTrigger className="w-full">
											<span>
												{status
													? status
															.charAt(0)
															.toUpperCase() +
													  status.slice(1)
													: "All Statuses"}
											</span>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">
												All Statuses
											</SelectItem>
											<SelectItem value="pending">
												Pending
											</SelectItem>
											<SelectItem value="shipped">
												Shipped
											</SelectItem>
											<SelectItem value="delivered">
												Delivered
											</SelectItem>
											<SelectItem value="cancelled">
												Cancelled
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex gap-2">
									<Button
										variant="outline"
										onClick={() => {
											setFromDate(
												getTodayDate()
											);
											setToDate(getTodayDate());
										}}
									>
										Today
									</Button>
									<Button
										variant="outline"
										onClick={() => {
											setFromDate("");
											setToDate("");
										}}
									>
										All
									</Button>
									<Button
										onClick={handleApplyFilter}
										className="flex-1"
									>
										Apply
									</Button>
								</div>
							</div>
						</DialogContent>
					</Dialog>
					<Button
						variant="outline"
						onClick={exportToExcel}
						className="gap-2"
					>
						<Download className="w-4 h-4" />
						Export
					</Button>
					<AddOrderModal />
				</div>
			</div>

			<Table>
				<TableCaption>All Orders</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[50px]">N</TableHead>
						<TableHead>User</TableHead>
						<TableHead>Products</TableHead>
						<TableHead>Address</TableHead>
						<TableHead>Total</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Date</TableHead>
						<TableHead className="text-right">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders?.map((order: IOrder, idx: number) => (
						<TableRow key={order._id}>
							<TableCell className="font-medium">
								{idx + 1}
							</TableCell>
							<TableCell className="text-sm">
								{order.user.name}
							</TableCell>
							<TableCell>
								<div className="space-y-1">
									{order.products.map(
										(p: any, i: number) => (
											<div
												key={i}
												className="text-sm"
											>
												{p.product.name} (qty:{" "}
												{p.quantity})
											</div>
										)
									)}
								</div>
							</TableCell>
							<TableCell className="text-sm">
								{order.address || "-"}
							</TableCell>
							<TableCell className="text-sm">
								{order.totalAmount}
							</TableCell>
							<TableCell>
								<Select
									defaultValue={order.status}
									onValueChange={(value) =>
										updateStatus({
											id: order._id,
											data: {
												status: value as any,
											},
										})
									}
								>
									<SelectTrigger className="w-[130px]">
										<Badge
											className={getStatusColor(
												order.status
											)}
										>
											{order.status}
										</Badge>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="pending">
											Pending
										</SelectItem>
										<SelectItem value="shipped">
											Shipped
										</SelectItem>
										<SelectItem value="delivered">
											Delivered
										</SelectItem>
										<SelectItem value="cancelled">
											Cancelled
										</SelectItem>
									</SelectContent>
								</Select>
							</TableCell>
							<TableCell className="text-sm">
								{new Date(
									order.createdAt
								).toLocaleDateString()}
							</TableCell>
							<TableCell className="text-right">
								<Button
									variant="trash"
									onClick={() => {
										if (
											window.confirm(
												"Are you sure you want to delete this order?"
											)
										) {
											deleteOrder(order._id);
										}
									}}
								>
									<Trash2 />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="mt-6 flex justify-end">
				<div className="bg-gray-100 rounded-lg p-4 min-w-[250px]">
					<div className="flex justify-between items-center">
						<span className="text-lg font-semibold mr-2">
							Grand Total:
						</span>
						<span className="text-xl font-bold text-green-600">
							${grandTotal.toFixed(2)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrdersPage;
