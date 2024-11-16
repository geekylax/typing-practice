const texts = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "A gentle breeze rustles through the autumn leaves.",
    "Sunlight streams through the window on a peaceful morning.",
    "The small cat naps quietly in the warm sunshine.",
    "Fresh flowers bloom in the garden during springtime.",
    "Children play happily in the neighborhood park.",
    "She reads a book while sitting by the fireplace.",
    "The friendly dog wags its tail with excitement.",
    "Birds sing sweetly in the trees every morning.",
    "Rain drops fall softly on the window pane.",
    "The moon shines brightly in the night sky.",
    "A rainbow appears after the summer shower."
  ],
  medium: [
    "The mysterious artifact gleamed with an otherworldly energy, captivating all who gazed upon it.",
    "Scientists discovered a remarkable new species deep within the unexplored rainforest.",
    "The ancient civilization left behind intricate puzzles that challenged modern archaeologists.",
    "Through quantum computing, researchers unlocked previously impossible calculations.",
    "Advanced AI systems demonstrated unexpected levels of creative problem-solving abilities.",
    "The expedition team uncovered a hidden temple beneath the desert sands.",
    "Marine biologists documented unusual behavior patterns in deep-sea creatures.",
    "The innovative startup developed groundbreaking renewable energy technology.",
    "Astronomers detected mysterious signals originating from a distant galaxy.",
    "Environmental scientists proposed revolutionary solutions for climate change.",
    "The archaeological dig revealed evidence of an advanced prehistoric society.",
    "Virtual reality systems created immersive educational experiences for students."
  ],
  hard: [
    "The quantum physicist hypothesized that parallel universes might intersect at specific multidimensional coordinates.",
    "Cybernetic neural interfaces revolutionized human-computer interaction through direct cognitive synchronization.",
    "Experimental nanotechnology demonstrated unprecedented capabilities in cellular reconstruction and biomolecular engineering.",
    "The artificial superintelligence developed novel solutions to complex mathematical theorems that had puzzled humanity for centuries.",
    "Interstellar propulsion systems utilizing quantum entanglement enabled faster-than-light communication across vast cosmic distances.",
    "Bioengineered photosynthetic enhancements significantly improved agricultural yield through optimized solar energy conversion.",
    "The implementation of quantum cryptographic protocols revolutionized cybersecurity through unhackable communication channels.",
    "Neuroplasticity research revealed unprecedented cognitive adaptation capabilities in the human brain's synaptic reorganization.",
    "Advanced machine learning algorithms demonstrated emergent consciousness through spontaneous problem-solving methodologies.",
    "Theoretical physicists proposed a unified field theory reconciling quantum mechanics with general relativity.",
    "The development of self-replicating molecular machines enabled unprecedented advances in regenerative medicine.",
    "Quantum teleportation experiments successfully transmitted complex quantum states across intercontinental distances."
  ]
};

let currentIndex = {
  easy: 0,
  medium: 0,
  hard: 0
};

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export const generateText = (difficulty: DifficultyLevel): string => {
  const textArray = texts[difficulty];
  const index = currentIndex[difficulty];
  currentIndex[difficulty] = (currentIndex[difficulty] + 1) % textArray.length;
  return textArray[index];
};
