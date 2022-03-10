import { MouseEvent } from 'react';
import { TSmetadata, TSnft, TSMintStatus } from '../../controllers/types';

export type TMPropsCard = TSmetadata & {
  id: string;
  mintStatus: TSMintStatus;
  onMintClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  onSaleClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
};

export type TMPropsGallery = {
  data: TSnft;
  onMintClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  onSaleClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
};
