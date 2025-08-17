// src/screens/ProgressScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mock Data - Replace with your actual data source
const overallProgress = {
  score: 85,
  progress: 85, // Assuming progress percentage is the same as the score
};

const summaryStats = {
  accuracy: 82,
  reviewNeeded: '45h 30m', // Using study time as a placeholder for "Review Needed"
};

const subjectPerformance = {
  overall: 75,
  subjects: [
    { name: 'History', score: 20 },
    { name: 'Culture', score: 50 },
    { name: 'Law', score: 60 },
    { name: 'Language', score: 80 },
  ],
};


const ProgressScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2123" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Progress</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Overall Progress Section */}
        <Text style={styles.sectionTitle}>Overall Progress</Text>
        <View style={styles.overallProgressContainer}>
            <View>
                <Text style={styles.overallProgressLabel}>Overall Progress</Text>
                <Text style={styles.overallProgressValue}>{overallProgress.score}% Score</Text>
            </View>
            <View style={styles.graphIcon}>
                <Ionicons name="analytics-outline" size={32} color="#28A745" />
            </View>
        </View>
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressFill, { width: `${overallProgress.progress}%` }]} />
        </View>

        {/* Summary Stats */}
        <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Overall Accuracy</Text>
                <Text style={styles.summaryValue}>{summaryStats.accuracy}%</Text>
            </View>
            <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Review Needed</Text>
                <Text style={styles.summaryValue}>{summaryStats.reviewNeeded}</Text>
            </View>
        </View>

        {/* Subject Performance Section */}
        <Text style={styles.sectionTitle}>Subject Performance</Text>
        <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Performance by Subject</Text>
            <Text style={styles.performanceValue}>{subjectPerformance.overall}%</Text>
            <View>
                {subjectPerformance.subjects.map((subject, index) => (
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
