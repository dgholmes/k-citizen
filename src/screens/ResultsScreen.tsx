import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';

const ResultsScreen = ({ route, navigation }: any) => {
  const { score, totalQuestions, percentage, incorrectAnswers } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Results</Text>
        </View>

        {/* Image */}
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgkrH_ANer4wNutEJ5vpXH4AqchLZjzpOeBFi5QiYwFDFcCELH-UfUAbv_KefVdasWL7dR0j3kFEXj2nzhSko6cmcsLzRlyKLm1pIlmK9T7hBA6SI9JBtx2YGQL60S8gxASQz3k0-BDrpwmJS7DGhOXDqP4G3582aVMys44LHp_Gf_cXMIoi8VlPLQJzXkc83BlZ8xP2SyM0A9fTC0fmuATRAPBl7TgiGBFLuDGM1D0jQyTUS6zpWoM-QiotyYExOD9Vhl7dU4Sjs' }}
          style={styles.resultImage}
        />

        <Text style={styles.congratulations}>Congratulations!</Text>
        <Text style={styles.completionText}>
          You've successfully completed the quiz.{"\n"}
          Here's a summary of your performance.
        </Text>

        <View style={styles.scoreContainer}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.scoreValue}>{score}/{totalQuestions}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Percentage</Text>
            <Text style={styles.scoreValue}>{percentage}%</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          {incorrectAnswers.length > 0 && (
            <TouchableOpacity 
              style={styles.reviewButton}
              onPress={() => {
                // This navigation needs a 'ReviewAnswers' screen to be created
                // navigation.navigate('ReviewAnswers', { incorrectAnswers });
                alert("Review answers functionality to be implemented.");
              }}
            >
              <Text style={styles.buttonText}>Review Incorrect Answers</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={styles.returnButton}
            onPress={() => navigation.popToTop()} 
          >
            <Text style={styles.buttonText}>Return to Topics</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121516',
  },
  resultImage: {
    width: 250,
    height: 180,
    borderRadius: 20,
    marginBottom: 30,
  },
  congratulations: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2123',
    marginBottom: 12,
  },
  completionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    gap: 15,
  },
  scoreBox: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2123',
  },
  actionsContainer: {
    width: '100%',
    gap: 15,
  },
  reviewButton: {
    backgroundColor: '#BDE0FE', // Light blue color from image
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  returnButton: {
    backgroundColor: '#F3F4F6', // Light grey color from image
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1F2123',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResultsScreen;
