/**
 * The direction of an annotation
 *
 * @public
 */
export enum SeqAnnotationDirectionsEnum {
  FORWARD = 'FORWARD',
  NOT_DEFINED = 'NOT_DEFINED',
  REVERSE = 'REVERSE'
}

/**
 * Colors of nucleotides
 *
 * @internal
 */
export const dnaColors: { [k: string]: string } = {
  A: '#C20000', //'#ff5c5c',
  T: '#00B700', //'#2ca039',
  C: '#1000BA', //'#a55cff',
  G: '#FDE700', //'#ff775c',
  R: 'black',
  Y: 'black',
  W: 'black',
  S: 'black',
  M: 'black',
  K: 'black',
  H: 'black',
  B: 'black',
  V: 'black',
  D: 'black',
  N: 'black'
};

/**
 * Complement bases
 *
 * @internal
 */
export const complementBases: { [k: string]: string } = {
  R: 'Y',
  Y: 'R',
  W: 'W',
  S: 'S',
  M: 'K',
  K: 'M',
  H: 'D',
  B: 'V',
  V: 'B',
  D: 'H',
  N: 'N',
  A: 'T',
  T: 'A',
  G: 'C',
  C: 'G'
};

/**
 * Amino acid colors and names
 *
 * @internal
 */
export const aas: {
  [k: string]: {
    value: string;
    name: string;
    threeLettersName: string;
    hydrophobicity?: number;
    color: string;
    doInvert?: boolean;
    isAmbiguous?: boolean;
    aliases?: string;
  };
} = {
  A: {
    value: 'A',
    name: 'Alanine',
    threeLettersName: 'Ala',
    hydrophobicity: 1.8,
    color: '#A7A7A7'
  },
  R: {
    value: 'R',
    name: 'Arginine',
    threeLettersName: 'Arg',
    hydrophobicity: -4.5,
    color: '#145AFF'
  },
  N: {
    value: 'N',
    name: 'Asparagine',
    threeLettersName: 'Asn',
    hydrophobicity: -3.5,
    color: '#00DCDC'
  },
  D: {
    value: 'D',
    name: 'Aspartic acid',
    threeLettersName: 'Asp',
    hydrophobicity: -3.5,
    color: '#E60A0A'
  },
  C: {
    value: 'C',
    name: 'Cysteine',
    threeLettersName: 'Cys',
    hydrophobicity: 2.5,
    color: '#E6E600'
  },
  E: {
    value: 'E',
    name: 'Glutamic acid',
    threeLettersName: 'Glu',
    hydrophobicity: -3.5,
    color: '#E60A0A'
  },
  Q: {
    value: 'Q',
    name: 'Glutamine',
    threeLettersName: 'Gln',
    hydrophobicity: -3.5,
    color: '#00DCDC'
  },
  G: {
    value: 'G',
    name: 'Glycine',
    threeLettersName: 'Gly',
    hydrophobicity: -0.4,
    color: '#A7A7A7'
  },
  H: {
    value: 'H',
    name: 'Histidine',
    threeLettersName: 'His',
    hydrophobicity: -3.2,
    color: '#8282D2'
  },
  I: {
    value: 'I',
    name: 'Isoleucine ',
    threeLettersName: 'Ile',
    hydrophobicity: 4.5,
    color: '#0F820F'
  },
  L: {
    value: 'L',
    name: 'Leucine',
    threeLettersName: 'Leu',
    hydrophobicity: 3.8,
    color: '#0F820F'
  },
  K: {
    value: 'K',
    name: 'Lysine',
    threeLettersName: 'Lys',
    hydrophobicity: -3.9,
    color: '#145AFF'
  },
  M: {
    value: 'M',
    name: 'Methionine',
    threeLettersName: 'Met',
    hydrophobicity: 1.9,
    color: '#E6E600'
  },
  F: {
    value: 'F',
    name: 'Phenylalanine',
    threeLettersName: 'Phe',
    hydrophobicity: 2.8,
    color: '#3232AA',
    doInvert: true
  },
  P: {
    value: 'P',
    name: 'Proline',
    threeLettersName: 'Pro',
    hydrophobicity: -1.6,
    color: '#DC9682'
  },
  S: {
    value: 'S',
    name: 'Serine',
    threeLettersName: 'Ser',
    hydrophobicity: -0.8,
    color: '#FA9600'
  },
  T: {
    value: 'T',
    name: 'Threonine',
    threeLettersName: 'Thr',
    hydrophobicity: -0.7,
    color: '#FA9600'
  },
  U: {
    value: 'U',
    name: 'Selenocysteine',
    threeLettersName: 'Sec',
    color: '#FF0000'
  },
  W: {
    value: 'W',
    name: 'Tryptophan',
    threeLettersName: 'Trp',
    hydrophobicity: -0.9,
    color: '#B45AB4'
  },
  Y: {
    value: 'Y',
    name: 'Tyrosine',
    threeLettersName: 'Tyr',
    hydrophobicity: -1.3,
    color: '#3232AA',
    doInvert: true
  },
  V: {
    value: 'V',
    name: 'Valine',
    threeLettersName: 'Val',
    hydrophobicity: 4.2,
    color: '#0F820F'
  },
  '*': {
    value: '*',
    name: 'Stop',
    threeLettersName: 'Stop',
    color: '#000000'
  },
  '.': {
    value: '.',
    name: 'Stop',
    threeLettersName: 'Stop',
    color: '#000000'
  },
  '-': {
    value: '-',
    name: 'Gap',
    threeLettersName: 'Gap',
    color: '#ffffff'
  },
  B: {
    value: 'B',
    threeLettersName: 'ND',
    color: 'lightpurple',
    isAmbiguous: true,
    name: 'B',
    aliases: 'ND'
  },
  J: {
    value: 'J',
    threeLettersName: 'IL',
    color: 'lightpurple',
    isAmbiguous: true,
    name: 'J',
    aliases: 'IL'
  },
  X: {
    value: 'X',
    threeLettersName: 'ACDEFGHIKLMNPQRSTVWY',
    color: 'lightpurple',
    isAmbiguous: true,
    name: 'X',
    aliases: 'ACDEFGHIKLMNPQRSTVWY'
  },
  Z: {
    value: 'Z',
    threeLettersName: 'QE',
    color: 'lightpurple',
    isAmbiguous: true,
    name: 'Z',
    aliases: 'QE'
  }
};

