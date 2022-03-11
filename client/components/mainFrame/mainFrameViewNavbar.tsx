import Link from 'next/link';
import styles from './mainFrame.module.scss';

const View = () => {
  return (
    <nav className={styles.navbarVertical}>
      <Link href="/">
        <a>
          <i className="fas fa-home"></i>
        </a>
      </Link>
      <a
        href="https://testnets.opensea.io/collection/june-kims-trial-nft"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="/assets/images/logo_opensea_transparent.svg" alt="OpenSea logo" />
      </a>
    </nav>
  );
};

export default View;
