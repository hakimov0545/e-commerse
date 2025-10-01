import { useCallback } from "react";

/**
 * useFilteredFormValues - filter out empty string fields and convert price to number
 * @returns {function} - (values: Record<string, any>) => Record<string, any>
 */
export function useEditFilteredFormValues(): Function {
	return useCallback((values: Record<string, any>) => {
		const filtered: { [k: string]: any } = Object.fromEntries(
			Object.entries(values).filter(([key, value]) => {
				if (typeof value === "string")
					return value.trim() !== "";
				if (key === "price")
					return value !== "" && value !== 0;
				return true;
			})
		);
		if (filtered.price !== undefined) {
			filtered.price = Number(filtered.price);
		}
		return filtered;
	}, []);
}