/**
 * The maximum width of each base when zoomed in
 *
 * @internal
 */
export const dnaBaseWidth = 24;

/**
 * The maximum width of each base when zoomed in
 *
 * @internal
 */
export const proteinBaseWidth = 150;

/**
 * Human codon man
 *
 * @internal
 */
export const humanCodons = {
  TAG: '*',
  TAA: '*',
  TGA: '*',
  GCG: 'A',
  GCA: 'A',
  GCT: 'A',
  GCC: 'A',
  TGT: 'C',
  TGC: 'C',
  GAT: 'D',
  GAC: 'D',
  GAA: 'E',
  GAG: 'E',
  TTT: 'F',
  TTC: 'F',
  GGT: 'G',
  GGA: 'G',
  GGG: 'G',
  GGC: 'G',
  CAT: 'H',
  CAC: 'H',
  ATA: 'I',
  ATT: 'I',
  ATC: 'I',
  AAA: 'K',
  AAG: 'K',
  CTA: 'L',
  TTA: 'L',
  CTT: 'L',
  TTG: 'L',
  CTC: 'L',
  CTG: 'L',
  ATG: 'M',
  AAT: 'N',
  AAC: 'N',
  CCG: 'P',
  CCA: 'P',
  CCT: 'P',
  CCC: 'P',
  CAA: 'Q',
  CAG: 'Q',
  CGT: 'R',
  CGA: 'R',
  CGC: 'R',
  AGA: 'R',
  AGG: 'R',
  CGG: 'R',
  TCG: 'S',
  AGT: 'S',
  TCA: 'S',
  TCT: 'S',
  TCC: 'S',
  AGC: 'S',
  ACG: 'T',
  ACT: 'T',
  ACA: 'T',
  ACC: 'T',
  GTA: 'V',
  GTT: 'V',
  GTC: 'V',
  GTG: 'V',
  TGG: 'W',
  TAT: 'Y',
  TAC: 'Y'
};
