import "./index.css";
import type { AppProps } from "next/app";
import initAuth from "../util/initAuth"; // the module you created above
import { app } from "../server/firebaseApp";

app;
initAuth();

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
