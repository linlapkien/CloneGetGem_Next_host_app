import Link from 'next/link';
import { useListen } from '../hooks/useListen';
import { useMetamask } from '../hooks/useMetamask';
import { Loading } from './Loading';
import navStyles from '@/styles/Navbar.module.css';

export default function Wallet() {
  // The useMetamask hook returns the current state and dispatch function from the MetaMask context.
  const {
    dispatch,
    state: { status, isMetamaskInstalled, wallet, balance },
  } = useMetamask();
  const listen = useListen();

  // This checks whether MetaMask is not installed, but the page is loaded. If true, it will show a button to install MetaMask.
  const showInstallMetamask =
    status !== 'pageNotLoaded' && !isMetamaskInstalled;
  // Checks if MetaMask is installed but no wallet is connected, allowing the "Connect Wallet" button to be shown.
  const showConnectButton =
    status !== 'pageNotLoaded' && isMetamaskInstalled && !wallet;

  const isConnected = status !== 'pageNotLoaded' && typeof wallet === 'string';

  // This function is called when the user clicks the "Connect Wallet" button.
  const handleConnect = async () => {
    // First, it dispatches a "loading" action to indicate the app is in a loading state.
    dispatch({ type: 'loading' });
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (accounts.length > 0) {
      const balance = await window.ethereum!.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      });
      dispatch({ type: 'connect', wallet: accounts[0], balance });

      // we can register an event listener for detect changes in the wallet (e.g., switching accounts).
      listen();
    }
  };

  // function dispatches a "disconnect" action
  const handleDisconnect = () => {
    dispatch({ type: 'disconnect' });
  };

  return (
    <div>
      {/* If MetaMask is installed but the wallet is not connected, it shows a "Connect Wallet" button. */}
      {showConnectButton && (
        <button onClick={handleConnect} className={navStyles.connectWallet}>
          {status === 'loading' ? <Loading /> : 'Connect Wallet'}
        </button>
      )}

      {/* If MetaMask is not installed, it shows an "Install Metamask" button. */}
      {showInstallMetamask && (
        <Link
          href="https://metamask.io/"
          target="_blank"
          className={navStyles.connectWallet}
        >
          Install Metamask
        </Link>
      )}

      {/* If a wallet is connected, it shows two buttons: one to add the USDC token to MetaMask and one to disconnect the wallet. */}
      {isConnected && (
        <button onClick={handleDisconnect} className={navStyles.connectWallet}>
          Disconnect
        </button>
      )}
    </div>
  );
}
