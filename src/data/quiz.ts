export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct: number;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: 'Where can you see a whale in Canada?',
    options: [
      'In the mountains of Alberta',
      'On the coast of British Columbia',
      'In downtown Toronto',
      'In the desert',
    ],
    correct: 1,
  },
  {
    id: '2',
    question: 'What is characteristic of Canadian forests?',
    options: [
      'Palm trees',
      'Dry climate',
      'Conifers and moss',
      'Sand',
    ],
    correct: 2,
  },
  {
    id: '3',
    question: 'Where is Long Beach located?',
    options: [
      'In Ontario',
      'In Quebec',
      'In British Columbia',
      'In Manitoba',
    ],
    correct: 2,
  },
  {
    id: '4',
    question: "What is Peggy's Cove?",
    options: [
      'Lake',
      'Lighthouse on the coast',
      'Shopping mall',
      'Mountain',
    ],
    correct: 1,
  },
  {
    id: '5',
    question: 'What is special about the Bay of Fundy?',
    options: [
      'Highest mountain',
      'Deepest lake',
      'Highest tides in the world',
      'Longest river',
    ],
    correct: 2,
  },
  {
    id: '6',
    question: 'What can you find in the Great Bear Rainforest?',
    options: [
      'Desert',
      'Polar bears',
      'Rare white bears (Kermode)',
      'Volcanoes',
    ],
    correct: 2,
  },
  {
    id: '7',
    question: 'What is typical of urban areas in Canada?',
    options: [
      'Lack of greenery',
      'Balance of nature and architecture',
      'Only old buildings',
      'Only villages',
    ],
    correct: 1,
  },
  {
    id: '8',
    question: 'Where is Stanley Park located?',
    options: [
      'In Ottawa',
      'In Vancouver',
      'In Calgary',
      'In Montreal',
    ],
    correct: 1,
  },
  {
    id: '9',
    question: 'What can you do on the Cabot Trail?',
    options: [
      'Skiing',
      'Viewing the ocean from the road',
      'Swimming in the desert',
      'Flying',
    ],
    correct: 1,
  },
  {
    id: '10',
    question: 'What is the Distillery District?',
    options: [
      'Forest',
      'Old industrial area',
      'Beach',
      'Island',
    ],
    correct: 1,
  },
  {
    id: '11',
    question: 'Where are you more likely to see icebergs?',
    options: [
      'Toronto',
      'Fogo Island',
      'Calgary',
      'Ottawa',
    ],
    correct: 1,
  },
  {
    id: '12',
    question: 'What is characteristic of the Tofino coast?',
    options: [
      'Calm water',
      'Big waves and surfing',
      'Desert',
      'Ice',
    ],
    correct: 1,
  },
  {
    id: '13',
    question: 'What does "Urban" mean in the app?',
    options: [
      'Forests',
      'Coasts',
      'Urban locations',
      'Mountains',
    ],
    correct: 2,
  },
  {
    id: '14',
    question: 'Where is Old Montreal located?',
    options: [
      'In Vancouver',
      'In Montreal',
      'In Calgary',
      'In Toronto',
    ],
    correct: 1,
  },
  {
    id: '15',
    question: 'What makes Fundy National Park special?',
    options: [
      'No trees',
      'Dense forests and water nearby',
      'Desert',
      'Volcanoes',
    ],
    correct: 1,
  },
  {
    id: '16',
    question: 'What is characteristic of Cathedral Grove?',
    options: [
      'Small trees',
      'Very tall old trees',
      'Sand',
      'Rocks',
    ],
    correct: 1,
  },
  {
    id: '17',
    question: 'Where is Granville Island located?',
    options: [
      'Toronto',
      'Vancouver',
      'Ottawa',
      'Quebec',
    ],
    correct: 1,
  },
  {
    id: '18',
    question: 'What can be found on the coast?',
    options: [
      'Skyscrapers',
      'Lighthouses and rocks',
      'Deserts',
      'Fields',
    ],
    correct: 1,
  },
  {
    id: '19',
    question: 'What is typical for the Forest category?',
    options: [
      'Rocks',
      'Trees and trails',
      'Water',
      'Buildings',
    ],
    correct: 1,
  },
  {
    id: '20',
    question: 'What does an interactive map provide?',
    options: [
      'Games',
      'Ability to view a place on the map',
      'Chat',
      'Video',
    ],
    correct: 1,
  },
];