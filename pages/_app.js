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
				<title key="title">Bextmart - Online Shopping in Ghana</title>
				<meta key="description" name="description" content="Shop electronics, fashion, home goods and more on Bextmart — Ghana's online marketplace with fast delivery and secure payment." />
				<meta key="og:type" property="og:type" content="website" />
				<meta key="og:site_name" property="og:site_name" content="Bextmart" />
				<meta key="og:title" property="og:title" content="Bextmart - Online Shopping in Ghana" />
				<meta key="og:description" property="og:description" content="Shop electronics, fashion, home goods and more on Bextmart — Ghana's online marketplace with fast delivery and secure payment." />
				<meta key="twitter:card" name="twitter:card" content="summary" />
				<meta key="twitter:title" name="twitter:title" content="Bextmart - Online Shopping in Ghana" />
				<meta key="twitter:description" name="twitter:description" content="Shop electronics, fashion, home goods and more on Bextmart — Ghana's online marketplace with fast delivery and secure payment." />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" href="/favicon.png" />
				<link rel="apple-touch-icon" href="/favicon.png" />
				<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
			</Head>
			<ReactNotifications />
			<div className="page-shell">
				<Component {...pageProps} />
			</div>
		</Provider>
	);
}

export default MyApp;
