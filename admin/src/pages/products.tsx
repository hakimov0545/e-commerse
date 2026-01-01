import AddProductModal from "@/components/product/add.modal";
import EditProductModal from "@/components/product/edit.modal";
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
import { API_URL } from "@/constants";
import {
	useDeleteProductMutation,
	useGetAllProductsPopulatedQuery,
} from "@/services/product.api";
import { Trash2 } from "lucide-react";

function ProductsPage() {
	const [deleteProduct] = useDeleteProductMutation();
	const {
		data: products,
		isLoading,
		error,
	} = useGetAllProductsPopulatedQuery();

	if (isLoading) return <p>Loading...</p>;

	if (error) {
		console.log(error);
		throw new Error("Error");
	}

	return (
		<div className="p-6">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-bold mb-5">Products</h1>
				<AddProductModal />
			</div>
			<Table>
				<TableCaption>Products</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">N</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Images</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products?.map((p, idx) => (
						<TableRow key={p._id}>
							<TableCell className="font-medium">
								{idx + 1}
							</TableCell>
							<TableCell>{p.name}</TableCell>
							<TableCell>{p.description}</TableCell>
							<TableCell>{p.price}</TableCell>
							<TableCell>{p.category?.name}</TableCell>
							<TableCell>
								<div className="flex gap-2">
									{p.images.map((i) => (
										<img
											className="w-[70px]"
											src={`${API_URL}/${i}`}
											alt=""
										/>
									))}
								</div>
							</TableCell>
							<TableCell className="flex gap-2">
								<EditProductModal id={p._id} />
								<Button
									variant="trash"
									onClick={() => {
										deleteProduct(p._id);
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

export default ProductsPage;
