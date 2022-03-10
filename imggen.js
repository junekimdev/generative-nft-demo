require('dotenv').config();
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const { NFTStorage, File, toGatewayURL } = require('nft.storage');

const EOL = '\r\n';
const IMG_AMOUNT = 10;
const IMAGE_MIME = 'image/png';
const SIZE = 350;
const CENTER = SIZE / 2;
const BG_COLOR = '#F0F0F0';
const RANGE_NUM = [21, 1];
const RANGE_HP = [501, 30];
const RANGE_DSP = [31, 5];
const RANGE_CONSUMPTION = [51, 10];
const RANGE_RECOVERY_RATE = [26, 0];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TXT_COLOR = ['black', 'red', 'green', 'blue'];
const SHAPE = [
  { value: 'heart', symbol: '♥' },
  { value: 'diamond', symbol: '♦' },
  { value: 'club', symbol: '♣' },
  { value: 'spade', symbol: '♠' },
];

const getRandInt = (upperLimit, lowerLimit = 0) => {
  const scaler = upperLimit - lowerLimit;
  let n = Math.random();
  return Math.floor(n * scaler) + lowerLimit;
};

const generateData = () => {
  const data = [];
  for (let i = 0; i < IMG_AMOUNT; i++) {
    const colorIndex = getRandInt(TXT_COLOR.length);
    const shapeIndex = getRandInt(SHAPE.length);
    const alphabetIndex = getRandInt(ALPHABET.length);
    const number = getRandInt(...RANGE_NUM);
    const text = `${ALPHABET.charAt(alphabetIndex)}${number}`;
    data.push([colorIndex, shapeIndex, text]);
  }
  return data;
};

const getFilename = (i) => `N${i.toString().padStart(3, 0)}.png`;
const getFilePath = (filename) => `./images/${filename}`;

const createImage = async (i, color, shape, text, rimImg) => {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');

  // bg
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, SIZE, SIZE);

  //rim
  ctx.drawImage(rimImg, 0, 0, SIZE, SIZE);

  // center
  ctx.font = '700 120px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(shape, CENTER, CENTER);

  // Upper-left corner
  ctx.font = '700 32px Arial';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(text, 10, 10);

  // Lower-right corner
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText(text, SIZE - 10, SIZE - 10);

  const filepath = getFilePath(getFilename(i));
  const buffer = canvas.toBuffer(IMAGE_MIME);
  await fs.promises.writeFile(filepath, buffer);
  console.log(`Draw ${filepath}:`, color, shape, text);
};

const createTrait = (i, v) => {
  let trait_type;
  let value;
  let display_type;
  switch (i) {
    case 0:
      trait_type = 'Color';
      value = v;
      return { trait_type, value };
    case 1:
      trait_type = 'Shape';
      value = v;
      return { trait_type, value };
    case 2:
      trait_type = 'Text';
      value = v;
      return { trait_type, value };
    case 3:
      trait_type = 'HP';
      value = v;
      return { trait_type, value };
    case 4:
      trait_type = 'DSP';
      value = v;
      return { trait_type, value };
    case 5:
      display_type = 'boost_number';
      trait_type = 'Consumption';
      value = v;
      return { display_type, trait_type, value };
    case 6:
      display_type = 'boost_percentage';
      trait_type = 'Recovery Rate';
      value = v;
      return { display_type, trait_type, value };
    case 7:
      display_type = 'date';
      trait_type = 'Created';
      value = v;
      return { display_type, trait_type, value };
  }
};

const createAttr = (color, shape, text) => {
  const hp = getRandInt(...RANGE_HP);
  const dsp = getRandInt(...RANGE_DSP);
  const consumption = getRandInt(...RANGE_CONSUMPTION);
  const recoveryRate = getRandInt(...RANGE_RECOVERY_RATE);
  const traitData = [color, shape, text, hp, dsp, consumption, recoveryRate, Date.now()];
  const attributes = [];
  traitData.forEach((data, i) => attributes.push(createTrait(i, data)));
  return attributes;
};

const createMetaData = (i, color, shape, text) => {
  const name = `JKT ${i}`;
  const description = "JKT::June Kim's Trial";
  const type = 'collectable';
  const background_color = 'F0F0F0';
  const image = '';
  const attributes = createAttr(color, shape, text);
  return { name, description, type, background_color, image, attributes };
};

const updateImageMetaData = async (i, metadata) => {
  const filename = getFilename(i);
  const filepath = getFilePath(filename);
  const imgByte = await fs.promises.readFile(filepath);
  metadata.image = new File([imgByte], filename, { type: IMAGE_MIME });
};

(async () => {
  const rimImg = await loadImage('./rim.png');

  const rawData = generateData();
  const metaData = [];
  for (let i = 0; i < IMG_AMOUNT; i++) {
    const [ci, si, text] = rawData[i];
    await createImage(i, TXT_COLOR[ci], SHAPE[si].symbol, text, rimImg);
    const meta = createMetaData(i, TXT_COLOR[ci], SHAPE[si].value, text);
    metaData.push(meta);
  }

  const metaFile = `./client/public/meta-uri.txt`;
  await fs.promises.writeFile(metaFile, ''); // Delete all to fresh-start
  const { NFT_STORAGE_API_KEY = '' } = process.env;
  const nftStorage = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  for (let i = 0; i < IMG_AMOUNT; i++) {
    await updateImageMetaData(i, metaData[i]);
    const result = await nftStorage.store(metaData[i]);
    const uri_http = `${i}=${toGatewayURL(result.url)}${EOL}`;
    await fs.promises.writeFile(metaFile, uri_http, { flag: 'a+' });
    console.log(result.url);
  }
})();
