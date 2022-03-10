import styles from './gallery.module.scss';
import { TMPropsGallery, TMPropsCard } from './galleryType';
import NFTCard from './galleryViewNFTCard';
import { TSmetadata } from '../../controllers/types';

const CARD_PER_PAGE = 12;

type DataToCard = TMPropsGallery & { page?: number };

const convertDataToCards: (args: DataToCard) => TMPropsCard[] = (args) => {
  const { data, onMintClick, onSaleClick, page = 1 } = args;
  const cards: TMPropsCard[] = [];
  const end = page * CARD_PER_PAGE;
  const start = end - CARD_PER_PAGE;
  for (let i = start; i < end; i++) {
    const id = i.toString();
    try {
      if (data[id] && data[id].meta) {
        const meta = data[id].meta as TSmetadata;
        const mintStatus = data[id].mintStatus;
        const card: TMPropsCard = {
          ...meta,
          id,
          mintStatus,
          onMintClick,
          onSaleClick,
        };
        cards.push(card);
      }
    } catch (error) {
      continue;
    }
  }
  return cards;
};

const Presenter = (props: TMPropsGallery) => {
  const { data, onMintClick, onSaleClick } = props;
  const cards = convertDataToCards({ data, onMintClick, onSaleClick });

  const mapper = (card: TMPropsCard) => {
    return <NFTCard key={card.id} {...card} />;
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>{cards.map(mapper)}</div>
    </section>
  );
};

export default Presenter;
