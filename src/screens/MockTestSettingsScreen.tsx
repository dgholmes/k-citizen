// src/screens/MockTestSettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MockTestSettingsScreen = ({ navigation }: any) => {
  const [selectedQuestions, setSelectedQuestions] = useState(20);
  const [selectedTime, setSelectedTime] = useState(30);

  const questionOptions = [10, 15, 20, 30];
  const timeOptions = [15, 20, 30, 45];

  const startTest = () => {
    navigation.navigate('Quiz', {
      subject: 'Mock Test',
      questionCount: selectedQuestions,
      timeLimit: selectedTime,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Settings</Text>

      <View style={styles.settingSection}>
        <Text style={styles.sectionLabel}>Number of Questions</Text>
        <View style={styles.optionsContainer}>
          {questionOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedQuestions === option && styles.selectedOption,
              ]}
              onPress={() => setSelectedQuestions(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedQuestions === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.settingSection}>
        <Text style={styles.sectionLabel}>Time Limit (minutes)</Text>
        <View style={styles.optionsContainer}>
          {timeOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedTime === option && styles.selectedOption,
              ]}
              onPress={() => setSelectedTime(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedTime === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Summary</Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>No. of Questions:</Text>
            <Text style={styles.summaryValue}>{selectedQuestions} Questions</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Time:</Text>
            <Text style={styles.summaryValue}>{selectedTime} Minutes</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Question Type:</Text>
            <Text style={styles.summaryValue}>Random</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={startTest}>
        <Text style={styles.startButtonText}>Start Test</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  settingSection: {
    marginBottom: 30,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    backgroundColor: '#B3D9FF',
    padding: 10,
    borderRadius: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  summarySection: {
    marginBottom: 30,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryContainer: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MockTestSettingsScreen;