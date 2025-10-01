import AddCategoryModal from "@/components/category/add.modal";
import EditCategoryModal from "@/components/category/edit.modal";
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
	useDeleteCategoryMutation,
	useGetAllCategoriesQuery,
} from "@/services/category.api";
import { Trash2 } from "lucide-react";

function CategoriesPage() {
	const [deleteCategory] = useDeleteCategoryMutation();
	const {
		data: categories,
		isLoading,
		error,
	} = useGetAllCategoriesQuery();

	if (isLoading) return <p>Loading...</p>;

	if (error) {
		console.log(error);
		throw new Error("Error");
	}

	return (
		<div className="p-6">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-bold mb-5">Categories</h1>
				<AddCategoryModal />
			</div>
			<Table>
				<TableCaption>Categories</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">N</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{categories?.map((c, idx) => (
						<TableRow key={c._id}>
							<TableCell className="font-medium">
								{idx + 1}
							</TableCell>
							<TableCell>{c.name}</TableCell>
							<TableCell>{c.description}</TableCell>
							<TableCell className="flex gap-2">
								<EditCategoryModal id={c._id} />
								<Button
									variant="trash"
									onClick={() => {
										deleteCategory(c._id);
									}}
								>
									<Trash2 />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default CategoriesPage;
