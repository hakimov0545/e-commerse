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
import { Badge } from "@/components/ui/badge";
import {
	useDeleteUserMutation,
	useGetAllUsersQuery,
} from "@/services/user.api";
import { Trash2 } from "lucide-react";
import type { IUser } from "@/types";

function UsersPage() {
	const {
		data: users,
		isLoading,
		error,
	} = useGetAllUsersQuery();
	const [deleteUser] = useDeleteUserMutation();

	if (isLoading) return <p>Loading...</p>;
	if (error) {
		console.error(error);
		throw new Error("Error loading users");
	}

	const getRoleBadgeColor = (role: string) => {
		return role === "admin"
			? "bg-purple-500 text-white"
			: "bg-blue-500 text-white";
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-xl font-bold">Users</h1>
			</div>

			{users && users.length === 0 ? (
				<p className="text-center text-gray-500 mt-10">
					No users found
				</p>
			) : (
				<Table>
					<TableCaption>All Users</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">
								N
							</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Address</TableHead>
							<TableHead>Created</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users?.map((user: IUser, idx: number) => (
							<TableRow key={user._id}>
								<TableCell className="font-medium">
									{idx + 1}
								</TableCell>
								<TableCell>
									{user.name} {user.lastname}
								</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									<Badge
										className={getRoleBadgeColor(
											user.role
										)}
									>
										{user.role}
									</Badge>
								</TableCell>
								<TableCell>
									{user.phone || "-"}
								</TableCell>
								<TableCell className="max-w-md truncate">
									{user.address || "-"}
								</TableCell>
								<TableCell>
									{new Date(
										user.createdAt
									).toLocaleDateString()}
								</TableCell>
								<TableCell>
									<Button
										variant="trash"
										onClick={() => {
											if (
												window.confirm(
													`Are you sure you want to delete user ${user.name} ${user.lastname}?`
												)
											) {
												deleteUser(user._id);
											}
										}}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
}

export default UsersPage;
