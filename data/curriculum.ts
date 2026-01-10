
import { Level } from '../types';

export const CURRICULUM: Level[] = [
  {
    id: 1,
    title: "The AI Landscape",
    unlocked: true,
    lessons: [
      {
        id: "ai-hierarchy",
        title: "AI vs. ML vs. DL",
        subtitle: "Understanding the Hierarchy",
        shortDescription: [
          "AI is the broad science of mimicking intelligence.",
          "Machine Learning (ML) is a subset that learns from data.",
          "Deep Learning (DL) is a subset of ML using Neural Networks."
        ],
        eli5: "AI is the planet. ML is a continent on that planet. Deep Learning is a specific country on that continent. All DL is ML, but not all ML is DL.",
        analogy: {
          title: "The Russian Dolls",
          description: "AI is the biggest doll. Open it up, you find ML. Open that up, you find Deep Learning."
        },
        visualType: 'interactive',
        animationPrompt: "Concentric circles zooming in",
        takeaway: "Don't say 'AI' when you mean 'Deep Learning'. Precision matters.",
        quiz: {
          question: "Is Linear Regression considered Deep Learning?",
          options: [
            { text: "Yes", isCorrect: false },
            { text: "No, it's Machine Learning but not Deep Learning", isCorrect: true },
            { text: "No, it's not even AI", isCorrect: false }
          ],
          explanation: "Linear Regression is a classic ML algorithm. It doesn't use multi-layered neural networks, so it's not Deep Learning."
        }
      },
      {
        id: "intro",
        title: "Rules vs. Learning",
        subtitle: "Why we need Machine Learning",
        shortDescription: [
          "Traditional Code: You write the rules (IF x THEN y).",
          "Machine Learning: The machine figures out the rules from data.",
          "Use ML when the rules are too complex to write by hand."
        ],
        eli5: "Traditional coding is giving a robot a recipe. ML is showing the robot 1,000 photos of a cake and letting it figure out the recipe itself.",
        analogy: {
          title: "The Dog Trainer",
          description: "You don't program a dog with code. You show it examples (Sit -> Treat) until it learns the pattern."
        },
        visualType: 'interactive',
        animationPrompt: "Code block vs Neural Net evolving",
        takeaway: "If you can write the logic in 10 'If-Else' statements, don't use AI.",
        quiz: {
          question: "When should you NOT use Machine Learning?",
          options: [
            { text: "When you have lots of data", isCorrect: false },
            { text: "When the rules are simple and exact", isCorrect: true },
            { text: "When the problem is complex", isCorrect: false }
          ],
          explanation: "ML is probabilistic and expensive. If precise logic works, use it."
        }
      },
      {
        id: "supervised-unsupervised",
        title: "Supervised vs. Unsupervised",
        subtitle: "Do we have the answers?",
        shortDescription: [
          "Supervised: Training with labeled data (Question + Answer).",
          "Unsupervised: Training with raw data (Just Questions).",
          "Supervised is for prediction; Unsupervised is for discovery."
        ],
        eli5: "Supervised learning is like a teacher grading your homework—you know what you got right or wrong. Unsupervised learning is like learning a language by just listening to people speak—you figure out patterns on your own.",
        analogy: {
          title: "The Classroom",
          description: "Supervised: A test with an answer key. Unsupervised: Grouping students by height without knowing their names."
        },
        visualType: 'diagram',
        animationPrompt: "Sorting colored balls vs sorting shapes",
        takeaway: "Supervised Learning requires expensive labeling. Unsupervised is cheaper but harder to control.",
        quiz: {
          question: "You want to group customers by purchasing behavior, but you don't have predefined groups. Which approach?",
          options: [
            { text: "Supervised Learning", isCorrect: false },
            { text: "Unsupervised Learning (Clustering)", isCorrect: true }
          ],
          explanation: "You don't have the 'labels' (answers) yet, you just want to find natural patterns."
        }
      },
      {
        id: "ai-landscape",
        title: "Predictive vs. Generative",
        subtitle: "The Two Buckets of AI",
        shortDescription: [
          "Predictive AI: Classifies data or predicts numbers (Fraud, Recommendations).",
          "Generative AI: Creates new content (Text, Images, Code).",
          "AI is probabilistic (it guesses), not deterministic (like logic)."
        ],
        eli5: "Predictive AI is like a calculator that guesses the next number. Generative AI is like an artist who paints a new picture based on what they've seen before.",
        analogy: {
          title: "The Chef vs. The Critic",
          description: "Generative AI is a Chef creating new dishes. Predictive AI is a Critic tasting a dish and telling you if it's 'Spicy' or 'Sweet'."
        },
        visualType: 'diagram',
        animationPrompt: "Two distinct paths: Data->Label and Prompt->Content",
        takeaway: "Know the difference: Are you classifying existing data or creating new data?",
        quiz: {
          question: "A feature detects if an uploaded ID card is fake. What type of AI is this?",
          options: [
            { text: "Generative AI", isCorrect: false },
            { text: "Predictive AI (Classification)", isCorrect: true }
          ],
          explanation: "It's analyzing a pattern to assign a label (Fake/Real), not creating new content."
        }
      },
      {
        id: "value-matrix",
        title: "The Value Hypothesis",
        subtitle: "Strategy: Do you really need AI?",
        shortDescription: [
          "High Value/Feasible: Unstructured text/image tasks.",
          "Low Value: Deterministic math/logic (use rules instead).",
          "Don't use a supercomputer to add 2+2."
        ],
        eli5: "You don't need a genius AI to tell you that 5+5=10. You need a calculator. Save the AI for writing poems or spotting cats.",
        analogy: {
          title: "The Golden Hammer",
          description: "If you have a hammer (AI), everything looks like a nail. But sometimes you just need a screwdriver (Simple Code)."
        },
        visualType: 'diagram',
        animationPrompt: "Sorting tasks into AI vs Rules buckets",
        takeaway: "Only use AI for probabilistic, unstructured problems.",
        quiz: {
          question: "Which task is BAD for Generative AI?",
          options: [
            { text: "Summarizing reviews", isCorrect: false },
            { text: "Calculating exact GST", isCorrect: true }
          ],
          explanation: "Math requires 100% accuracy. GenAI hallucinations. Use standard code for math."
        }
      }
    ]
  },
  {
    id: 2,
    title: "Data Strategy",
    unlocked: true,
    lessons: [
      {
        id: "train-test",
        title: "Train vs. Test Data",
        subtitle: "The Golden Rule of ML",
        shortDescription: [
          "Never test the model on questions it has already seen.",
          "Training Set: Books the student studies.",
          "Testing Set: The final exam questions."
        ],
        eli5: "If you show a student the exam questions before the test, they will get 100% but learn nothing. You must hide the test data to measure real learning.",
        analogy: {
          title: "Memorization vs Understanding",
          description: "A student who memorizes the textbook fails new questions. A student who understands concepts passes any test."
        },
        visualType: 'interactive',
        animationPrompt: "Splitting a dataset into 80/20 chunks",
        takeaway: "Always hold back data for testing. High training accuracy + low test accuracy = Overfitting.",
        quiz: {
          question: "What does it mean if Training Accuracy is 99% but Test Accuracy is 50%?",
          options: [
            { text: "The model is perfect", isCorrect: false },
            { text: "The model is overfitting (memorizing)", isCorrect: true },
            { text: "The test data is wrong", isCorrect: false }
          ],
          explanation: "The model memorized the study guide but failed the exam."
        }
      },
      {
        id: "eda",
        title: "EDA & Outliers",
        subtitle: "Exploratory Data Analysis",
        shortDescription: [
          "EDA: Investigating data before training.",
          "Outliers: Weird data points that can confuse the model.",
          "Distribution: How spread out is your data?"
        ],
        eli5: "Before cooking, you check your ingredients. Are the eggs rotten? Is the milk sour? EDA is checking the ingredients.",
        analogy: {
          title: "The Rotten Apple",
          description: "One rotten apple spoils the bunch. One massive outlier can skew your entire model's predictions."
        },
        visualType: 'interactive',
        animationPrompt: "Histogram and scatter plot showing outlier",
        takeaway: "Garbage In, Garbage Out. Know your data before you model.",
        quiz: {
          question: "What should you do with an outlier that is clearly a data error (e.g., Age = 200)?",
          options: [
            { text: "Keep it, data is data", isCorrect: false },
            { text: "Remove or fix it", isCorrect: true }
          ],
          explanation: "Bad data confuses the model. Clean it up."
        }
      },
      {
        id: "feature-engineering",
        title: "Feature Engineering",
        subtitle: "Turning Raw Data into Signals",
        shortDescription: [
          "Raw data (text, timestamps) is often useless to a model.",
          "Feature Engineering transforms it into math (e.g., Date -> 'Is_Weekend').",
          "Better features usually beat better algorithms."
        ],
        eli5: "It's like refining crude oil. You can't put raw oil into a car engine; it needs to be processed into petrol. Similarly, models can't run on raw data; they need refined 'features'.",
        analogy: {
          title: "The Translator",
          description: "Raw data is a foreign language. Feature engineering translates it into the language the model speaks (Math & Patterns)."
        },
        visualType: 'interactive',
        animationPrompt: "Transforming raw date string into multiple boolean/numeric signals",
        takeaway: "Models need signals, not just data. Your job is to extract those signals.",
        quiz: {
          question: "Why convert 'Date of Birth' into 'Age' for a model?",
          options: [
            { text: "To save storage space", isCorrect: false },
            { text: "Because 'Age' is a direct numerical signal relating to risk/behavior", isCorrect: true }
          ],
          explanation: "A timestamp (1990-01-01) is just a number. 'Age: 33' is a meaningful signal about life stage."
        }
      },
      {
        id: "rice-ai",
        title: "RICE for AI",
        subtitle: "Prioritizing with Confidence",
        shortDescription: [
          "Reach, Impact, Confidence, Effort.",
          "In AI, 'Confidence' is the killer variable.",
          "Penalties: No data (-50%), High risk of lying (-30%)."
        ],
        eli5: "It's like deciding which mountain to climb. If you don't have a map (Data), your confidence in reaching the top should be zero, no matter how nice the view (Impact) is.",
        analogy: {
          title: "The Foggy Bridge",
          description: "A bridge might lead to gold (High Impact), but if it's covered in fog and missing planks (Low Confidence), you shouldn't cross it."
        },
        visualType: 'diagram',
        animationPrompt: "Bar charts adjusting based on risk",
        takeaway: "Prioritize data acquisition before complex modeling.",
        quiz: {
          question: "Why prioritize a boring data-collection tool over a cool chatbot?",
          options: [
            { text: "To increase Confidence (Data Availability)", isCorrect: true },
            { text: "Because chatbots are boring", isCorrect: false }
          ],
          explanation: "You can't build the chatbot without the data. The boring tool builds the foundation."
        }
      }
    ]
  },
  {
    id: 3,
    title: "Core Mechanics",
    unlocked: true,
    lessons: [
      {
        id: "linear-reg",
        title: "Linear Regression",
        subtitle: "Drawing the Best Line",
        shortDescription: [
          "The simplest form of ML.",
          "Tries to draw a straight line through data points.",
          "Used for predicting numbers (prices, temperature, sales)."
        ],
        eli5: "Imagine trying to lay a stick down on a table so it touches as many scattered marbles as possible. That's the 'line of best fit'.",
        analogy: {
          title: "Trend Spotting",
          description: "If you see your height marked on a wall every year, you can draw a line to guess how tall you'll be next year."
        },
        visualType: 'interactive',
        animationPrompt: "Line adjusting to fit points",
        takeaway: "Linear regression predicts a number based on a trend.",
        quiz: {
          question: "What is Linear Regression best for?",
          options: [
            { text: "Classifying cats vs dogs", isCorrect: false },
            { text: "Predicting house prices", isCorrect: true }
          ],
          explanation: "It outputs a continuous number (value), not a category."
        }
      },
      {
        id: "binary-class",
        title: "Classification",
        subtitle: "Yes or No?",
        shortDescription: [
          "Sorting data into buckets.",
          "Binary: Two buckets (Spam / Not Spam).",
          "Multi-class: Many buckets (Cat / Dog / Bird)."
        ],
        eli5: "It's like sorting laundry. Socks go here, shirts go there. The model learns what a 'sock' looks like.",
        analogy: {
          title: "The Bouncer",
          description: "A club bouncer looks at your ID and decides: 'In' or 'Out'. That's binary classification."
        },
        visualType: 'interactive',
        animationPrompt: "Line separating red and blue dots",
        takeaway: "Classification predicts a category (Label).",
        quiz: {
          question: "Which is a classification task?",
          options: [
            { text: "Predicting temperature (72.5°)", isCorrect: false },
            { text: "Predicting if an email is Spam", isCorrect: true }
          ],
          explanation: "Spam is a category (Label), not a continuous number."
        }
      },
      {
        id: "logistic-reg",
        title: "Logistic Regression",
        subtitle: "Predicting Probability",
        shortDescription: [
          "Don't let the name fool you - it's for Classification.",
          "Outputs a probability between 0 and 1 (S-curve).",
          "Used when you need to know 'How likely is this?'"
        ],
        eli5: "Instead of just saying 'Yes' or 'No', it says 'I'm 85% sure it's Yes'. It fits an S-shaped curve to the data.",
        analogy: {
          title: "The Dimmer Switch",
          description: "Linear regression is an On/Off switch. Logistic regression is a dimmer switch that goes smoothly from 0% to 100%."
        },
        visualType: 'interactive',
        animationPrompt: "S-curve fitting to data",
        takeaway: "Use this when you need a probability score (e.g., Credit Scoring).",
        quiz: {
          question: "What is the output of Logistic Regression?",
          options: [
            { text: "A probability between 0 and 1", isCorrect: true },
            { text: "Any number (like 1,000,000)", isCorrect: false }
          ],
          explanation: "It squashes the output into a probability range."
        }
      },
      {
        id: "kmeans",
        title: "K-Means Clustering",
        subtitle: "Finding Natural Groups",
        shortDescription: [
          "Unsupervised Learning (No answers given).",
          "Groups data points that are close together.",
          "You pick 'K' (number of groups)."
        ],
        eli5: "Imagine a messy room. You throw all the red toys in one pile, blue in another. The algorithm finds the piles for you automatically.",
        analogy: {
          title: "Lunch Tables",
          description: "In a cafeteria, people naturally sit with their friends. K-Means finds these friend groups without knowing who they are."
        },
        visualType: 'interactive',
        animationPrompt: "Points moving into colored clusters",
        takeaway: "Use for customer segmentation or discovering patterns.",
        quiz: {
          question: "Do you need labeled data for K-Means?",
          options: [
            { text: "Yes", isCorrect: false },
            { text: "No, it's Unsupervised", isCorrect: true }
          ],
          explanation: "It finds structure in raw data on its own."
        }
      }
    ]
  },
  {
    id: 4,
    title: "Neural Networks",
    unlocked: true,
    lessons: [
      {
        id: "neural-net-structure",
        title: "Neuron Structure",
        subtitle: "Mimicking the Brain",
        shortDescription: [
          "Neurons: Small units that hold a number.",
          "Layers: Input -> Hidden -> Output.",
          "Connections: Weighted lines between neurons."
        ],
        eli5: "Think of it like a bucket brigade. Data is water passed from person to person (neuron to neuron). Each person decides how much water to pass to the next.",
        analogy: {
          title: "The Voting Committee",
          description: "Each neuron is a committee member voting. If enough members vote 'Yes', the next layer listens."
        },
        visualType: 'interactive',
        animationPrompt: "Network of nodes lighting up",
        takeaway: "Deep Learning is just many layers of these simple neurons.",
        quiz: {
          question: "What connects neurons?",
          options: [
            { text: "Weights", isCorrect: true },
            { text: "Glue", isCorrect: false }
          ],
          explanation: "Weights determine the strength of the signal between neurons."
        }
      },
      {
        id: "activations",
        title: "Activation Functions",
        subtitle: "The Spark of Intelligence",
        shortDescription: [
          "Decides if a neuron should 'fire'.",
          "ReLU: If negative, become 0. If positive, keep it.",
          "Sigmoid: Squish between 0 and 1."
        ],
        eli5: "It's the gatekeeper. It says 'This signal is too weak, ignore it' or 'This signal is strong, pass it on!'",
        analogy: {
          title: "The Light Switch",
          description: "You need a certain amount of pressure to flip a switch. Activation functions define that threshold."
        },
        visualType: 'interactive',
        animationPrompt: "Graph lines changing shape",
        takeaway: "Without non-linear activations, a Neural Net is just Linear Regression.",
        quiz: {
          question: "What does ReLU do?",
          options: [
            { text: "Turns negative numbers to zero", isCorrect: true },
            { text: "Doubles the number", isCorrect: false }
          ],
          explanation: "It filters out weak (negative) signals."
        }
      },
      {
        id: "forward-prop",
        title: "Forward Propagation",
        subtitle: "Making a Prediction",
        shortDescription: [
          "Data flows from Left to Right.",
          "Input -> Weights -> Activation -> Output.",
          "This is how the model 'thinks'."
        ],
        eli5: "It's like water flowing through pipes. You pour data in the top, it flows through all the junctions (weights), and comes out the bottom as a prediction.",
        analogy: {
          title: "The Assembly Line",
          description: "Raw material (data) enters, passes through machines (layers), and becomes a product (prediction)."
        },
        visualType: 'interactive',
        animationPrompt: "Signal moving left to right",
        takeaway: "Forward prop is for inference (guessing).",
        quiz: {
          question: "Does the model learn during Forward Propagation?",
          options: [
            { text: "Yes", isCorrect: false },
            { text: "No, it just predicts", isCorrect: true }
          ],
          explanation: "Learning happens during Backward Propagation. Forward is just guessing."
        }
      },
      {
        id: "loss-function",
        title: "The Loss Function",
        subtitle: "Measuring the Error",
        shortDescription: [
          "Calculates how wrong the guess was.",
          "Difference between Prediction and Truth.",
          "Goal: Make Loss as close to 0 as possible."
        ],
        eli5: "It's a scoreboard of failure. If you missed the target by 5 inches, your Loss is 5. If you hit it, Loss is 0.",
        analogy: {
          title: "Golf Score",
          description: "In golf, you want a low score. The Loss Function counts your strokes (errors)."
        },
        visualType: 'interactive',
        animationPrompt: "Distance line between guess and target",
        takeaway: "We can't improve if we don't know how wrong we are.",
        quiz: {
          question: "What is the goal of training?",
          options: [
            { text: "Maximize Loss", isCorrect: false },
            { text: "Minimize Loss", isCorrect: true }
          ],
          explanation: "Lower error means better predictions."
        }
      }
    ]
  },
  {
    id: 5,
    title: "How Machines Learn",
    unlocked: true,
    lessons: [
      {
        id: "backward-prop",
        title: "Backpropagation",
        subtitle: "The Learning Step",
        shortDescription: [
          "Sends the error signal backward.",
          "Tells each neuron: 'You contributed this much to the mistake'.",
          "Calculates gradients (direction to change)."
        ],
        eli5: "Imagine a teacher grading a test. They mark the wrong answers and tell you exactly which chapter you need to study more. Backprop is that feedback.",
        analogy: {
          title: "The Blame Game",
          description: "Something went wrong in a project. You trace back who made the mistake and tell them to fix it."
        },
        visualType: 'interactive',
        animationPrompt: "Red signal moving right to left",
        takeaway: "This is the mathematical magic behind modern AI.",
        quiz: {
          question: "What travels backwards?",
          options: [
            { text: "The input data", isCorrect: false },
            { text: "The error signal (gradient)", isCorrect: true }
          ],
          explanation: "We trace the error back to its source to fix the weights."
        }
      },
      {
        id: "gradient-descent",
        title: "Gradient Descent",
        subtitle: "Improving Step-by-Step",
        shortDescription: [
          "Optimizes the weights to reduce Loss.",
          "Learning Rate: How big of a step to take.",
          "Iterative: Happens thousands of times."
        ],
        eli5: "You are on a foggy mountain and want to get to the bottom. You feel the slope with your foot and take a step downhill. Repeat until you are at the bottom.",
        analogy: {
          title: "Walking Downhill",
          description: "Finding the lowest point in a valley (lowest error) by taking small steps downwards."
        },
        visualType: 'interactive',
        animationPrompt: "Ball rolling down a 3D valley",
        takeaway: "Learning is just slowly descending a mountain of error.",
        quiz: {
          question: "What happens if your Learning Rate is too high?",
          options: [
            { text: "You overshoot the bottom", isCorrect: true },
            { text: "You learn perfectly", isCorrect: false }
          ],
          explanation: "Big steps might make you jump right over the goal."
        }
      },
      {
        id: "regularization",
        title: "Regularization",
        subtitle: "Fighting Overfitting",
        shortDescription: [
          "Penalizes the model for being too complex.",
          "Dropout: Randomly turn off neurons during training.",
          "L1/L2: Punish large weights."
        ],
        eli5: "It's like forcing a student to learn the concepts instead of memorizing the answers. We make it harder to cheat.",
        analogy: {
          title: "Training with Weights",
          description: "An athlete trains with a weighted vest (Regularization) so the actual race feels easier."
        },
        visualType: 'interactive',
        animationPrompt: "Bars shrinking or neurons turning off",
        takeaway: "Simpler models generalize better to new data.",
        quiz: {
          question: "Why do we use Dropout?",
          options: [
            { text: "To prevent reliance on specific neurons (Overfitting)", isCorrect: true },
            { text: "To save electricity", isCorrect: false }
          ],
          explanation: "It forces the network to be robust by breaking dependencies."
        }
      }
    ]
  },
  {
    id: 6,
    title: "Advanced Models",
    unlocked: true,
    lessons: [
      {
        id: "decision-trees",
        title: "Decision Trees",
        subtitle: "Flowchart Logic",
        shortDescription: [
          "Splits data based on questions (Is it red?).",
          "Easy to interpret and explain.",
          "Can overfit easily if the tree gets too deep."
        ],
        eli5: "It's a game of 20 Questions. 'Is it an animal?' -> Yes. 'Does it bark?' -> Yes. It's a dog!",
        analogy: {
          title: "The Flowchart",
          description: "A doctor diagnosing a patient follows a tree: 'Do you have a fever?' -> Yes -> 'Cough?' -> Yes -> Flu."
        },
        visualType: 'interactive',
        animationPrompt: "Tree branching out",
        takeaway: "Great for explainability, but weak on its own.",
        quiz: {
          question: "What is the root of the tree?",
          options: [
            { text: "The final answer", isCorrect: false },
            { text: "The first question/split", isCorrect: true }
          ],
          explanation: "The root is where the logic starts."
        }
      },
      {
        id: "ensemble-basics",
        title: "Ensembles & Forests",
        subtitle: "Wisdom of Crowds",
        shortDescription: [
          "Combine many weak models to make a strong one.",
          "Random Forest: Many Decision Trees voting.",
          "Reduces error and overfitting."
        ],
        eli5: "Asking one person is risky. Asking 100 people and taking the majority vote is usually correct. That's a Random Forest.",
        analogy: {
          title: "The Jury",
          description: "One juror might be biased. 12 jurors voting helps ensure a fair verdict."
        },
        visualType: 'interactive',
        animationPrompt: "Multiple trees voting",
        takeaway: "Ensembles are the secret weapon for winning Kaggle competitions.",
        quiz: {
          question: "What is a Random Forest?",
          options: [
            { text: "A real forest", isCorrect: false },
            { text: "A collection of Decision Trees", isCorrect: true }
          ],
          explanation: "It's a 'forest' because it's made of many 'trees'."
        }
      },
      {
        id: "cnn-conv",
        title: "CNNs (Computer Vision)",
        subtitle: "How Computers See",
        shortDescription: [
          "Convolutional Neural Networks.",
          "Scans images with filters (Convolutions).",
          "Detects edges, then shapes, then objects."
        ],
        eli5: "Imagine looking at a picture through a small sliding window. You look for straight lines, then curves, then eyes, then faces.",
        analogy: {
          title: "The Sliding Window",
          description: "Scanning a document line by line with a magnifying glass to find keywords."
        },
        visualType: 'interactive',
        animationPrompt: "Grid sliding over an image",
        takeaway: "CNNs preserve spatial relationships (pixels near each other matter).",
        quiz: {
          question: "What does a filter detect?",
          options: [
            { text: "Features like edges or textures", isCorrect: true },
            { text: "The file size", isCorrect: false }
          ],
          explanation: "Filters are feature detectors."
        }
      },
      {
        id: "rl-intro",
        title: "Reinforcement Learning",
        subtitle: "Learning by Trial & Error",
        shortDescription: [
          "Agent: The learner.",
          "Environment: The world.",
          "Reward/Penalty: Feedback.",
          "Goal: Maximize total reward."
        ],
        eli5: "It's like training a dog. Good boy = Treat. Bad boy = No treat. The dog learns to do the things that get treats.",
        analogy: {
          title: "Video Games",
          description: "Playing Mario. You die (Penalty) or get a coin (Reward). You learn to jump at the right time."
        },
        visualType: 'interactive',
        animationPrompt: "Agent moving in a grid",
        takeaway: "Used for robots, games, and complex control systems.",
        quiz: {
          question: "What guides the agent?",
          options: [
            { text: "The Reward Signal", isCorrect: true },
            { text: "A manual", isCorrect: false }
          ],
          explanation: "The agent optimizes its behavior to get more rewards."
        }
      }
    ]
  },
  {
    id: 7,
    title: "GenAI & LLMs",
    unlocked: true,
    lessons: [
      {
        id: "tokenization",
        title: "Tokenization",
        subtitle: "How AI Reads",
        shortDescription: [
          "Text is chopped into chunks called Tokens.",
          "Tokens can be words, parts of words, or characters.",
          "1000 tokens ≈ 750 words."
        ],
        eli5: "Computers don't read words. They read Lego bricks of text. 'Smart' might be one brick, but 'Unbelievable' might be three bricks: 'Un-believ-able'.",
        analogy: {
          title: "Syllables",
          description: "Just like we break words into sounds, AI breaks words into computed chunks."
        },
        visualType: 'interactive',
        animationPrompt: "Text splitting into blocks",
        takeaway: "You pay for LLMs by the token, not by the word.",
        quiz: {
          question: "Is 1 token always 1 word?",
          options: [
            { text: "Yes", isCorrect: false },
            { text: "No, it's roughly 0.75 words", isCorrect: true }
          ],
          explanation: "Complex words are split into multiple tokens."
        }
      },
      {
        id: "embeddings",
        title: "Embeddings",
        subtitle: "Meaning as Math",
        shortDescription: [
          "Turning text into a list of numbers (Vector).",
          "Similar meanings have similar numbers.",
          "Allows math on concepts (King - Man + Woman = Queen)."
        ],
        eli5: "Imagine a map of meaning. 'Dog' and 'Puppy' live in the same neighborhood. 'Cat' is nearby. 'Car' is in a totally different city. Embeddings are the GPS coordinates.",
        analogy: {
          title: "The Library System",
          description: "Books are organized by topic (History, Sci-Fi), not just by the first letter of the title."
        },
        visualType: 'interactive',
        animationPrompt: "Words floating in 3D space",
        takeaway: "Embeddings enable Semantic Search (searching by meaning, not keywords).",
        quiz: {
          question: "Why use Embeddings?",
          options: [
            { text: "To make text readable", isCorrect: false },
            { text: "To help computers understand relationships between concepts", isCorrect: true }
          ],
          explanation: "It translates human meaning into machine numbers."
        }
      },
      {
        id: "attention-mechanism",
        title: "Attention Mechanism",
        subtitle: "The 'T' in GPT",
        shortDescription: [
          "Allows the model to focus on relevant words, regardless of distance.",
          "Before Attention, AI forgot the start of long sentences.",
          "It calculates relationships: 'Bank' relates to 'Money', not 'River' here."
        ],
        eli5: "When you read a long sentence, you don't give every word equal importance. If I say 'The big red dog...', you focus on 'dog'. Attention lets the AI focus on the keywords that matter.",
        analogy: {
          title: "The Spotlight",
          description: "In a dark room (a sentence), the AI shines a spotlight (Attention) only on the objects (words) relevant to the current task."
        },
        visualType: 'diagram',
        animationPrompt: "Lines connecting related words in a sentence",
        takeaway: "Transformers (Attention) enabled modern GenAI by understanding context.",
        quiz: {
          question: "What problem did Attention solve?",
          options: [
            { text: "It made computers faster", isCorrect: false },
            { text: "It allowed models to understand long-range context", isCorrect: true }
          ],
          explanation: "Old models (RNNs) forgot the beginning of the paragraph. Attention remembers everything relevant."
        }
      },
      {
        id: "vector-db",
        title: "Vector Databases",
        subtitle: "The Memory of AI",
        shortDescription: [
          "Stores Embeddings for fast retrieval.",
          "Enables Similarity Search.",
          "Crucial for RAG (Retrieval Augmented Generation)."
        ],
        eli5: "It's a special filing cabinet where you don't look for folder names, you look for 'folders that feel like this one'.",
        analogy: {
          title: "The Color Match",
          description: "You bring a paint chip to the store to find a matching color. You aren't looking for 'Paint #412', you are looking for 'Something close to this'."
        },
        visualType: 'interactive',
        animationPrompt: "Searching through points in space",
        takeaway: "Vector DBs allow LLMs to 'remember' your private data.",
        quiz: {
          question: "What does a Vector DB search for?",
          options: [
            { text: "Exact keyword matches", isCorrect: false },
            { text: "Nearest semantic neighbors", isCorrect: true }
          ],
          explanation: "It finds the closest vectors in the mathematical space."
        }
      },
      {
        id: "llms",
        title: "LLMs & Prediction",
        subtitle: "The Next Token",
        shortDescription: [
          "Large Language Model.",
          "Trained to predict the next word in a sequence.",
          "It doesn't 'know' facts, it knows probabilities."
        ],
        eli5: "It's like a super-advanced autocomplete on your phone. It guesses the next word based on everything it has ever read on the internet.",
        analogy: {
          title: "The Parrot",
          description: "A very smart parrot that has heard every conversation ever, and can stitch together sentences that sound right."
        },
        visualType: 'interactive',
        animationPrompt: "Predicting the next word with probabilities",
        takeaway: "LLMs are probabilistic engines, which is why they hallucinate.",
        quiz: {
          question: "How does ChatGPT generate text?",
          options: [
            { text: "It looks up the answer in a database", isCorrect: false },
            { text: "It predicts one token at a time", isCorrect: true }
          ],
          explanation: "It computes the most likely next piece of text repeatedly."
        }
      },
      {
        id: "llm-rag",
        title: "RAG",
        subtitle: "Retrieval-Augmented Generation",
        shortDescription: [
          "Retrieval: Find relevant data.",
          "Augmented: Give it to the LLM.",
          "Generation: LLM answers using that data."
        ],
        eli5: "Don't just ask the AI a question. Give it a cheat sheet (your documents) and say 'Answer using only this info'.",
        analogy: {
          title: "Open Book Exam",
          description: "You don't memorize the answers. You look them up in the textbook when asked."
        },
        visualType: 'diagram',
        animationPrompt: "Document -> Context -> Answer",
        takeaway: "Use RAG to stop hallucinations and use your own private data.",
        quiz: {
          question: "Why use RAG instead of Fine-Tuning?",
          options: [
            { text: "It's cooler", isCorrect: false },
            { text: "It allows using real-time, private data without retraining", isCorrect: true }
          ],
          explanation: "Fine-tuning is static. RAG is dynamic."
        }
      }
    ]
  },
  {
    id: 8,
    title: "Product Execution",
    unlocked: true,
    lessons: [
      {
        id: "ai-lifecycle",
        title: "The AI Lifecycle",
        subtitle: "The Loop vs The Line",
        shortDescription: [
          "Traditional software is linear (Build -> Ship).",
          "AI is circular (Data -> Train -> Deploy -> Feedback -> Data).",
          "Models 'rot' (Data Drift) and must be retrained."
        ],
        eli5: "A car comes off the factory line and is done. A plant needs water and sunlight every day or it dies. AI is a plant.",
        analogy: {
          title: "Gardening vs Construction",
          description: "Software is building a house. AI is tending a garden. It requires constant maintenance and new nutrients (data)."
        },
        visualType: 'diagram',
        animationPrompt: "Circular feedback loop",
        takeaway: "Plan for constant retraining and monitoring.",
        quiz: {
          question: "Why did your model's accuracy drop after 6 months?",
          options: [
            { text: "Data Drift (User behavior changed)", isCorrect: true },
            { text: "The code rusted", isCorrect: false }
          ],
          explanation: "Real-world data changes over time. Static models fail in dynamic worlds."
        }
      },
      {
        id: "gain-lift",
        title: "Metrics that Matter",
        subtitle: "Accuracy vs Utility",
        shortDescription: [
          "Model Metric: Precision/Recall (Is it correct?).",
          "Product Metric: Acceptance Rate (Is it useful?).",
          "A correct prediction isn't always useful."
        ],
        eli5: "If a weather app correctly predicts 'Sun' in the Sahara Desert, it has high accuracy but low value. You need to predict the surprises.",
        analogy: {
          title: "The Correct but Boring Friend",
          description: "A friend who tells you 'The sky is blue' is 100% accurate but 0% helpful."
        },
        visualType: 'diagram',
        animationPrompt: "Chart showing utility vs accuracy",
        takeaway: "Measure user outcomes (Acceptance Rate), not just model accuracy.",
        quiz: {
          question: "Developers ignore 80% of your code AI's suggestions, even though they are syntactically correct. What is the issue?",
          options: [
            { text: "Low Utility / Acceptance Rate", isCorrect: true },
            { text: "Low F1 Score", isCorrect: false }
          ],
          explanation: "The model is accurate (valid code) but not useful (maybe too obvious)."
        }
      },
      {
        id: "jtbd-agents",
        title: "Copilot vs. Autopilot",
        subtitle: "UX for Agents",
        shortDescription: [
          "Level 1 (Copilot): Assist. Human responsible.",
          "Level 2 (Autopilot): Delegate. Human reviews.",
          "Level 3 (Agent): Outsource. AI responsible."
        ],
        eli5: "Copilot is GPS telling you where to turn. Autopilot is a self-driving car where you keep hands on the wheel. Agent is a taxi.",
        analogy: {
          title: "Intern vs Manager",
          description: "Copilot is an intern drafting an email. Agent is a manager sending it for you."
        },
        visualType: 'diagram',
        animationPrompt: "Levels of automation icons",
        takeaway: "Start with Copilot to build trust.",
        quiz: {
          question: "Which is the safest starting point for a high-risk task?",
          options: [
            { text: "Full Automation", isCorrect: false },
            { text: "Copilot (Human-in-the-loop)", isCorrect: true }
          ],
          explanation: "Always keep humans in the loop for risky decisions."
        }
      },
      {
        id: "ethics-bias",
        title: "Ethics & Bias",
        subtitle: "Responsible AI",
        shortDescription: [
          "Bias: Models amplify stereotypes in training data.",
          "Hallucinations: GenAI makes things up.",
          "Privacy: Never train on PII (Personal Data)."
        ],
        eli5: "If you teach a parrot only insults, it will only speak insults. The model is a mirror of the data you feed it.",
        analogy: {
          title: "The Mirror",
          description: "AI reflects the biases of society. You need to polish the mirror (clean the data) to get a fair reflection."
        },
        visualType: 'diagram',
        animationPrompt: "Filtering bad data",
        takeaway: "You are responsible for the model's output. Audit your data.",
        quiz: {
          question: "Your hiring AI selects 80% men. What do you do?",
          options: [
            { text: "Blame the math", isCorrect: false },
            { text: "Audit and re-balance the training data", isCorrect: true }
          ],
          explanation: "Historical data contains historical bias. You must actively correct it."
        }
      },
      {
        id: "xai-trust",
        title: "Explainable AI (XAI)",
        subtitle: "Cracking the Black Box",
        shortDescription: [
          "Black Box: You see the output but not 'why'.",
          "LIME/SHAP: Tools to explain individual predictions.",
          "Trust: Users only trust AI if they understand its logic."
        ],
        eli5: "Instead of a doctor just saying 'You are sick', XAI is the doctor showing you the X-ray and pointing to exactly where the problem is. It helps you understand the 'Why'.",
        analogy: {
          title: "The High School Math Teacher",
          description: "Your teacher doesn't just want the answer. They want to see your 'working out'. XAI is showing the model's working out."
        },
        visualType: 'interactive',
        animationPrompt: "Model output with feature importance bars",
        takeaway: "Explainability is a debugging tool for PMs and a trust tool for users.",
        quiz: {
          question: "What is the primary benefit of SHAP or LIME?",
          options: [
            { text: "They make models faster", isCorrect: false },
            { text: "They explain which features caused a specific prediction", isCorrect: true },
            { text: "They prevent hallucinations", isCorrect: false }
          ],
          explanation: "XAI tools highlight the 'feature importance' for a single prediction, turning a black box into a glass box."
        }
      }
    ]
  },
  {
    id: 9,
    title: "Capstone",
    unlocked: true,
    lessons: [
      {
        id: "capstone-simulation",
        title: "The AI Product Simulator",
        subtitle: "Choose Your Industry",
        shortDescription: [
          "Select a domain: TMT, Retail, BFSI, or Health.",
          "Navigate Strategy, Data, and UX trade-offs.",
          "See how AI applies differently across industries."
        ],
        eli5: "It's the final boss battle. Pick your battleground and test your skills.",
        analogy: {
          title: "The Flight Simulator",
          description: "Crash the plane here so you don't crash it in real life."
        },
        visualType: 'interactive',
        animationPrompt: "Interactive Game",
        takeaway: "Context is King. AI strategy depends entirely on the industry constraints.",
        quiz: {
          question: "Which industry requires the highest level of Explainability (XAI)?",
          options: [
            { text: "Retail (Fashion Recommendations)", isCorrect: false },
            { text: "BFSI (Loan Approvals)", isCorrect: true }
          ],
          explanation: "In Finance (and Health), you legally often must explain WHY a decision was made."
        }
      }
    ]
  },
  {
    id: 10,
    title: "Further Learning",
    unlocked: true,
    lessons: [
      {
        id: "learning-resources",
        title: "Additional Resources",
        subtitle: "Continue your journey",
        shortDescription: [
          "Curated list of top-tier AI educators.",
          "YouTube channels, blogs, and podcasts.",
          "From basics to cutting-edge research."
        ],
        eli5: "You've finished the intro course! Now go watch these smart people to become an expert.",
        analogy: {
          title: "The Library",
          description: "We gave you the map. These resources are the library where you can study every detail."
        },
        visualType: 'interactive', 
        animationPrompt: "List of links",
        takeaway: "Learning AI is a continuous journey. Stay curious!",
        quiz: {
          question: "What is the best way to keep learning AI?",
          options: [
            { text: "Stop now, you know everything", isCorrect: false },
            { text: "Build things and follow great educators", isCorrect: true }
          ],
          explanation: "The field moves fast. Continuous learning is key."
        }
      }
    ]
  },
  {
    id: 11,
    title: "The AI PM Toolbox",
    unlocked: true,
    lessons: [
      {
        id: "day-to-day-pm",
        title: "Day-to-Day AI",
        subtitle: "Practical Prompts & Use Cases",
        shortDescription: [
          "Stop analyzing AI, start using it.",
          "Prompts for Strategy, Discovery, PRDs, and GTM.",
          "Copy-paste templates to accelerate your workflow."
        ],
        eli5: "This is your cheat sheet. Instead of writing everything from scratch, use these magic spells (prompts) to get 80% of the work done instantly.",
        analogy: {
          title: "The Exoskeleton",
          description: "AI doesn't replace you; it's a robotic suit that makes you lift heavier strategy and write faster docs."
        },
        visualType: 'interactive',
        animationPrompt: "Prompt Library Interface",
        takeaway: "The best PMs use AI as a 'Thought Partner' to unblock creativity and speed up execution.",
        quiz: {
          question: "When using AI for a PRD, what should you verify?",
          options: [
            { text: "Nothing, it's always right", isCorrect: false },
            { text: "Everything, specifically specific logic and edge cases", isCorrect: true }
          ],
          explanation: "AI is great at structure but bad at context. Always human-review the output."
        }
      }
    ]
  }
];
