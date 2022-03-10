export type Display = 'boost_number' | 'boost_percentage' | 'date' | undefined;
export type DMtrait =
  | 'Color'
  | 'Shape'
  | 'Text'
  | 'HP'
  | 'DSP'
  | 'Consumption'
  | 'Recovery Rate'
  | 'Created';

export type DMattribute = {
  display_type?: Display;
  trait_type: DMtrait;
  value: string | number;
};

export type DMmetadata = {
  name: string;
  description: string;
  type: string;
  background_color: string;
  attributes: DMattribute[];
  image: string;
};

export type tokenIdString = string;
export type txtString = string;
export type DMuri = { id: string; url: string };

export type TStraits = {
  color: string;
  shape: string;
  text: string;
  hp: number;
  dsp: number;
  consumption: number;
  recovery: number;
  created: number;
};

export type TSMintStatus = 'minting' | 'minted' | undefined;
export type TSMintPayload = {
  id: string;
  status: TSMintStatus;
};

export type TSmetadata = { name: string; imageSrc: string; traits: TStraits };
export type TSmetadataCarry = { id: string; meta: TSmetadata };
export type TSmetadataBucket = {
  uri: string;
  meta?: TSmetadata;
  mintStatus?: TSMintStatus;
};
export type TSnft = { [key: string]: TSmetadataBucket };

// export const initTraits: TStraits = {
//   color: '',
//   shape: '',
//   text: '',
//   hp: 0,
//   dsp: 0,
//   recovery: 0,
//   consumption: 0,
//   created: 0,
// };

// export const initMetadata: TSmetadata = {
//   name: '',
//   imageSrc: '',
//   traits: { ...initTraits },
// };
