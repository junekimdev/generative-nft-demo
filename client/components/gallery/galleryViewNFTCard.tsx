import styles from './gallery.module.scss';
import { TMPropsCard } from './galleryType';
import { TSMintStatus } from '../../controllers/types';

const View = (props: TMPropsCard) => {
  const { id, name, traits, imageSrc, mintStatus, onMintClick, onSaleClick } = props;

  const getMintButton = (mintStatus: TSMintStatus) => {
    let r: JSX.Element;
    switch (mintStatus) {
      case 'minted':
        r = (
          <button
            className={[styles.nftBtn, styles.nftMintBtn].join(' ')}
            data-nft-id={id}
            disabled
          >
            Minted
          </button>
        );
        break;
      case 'minting':
        r = (
          <button
            className={[styles.nftBtn, styles.nftMintBtn].join(' ')}
            data-nft-id={id}
            disabled
          >
            <i className={[styles.spinner, 'fa-solid fa-spinner'].join(' ')}></i>
          </button>
        );
        break;
      default:
        r = (
          <button
            className={[styles.nftBtn, styles.nftMintBtn].join(' ')}
            data-nft-id={id}
            onClick={onMintClick}
          >
            Mint
          </button>
        );
    }
    return r;
  };

  return (
    <div className={styles.cardContainer}>
      <img className={styles.nftImg} src={imageSrc} alt="NFT image" />
      <p className={styles.nftName}>{name}</p>
      <div className={styles.nftTraitWapper1}>
        <div className={styles.nftColor} data-color={traits.color}></div>
        <div className={styles.nftShape}>{traits.shape}</div>
        <div className={styles.nftTxt}>{traits.text}</div>
      </div>
      <div className={styles.nftTraitWapper2}>
        <div className={styles.nftHP}>{`HP - ${traits.hp}`}</div>
        <div className={styles.nftDSP}>{`DSP - ${traits.dsp}`}</div>
      </div>
      <div className={styles.nftRecovery}>{`Recovery Rate - ${traits.recovery}%`}</div>
      <div className={styles.nftConsumption}>{`Consumption - ${traits.consumption}`}</div>
      {mintStatus === 'minted' ? (
        <>
          {getMintButton(mintStatus)}
          <button
            className={[styles.nftBtn, styles.nftSaleBtn].join(' ')}
            data-nft-id={id}
            onClick={onSaleClick}
          >
            Sale
          </button>
        </>
      ) : (
        <>
          {getMintButton(mintStatus)}
          <button
            className={[styles.nftBtn, styles.nftSaleBtn].join(' ')}
            data-nft-id={id}
            disabled
          >
            Sale
          </button>
        </>
      )}
    </div>
  );
};

export default View;
