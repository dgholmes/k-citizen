import { Question } from '../types';

export const questions: Question[] = [
  {
    id: '1',
    question: '대한민국의 국화는 무궁화입니다.',
    options: ['O', 'X'],
    correctAnswer: 0,
    explanation: '무궁화는 대한민국의 국화로, "끝이 없이 피어난다"는 의미를 담고 있어 우리나라의 영원한 번영을 상징합니다.',
    subject: 'Korean Culture'
  },
  {
    id: '2',
    question: 'Which of the following is NOT a requirement for naturalization as a Korean citizen?',
    options: [
      'Residency in Korea for at least 5 years',
      'Proficiency in the Korean language',
      'Demonstrated knowledge of Korean culture and history',
      'Proof of Korean ancestry'
    ],
    correctAnswer: 3,
    explanation: 'Proof of Korean ancestry is not a requirement for naturalization as a Korean citizen. Other requirements include residency, language proficiency, and cultural knowledge.',
    subject: 'Korean Culture'
  },
  {
    id: '3',
    question: 'What is the national flower of South Korea?',
    options: ['Rose', 'Cherry Blossom', 'Mugunghwa (Hibiscus)', 'Lotus'],
    correctAnswer: 2,
    explanation: 'The Mugunghwa (Rose of Sharon or Hibiscus syriacus) is the national flower of South Korea.',
    subject: 'Korean Culture'
  },
  {
    id: '4',
    question: 'Which dynasty unified Korea in 935 CE?',
    options: ['Goryeo', 'Joseon', 'Silla', 'Baekje'],
    correctAnswer: 0,
    explanation: 'The Goryeo dynasty unified Korea in 935 CE, ending the Later Three Kingdoms period.',
    subject: 'Korean History'
  },
  {
    id: '5',
    question: 'The Korean War lasted from 1950 to 1953.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'The Korean War began on June 25, 1950, and ended with the armistice agreement on July 27, 1953.',
    subject: 'Korean History'
  }
];
