import "../public/assets/styles/variables.css";
import "../public/assets/styles/globals.css";
import "../public/assets/styles/header.css";
import "../public/assets/styles/footer.css";
import "../public/assets/styles/extension.css";
import "react-notifications-component/dist/theme.css";
import {Provider} from "react-redux";
import {store} from "../store/store";
import {ReactNotifications} from "react-notifications-component";

import {setCredentials} from "../store/authSlice";
import {useEffect} from "react";
import Head from "next/head";

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
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" href="/favicon.png" />
				<link rel="apple-touch-icon" href="/favicon.png" />
				<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
			</Head>
			<ReactNotifications />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
