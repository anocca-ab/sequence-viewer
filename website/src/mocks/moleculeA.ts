import { Annotation, SeqAnnotationDirectionsEnum, tuple } from '@anocca/sequence-viewer-utils';

export const sequence: string =
  'CATGTTCTTTCCTGCGTTATCCCCTGATTCTGTGGATAACCGTATTACCGCCTTTGAGTGAGCTGATACCGCTCGCCGCAGCCGAACGACCGAGCGCAGCGAGTCAGTGAGCGAGGAAGCGGAAGAGCGCCCAATACGCAAACCGCCTCTCCCCGCGCGTTGGCCGATTCATTAATGCAGCTGGCACGACAGGTTTCCCGACTGGAAAGCGGGCAGTGAGCGCAACGCAATTAATGTGAGTTAGCTCACTCATTAGGCACCCCAGGCTTTACACTTTATGCTTCCGGCTCGTATGTTGTGTGGAATTGTGAGCGGATAACAATTTCACACAGGAAACAGCTATGACCATGATTACGCCAAGCTTGCATGCCTGCAGGTCGACTCTAGAGGATCCCCGGGTACCGAGCTCGAATTCACTGGCCGTCGTTTTACAACGTCGTGACTGGGAAAACCCTGGCGTTACCCAACTTAATCGCCTTGCAGCACATCCCCCTTTCGCCAGCTGGCGTAATAGCGAAGAGGCCCGCACCGATCGCCCTTCCCAACAGTTGCGCAGCCTGAATGGCGAATGGCGCCTGATGCGGTATTTTCTCCTTACGCATCTGTGCGGTATTTCACACCGCATATGGTGCACTCTCAGTACAATCTGCTCTGATGCCGCATAGTTAAGCCAGCCCCGACACCCGCCAACACCCGCTGACGCGCCCTGACGGGCTTGTCTGCTCCCGGCATCCGCTTACAGACAAGCTGTGACCGTCTCCGGGAGCTGCATGTGTCAGAGGTTTTCACCGTCATCACCGAAACGCGCGAGACGAAAGGGCCTCGTGATACGCCTATTTTTATAGGTTAATGTCATGATAATAATGGTTTCTTAGACGTCAGGTGGCACTTTTCGGGGAAATGTGCGCGGAACCCCTATTTGTTTATTTTTCTAAATACATTCAAATATGTATCCGCTCATGAGACAATAACCCTGATAAATGCTTCAATAATATTGAAAAAGGAAGAGTATGAGTATTCAACATTTCCGTGTCGCCCTTATTCCCTTTTTTGCGGCATTTTGCCTTCCTGTTTTTGCTCACCCAGAAACGCTGGTGAAAGTAAAAGATGCTGAAGATCAGTTGGGTGCACGAGTGGGTTACATCGAACTGGATCTCAACAGCGGTAAGATCCTTGAGAGTTTTCGCCCCGAAGAACGTTTTCCAATGATGAGCACTTTTAAAGTTCTGCTATGTGGCGCGGTATTATCCCGTATTGACGCCGGGCAAGAGCAACTCGGTCGCCGCATACACTATTCTCAGAATGACTTGGTTGAGTACTCACCAGTCACAGAAAAGCATCTTACGGATGGCATGACAGTAAGAGAATTATGCAGTGCTGCCATAACCATGAGTGATAACACTGCGGCCAACTTACTTCTGACAACGATCGGAGGACCGAAGGAGCTAACCGCTTTTTTGCACAACATGGGGGATCATGTAACTCGCCTTGATCGTTGGGAACCGGAGCTGAATGAAGCCATACCAAACGACGAGCGTGACACCACGATGCCTGTAGCAATGGCAACAACGTTGCGCAAACTATTAACTGGCGAACTACTTACTCTAGCTTCCCGGCAACAATTAATAGACTGGATGGAGGCGGATAAAGTTGCAGGACCACTTCTGCGCTCGGCCCTTCCGGCTGGCTGGTTTATTGCTGATAAATCTGGAGCCGGTGAGCGTGGGTCTCGCGGTATCATTGCAGCACTGGGGCCAGATGGTAAGCCCTCCCGTATCGTAGTTATCTACACGACGGGGAGTCAGGCAACTATGGATGAACGAAATAGACAGATCGCTGAGATAGGTGCCTCACTGATTAAGCATTGGTAACTGTCAGACCAAGTTTACTCATATATACTTTAGATTGATTTAAAACTTCATTTTTAATTTAAAAGGATCTAGGTGAAGATCCTTTTTGATAATCTCATGACCAAAATCCCTTAACGTGAGTTTTCGTTCCACTGAGCGTCAGACCCCGTAGAAAAGATCAAAGGATCTTCTTGAGATCCTTTTTTTCTGCGCGTAATCTGCTGCTTGCAAACAAAAAAACCACCGCTACCAGCGGTGGTTTGTTTGCCGGATCAAGAGCTACCAACTCTTTTTCCGAAGGTAACTGGCTTCAGCAGAGCGCAGATACCAAATACTGTTCTTCTAGTGTAGCCGTAGTTAGGCCACCACTTCAAGAACTCTGTAGCACCGCCTACATACCTCGCTCTGCTAATCCTGTTACCAGTGGCTGCTGCCAGTGGCGATAAGTCGTGTCTTACCGGGTTGGACTCAAGACGATAGTTACCGGATAAGGCGCAGCGGTCGGGCTGAACGGGGGGTTCGTGCACACAGCCCAGCTTGGAGCGAACGACCTACACCGAACTGAGATACCTACAGCGTGAGCTATGAGAAAGCGCCACGCTTCCCGAAGGGAGAAAGGCGGACAGGTATCCGGTAAGCGGCAGGGTCGGAACAGGAGAGCGCACGAGGGAGCTTCCAGGGGGAAACGCCTGGTATCTTTATAGTCCTGTCGGGTTTCGCCACCTCTGACTTGAGCGTCGATTTTTGTGATGCTCGTCAGGGGGGCGGAGCCTATGGAAAAACGCCAGCAACGCGGCCTTTTTACGGTTCCTGGCCTTTTGCTGGCCTTTTGCTCA';
