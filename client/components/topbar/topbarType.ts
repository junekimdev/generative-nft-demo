import { MouseEvent } from 'react';

export type TMPropsTopbarSelector = {
  isModalOpened: boolean;
  onMetaMaskClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  onWalletConnetClick: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  onModalClick: (e: MouseEvent<HTMLDivElement>) => void;
  onOutsideModalClick: () => void;
};

export type TMPropsTopbar = TMPropsTopbarSelector & {
  isConnected: boolean;
  address: string;
  balance: string;
  onConnectClick: () => void;
  onDisconnectClick: () => void;
};
