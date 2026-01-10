
import React from 'react';

interface ExplainerItem {
  icon: string;
  title: string;
  desc: string;
}

const EXPLANATIONS: Record<string, ExplainerItem[]> = {
  // Level 1: Landscape
  'ai-hierarchy': [
    { icon: '🧅', title: 'Nested Layers', desc: 'AI is the broad field. ML is the subset that learns from data. DL is the specialized subset using neural nets.' },
    { icon: '🎯', title: 'Specificity', desc: 'As you move inward (to DL), models become more complex, powerful, and data-hungry.' }
  ],
  'intro': [
    { icon: '📜', title: 'Traditional Code', desc: 'You explicitly write every rule (IF-THEN). Good for logic, bad for perception.' },
    { icon: '🧠', title: 'Machine Learning', desc: 'The system infers rules from examples. You provide the goal, it figures out the "how".' }
  ],
  'supervised-unsupervised': [
    { icon: '🏷️', title: 'Supervised Learning', desc: 'You give the AI the question AND the answer. "This photo is a Cat". It learns to predict labels.' },
    { icon: '🧩', title: 'Unsupervised Learning', desc: 'You give only data, no answers. "Here are 1,000 photos, group them". It finds patterns.' }
  ],
  'ai-landscape': [
    { icon: '📸', title: 'Discriminator (Predictive)', desc: 'Acts like a critic. It sorts inputs into existing buckets (e.g., "Cat" vs "Dog").' },
    { icon: '🎨', title: 'Generator (Generative)', desc: 'Acts like an artist. It learns the distribution of data to create new samples from noise.' }
  ],
  'value-matrix': [
    { icon: '💎', title: 'High Value', desc: 'Problems where AI solves a pain point that code cannot (e.g., Vision, NLP).' },
    { icon: '🏗️', title: 'Feasibility', desc: 'Do we have the data? Is the technology mature? Low feasibility kills projects.' }
  ],

  // Level 2: Data Strategy
  'train-test': [
    { icon: '📚', title: 'Training Set (80%)', desc: 'The study material. The model sees this data and adjusts its weights to minimize error.' },
    { icon: '📝', title: 'Test Set (20%)', desc: 'The final exam. Hidden from the model during training to measure true generalization.' }
  ],
  'eda': [
    { icon: '📊', title: 'Distribution', desc: 'The shape of your data. Skewed data leads to biased models.' },
    { icon: '🚨', title: 'Outliers', desc: 'Extreme values that can confuse the model. Usually removed during cleaning.' }
  ],
  'feature-engineering': [
    { icon: '🏗️', title: 'Transformation', desc: 'Converting messy real-world data (text, dates, categories) into clean mathematical signals.' },
    { icon: '🧠', title: 'Domain Knowledge', desc: 'Using human insight (e.g., "Weekends are busy") to create meaningful new inputs.' }
  ],
  'rice-ai': [
    { icon: '⚖️', title: 'Confidence', desc: 'The most critical factor. If you lack data to back your idea, Confidence is low, and the RICE score drops to near zero.' },
    { icon: '🏋️', title: 'Effort', desc: 'The denominator. A high-effort AI project (e.g., building a custom LLM) needs massive Impact to be worth the cost.' }
  ],

  // Level 3: Core Mechanics
  'linear-reg': [
    { icon: '📏', title: 'Line of Best Fit', desc: 'The straight line that minimizes the average distance (error) to all data points.' },
    { icon: '📉', title: 'Residuals', desc: 'The vertical gap between a real data point and the prediction line.' }
  ],
  'binary-class': [
    { icon: '🚧', title: 'Decision Boundary', desc: 'The line separating the two classes. The model tries to place this where errors are minimized.' },
    { icon: '❌', title: 'Misclassification', desc: 'Points that fall on the wrong side of the boundary.' }
  ],
  'logistic-reg': [
    { icon: '🌊', title: 'Sigmoid Curve', desc: 'Squashes any input number into a probability between 0 and 1.' },
    { icon: '📍', title: 'Threshold', desc: 'Usually 0.5. Above this is "Yes", below is "No".' }
  ],
  'kmeans': [
    { icon: '📍', title: 'Centroids', desc: 'The calculated center point (average) of a cluster. It moves with every iteration.' },
    { icon: '🔄', title: 'Convergence', desc: 'The cycle repeats until centroids stop moving, meaning groups are stable.' }
  ],

  // Level 4: Neural Networks
  'neural-net-structure': [
    { icon: '🔵', title: 'Neurons (Nodes)', desc: 'Hold a numerical value representing activation strength.' },
    { icon: '🔗', title: 'Weights (Edges)', desc: 'Determine how much influence one neuron has on the next. This is what the model "learns".' }
  ],
  'activations': [
    { icon: '⚡', title: 'Non-Linearity', desc: 'Without activation functions, a neural net is just big linear regression. This adds the "brain-like" spark.' },
    { icon: '🚫', title: 'ReLU', desc: 'Simple but powerful: "If negative, be zero." helps training deep networks.' }
  ],
  'forward-prop': [
    { icon: '🌊', title: 'Inference Flow', desc: 'Data flows from Input → Hidden → Output. No learning happens here, just prediction.' },
    { icon: '🔢', title: 'Prediction', desc: 'The final output (e.g., "Dog") calculated from the accumulated weights.' }
  ],
  'loss-function': [
    { icon: '🎯', title: 'The Target', desc: 'The correct answer (Ground Truth) from our training data.' },
    { icon: '📏', title: 'Loss/Error', desc: 'The calculated distance between the Prediction and the Target. We want this to be 0.' }
  ],

  // Level 5: Learning
  'backward-prop': [
    { icon: '🔙', title: 'Error Signal', desc: 'We calculate "Who is to blame?" for the error and send that signal backwards.' },
    { icon: '🔧', title: 'Weight Update', desc: 'Slightly adjusting connection strengths to reduce the error for next time.' }
  ],
  'gradient-descent': [
    { icon: '🏔️', title: 'Loss Landscape', desc: 'A visualization of error. We want to find the lowest point (valley) in this landscape.' },
    { icon: '👟', title: 'Learning Rate', desc: 'The size of the step we take downhill. Too big = miss the bottom. Too small = too slow.' }
  ],
  'regularization': [
    { icon: '👮', title: 'Penalty', desc: 'An artificial cost added to the Loss function to punish complex models.' },
    { icon: '📉', title: 'Weight Decay', desc: 'Forcing weights to be small makes the model simpler and less prone to overfitting.' }
  ],

  // Level 6: Advanced
  'decision-trees': [
    { icon: '🌿', title: 'Root Node', desc: 'The first question that splits the data best.' },
    { icon: '🍂', title: 'Leaf Node', desc: 'The final outcome/bucket after traversing the questions.' }
  ],
  'ensemble-basics': [
    { icon: '🌲', title: 'Weak Learners', desc: 'Individual models that make mistakes.' },
    { icon: '🗳️', title: 'Wisdom of Crowds', desc: 'Aggregating many weak opinions usually reveals the truth.' }
  ],
  'cnn-conv': [
    { icon: '🔍', title: 'Filter / Kernel', desc: 'A small grid that slides over the image to detect specific features (edges, textures).' },
    { icon: '🗺️', title: 'Feature Map', desc: 'The result of the scan, highlighting where specific features were found.' }
  ],
  'rl-intro': [
    { icon: '🤖', title: 'Agent', desc: 'The AI learner exploring the world.' },
    { icon: '🎁', title: 'Reward Signal', desc: 'The only feedback the agent gets. "Good dog" or "Bad dog".' }
  ],

  // Level 7: GenAI
  'tokenization': [
    { icon: '🧱', title: 'Tokens', desc: 'The atomic units of text for an LLM. Not always words (e.g., "ing" is a token).' },
    { icon: '🔢', title: 'Integer IDs', desc: 'Models don\'t see text; they see a list of numbers representing these tokens.' }
  ],
  'embeddings': [
    { icon: '🌌', title: 'Vector Space', desc: 'A multi-dimensional map where words with similar meanings are located physically close together.' },
    { icon: '🧭', title: 'Semantic Distance', desc: 'Math used to calculate meaning. "King" - "Man" + "Woman" ≈ "Queen".' }
  ],
  'attention-mechanism': [
    { icon: '🔦', title: 'Self-Attention', desc: 'The mechanism that allows models to weigh the importance of different words in a sentence relative to each other.' },
    { icon: '🕸️', title: 'Context Window', desc: 'The amount of text the model can "look at" at once to maintain coherence.' }
  ],
  'vector-db': [
    { icon: '🗄️', title: 'Vector Storage', desc: 'A database optimized to store and search through millions of embeddings.' },
    { icon: '🔍', title: 'Similarity Search', desc: 'Finding data based on "meaning match" rather than "keyword match".' }
  ],
  'llms': [
    { icon: '🔮', title: 'Next Token Prediction', desc: 'The core mechanic. The model is just guessing the most likely next word.' },
    { icon: '🎲', title: 'Probabilities', desc: 'The model assigns a % chance to every possible next word.' }
  ],
  'llm-rag': [
    { icon: '🎣', title: 'Retrieval', desc: 'Fetching relevant facts from your trusted database.' },
    { icon: '🏗️', title: 'Augmentation', desc: 'Injecting those facts into the prompt before the LLM generates an answer.' }
  ],

  // Level 8: Product
  'ai-lifecycle': [
    { icon: '🌬️', title: 'Data Drift', desc: 'When the real world changes (e.g., new slang), old training data becomes obsolete.' },
    { icon: '🔄', title: 'Retraining Loop', desc: 'The necessary process of constantly updating the model with fresh data.' }
  ],
  'gain-lift': [
    { icon: '🚀', title: 'Lift', desc: 'The multiplier of how much better your model is compared to random guessing (e.g., "3x better").' },
    { icon: '🎯', title: 'Gain', desc: 'The % of targets captured. E.g., "We can find 80% of fraudsters by checking only top 20% of risky transactions."' }
  ],
  'jtbd-agents': [
    { icon: '✈️', title: 'Copilot', desc: 'The Human is the pilot. AI suggests, you decide. You are liable for the outcome.' },
    { icon: '🤖', title: 'Agent', desc: 'The AI is the pilot. It takes actions (e.g., refunds a user) autonomously. The system is liable.' }
  ],
  'ethics-bias': [
    { icon: '⚖️', title: 'Historical Bias', desc: 'If past human decisions were biased, the data is biased, and the model will be biased.' },
    { icon: '🛠️', title: 'Rebalancing', desc: 'The active process of adjusting the dataset to ensure fair outcomes.' }
  ],
  'xai-trust': [
    { icon: '📦', title: 'Black Box', desc: 'The default state of deep learning: inputs go in, magic happens, output comes out.' },
    { icon: '🔦', title: 'Feature Attribution', desc: 'Tools like SHAP reveal which specific inputs drove the decision.' }
  ]
};

export const ConceptExplainer: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const concepts = EXPLANATIONS[lessonId];

  if (!concepts) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 animate-enter">
      {concepts.map((c, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex gap-4 items-start shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-300 group">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                {c.icon}
            </div>
            <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">{c.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
        </div>
      ))}
    </div>
  );
};
