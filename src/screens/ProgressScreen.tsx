import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { subjects } from '../data/subjects';
import { UserProgress } from '../types';

interface ProgressScreenProps {
  navigation: any;
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({ navigation }) => {
  // Mock progress data - in a real app, this would come from storage/database
  const mockProgress: UserProgress[] = [
    {
      subjectId: 'history',
      questionsAnswered: 45,
      correctAnswers: 38,
      totalTimeSpent: 1800,
      lastStudied: new Date('2024-01-15'),
    },
    {
      subjectId: 'geography',
      questionsAnswered: 32,
      correctAnswers: 28,
      totalTimeSpent: 1200,
      lastStudied: new Date('2024-01-14'),
    },
    {
      subjectId: 'culture',
      questionsAnswered: 28,
      correctAnswers: 24,
      totalTimeSpent: 900,
      lastStudied: new Date('2024-01-13'),
    },
    {
      subjectId: 'politics',
      questionsAnswered: 20,
      correctAnswers: 16,
      totalTimeSpent: 600,
      lastStudied: new Date('2024-01-12'),
    },
    {
      subjectId: 'economy',
      questionsAnswered: 18,
      correctAnswers: 15,
      totalTimeSpent: 450,
      lastStudied: new Date('2024-01-11'),
    },
    {
      subjectId: 'society',
      questionsAnswered: 25,
      correctAnswers: 22,
      totalTimeSpent: 750,
      lastStudied: new Date('2024-01-10'),
    },
  ];

  const totalQuestionsAnswered = mockProgress.reduce((sum, p) => sum + p.questionsAnswered, 0);
  const totalCorrectAnswers = mockProgress.reduce((sum, p) => sum + p.correctAnswers, 0);
  const totalTimeSpent = mockProgress.reduce((sum, p) => sum + p.totalTimeSpent, 0);
  const overallAccuracy = totalQuestionsAnswered > 0 ? (totalCorrectAnswers / totalQuestionsAnswered) * 100 : 0;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getSubjectById = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId);
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  const handleSubjectPress = (subjectId: string) => {
    const subject = getSubjectById(subjectId);
    if (subject) {
      navigation.navigate('Study', { subject });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToHome}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Your Progress</Text>
            <Text style={styles.subtitle}>Track your learning journey</Text>
          </View>

          {/* Overall Stats */}
          <View style={styles.overallStats}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{totalQuestionsAnswered}</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{Math.round(overallAccuracy)}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{formatTime(totalTimeSpent)}</Text>
              <Text style={styles.statLabel}>Study Time</Text>
            </View>
          </View>

          {/* Subject Progress */}
          <View style={styles.subjectsSection}>
            <Text style={styles.sectionTitle}>Subject Progress</Text>
            {mockProgress.map((progress) => {
              const subject = getSubjectById(progress.subjectId);
              if (!subject) return null;

              const accuracy = progress.questionsAnswered > 0 
                ? (progress.correctAnswers / progress.questionsAnswered) * 100 
                : 0;

              return (
                <TouchableOpacity
                  key={progress.subjectId}
                  style={styles.subjectProgressCard}
                  onPress={() => handleSubjectPress(progress.subjectId)}
                >
                  <View style={styles.subjectHeader}>
                    <Text style={styles.subjectIcon}>{subject.icon}</Text>
                    <View style={styles.subjectInfo}>
                      <Text style={styles.subjectName}>{subject.name}</Text>
                      <Text style={styles.lastStudied}>
                        Last studied: {formatDate(progress.lastStudied)}
                      </Text>
                    </View>
                    <Text style={styles.accuracyText}>{Math.round(accuracy)}%</Text>
                  </View>
                  
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${accuracy}%` }
                      ]} 
                    />
                  </View>
                  
                  <View style={styles.progressDetails}>
                    <Text style={styles.progressDetail}>
                      {progress.correctAnswers}/{progress.questionsAnswered} correct
                    </Text>
                    <Text style={styles.progressDetail}>
                      {formatTime(progress.totalTimeSpent)} spent
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Study Streak */}
          <View style={styles.streakSection}>
            <View style={styles.streakCard}>
              <Text style={styles.streakIcon}>🔥</Text>
              <Text style={styles.streakTitle}>Study Streak</Text>
              <Text style={styles.streakValue}>7 days</Text>
              <Text style={styles.streakSubtitle}>Keep it up!</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  subjectsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  subjectProgressCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  subjectIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  lastStudied: {
    fontSize: 12,
    color: '#666',
  },
  accuracyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressDetail: {
    fontSize: 14,
    color: '#666',
  },
  streakSection: {
    marginBottom: 20,
  },
  streakCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  streakIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  streakValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
  },
  streakSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProgressScreen; 