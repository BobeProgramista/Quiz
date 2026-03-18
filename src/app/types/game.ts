export type Category = 'history' | 'geography';

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: number; // индекс на правилния отговор (0-3)
  prize: number;
}
