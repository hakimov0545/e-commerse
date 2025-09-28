import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth.context";
import { ToastProvider } from "./context/toast.provider";
import Router from "./router";

function App() {
	return (
		<ToastProvider>
			<AuthProvider>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</AuthProvider>
		</ToastProvider>
	);
}

export default App;
