export type BlogPost = {
  id: string;
  title: string;
  description: string;
  image: any;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Morning on the Tofino Coast',
    description: 'A morning on the Tofino Coast begins without any abrupt transitions. The light slowly emerges from behind the horizon, passes through the clouds and falls on the water in soft shades. The air here is humid, a little cold, but clean and fresh. The waves move smoothly, without sharp blows, creating a constant background sound. The beaches are wide, and even if there are people nearby, the space allows you to feel separate. Often a light mist hangs over the water, which makes the scene deeper and a little unreal. This place does not require activity - just walk along the shore and look ahead. It is easy to slow down here and switch from the usual pace of the city.',
    image: require('../assets/locations/tofino_coast.png'),
  },
  {
    id: '2',
    title: 'Silence among the old trees',
    description: 'In the old forests of British Columbia, time feels different. Large trees stand tightly, their trunks covered with moss, and the branches create a natural roof through which only part of the light passes. There are no harsh sounds here - only a light wind, the movement of leaves and sometimes water somewhere nearby. The space feels deep and a little closed, but not oppressive. On the contrary, it creates a feeling of security. The paths are often narrow and not perfectly even, which adds to the naturalness. This place is more about observation: how the light changes, how the air moves, how everything looks without human intervention.',
    image: require('../assets/locations/great_bear.png'),
  },
  {
    id: '3',
    title: 'A city that does not rush',
    description: 'In some areas of Canadian cities, a completely different pace is felt. The streets are not congested, the traffic is even, and the buildings do not create a sense of pressure. It is easy to just walk here without a specific goal. The architecture combines old materials and modern elements, but without sharp contrast. There are often small open spaces where you can stop and just look around. The lighting in the evening is soft, without aggressive light. This city doesn\'t try to impress — it just lets you be at peace.',
    image: require('../assets/locations/gastown.png'),
  },
  {
    id: '4',
    title: 'When the Ocean Changes the Landscape',
    description: 'On the Canadian coast, the ocean is constantly changing the shape of the land. Waves, wind, and tides change the coastline, creating new shapes and textures. In some places, this is especially evident: rock formations look like they were hand-carved, but in fact they are the result of years of water exposure. The water level can change so much that the same location looks different throughout the day. This creates a sense of movement even when you\'re standing still. Here you can clearly see how nature works without pauses.',
    image: require('../assets/locations/hopewell_rocks.png'),
  },
  {
    id: '5',
    title: 'Forest after rain',
    description: 'After the rain, the forest looks different. The colors become deeper, the surfaces shine, and the air becomes heavier and more saturated. The ground is a little softer, and each step feels stronger. The water lingers on the leaves and slowly falls down, creating a quiet rhythm. The light passes through the drops and adds softness to the scene. At such moments, the forest looks as alive as possible. It\'s not about movement or activity — it\'s about calm and observing the details.',
    image: require('../assets/locations/stanley_park.png'),
  },
  {
    id: '6',
    title: 'The border of the city and the water',
    description: 'In coastal cities in Canada, the border between urban and nature is clearly felt. Water is always nearby, and this changes the perception of space. The embankments are open, with a minimum of barriers, which allows you to see the horizon without obstacles. People move more slowly than in the city center. The water adds movement, and the buildings add structure. This is a balance that is difficult to recreate artificially. It\'s easy to stop here and just watch how the light changes and is reflected in the water.',
    image: require('../assets/locations/halifax.png'),
  },
  {
    id: '7',
    title: 'The feeling of open space',
    description: 'In Canada, there are many places where space is felt especially strongly. These can be the coast, roads or open plains. There are not many objects here that limit the view, so the horizon looks far and clear. This creates a feeling of freedom and lightness. The air is often clear and the light is even, without abrupt transitions. In such places, it doesn\'t take long to feel a change in state. You just have to stop and look ahead.',
    image: require('../assets/locations/long_beach.png'),
  },
];