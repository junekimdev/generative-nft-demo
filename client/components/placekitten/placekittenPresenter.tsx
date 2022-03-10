import styles from './placekitten.module.scss';
import { TMPropsPlacekitten } from './placekittenType';
//import {} from '../../controllers/types';

const Presenter = (props: TMPropsPlacekitten) => {
  const {} = props;

  return (
    <section className={styles.container}>
      <img src="http://placekitten.com/500/500" alt="There is no image yet." />
      <h1>You must connect your wallet...</h1>
    </section>
  );
};

export default Presenter;
