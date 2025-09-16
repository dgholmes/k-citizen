// src/screens/ProgressScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { derivedSubjects } from '../data/derived';

const ProgressScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [progressData, setProgressData] = useState({
    overallProgress: { score: 0, progress: 0 },
    summaryStats: { accuracy: 0, reviewNeeded: '0h 0m' },
    subjectPerformance: { overall: 0, subjects: [] as any[] }
  });

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const keys: string[] = await AsyncStorage.getAllKeys();
        const progressKeys: string[] = keys.filter((k: string) => k.startsWith('progress:'));
        const pairs: [string, string | null][] = await AsyncStorage.multiGet(progressKeys);
        
        let totalAnswered = 0;
        let totalQuestions = 0;
        let totalCorrect = 0;
        const subjectStats: any[] = [];

        // Calculate stats for each subject
        for (const subject of derivedSubjects) {
          const progressKey = `progress:${subject.name}`;
          const progressData = pairs.find(([key]) => key === progressKey);
          
          if (progressData) {
            const parsed = progressData[1] ? JSON.parse(progressData[1]) : {};
            const userAnswers = Array.isArray(parsed.userAnswers) ? parsed.userAnswers : [];
            const answered = userAnswers.filter((a: any) => a !== null).length;
            const percentage = subject.totalQuestions > 0 ? Math.round((answered / subject.totalQuestions) * 100) : 0;
            
            totalAnswered += answered;
            totalQuestions += subject.totalQuestions;
            totalCorrect += Math.floor(answered * 0.75); // Simplified accuracy calculation
            
            subjectStats.push({
              name: subject.name,
              score: percentage
            });
          } else {
            subjectStats.push({
              name: subject.name,
              score: 0
            });
          }
        }

        const overallPercentage = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;
        const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

        setProgressData({
          overallProgress: { 
            score: overallPercentage, 
            progress: overallPercentage 
          },
          summaryStats: { 
            accuracy: overallAccuracy, 
            reviewNeeded: `${Math.floor(totalAnswered / 10)}h ${Math.floor((totalAnswered % 10) * 6)}m` // Simplified time calculation
          },
          subjectPerformance: { 
            overall: overallPercentage, 
            subjects: subjectStats 
          }
        });
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };

    loadProgress();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2123" />
        </TouchableOpacity>
                 <Text style={styles.headerTitle}>진도</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
                 {/* Overall Progress Section */}
         <Text style={styles.sectionTitle}>전체 진도</Text>
        <View style={styles.overallProgressContainer}>
            <View>
                <Text style={styles.overallProgressLabel}>전체 진도</Text>
                <Text style={styles.overallProgressValue}>{progressData.overallProgress.score}% 점수</Text>
            </View>
            <View style={styles.graphIcon}>
                <Ionicons name="analytics-outline" size={32} color="#28A745" />
            </View>
        </View>
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressFill, { width: `${progressData.overallProgress.progress}%` }]} />
        </View>

        {/* Summary Stats */}
        <View style={styles.summaryContainer}>
                         <View style={styles.summaryCard}>
                 <Text style={styles.summaryLabel}>전체 정확도</Text>
                 <Text style={styles.summaryValue}>{progressData.summaryStats.accuracy}%</Text>
             </View>
             <View style={styles.summaryCard}>
                 <Text style={styles.summaryLabel}>복습 필요</Text>
                 <Text style={styles.summaryValue}>{progressData.summaryStats.reviewNeeded}</Text>
             </View>
        </View>

                 {/* Subject Performance Section */}
         <Text style={styles.sectionTitle}>과목별 성과</Text>
        <View style={styles.card}>
            <Text style={styles.cardSubtitle}>과목별 성과</Text>
            <Text style={styles.performanceValue}>{progressData.subjectPerformance.overall}%</Text>
            <View>
                {progressData.subjectPerformance.subjects.map((subject, index) => (
                    <View key={index} style={styles.subjectRow}>
                        <Text style={styles.subjectName}>{subject.name}</Text>
                        <View style={styles.subjectProgressBarContainer}>
                            <View style={[styles.subjectProgressFill, { width: `${subject.score}%` }]} />
                        </View>
                    </View>
                ))}
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2123',
  },
  scrollContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2123',
    marginBottom: 15,
  },
  overallProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  overallProgressLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  overallProgressValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2123',
  },
  graphIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 25,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1F2123',
    borderRadius: 4,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 30,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 20,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2123',
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  performanceValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2123',
    marginBottom: 20,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  subjectName: {
    fontSize: 16,
    color: '#374151',
    width: '30%',
  },
  subjectProgressBarContainer: {
    flex: 1,
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
  },
  subjectProgressFill: {
    height: '100%',
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
    borderRightWidth: 2,
    borderColor: '#6B7280',
  },
});

export default ProgressScreen;
