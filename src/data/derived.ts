import { questions as rawQuestions } from './questions';
import { Question, Subject } from '../types';

type RawGroup = {
  id?: string;
  subject?: string;
  subjectEn?: string;
  icon?: string;
  estimatedTime?: number;
  questions: Array<{
    id: string;
    category?: string;
    question: string;
    questionEn?: string;
    options?: string[];
    optionsEn?: string[];
    correctAnswer: string;
    correctAnswerEn?: string;
    explanation?: string;
    explanationEn?: string;
    type?: string;
  }>;
};

const isGroupedFormat = (data: any): data is RawGroup[] => {
  return Array.isArray(data) && data.length > 0 && !!data[0]?.questions;
};

export const flatQuestions: Question[] = (() => {
  const data: any = rawQuestions as any;
  if (!isGroupedFormat(data)) {
    // Assume already flat and correctly typed
    return data as Question[];
  }

  const flattened: Question[] = [];
  for (const group of data as RawGroup[]) {
    const subjectName = group.subject || group.subjectEn || '알 수 없는 과목';
    for (const q of group.questions) {
      const options = q.options || q.optionsEn || [];
      const correctValue = (q.correctAnswer || q.correctAnswerEn) ?? '';
      const correctIndex = options.indexOf(correctValue);

      // Only include multiple-choice style questions we can render today
      if (options.length === 0 || correctIndex < 0) {
        continue;
      }

      const mapped: Question = {
        id: q.id,
        question: q.question || q.questionEn || '',
        options,
        correctAnswer: correctIndex,
        explanation: q.explanation || q.explanationEn,
        subject: subjectName,
      };
      flattened.push(mapped);

      // let finalOptions = q.options || q.optionsEn;
      // let finalCorrectAnswerIndex;

      // // Handle short_answer type questions
      // if (q.type === 'short_answer' && correctValue) {
      //   finalOptions = [correctValue];
      //   finalCorrectAnswerIndex = 0;
      // } else if (finalOptions && finalOptions.length > 0) {
      //   // Handle existing multiple-choice questions
      //   finalCorrectAnswerIndex = finalOptions.indexOf(correctValue);
      //   if (finalCorrectAnswerIndex < 0) {
      //     continue; // Skip if no valid answer is found
      //   }
      // } else {
      //   continue; // Skip if no options are present
      // }

      // const mapped: Question = {
      //   id: q.id,
      //   question: q.question || q.questionEn || '',
      //   options: finalOptions,
      //   correctAnswer: finalCorrectAnswerIndex,
      //   explanation: q.explanation || q.explanationEn,
      //   subject: subjectName,
      // };
      // flattened.push(mapped);

    }
  }
  return flattened;
})();

export const derivedSubjects: Subject[] = (() => {
  const data: any = rawQuestions as any;
  if (!isGroupedFormat(data)) {
    // Derive subjects from flat list
    const bySubject = new Map<string, Question[]>();
    for (const q of data as Question[]) {
      const list = bySubject.get(q.subject) || [];
      list.push(q);
      bySubject.set(q.subject, list);
    }
    return Array.from(bySubject.entries()).map(([name, list]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      totalQuestions: list.length,
      completedQuestions: 0,
      accuracy: 0,
      icon: '📚',
    }));
  }

  // Grouped format
  return (data as RawGroup[]).map((g) => ({
    id: g.id || (g.subject || g.subjectEn || 'subject').toLowerCase().replace(/\s+/g, '-'),
    name: g.subject || g.subjectEn || '알 수 없는 과목',
    // Count all questions defined for the subject
    totalQuestions: (g.questions || []).length,
    completedQuestions: 0,
    accuracy: 0,
    icon: g.icon || '📚',
  }));
})();


