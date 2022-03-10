# Generative NFT demo

June Kim's the First NFT app

HipCrypto Dev Week3-4 assignment

## Installation

1. Clone the repo
1. Create a file named `.env` in the root directory
1. Add keys and values

   1. MASTER_ADDR=xxx
   1. ALCHEMY_API_KEY=xxx
   1. ALCHEMY_PRV_KEY=xxx
   1. ETHERSCAN_API_KEY=xxx
   1. NFT_STORAGE_API_KEY=xxx

1. Create a file named `.env` in the `client` directory
1. Add keys and values
   1. ALCHEMY_API_KEY=xxx

## Image Creation and Upload to NFT.storage

1. Modify `IMG_AMOUNT` in `imggen.js` to the amount you want to create
1. Execute the file

   ```shell
   node imggen.js
   ```

1. This will create image files `N000` in `/images/`
1. This will upload the created images to NFT.storage
1. This will create metadata file `meta-uri.txt` in `/client/public/`

## Smart Contract Deployment

1. Compile the contract

   ```shell
   yarn compile
   ```

1. Deploy to local chain

   ```shell
   yarn deploy-local
   ```

1. Deploy to Rinkeby Ethereum testnet

   ```shell
   yarn deploy-remote
   yarn verify
   ```

## NFT Minting

1. Change directory to `client`

   ```shell
   cd client
   ```

1. Start dev server

   ```shell
   yarn dev
   ```

1. Open browser and go to `http://localhost:3000`
1. Connect wallet
1. Click `mint` button