export const annotations: Annotation[] = [
  // {
  //   id: 'lalalal',
  //   type: 'OTHER',
  //   label: 'HELLO',
  //   color: 'orange',
  //   locations: [tuple(100, 200), tuple(300, 500)],
  //   hidden: false,
  //   displayAsSequence: true,
  //   rightTag: '',
  //   displayLabel: '',
  //   direction: SeqAnnotationDirectionsEnum.FORWARD
  // },
  // {
  //   id: '8209a176-13f4-48c2-b397-44abd61b2d3dwoiefjweofij',
  //   type: 'DNA_OLIGO',
  //   fivePExtension: 'GGTCTCGGTCTCGGTCTCGGTCTC',
  //   label: 'TetLac_v1',
  //   color: 'hsl(240, 100%, 30%, 1)',
  //   locations: [tuple(268, 342)],
  //   hidden: false,
  //   displayAsSequence: false,
  //   rightTag: '',
  //   displayLabel: '',
  //   direction: SeqAnnotationDirectionsEnum.FORWARD
  // },
  {
    id: '8209a176-13f4-48c2-b397-44abd61b2d3d',
    type: 'OTHER',
    label: 'TetLac_v1',
    color: 'hsl(240, 100%, 30%, 1)',
    locations: [tuple(268, 342)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.FORWARD
  },
  {
    id: 'ca28fd0b-551b-4572-a3ad-0fe1eedffabf',
    type: 'OTHER',
    label: 'lacO reg',
    color: 'hsl(0, 100%, 29%, 1)',
    locations: [tuple(301, 328)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.FORWARD
  },
  {
    id: '63466a0c-f11c-4924-9c69-1fafa7d2383f',
    type: 'OTHER',
    label: 'AmpR_v2',
    color: 'hsl(176, 100%, 29%, 1)',
    locations: [tuple(934, 1939)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.FORWARD
  },
  {
    id: '82d8dae1-951c-4e48-92aa-c78d8eb36d7f',
    type: 'OTHER',
    label: 'Bla Core promoter',
    color: 'hsl(240, 100%, 30%, 1)',
    locations: [tuple(941, 969)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.FORWARD
  },
  {
    id: '27e239fe-4785-4706-b24d-f09873135c1b',
    type: 'OTHER',
    label: 'AmpR',
    color: 'hsl(60, 100%, 50%, 1)',
    locations: [tuple(1011, 1871)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.FORWARD
  },
  {
    id: 'd1d2153d-af6c-457d-86f7-c481099b86e8',
    type: 'OTHER',
    label: 'Probably Terminator',
    color: 'hsl(0, 100%, 84%, 1)',
    locations: [tuple(1908, 1935)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.FORWARD
  },
  {
    id: 'cb1d62c6-5b5f-453c-9bdc-f667635ddac8',
    type: 'OTHER',
    label: 'ColE1_v2',
    color: 'hsl(300, 100%, 50%, 1)',
    locations: [tuple(2019, 2686)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.FORWARD
  },
  {
    id: '8bd05cde-5e50-4e68-84ea-dcd3326f7b3e',
    type: 'OTHER',
    label: 'RNAII gene',
    color: 'hsl(176, 100%, 29%, 1)',
    locations: [tuple(2042, 2630)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.FORWARD
  },
  {
    id: '259c9658-9479-480d-b2c0-766fa1e32689',
    type: 'OTHER',
    label: 'RNAII',
    color: 'hsl(210, 100%, 59%, 1)',
    locations: [tuple(2078, 2630)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.FORWARD
  },
  {
    id: 'c3b77c3f-939e-4def-b735-a04d37f8915f',
    type: 'OTHER',
    label: 'RNAI',
    color: 'hsl(210, 100%, 59%, 1)',
    locations: [tuple(2081, 2188)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.REVERSE
  },
  {
    id: 'b0d5b2c0-b757-47af-977b-ff034a759911',
    type: 'OTHER',
    label: 'RNAI gene',
    color: 'hsl(176, 100%, 29%, 1)',
    locations: [tuple(2081, 2224)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.REVERSE
  },
  {
    id: 'e6671106-7344-4f5a-a103-62b91d0fb6d2',
    type: 'OTHER',
    label: 'Sp1',
    color: 'hsl(210, 100%, 59%, 1)',
    locations: [tuple(2612, 2621)],
    hidden: false,
    displayAsSequence: false,
    rightTag: '',
    displayLabel: '',
    direction: SeqAnnotationDirectionsEnum.REVERSE
  }
];
