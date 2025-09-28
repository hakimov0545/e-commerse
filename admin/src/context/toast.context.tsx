import { createContext, useContext } from "react";

export type ToastType = "error" | "success" | "info";

export interface Toast {
	type: ToastType;
	message: string;
}

export interface ToastContextType {
	showToast: (toast: Toast) => void;
}

export const ToastContext = createContext<
	ToastContextType | undefined
>(undefined);

export const useToast = () => {
	const ctx = useContext(ToastContext);
	if (!ctx)
		throw new Error("useToast must be used within ToastProvider");
	return ctx;
};
