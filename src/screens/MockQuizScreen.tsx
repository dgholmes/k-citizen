// src/screens/MockQuizScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { flatQuestions as questions } from '../data/derived';
import { Question } from '../types'; // Assuming this path is correct

// Helper function to shuffle an array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MockQuizScreen = ({ route, navigation }: any) => {
  const { subject, questionCount, timeLimit } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit ? timeLimit * 60 : null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const appState = useRef(AppState.currentState);
  const backgroundTime = useRef<number | null>(null);


  // Function to handle quiz completion
  const finishQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    const score = userAnswers.reduce((acc, answer, index) => {
        if (index < quizQuestions.length && answer === quizQuestions[index].correctAnswer) {
            return acc + 1;
        }
        return acc;
    }, 0);

    navigation.navigate('Results', {
        score,
        totalQuestions: quizQuestions.length,
        percentage: Math.round((score / quizQuestions.length) * 100),
        incorrectAnswers: quizQuestions.filter((q, index) => userAnswers[index] !== q.correctAnswer),
    });
  };

  // Effect for setting up questions
  useEffect(() => {
    let selectedQuestions;
    if (subject === 'Mock Test') {
      // For mock tests, shuffle all questions and take the specified count
      const allQuestions = shuffleArray([...questions]);
      selectedQuestions = allQuestions.slice(0, questionCount);
    } else {
      // For regular quizzes, filter by subject (no slicing)
      const filteredQuestions = questions.filter(q => q.subject === subject);
      selectedQuestions = filteredQuestions;
    }
    setQuizQuestions(selectedQuestions);
    setUserAnswers(Array(selectedQuestions.length).fill(null));
  }, [subject, questionCount]);

  // Effect for the timer
  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft === 0) {
        finishQuiz();
        return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => (prevTime ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft]);

  // Effect for handling app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to the foreground
        if (backgroundTime.current && timeLeft) {
          const timeElapsedInBackground = Math.floor((Date.now() - backgroundTime.current) / 1000);
          setTimeLeft(prevTime => Math.max(0, (prevTime || 0) - timeElapsedInBackground));
        }
      } else if (nextAppState.match(/inactive|background/)) {
        // App has gone to the background
        backgroundTime.current = Date.now();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [timeLeft]);


  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1]);
      setShowFeedback(userAnswers[currentQuestionIndex + 1] !== null);
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1]);
      setShowFeedback(true);
    }
  };

  // Format time for display
  const formatTime = () => {
    if (timeLeft === null) return '';
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{quizQuestions.length === 0 ? '문제를 찾을 수 없습니다.' : 'Loading...'}</Text>
      </SafeAreaView>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header with back button and dynamic title/timer */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {timeLimit ? formatTime() : (subject === 'Mock Test' ? 'Mock Quiz' : subject)}
          </Text>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1} / {quizQuestions.length}
          </Text>
        </View>

        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                !showFeedback && selectedAnswer === index && styles.selectedOption,
                showFeedback && index === currentQuestion.correctAnswer && styles.correctOption,
                showFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer && styles.incorrectOption,
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={showFeedback}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {showFeedback && (
          <View style={[styles.feedbackContainer, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
            <Text style={[styles.feedbackTitle, { color: isCorrect ? '#445559' : '#1F2123' }]}>
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </Text>
            {currentQuestion.explanation && (
              <Text style={[styles.feedbackText, { color: isCorrect ? '#445559' : '#1F2123' }]}>
                {currentQuestion.explanation}
              </Text>
            )}
          </View>
        )}
      </View>

      {/* Footer with navigation buttons */}
      <View style={styles.footerContainer}>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={[styles.navButton, styles.previousButton]}
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}
            disabled={!showFeedback}
          >
            <Text style={styles.navButtonText}>
              {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    position: 'relative',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
  },
  backButtonIcon: {
    fontSize: 28,
    color: '#121516',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121516',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E9ECEF',
    borderRadius: 3,
    marginRight: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1F2123',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#121516',
    marginBottom: 24,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  optionButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 12,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#121516',
  },
  selectedOption: {
    borderColor: '#AFCED9',
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: '#C4D2CA',
    borderColor: '#445559',
    borderWidth: 1,
  },
  incorrectOption: {
    backgroundColor: '#E9C9CD',
    borderColor: '#D1A9B0',
    borderWidth: 1,
  },
  feedbackContainer: {
    marginTop: 24,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
  },
  correctFeedback: {
    backgroundColor: '#C4D2CA',
  },
  incorrectFeedback: {
    backgroundColor: '#E9C9CD',
  },
  feedbackTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 20,
  },
  footerContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    backgroundColor: '#FFFFFF',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousButton: {
    backgroundColor: '#F0F2F5',
  },
  nextButton: {
    backgroundColor: '#AFCED9',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2123',
  },
});

export default MockQuizScreen;
