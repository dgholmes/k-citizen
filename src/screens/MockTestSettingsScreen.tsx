// src/screens/MockTestSettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MockTestSettingsScreen = ({ navigation }: any) => {
  const [selectedQuestions, setSelectedQuestions] = useState(20);
  const [isTimeEnabled, setIsTimeEnabled] = useState(true);
  const [selectedTime, setSelectedTime] = useState(30);
  const insets = useSafeAreaInsets(); // Get safe area insets

  const questionOptions = [10, 15, 20, 30];
  const timeOptions = [15, 20, 30, 45];

  const startTest = () => {
    navigation.navigate('Quiz', {
      subject: 'Mock Test',
      questionCount: selectedQuestions,
      timeLimit: isTimeEnabled ? selectedTime : null, // Pass null if time is disabled
    });
  };

  return (
    // Use a standard View and apply padding based on insets
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>모의고사</Text>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          모든 과목에 걸쳐 종합적인 모의고사를 통해 지식을 평가해보세요. 실제 귀화 시험 준비에 도움이 될 것입니다.
        </Text>
      </View>

      {/* Combined Settings Section */}
      <View style={styles.settingSection}>
        {/* Number of Questions */}
        <View>
            <Text style={[styles.sectionLabel, { marginBottom: 20 }]}>문제 수</Text>
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

        {/* Divider */}
        <View style={styles.divider} />

        {/* Test Time */}
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>시험 시간</Text>
                <Switch
                    trackColor={{ false: '#E0E0E0', true: '#4A90E2' }}
                    thumbColor={isTimeEnabled ? '#fff' : '#fff'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setIsTimeEnabled(previousState => !previousState)}
                    value={isTimeEnabled}
                />
            </View>
            <View style={styles.optionsContainer}>
            {timeOptions.map((option) => (
                <TouchableOpacity
                key={option}
                style={[
                    styles.optionButton,
                    selectedTime === option && isTimeEnabled && styles.selectedOption,
                    !isTimeEnabled && styles.disabledOption,
                ]}
                onPress={() => setSelectedTime(option)}
                disabled={!isTimeEnabled}
                >
                <Text
                    style={[
                    styles.optionText,
                    selectedTime === option && isTimeEnabled && styles.selectedOptionText,
                    !isTimeEnabled && styles.disabledOptionText,
                    ]}
                >
                    {option}
                </Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={startTest}>
        <Text style={styles.startButtonText}>시험 시작</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2123',
    marginTop: 10,
    marginBottom: 15,
  },
  descriptionContainer: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  settingSection: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 18,
    color: '#1F2123',
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    width: '22%', // Ensure buttons fit well
    alignItems: 'center',
    borderRadius: 12,
  },
  selectedOption: {
    backgroundColor: '#4A90E2',
  },
  disabledOption: {
    backgroundColor: '#E5E7EB',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2123',
    fontWeight: '600',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  disabledOptionText: {
      color: '#9CA3AF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 25,
  },
  startButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 'auto', // Pushes button to the bottom
    marginBottom: 10, // Spacing from the bottom edge
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MockTestSettingsScreen;
