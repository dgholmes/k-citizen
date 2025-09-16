import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { flatQuestions as questions } from '../data/derived';
import { Question } from '../types'; // Assuming this path is correct

const QuizScreen = ({ route, navigation }: any) => {
  const { subject } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const load = async () => {
      const filteredQuestions = questions.filter(q => q.subject === subject);
      setQuizQuestions(filteredQuestions);
      try {
        const key = `progress:${subject}`;
        const saved = await AsyncStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved);
          const savedIndex = Math.min(parsed.currentIndex ?? 0, Math.max(filteredQuestions.length - 1, 0));
          const savedAnswers = Array.isArray(parsed.userAnswers) ? parsed.userAnswers.slice(0, filteredQuestions.length) : Array(filteredQuestions.length).fill(null);
          setCurrentQuestionIndex(savedIndex);
          setUserAnswers(savedAnswers);
          const nextSel = savedAnswers[savedIndex] ?? null;
          setSelectedAnswer(nextSel);
          setShowFeedback(nextSel !== null);
          return;
        }
      } catch {}
      setUserAnswers(Array(filteredQuestions.length).fill(null));
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCurrentQuestionIndex(0);
    };
    load();
  }, [subject]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // --- NEW LOGIC: Immediate feedback on selection ---
  // This function shows feedback as soon as an answer is picked.
  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Don't allow changing answer after feedback is shown
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
    AsyncStorage.setItem(`progress:${subject}`, JSON.stringify({
      currentIndex: currentQuestionIndex,
      userAnswers: newAnswers,
      updatedAt: Date.now(),
    })).catch(() => {});
  };

  // This function now only handles moving to the next question.
  const handleNext = () => {
    // Navigate to the next question or finish the quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Restore the state of the next question if it was answered before
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1]); 
      // If the next question hasn't been answered, don't show feedback
      setShowFeedback(userAnswers[currentQuestionIndex + 1] !== null);
      AsyncStorage.setItem(`progress:${subject}`, JSON.stringify({
        currentIndex: currentQuestionIndex + 1,
        userAnswers,
        updatedAt: Date.now(),
      })).catch(() => {});
    } else {
      // Quiz finished, navigate to Results
      const score: number = userAnswers.reduce<number>((acc, answer, index) => {
        return acc + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
      }, 0);

      navigation.navigate('Results', {
        score,
        totalQuestions: quizQuestions.length,
        percentage: Math.round((score / quizQuestions.length) * 100),
        incorrectAnswers: quizQuestions.filter((q, index) => userAnswers[index] !== q.correctAnswer),
      });
      AsyncStorage.removeItem(`progress:${subject}`).catch(() => {});
    }
  };

  /*
  // --- OLD LOGIC: Submit button implementation (kept for reference) ---
  // To revert:
  // 1. Comment out the two functions above (`handleAnswerSelect` and `handleNext`).
  // 2. Uncomment the two functions below.
  // 3. Change the text in the "Next" button's <Text> component back to:
  //    `{!showFeedback ? 'Submit' : currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}`

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Don't allow changing answer after submitting
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      Alert.alert('Please select an answer');
      return;
    }

    // This block runs when the user presses "Submit"
    if (!showFeedback) {
      setShowFeedback(true);
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setUserAnswers(newAnswers);
      return; // Wait for the user to press "Next" or "Finish"
    }

    // This block runs when the user presses "Next" or "Finish"
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1]); // Show previous answer if exists
      setShowFeedback(false);
    } else {
      // Quiz finished, navigate to Results
      const score = userAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
      }, 0);

      navigation.navigate('Results', {
        score,
        totalQuestions: quizQuestions.length,
        percentage: Math.round((score / quizQuestions.length) * 100),
        incorrectAnswers: quizQuestions.filter((q, index) => userAnswers[index] !== q.correctAnswer),
      });
    }
  };
  */

  // This function handles the logic for the "Previous" button.
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Restore the state of the previous question
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1]);
      // Feedback should always be shown for previously answered questions
      setShowFeedback(true); 
      AsyncStorage.setItem(`progress:${subject}`, JSON.stringify({
        currentIndex: currentQuestionIndex - 1,
        userAnswers,
        updatedAt: Date.now(),
      })).catch(() => {});
    }
  };

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{quizQuestions.length === 0 ? '문제를 찾을 수 없습니다.' : '로딩 중...'}</Text>
      </SafeAreaView>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header with back button and title */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{subject}</Text>
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
              <Text style={styles.optionText}>
                {option}
              </Text>
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
            <Text style={styles.navButtonText}>이전</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}
            disabled={!showFeedback} // Next button is disabled until an answer is selected
          >
            <Text style={styles.navButtonText}>
              {currentQuestionIndex === quizQuestions.length - 1 ? '완료' : '다음'}
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

export default QuizScreen;