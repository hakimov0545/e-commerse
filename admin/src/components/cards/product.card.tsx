import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { API_URL } from "@/constants";
import type { IProduct } from "@/types";

interface ProductCardProps {
	product: IProduct;
	className?: string;
}

export function ProductCard({
	product,
	className,
}: ProductCardProps) {
	const [isLiked, setIsLiked] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handleImageChange = (index: number) => {
		setCurrentImageIndex(index);
	};

	return (
		<Card
			className={cn(
				"group relative overflow-hidden bg-card border-0 shadow-sm hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2",
				className
			)}
		>
			{/* Image Container */}
			<div className="relative aspect-4/3 overflow-hidden bg-muted">
				<div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

				{product.images.length > 0 ? (
					<>
						<img
							src={
								`${API_URL}/${product.images[currentImageIndex]}` ||
								"/placeholder.svg?height=300&width=400&query=product"
							}
							alt={product.name}
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						/>

						{/* Image Indicators */}
						{product.images.length > 1 && (
							<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								{product.images.map((_, index) => (
									<button
										key={index}
										onClick={() =>
											handleImageChange(index)
										}
										className={cn(
											"w-2 h-2 rounded-full transition-all duration-200",
											currentImageIndex ===
												index
												? "bg-white scale-125"
												: "bg-white/60 hover:bg-white/80"
										)}
									/>
								))}
							</div>
						)}
					</>
				) : (
					<div className="w-full h-full bg-muted flex items-center justify-center">
						<Eye className="w-12 h-12 text-muted-foreground/30" />
					</div>
				)}

				{/* Action Buttons */}
				<div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 z-20">
					<Button
						size="icon"
						variant="secondary"
						className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
						onClick={() => setIsLiked(!isLiked)}
					>
						<Heart
							className={cn(
								"w-4 h-4 transition-colors duration-200",
								isLiked
									? "fill-red-500 text-red-500"
									: "text-foreground"
							)}
						/>
					</Button>
					<Button
						size="icon"
						variant="secondary"
						className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
					>
						<Eye className="w-4 h-4 text-foreground" />
					</Button>
				</div>

				{/* Category Badge */}
				{/* <div className="absolute top-4 left-4 z-20">
					<Badge
						variant="secondary"
						className="bg-white/90 text-foreground backdrop-blur-sm font-medium"
					>
						{categoryName}
					</Badge>
				</div> */}
			</div>

			{/* Content */}
			<div className="p-6 space-y-4">
				<div className="space-y-2">
					<h3 className="font-semibold text-lg text-balance leading-tight group-hover:text-primary transition-colors duration-200">
						{product.name}
					</h3>
					<p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
						{product.description}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<p className="text-2xl font-bold text-primary">
							${product.price.toFixed(2)}
						</p>
					</div>

					<Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
						<ShoppingCart className="w-4 h-4 mr-2" />
						Add to Cart
					</Button>
				</div>
			</div>

			{/* Hover Glow Effect */}
			<div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
		</Card>
	);
}
