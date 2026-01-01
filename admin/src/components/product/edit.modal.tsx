import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
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
import { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../ui/tooltip";
import { useUpdateProductMutation } from "@/services/product.api";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useGetAllCategoriesQuery } from "@/services/category.api";
import { useEditFilteredFormValues } from "@/hooks/useFilteredFormValues";

function EditProductModal({ id }: { id: string }) {
	const [open, setOpen] = useState(false);
	const [update] = useUpdateProductMutation();
	const filterValues = useEditFilteredFormValues(); // ✅ Component body'sida chaqirish
	const {
		data: categories,
		isLoading,
		error,
	} = useGetAllCategoriesQuery();

	const formSchema = z.object({
		name: z.string(),
		description: z.string(),
		price: z.string(),
		category: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			price: "",
			category: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const filtered = filterValues(values);
		update({ id, data: filtered });
		setOpen(false);
	}

	if (isLoading) return <p>Loading...</p>;

	if (error) {
		console.log(error);
		throw new Error("Error");
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Tooltip>
				<TooltipTrigger asChild>
					<DialogTrigger asChild>
						<Button variant="outline">
							<SquarePen />
						</Button>
					</DialogTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>Edit Product</p>
				</TooltipContent>
			</Tooltip>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Product</DialogTitle>
				</DialogHeader>
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Product name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Description
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Product description"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Product price"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Category
										</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={
													field.onChange
												}
											>
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>
															Categories
														</SelectLabel>
														{categories?.map(
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
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default EditProductModal;
