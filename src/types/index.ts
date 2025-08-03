export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  subject: string;
}

export interface Subject {
  id: string;
  name: string;
  totalQuestions: number;
  completedQuestions: number;
  accuracy: number;
  icon: string;
}

export interface UserProgress {
  totalQuestionsAnswered: number;
  consecutiveStudyDays: number;
  overallAccuracy: number;
  totalStudyTime: number;
  subjectProgress: {
    [key: string]: {
      accuracy: number;
      questionsAnswered: number;
    };
  };
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  incorrectAnswers: Question[];
  timeSpent: number;
}