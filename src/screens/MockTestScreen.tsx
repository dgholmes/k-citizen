import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MockTestScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>모의고사</Text>
      
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          모든 과목에 걸쳐 종합적인 모의고사를 통해 지식을 평가해보세요.
          실제 귀화 시험 준비에 도움이 될 것입니다.
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => navigation.navigate('MockTestSettings')}
      >
        <Text style={styles.startButtonText}>모의고사 시작</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>소요 시간:</Text>
          <Text style={styles.infoValue}>30-45분</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>문제 수:</Text>
          <Text style={styles.infoValue}>20-30문제</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>형식:</Text>
          <Text style={styles.infoValue}>과목 혼합</Text>
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