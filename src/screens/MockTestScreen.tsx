import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MockTestScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mock Test</Text>
      
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Take a comprehensive mock test to evaluate your knowledge across all subjects.
          This will help you prepare for the actual K-Citizen exam.
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => navigation.navigate('MockTestSettings')}
      >
        <Text style={styles.startButtonText}>Start Mock Test</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Duration:</Text>
          <Text style={styles.infoValue}>30-45 minutes</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Questions:</Text>
          <Text style={styles.infoValue}>20-30 questions</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Format:</Text>
          <Text style={styles.infoValue}>Mixed subjects</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  descriptionContainer: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    gap: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
});

export default MockTestScreen;