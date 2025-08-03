import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ResultsScreen = ({ route, navigation }: any) => {
  const { score, totalQuestions, percentage, incorrectAnswers } = route.params;

  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent work! You're well prepared.";
    if (percentage >= 60) return "Good job! Keep studying to improve.";
    return "Keep practicing! You'll get better with time.";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return '#28A745';
    if (percentage >= 60) return '#FFC107';
    return '#DC3545';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#4A90E2', '#357ABD']}
          style={styles.resultIcon}
        >
          <Text style={styles.iconText}>🎓</Text>
        </LinearGradient>
        <Text style={styles.congratulations}>Congratulations!</Text>
        <Text style={styles.completionText}>
          You've successfully completed the quiz.{'\n'}
          Here's a summary of your performance.
        </Text>
      </View>

      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}/{totalQuestions}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Percentage</Text>
          <Text style={[styles.scoreValue, { color: getPerformanceColor() }]}>
            {percentage}%
          </Text>
        </View>
      </View>

      <View style={styles.performanceContainer}>
        <Text style={[styles.performanceText, { color: getPerformanceColor() }]}>
          {getPerformanceMessage()}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        {incorrectAnswers.length > 0 && (
          <TouchableOpacity 
            style={styles.reviewButton}
            onPress={() => {
              // Navigate to review screen or show incorrect answers
              navigation.navigate('ReviewAnswers', { incorrectAnswers });
            }}
          >
            <Text style={styles.reviewButtonText}>Review Incorrect Answers</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.returnButton}
          onPress={() => navigation.navigate('StudyMain')}
        >
          <Text style={styles.returnButtonText}>Return to Topics</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resultIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 40,
  },
  congratulations: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  completionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  scoreBox: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  performanceContainer: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: 'center',
  },
  performanceText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  actionsContainer: {
    gap: 15,
  },
  reviewButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  returnButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResultsScreen;