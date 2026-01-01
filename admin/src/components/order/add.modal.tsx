import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { useCreateOrderMutation } from "@/services/order.api";
import { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../ui/tooltip";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useGetAllProductsPopulatedQuery } from "@/services/product.api";
import { X } from "lucide-react";

function AddOrderModal() {
	const [open, setOpen] = useState(false);
	const [create] = useCreateOrderMutation();
	const {
		data: products,
		isLoading,
		error,
	} = useGetAllProductsPopulatedQuery();

	const formSchema = z.object({
		items: z
			.array(
				z.object({
					product: z.string().min(1, "Product is required"),
					quantity: z
						.number()
						.min(1, "Quantity must be at least 1"),
				})
			)
			.min(1, "At least one product is required"),
		address: z
			.string()
			.min(5, "Address must be at least 5 characters"),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			items: [{ product: "", quantity: 1 }],
			address: "",
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "items",
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		create({
			address: values.address,
			products: values.items as any,
		});

		setOpen(false);
		form.reset();
	}

	const addProduct = () => {
		append({ product: "", quantity: 1 });
	};

	const removeProduct = (index: number) => {
		remove(index);
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (error) {
		console.log(error);
		return <p>Error fetching products</p>;
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Tooltip>
				<TooltipTrigger asChild>
					<DialogTrigger asChild>
						<Button variant="outline">
							<Plus />
						</Button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>Create Order</p>
				</TooltipContent>
			</Tooltip>

			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Create Order</DialogTitle>
				</DialogHeader>
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<FormLabel className="text-base font-semibold">
										Products
									</FormLabel>
									<Button
										type="button"
										size="sm"
										variant="outline"
										onClick={addProduct}
									>
										<Plus className="w-4 h-4 mr-1" />
										Add Product
									</Button>
								</div>

								{fields.map((field, index) => (
									<div
										key={field.id}
										className="space-y-3 p-4 border rounded-lg"
									>
										<FormField
											control={form.control}
											name={`items.${index}.product`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Product
													</FormLabel>
													<FormControl>
														<Select
															value={
																field.value
															}
															onValueChange={
																field.onChange
															}
														>
															<SelectTrigger>
																<SelectValue placeholder="Select a product" />
															</SelectTrigger>
															<SelectContent>
																<SelectGroup>
																	<SelectLabel>
																		Products
																	</SelectLabel>
																	{products?.map(
																		(
																			p
																		) => (
																			<SelectItem
																				key={
																					p._id
																				}
																				value={
																					p._id
																				}
																			>
																				{
																					p.name
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
											name={`items.${index}.quantity`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Quantity
													</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="Quantity"
															{...field}
															onChange={(
																e
															) =>
																field.onChange(
																	parseInt(
																		e
																			.target
																			.value
																	) ||
																		0
																)
															}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										{fields.length > 1 && (
											<Button
												type="button"
												size="sm"
												variant="destructive"
												onClick={() =>
													removeProduct(
														index
													)
												}
												className="w-full"
											>
												<X className="w-4 h-4 mr-1" />
												Remove
											</Button>
										)}
									</div>
								))}
							</div>

							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Delivery Address
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter delivery address"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full">
								Submit
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default AddOrderModal;
