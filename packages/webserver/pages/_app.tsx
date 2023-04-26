import "../styles/globals.css";
import 'antd/dist/reset.css';
import { trpc } from '../utils/trpc';
import type { AppProps } from "next/app";
import { theme, ConfigProvider } from 'antd';


const localTheme = {
  algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
};

function MyApp({ Component, pageProps }: AppProps) {
  return <ConfigProvider
  theme={localTheme}
>
  <Component {...pageProps} /></ConfigProvider>
}
export default trpc.withTRPC(MyApp);