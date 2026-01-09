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
  'ai-landscape': [
    { icon: '📸', title: 'Discriminator (Predictive)', desc: 'Acts like a critic. It sorts inputs into existing buckets (e.g., "Cat" vs "Dog").' },
    { icon: '🎨', title: 'Generator (Generative)', desc: 'Acts like an artist. It learns the distribution of data to create new samples from noise.' }
  ],
  'intro': [
    { icon: '📜', title: 'Traditional Code', desc: 'You explicitly write every rule (IF-THEN). Good for logic, bad for perception.' },
    { icon: '🧠', title: 'Machine Learning', desc: 'The system infers rules from examples. You provide the goal, it figures out the "how".' }
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
  'wizard-of-oz': [
    { icon: '🎭', title: 'The Curtain', desc: 'The user sees a working AI product.' },
    { icon: '👨‍💻', title: 'The Human', desc: 'Behind the scenes, a human manually performs the task to validate demand before coding.' }
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 animate-enter">
      {concepts.map((c, i) => (
        <div key={i} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/60 p-3 rounded-xl flex gap-3 items-start shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300 group">
            <div className="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                {c.icon}
            </div>
            <div>
                <h4 className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-0.5">{c.title}</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug font-medium">{c.desc}</p>
            </div>
        </div>
      ))}
    </div>
  );
};