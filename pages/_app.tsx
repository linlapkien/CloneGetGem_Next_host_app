import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from './components/nav/NavBar';
import { MetamaskProvider } from '@/pages/hooks/useMetamask';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MetamaskProvider>
        <NavBar />
        <Component {...pageProps} />
      </MetamaskProvider>
    </>
  );
}
