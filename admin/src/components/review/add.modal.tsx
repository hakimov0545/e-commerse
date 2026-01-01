import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateReviewMutation } from "@/services/review.api";
import { useGetAllProductsPopulatedQuery } from "@/services/product.api";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const formSchema = z.object({
	product: z.string().min(1, { message: "Product is required" }),
	rating: z
		.number()
		.int()
		.min(1, { message: "Rating must be at least 1" })
		.max(5, { message: "Rating must be at most 5" }),
	comment: z
		.string()
		.min(1, { message: "Comment is required" })
		.max(1000, {
			message: "Comment cannot exceed 1000 characters",
		}),
});

function AddReviewModal() {
	const [open, setOpen] = useState(false);
	const [create] = useCreateReviewMutation();
	const { data: products } = useGetAllProductsPopulatedQuery();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			product: "",
			rating: 5,
			comment: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await create(values).unwrap();
			form.reset();
			setOpen(false);
		} catch (error) {
			console.error("Failed to create review:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Plus />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Review</DialogTitle>
				</DialogHeader>

				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="product"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={
													field.onChange
												}
											>
												<SelectTrigger className="w-45">
													<SelectValue placeholder="Select a product" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>
															Products
														</SelectLabel>
														{products?.map(
															(c) => (
																<SelectItem
																	key={
																		c._id
																	}
																	value={
																		c._id
																	}
																>
																	{
																		c.name
																	}
																</SelectItem>
															)
														)}
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="rating"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Rating</FormLabel>
										<FormControl>
											<Input
												type="number"
												min={1}
												max={5}
												{...field}
												onChange={(e) =>
													field.onChange(
														Number(
															e.target
																.value
														)
													)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="comment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Comment</FormLabel>
										<FormControl>
											<Input
												placeholder="Comment"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default AddReviewModal;
