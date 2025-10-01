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
import { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../ui/tooltip";
import { useCreateProductMutation } from "@/services/product.api";
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

function AddProductModal() {
	const [open, setOpen] = useState(false);
	const [create] = useCreateProductMutation();
	const filterValues = useEditFilteredFormValues();

	const {
		data: categories,
		isLoading,
		error,
	} = useGetAllCategoriesQuery();

	const formSchema = z.object({
		name: z.string().min(2, {
			message: "Product name must be at least 2 characters.",
		}),
		description: z.string().min(3, {
			message:
				"Product description must be at least 2 characters.",
		}),
		price: z.string(),
		category: z.string(),
		images: z.any(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			price: "",
			category: "",
			images: [],
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const filtered = filterValues(values);
		// Type guard for images
		const isFileList = (v: any): v is FileList =>
			v &&
			typeof v === "object" &&
			typeof v.length === "number" &&
			typeof v.item === "function";

		// Debug: log images value
		console.log("images value:", filtered.images);

		// Only send FormData if images is a valid FileList and has files
		if (
			isFileList(filtered.images) &&
			filtered.images.length > 0
		) {
			const formData = new FormData();
			Object.entries(filtered).forEach(([key, value]) => {
				if (key === "images" && isFileList(value)) {
					Array.from(value as FileList).forEach(
						(file: File) => {
							formData.append("images", file);
						}
					);
				} else {
					formData.append(key, value as string);
				}
			});
			create(formData);
		} else {
			// Always send JSON if images is not a valid FileList or is empty
			const { images, ...jsonData } = filtered;
			create(jsonData);
		}
		setOpen(false);
	}

	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (error) {
		console.log(error);
		return <p>Error fetching categories</p>;
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
					<p>Create Product</p>
				</TooltipContent>
			</Tooltip>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Product</DialogTitle>
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
							<FormField
								control={form.control}
								name="images"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Images</FormLabel>
										<FormControl>
											<Input
												type="file"
												multiple
												accept="image/*"
												onChange={(e) =>
													field.onChange(
														e.target.files
													)
												}
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

export default AddProductModal;
