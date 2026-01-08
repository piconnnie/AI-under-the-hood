
export interface MasteryQuestion {
  id: number;
  section: string;
  question: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
}

export const MASTERY_QUIZ: MasteryQuestion[] = [
  // Section 1
  {
    id: 1,
    section: "Foundations (Warm-up)",
    question: "Which statement best describes Machine Learning from a product perspective?",
    options: [
      { text: "A system that follows predefined rules", isCorrect: false },
      { text: "A system that learns patterns from data", isCorrect: true },
      { text: "A system that always gives correct answers", isCorrect: false },
      { text: "A system that replaces engineers", isCorrect: false }
    ],
    explanation: "ML is defined by its ability to learn from examples (data) rather than following explicit, hard-coded logic."
  },
  {
    id: 2,
    section: "Foundations (Warm-up)",
    question: "Why are ML products fundamentally different from traditional software?",
    options: [
      { text: "They are slower", isCorrect: false },
      { text: "They need GPUs", isCorrect: false },
      { text: "Their outputs are probabilistic, not deterministic", isCorrect: true },
      { text: "They are harder to design UI for", isCorrect: false }
    ],
    explanation: "Traditional software produces the same output for the same input (1+1=2). ML produces probabilities (85% chance this is a cat), managing this uncertainty is the core PM challenge."
  },
  // Section 2
  {
    id: 3,
    section: "Data & Learning",
    question: "You trained a model with very clean historical data, but performance drops in production. Most likely reason?",
    options: [
      { text: "Model bug", isCorrect: false },
      { text: "Data drift", isCorrect: true },
      { text: "Wrong algorithm", isCorrect: false },
      { text: "Server latency", isCorrect: false }
    ],
    explanation: "Data Drift occurs when the live data distribution changes compared to the training data (e.g., user behavior changes over time)."
  },
  {
    id: 4,
    section: "Data & Learning",
    question: "In simple terms, what are features?",
    options: [
      { text: "The answers", isCorrect: false },
      { text: "The predictions", isCorrect: false },
      { text: "The inputs used to make predictions", isCorrect: true },
      { text: "The accuracy score", isCorrect: false }
    ],
    explanation: "Features are the signals or variables (like 'Age', 'Location', 'Clicks') that the model uses to generate a prediction."
  },
  // Section 3
  {
    id: 5,
    section: "How Models Learn",
    question: "What happens during forward propagation?",
    options: [
      { text: "Errors are corrected", isCorrect: false },
      { text: "We update weights", isCorrect: false },
      { text: "Data flows through the model to make a prediction", isCorrect: true },
      { text: "Gradients explode", isCorrect: false }
    ],
    explanation: "Forward prop is the inference step where inputs are processed layer by layer to produce an output guess."
  },
  {
    id: 6,
    section: "How Models Learn",
    question: "What is the role of a loss function?",
    options: [
      { text: "To speed up training", isCorrect: false },
      { text: "To measure how wrong the prediction is", isCorrect: true },
      { text: "To reduce data size", isCorrect: false },
      { text: "To stop overfitting", isCorrect: false }
    ],
    explanation: "The loss function quantifies the distance between the model's prediction and the actual truth."
  },
  {
    id: 7,
    section: "How Models Learn",
    question: "What happens during backward propagation?",
    options: [
      { text: "Data moves forward again", isCorrect: false },
      { text: "The model forgets bad data", isCorrect: false },
      { text: "Errors are sent backward to adjust weights", isCorrect: true },
      { text: "The learning rate changes automatically", isCorrect: false }
    ],
    explanation: "Backprop is the 'learning' step. It calculates the gradient of the error and updates weights to reduce that error."
  },
  {
    id: 8,
    section: "How Models Learn",
    question: "Gradient descent is best described as:",
    options: [
      { text: "Jumping randomly to solutions", isCorrect: false },
      { text: "Memorizing training data", isCorrect: false },
      { text: "Taking steps to reduce error", isCorrect: true },
      { text: "Increasing model size", isCorrect: false }
    ],
    explanation: "It's an optimization algorithm that iteratively adjusts parameters to minimize the loss function, like walking down a hill."
  },
  {
    id: 9,
    section: "How Models Learn",
    question: "If the learning rate is too high, what’s the most likely outcome?",
    options: [
      { text: "Very slow learning", isCorrect: false },
      { text: "Stable convergence", isCorrect: false },
      { text: "Overshooting the optimal solution", isCorrect: true },
      { text: "Perfect accuracy", isCorrect: false }
    ],
    explanation: "Large steps might cause the model to step right over the valley bottom (minimum error) and bounce around, failing to converge."
  },
  // Section 4
  {
    id: 10,
    section: "Tradeoffs & Failure Modes",
    question: "Which tradeoff does an AI PM face most often?",
    options: [
      { text: "UI vs backend", isCorrect: false },
      { text: "Accuracy vs explainability", isCorrect: true },
      { text: "Speed vs storage", isCorrect: false },
      { text: "Design vs engineering", isCorrect: false }
    ],
    explanation: "Complex models (Deep Learning) are often more accurate but harder to explain (Black Box), whereas simpler models (Decision Trees) are clearer but may be less accurate."
  },
  {
    id: 11,
    section: "Tradeoffs & Failure Modes",
    question: "A highly accurate model performs poorly for users. Why?",
    options: [
      { text: "Accuracy ≠ business value", isCorrect: true },
      { text: "The dataset is too large", isCorrect: false },
      { text: "Engineers didn’t deploy it correctly", isCorrect: false },
      { text: "The model is too complex", isCorrect: false }
    ],
    explanation: "Technical metrics (like F1 score) don't always map to user satisfaction. A model could be accurate on unimportant cases but fail on critical ones."
  },
  {
    id: 12,
    section: "Tradeoffs & Failure Modes",
    question: "Overfitting means the model:",
    options: [
      { text: "Learns too slowly", isCorrect: false },
      { text: "Learns general patterns well", isCorrect: false },
      { text: "Memorizes training data but fails in real life", isCorrect: true },
      { text: "Has too little data", isCorrect: false }
    ],
    explanation: "Overfitting is like memorizing the answers to a practice test but failing the real exam because you didn't learn the concepts."
  },
  // Section 5
  {
    id: 13,
    section: "GenAI & Modern AI PM",
    question: "Why do LLMs hallucinate?",
    options: [
      { text: "They are badly trained", isCorrect: false },
      { text: "They retrieve wrong documents", isCorrect: false },
      { text: "They predict the most likely next token, not truth", isCorrect: true },
      { text: "They lack enough compute", isCorrect: false }
    ],
    explanation: "LLMs are probabilistic token predictors, not knowledge bases. They generate plausible-sounding text, which doesn't guarantee factual accuracy."
  },
  {
    id: 14,
    section: "GenAI & Modern AI PM",
    question: "When is GenAI the wrong solution?",
    options: [
      { text: "When data is unstructured", isCorrect: false },
      { text: "When deterministic correctness is required", isCorrect: true },
      { text: "When latency matters", isCorrect: false },
      { text: "When scale is large", isCorrect: false }
    ],
    explanation: "If you need 100% guarantee that 1+1=2 or that a specific rule is followed every time, deterministic code is better than probabilistic GenAI."
  },
  // Section 6
  {
    id: 15,
    section: "Systems Thinking",
    question: "Which loop best represents an ML product in production?",
    options: [
      { text: "Code → Release → Done", isCorrect: false },
      { text: "Data → Model → Prediction → User → Data", isCorrect: true },
      { text: "UI → Backend → Database", isCorrect: false },
      { text: "Research → Paper → Model", isCorrect: false }
    ],
    explanation: "ML products are living systems (Flywheels). User interactions with predictions generate new data, which is used to retrain and improve the model."
  }
];
