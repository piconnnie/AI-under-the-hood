
export interface GlossaryTerm {
  term: string;
  def: string;
  emoji: string;
}

export const GLOSSARY: Record<string, GlossaryTerm> = {
  "Artificial Intelligence": {
    term: "Artificial Intelligence",
    def: "Computers mimicking human intelligence (logic, learning, perception).",
    emoji: "🤖"
  },
  "AI": {
    term: "AI",
    def: "Short for Artificial Intelligence. Machines doing smart things.",
    emoji: "🤖"
  },
  "Machine Learning": {
    term: "Machine Learning",
    def: "Systems that improve automatically through experience (data) rather than explicit programming.",
    emoji: "🧠"
  },
  "ML": {
    term: "ML",
    def: "Short for Machine Learning. Learning from data instead of rules.",
    emoji: "🧠"
  },
  "Deep Learning": {
    term: "Deep Learning",
    def: "A subset of ML using multi-layered neural networks to learn complex patterns (like faces or language).",
    emoji: "🕸️"
  },
  "Neural Networks": {
    term: "Neural Networks",
    def: "Computing systems inspired by biological brains, consisting of interconnected nodes (neurons).",
    emoji: "⚡"
  },
  "Supervised Learning": {
    term: "Supervised Learning",
    def: "Training a model with labeled data (Questions + Answers).",
    emoji: "🏷️"
  },
  "Unsupervised Learning": {
    term: "Unsupervised Learning",
    def: "Finding hidden patterns in unlabeled data (Questions only).",
    emoji: "🧩"
  },
  "Generative AI": {
    term: "Generative AI",
    def: "AI that can create new content (text, images, audio) rather than just analyzing existing data.",
    emoji: "🎨"
  },
  "Predictive AI": {
    term: "Predictive AI",
    def: "AI focused on classifying data or predicting future numbers based on history.",
    emoji: "🔮"
  },
  "Overfitting": {
    term: "Overfitting",
    def: "When a model memorizes the training data but fails to generalize to new, unseen data.",
    emoji: "🤓"
  },
  "Feature Engineering": {
    term: "Feature Engineering",
    def: "Transforming raw data into meaningful signals (math) that a model can understand.",
    emoji: "🔧"
  },
  "Outliers": {
    term: "Outliers",
    def: "Data points that differ significantly from other observations. They can skew results.",
    emoji: "🚨"
  },
  "Linear Regression": {
    term: "Linear Regression",
    def: "A basic algorithm that draws a straight line through data points to predict a number.",
    emoji: "📏"
  },
  "Classification": {
    term: "Classification",
    def: "Sorting data into categories (e.g., Spam vs Not Spam).",
    emoji: "🗂️"
  },
  "Logistic Regression": {
    term: "Logistic Regression",
    def: "An algorithm used for binary classification (Yes/No) by outputting a probability.",
    emoji: "〰️"
  },
  "K-Means": {
    term: "K-Means",
    def: "An algorithm that groups data points into 'K' number of clusters based on distance.",
    emoji: "📍"
  },
  "Activation Function": {
    term: "Activation Function",
    def: "The 'switch' in a neuron that decides whether to pass a signal forward (fire) or not.",
    emoji: "💡"
  },
  "ReLU": {
    term: "ReLU",
    def: "Rectified Linear Unit. A simple activation function: 'If negative, output 0; otherwise output input'.",
    emoji: "🚫"
  },
  "Loss Function": {
    term: "Loss Function",
    def: "A math formula that calculates how wrong the model's prediction was.",
    emoji: "📉"
  },
  "Backpropagation": {
    term: "Backpropagation",
    def: "The algorithm that calculates error and sends it backward through the network to update weights.",
    emoji: "🔙"
  },
  "Gradient Descent": {
    term: "Gradient Descent",
    def: "An optimization algorithm used to minimize the error by moving 'downhill' towards the best weights.",
    emoji: "🏔️"
  },
  "Regularization": {
    term: "Regularization",
    def: "Techniques to prevent overfitting by penalizing complex models (e.g., shrinking weights).",
    emoji: "👮"
  },
  "Decision Trees": {
    term: "Decision Trees",
    def: "A model that splits data like a flowchart based on simple rules.",
    emoji: "🌳"
  },
  "Random Forest": {
    term: "Random Forest",
    def: "An ensemble of many decision trees that vote on the outcome to improve accuracy.",
    emoji: "🌲"
  },
  "CNN": {
    term: "CNN",
    def: "Convolutional Neural Network. Specialized for image processing by scanning with filters.",
    emoji: "📷"
  },
  "Reinforcement Learning": {
    term: "Reinforcement Learning",
    def: "Learning by trial and error using rewards and penalties.",
    emoji: "🎮"
  },
  "Tokens": {
    term: "Tokens",
    def: "The basic units of text (words or sub-words) that LLMs process.",
    emoji: "🧱"
  },
  "Tokenization": {
    term: "Tokenization",
    def: "Breaking text down into tokens.",
    emoji: "🧱"
  },
  "Embeddings": {
    term: "Embeddings",
    def: "Converting words into lists of numbers (vectors) so computers can understand their meaning.",
    emoji: "🔢"
  },
  "Vector": {
    term: "Vector",
    def: "A list of numbers representing a point in space (or a word's meaning).",
    emoji: "🏹"
  },
  "Attention Mechanism": {
    term: "Attention Mechanism",
    def: "Allows models to focus on specific parts of the input sequence when generating output.",
    emoji: "🔦"
  },
  "LLM": {
    term: "LLM",
    def: "Large Language Model. A giant model trained on internet-scale text to predict the next word.",
    emoji: "🦜"
  },
  "RAG": {
    term: "RAG",
    def: "Retrieval-Augmented Generation. Giving an LLM access to external private data to answer questions.",
    emoji: "📚"
  },
  "Data Drift": {
    term: "Data Drift",
    def: "When the live data changes significantly from the training data, causing model failure.",
    emoji: "🍃"
  },
  "Hallucinations": {
    term: "Hallucinations",
    def: "When a generative model confidently creates false or nonsensical information.",
    emoji: "👻"
  },
  "Bias": {
    term: "Bias",
    def: "Systematic error in the model, often reflecting historical prejudices in the training data.",
    emoji: "⚖️"
  }
};
