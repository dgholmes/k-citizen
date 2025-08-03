import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const handleDoubleTap = () => {
    setIsAnswerRevealed(!isAnswerRevealed);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>K-Citizen</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#111618" />
          </TouchableOpacity>
        </View>

        {/* Question of the Day */}
        <Text style={styles.sectionTitle}>Question of the Day</Text>
        <TouchableOpacity 
          style={styles.questionCard}
          onPress={handleDoubleTap}
          activeOpacity={0.9}
        >
          <Image 
            source={{ 
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp83xA8viLLIDl77iAt4Odpb412nLE1quV4sY-aN1qC6gOdwKSFkG4C53o-lIVJP1kvdC27V7Oh0wfahBQlGHQ7fdZTaYwipBridTjCsVXoj0F8oT4_CLXdjcYb-qlx90OKROjtxD0R5H98PrNEptv6dL3fXg1MSVZwxc9XgFW2kupraEKPe8haAxQYzOz6vJvYRyoRnabrbQsnbun4CyI_qKD89eBNAQEvyBOVauK8SihBkauY0Gs7fG15HLww7vsl2H1lGJCfIc'
            }}
            style={styles.questionBackground}
          />
          <View style={styles.questionOverlay}>
            <View style={styles.questionContent}>
              <Text style={styles.questionText}>
                What is the national flower of South Korea?
              </Text>
              {!isAnswerRevealed ? (
                <Text style={styles.tapToReveal}>
                  Double tap to reveal the answer
                </Text>
              ) : (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>
                    Mugunghwa (Rose of Sharon)
                  </Text>
                  <Text style={styles.answerExplanation}>
                    The Mugunghwa, also known as the Rose of Sharon, is the national flower of South Korea. It symbolizes the country's resilience and eternal beauty.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* My Learning Status */}
        <Text style={styles.sectionTitle}>My Learning Status</Text>
        <View style={styles.learningStatus}>
          <View style={styles.accuracyRow}>
            <Text style={styles.accuracyLabel}>Overall Correct Answer Rate</Text>
            <Text style={styles.accuracyPercentage}>75%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Questions Answered</Text>
            <Text style={styles.statValue}>125</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Consecutive Study Days</Text>
            <Text style={styles.statValue}>7</Text>
          </View>
        </View>

        {/* Recent Study Topics */}
        <Text style={styles.sectionTitle}>Recent Study Topics</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.topicsScrollView}
          contentContainerStyle={styles.topicsContainer}
        >
          <TouchableOpacity 
            style={styles.topicCard}
            onPress={() => navigation.navigate('Study', { 
              screen: 'Quiz', 
              params: { subject: 'Korean History' }
            })}
          >
            <Image 
              source={{ 
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVR6KhIUyC0at0R4TqlbtW1Pb1drKdgJIyNh-WpNN2vozngNw_4EIG6qSJGIDqNItJ_cjywHg9c_KfhLYBuSrPv5PWPrTW45v7G_aeudld1eaMW4k2KI5HOcLNPOm9Jnfiqd7F5RbCTj2WQTjv0VqY5M20bFscbRldwpvmE47R-JkbK1lrZS8WKPEzwEPnjlEzHrqESijEDtfpHY0pOdeMly_VBNutmcm5FezGx1aQHhWPD7pokW9-eQlRdGJw9I-RWPILgglyvTI'
              }}
              style={styles.topicImage}
            />
                         <View style={styles.topicInfo}>
               <Text style={styles.topicName}>Korean History</Text>
               <Text style={styles.topicSubtitle}>80%</Text>
             </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.topicCard}
            onPress={() => navigation.navigate('Study', { 
              screen: 'Quiz', 
              params: { subject: 'Korean Culture' }
            })}
          >
            <Image 
              source={{ 
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8n7Z75FrfBLRjtQ2qFyj1jUDhgosR2hXgaTPc9oeIW9jxwJbK6o58PUPA9vkwVLB5wDixrPpSR4MoMu3u-FanDjMwMHc5wXQXjTI1l--htHAJ3qMlTsfsb3sTb9VEo7LKvj9znArkco3dTOOPzBvbOXSlttA8e7HZHAkh_7OuuUZtFDdeEBOVbh5nYlSbA2kiDtCGwYo-bPeX3nHp9kGdbzIEwWdOnbrGw6pi1HJSQl_uF0jJ1pOrKw2kuRKlq0D-ixVAHX8rFE0'
              }}
              style={styles.topicImage}
            />
                         <View style={styles.topicInfo}>
               <Text style={styles.topicName}>Korean Culture</Text>
               <Text style={styles.topicSubtitle}>70%</Text>
             </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.topicCard}
            onPress={() => navigation.navigate('Study', { 
              screen: 'Quiz', 
              params: { subject: 'Korean Geography' }
            })}
          >
            <Image 
              source={{ 
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXp1XzYVrevWLcRs8HipZbpNM_zCzkW4amqSKLJ_5ZEcPlEfUF_NKvj5bROvkz1jH_wVeSJ2zWBucJIC3VsqOkrQArvnRtiSB1Huxdq1WVj6z_RoMXui6SYTOhS6whhJiXhJ9FJXIgzaRgEc4uC2e9jE57P8uU3qFso3STJuQFnQOkpTafyjDbvk94YIn7HSzKWRiA7wD-wWT3QfOPsGb03u1QAASAsW83PAxO2D8Icd33xbm5Yiv8cuQXqxNJWvNEo0ZVGAiD1Bg'
              }}
              style={styles.topicImage}
            />
                         <View style={styles.topicInfo}>
               <Text style={styles.topicName}>Korean Geography</Text>
               <Text style={styles.topicSubtitle}>90%</Text>
             </View>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight || 44,
    paddingBottom: 8,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '700', // Bold weight to match Manrope Bold
    color: '#111618',
    flex: 1,
    fontFamily: 'System', // System font as fallback
  },
  settingsButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700', // Bold weight to match Manrope Bold
    color: '#111618',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
    fontFamily: 'System', // System font as fallback
  },
  questionCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
  },
  questionBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  questionOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  questionContent: {
    padding: 16,
    gap: 4,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '700', // Bold weight to match Manrope Bold
    color: '#FFFFFF',
    maxWidth: 440,
    fontFamily: 'System', // System font as fallback
  },
  tapToReveal: {
    fontSize: 16,
    fontWeight: '500', // Medium weight to match Manrope Medium
    color: '#FFFFFF',
    fontFamily: 'System', // System font as fallback
  },
  answerContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  answerText: {
    fontSize: 18,
    fontWeight: '700', // Bold weight to match Manrope Bold
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'System', // System font as fallback
  },
  answerExplanation: {
    fontSize: 14,
    fontWeight: '400', // Regular weight to match Manrope Regular
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    fontFamily: 'System', // System font as fallback
  },
  learningStatus: {
    paddingHorizontal: 16,
    gap: 12,
  },
  accuracyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accuracyLabel: {
    fontSize: 16,
    fontWeight: '500', // Medium weight to match Manrope Medium
    color: '#111618',
    fontFamily: 'System', // System font as fallback
  },
  accuracyPercentage: {
    fontSize: 14,
    fontWeight: '400', // Regular weight to match Manrope Regular
    color: '#111618',
    fontFamily: 'System', // System font as fallback
  },
  progressBar: {
    height: 8,
    backgroundColor: '#DCE3E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#111618',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    minWidth: 158,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCE3E5',
    gap: 8,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '500', // Medium weight to match Manrope Medium
    color: '#111618',
    fontFamily: 'System', // System font as fallback
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700', // Bold weight to match Manrope Bold
    color: '#111618',
    fontFamily: 'System', // System font as fallback
  },
  topicsScrollView: {
    marginTop: 16,
  },
  topicsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  topicCard: {
    width: 160,
    gap: 16,
  },
  topicImage: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 12,
  },
  topicInfo: {
    gap: 4,
  },
  topicName: {
    fontSize: 16,
    fontWeight: '500', // Medium weight to match Manrope Medium
    color: '#111618',
    fontFamily: 'System', // System font as fallback
  },
  topicSubtitle: {
    fontSize: 14,
    fontWeight: '400', // Regular weight to match Manrope Regular
    color: '#637F88',
    fontFamily: 'System', // System font as fallback
  },
});

export default HomeScreen;