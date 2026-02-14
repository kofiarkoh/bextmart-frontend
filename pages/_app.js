import "../public/assets/styles/variables.css";
import "../public/assets/styles/globals.css";
import "../public/assets/styles/header.css";
import "../public/assets/styles/footer.css";
import "../public/assets/styles/extension.css";
import {Provider} from "react-redux";
import {store} from "../store/store";

import {setCredentials} from "../store/authSlice";
import {useEffect} from "react";

function MyApp({Component, pageProps}) {
	useEffect(() => {
		const token = localStorage.getItem("auth_token");

		let user = null;
		const storedUser = localStorage.getItem("yam-user");
		if (storedUser) {
			try {
				user = JSON.parse(storedUser);
			} catch {
				localStorage.removeItem("yam-user");
			}
		}

		if (token) {
			store.dispatch(setCredentials({token, user}));
		}
	}, []);
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
