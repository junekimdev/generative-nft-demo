import styles from './topbar.module.scss';
import { TMPropsTopbar } from './topbarType';
import WalletView from './topbarViewWallet';
//import {} from '../../controllers/types';

const Presenter = (props: TMPropsTopbar) => {
  const { isConnected, address, balance, onConnectClick, onDisconnectClick, ...walletProps } =
    props;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>June Kim's NFT Trial</h1>
      {isConnected ? (
        <div className={styles.infoWrapper}>
          <span className={styles.info}>
            <i className="fa-solid fa-address-card"></i>
            {`${address.slice(0, 5)}....${address.slice(-4)}`}
          </span>
          <span className={styles.info}></span>
          <span className={styles.info}>
            <i className="fab fa-ethereum"></i>
            {balance === '0.0' ? (
              <i className={[styles.spinner, 'fa-solid fa-spinner'].join(' ')}></i>
            ) : (
              balance
            )}
          </span>
          <span className={styles.info}>ETH</span>
          <button className={[styles.btn, styles.connectBtn].join(' ')} onClick={onDisconnectClick}>
            Disconnect
          </button>
        </div>
      ) : (
        <div className={styles.infoWrapper}>
          <span className={styles.info}>Welcome!</span>
          <button className={[styles.btn, styles.connectBtn].join(' ')} onClick={onConnectClick}>
            Connect Wallet
          </button>
        </div>
      )}
      <WalletView {...walletProps} />
    </section>
  );
};

export default Presenter;
