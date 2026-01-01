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
	useClearWishlistMutation,
	useGetWishlistQuery,
	useRemoveFromWishlistMutation,
} from "@/services/wishlist.api";
import { API_URL } from "@/constants";
import { Trash2, HeartOff } from "lucide-react";
import type { IPopulatedProduct } from "@/types";

function WishlistPage() {
	const {
		data: wishlist,
		isLoading,
		error,
	} = useGetWishlistQuery();
	const [removeFromWishlist] = useRemoveFromWishlistMutation();
	const [clearWishlist] = useClearWishlistMutation();

	if (isLoading) return <p>Loading...</p>;
	if (error) {
		console.error(error);
		throw new Error("Error loading wishlist");
	}

	const handleRemove = (productId: string) => {
		if (
			window.confirm(
				"Are you sure you want to remove this product from wishlist?"
			)
		) {
			removeFromWishlist(productId);
		}
	};

	const handleClear = () => {
		if (
			window.confirm(
				"Are you sure you want to clear all items from wishlist?"
			)
		) {
			clearWishlist();
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-xl font-bold">Wishlist</h1>
				{wishlist && wishlist.length > 0 && (
					<Button
						variant="destructive"
						onClick={handleClear}
					>
						<HeartOff className="h-4 w-4 mr-2" />
						Clear Wishlist
					</Button>
				)}
			</div>

			{wishlist && wishlist.length === 0 ? (
				<div className="text-center py-20">
					<HeartOff className="h-16 w-16 mx-auto text-gray-400 mb-4" />
					<p className="text-gray-500 text-lg">
						Your wishlist is empty
					</p>
					<p className="text-gray-400 text-sm mt-2">
						Add products to your wishlist to see them here
					</p>
				</div>
			) : (
				<Table>
					<TableCaption>
						Wishlist ({wishlist?.length || 0} items)
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-25">N</TableHead>
							<TableHead>Product</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Images</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{wishlist?.map(
							(
								product: IPopulatedProduct,
								idx: number
							) => (
								<TableRow key={product._id}>
									<TableCell className="font-medium">
										{idx + 1}
									</TableCell>
									<TableCell className="font-semibold">
										{product.name}
									</TableCell>
									<TableCell>
										{typeof product.category ===
											"object" &&
										product.category !== null
											? product.category.name
											: product.category || "-"}
									</TableCell>
									<TableCell className="font-semibold text-green-600">
										${product.price}
									</TableCell>
									<TableCell className="max-w-md truncate">
										{product.description || "-"}
									</TableCell>
									<TableCell>
										<div className="flex gap-2">
											{product.images &&
											product.images.length >
												0 ? (
												product.images
													.slice(0, 3)
													.map(
														(
															img,
															imgIdx
														) => (
															<img
																key={
																	imgIdx
																}
																className="w-17.5 h-17.5 object-cover rounded"
																src={`${API_URL}/${img}`}
																alt={
																	product.name
																}
															/>
														)
													)
											) : (
												<span className="text-gray-400">
													No images
												</span>
											)}
										</div>
									</TableCell>
									<TableCell>
										<Button
											variant="trash"
											onClick={() =>
												handleRemove(
													product._id
												)
											}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							)
						)}
					</TableBody>
				</Table>
			)}
		</div>
	);
}

export default WishlistPage;
