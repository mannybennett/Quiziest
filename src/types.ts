export interface Question {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string; 
  incorrect_answers: string[];
}

export enum Numbers {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8, 
  Nine = 9,
  Ten = 10
}

export interface GeneralProps {
  loading: boolean;
  tracker: Numbers; 
  score: Numbers;
  handleRestart: () => void;
  decode: (encodedText: string) => string;
  question: Question;
  answers: string[];
  correctAnswer: string;
  handleRightAnswer: () => void;
  handleWrongAnswer: () => void; 
  answered: boolean;
  handleNext: () => void;
}

export type Topic = {
  key: string;
  title: string;
};

export type UrlsType = {
  [key in Topic['key']]: string;
};