import AddReviewModal from "@/components/review/add.modal";
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
	useDeleteReviewMutation,
	useGetAllReviewsQuery,
} from "@/services/review.api";
import { Trash2 } from "lucide-react";
import type { IReview } from "@/types";

function ReviewsPage() {
	const {
		data: reviews,
		isLoading,
		error,
	} = useGetAllReviewsQuery();
	const [deleteReview] = useDeleteReviewMutation();

	if (isLoading) return <p>Loading...</p>;
	if (error) {
		console.error(error);
		throw new Error("Error loading reviews");
	}

	const getProductName = (review: IReview) => {
		if (
			typeof review.product === "object" &&
			review.product !== null
		) {
			return review.product.name;
		}
		return "Unknown Product";
	};

	const getUserName = (review: IReview) => {
		if (typeof review.user === "object" && review.user !== null) {
			return `${review.user.name} ${review.user.lastname}`;
		}
		return "Unknown User";
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-xl font-bold">Reviews</h1>
				<AddReviewModal />
			</div>

			{reviews && reviews.length === 0 ? (
				<p className="text-center text-gray-500 mt-10">
					No reviews found
				</p>
			) : (
				<Table>
					<TableCaption>All Reviews</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">
								N
							</TableHead>
							<TableHead>Product</TableHead>
							<TableHead>User</TableHead>
							<TableHead>Rating</TableHead>
							<TableHead>Comment</TableHead>
							<TableHead>Created</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{reviews?.map((r, idx) => (
							<TableRow key={r._id}>
								<TableCell className="font-medium">
									{idx + 1}
								</TableCell>
								<TableCell>
									{getProductName(r)}
								</TableCell>
								<TableCell>
									{getUserName(r)}
								</TableCell>
								<TableCell>{r.rating}</TableCell>
								<TableCell className="max-w-md truncate">
									{r.comment}
								</TableCell>
								<TableCell>
									{new Date(
										r.createdAt
									).toLocaleString()}
								</TableCell>
								<TableCell>
									<Button
										variant="trash"
										onClick={() => {
											deleteReview(r._id);
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

export default ReviewsPage;
