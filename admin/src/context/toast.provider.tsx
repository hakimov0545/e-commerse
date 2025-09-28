import React from "react";
import { ToastContext } from "./toast.context";
import type { Toast } from "./toast.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const showToast = (toastObj: Toast) => {
		if (toastObj.type === "error") toast.error(toastObj.message);
		else if (toastObj.type === "success")
			toast.success(toastObj.message);
		else toast.info(toastObj.message);
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				pauseOnHover
				theme="colored"
				aria-label="Notification"
			/>
		</ToastContext.Provider>
	);
};
