import styles from './topbar.module.scss';
import { TMPropsTopbarSelector } from './topbarType';

const View = (props: TMPropsTopbarSelector) => {
  const { isModalOpened, onMetaMaskClick, onWalletConnetClick, onModalClick, onOutsideModalClick } =
    props;

  return isModalOpened ? (
    <div className={styles.walletContainer} onClick={onOutsideModalClick}>
      <div className={styles.walletWrapper} onClick={onModalClick}>
        <button className={[styles.btn, styles.walletBtn].join(' ')} onClick={onMetaMaskClick}>
          MetaMask
        </button>
        <button className={[styles.btn, styles.walletBtn].join(' ')} onClick={onWalletConnetClick}>
          WalletConnect
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default View;
