import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { derivedSubjects, flatQuestions } from '../data/derived';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const insets = useSafeAreaInsets();
  const [recentTopics, setRecentTopics] = useState<Array<{ subject: string; currentIndex: number; percentage: string }>>([]);
  const [overallStats, setOverallStats] = useState({
    totalQuestionsAnswered: 0,
    overallAccuracy: 0,
    totalQuestions: 0
  });

  // Get random question
  const getRandomQuestion = () => {
    if (flatQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * flatQuestions.length);
      return flatQuestions[randomIndex];
    }
    return null;
  };

  // Initialize with random question
  useEffect(() => {
    setCurrentQuestion(getRandomQuestion());
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        // Load recent topics with percentages
        const keys: string[] = await AsyncStorage.getAllKeys();
        const progressKeys: string[] = keys.filter((k: string) => k.startsWith('progress:'));
        const pairs: [string, string | null][] = await AsyncStorage.multiGet(progressKeys);
        const items = pairs
          .map(([key, val]: [string, string | null]) => {
            const subject = key.replace('progress:', '');
            const parsed = val ? JSON.parse(val) : {};
            const answered = Array.isArray(parsed.userAnswers) ? parsed.userAnswers.filter((a: any) => a !== null).length : 0;
            
            // Find subject in derived data to get total questions
            const subjectData = derivedSubjects.find((s: any) => s.name === subject);
            const totalQuestions = subjectData?.totalQuestions || 0;
            const percentage = totalQuestions > 0 ? `${Math.round((answered / totalQuestions) * 100)}%` : '0%';
            
            return { 
              subject, 
              currentIndex: parsed.currentIndex ?? 0, 
              answered, 
              updatedAt: parsed.updatedAt ?? 0,
              percentage
            };
          })
          // Incomplete only
          .filter((it) => it.answered > 0)
          // Most recent first
          .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
          .slice(0, 4);
        setRecentTopics(items);

        // Calculate overall stats
        let totalAnswered = 0;
        let totalQuestions = 0;
        let totalCorrect = 0;

        for (const [key, val] of pairs) {
          const subject = key.replace('progress:', '');
          const parsed = val ? JSON.parse(val) : {};
          const userAnswers = Array.isArray(parsed.userAnswers) ? parsed.userAnswers : [];
          const answered = userAnswers.filter((a: any) => a !== null).length;
          
          const subjectData = derivedSubjects.find((s: any) => s.name === subject);
          const subjectQuestions = subjectData?.totalQuestions || 0;
          
          totalAnswered += answered;
          totalQuestions += subjectQuestions;

          // Calculate correct answers (this is a simplified calculation)
          // In a real app, you'd store correct/incorrect data
          totalCorrect += Math.floor(answered * 0.75); // Assuming 75% accuracy as placeholder
        }

        setOverallStats({
          totalQuestionsAnswered: totalAnswered,
          overallAccuracy: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
          totalQuestions
        });
      } catch {}
    };
    const unsub = navigation.addListener('focus', load);
    load();
    return unsub;
  }, [navigation]);

  const handleDoubleTap = () => {
    if (!isAnswerRevealed) {
      // First tap: reveal answer
      setIsAnswerRevealed(true);
    } else {
      // Second tap: get new random question and reset
      setIsAnswerRevealed(false);
      setCurrentQuestion(getRandomQuestion());
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                 {/* Header */}
         <View style={styles.header}>
           <Image 
             source={require('../../assets/app_logo.png')} 
             style={styles.appLogo}
             resizeMode="contain"
           />
           <Text style={styles.appTitle}>귀화 패스</Text>
         </View>

                 {/* Question of the Day */}
         <Text style={styles.sectionTitle}>오늘의 문제</Text>
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
                 {currentQuestion ? currentQuestion.question : '문제를 불러오는 중...'}
               </Text>
               {!isAnswerRevealed ? (
                 <Text style={styles.tapToReveal}>
                   정답을 보려면 두 번 탭하세요
                 </Text>
               ) : (
                 <View style={styles.answerContainer}>
                   <Text style={styles.answerText}>
                     {currentQuestion ? currentQuestion.options[currentQuestion.correctAnswer] : ''}
                   </Text>
                   {currentQuestion?.explanation && (
                     <Text style={styles.answerExplanation}>
                       {currentQuestion.explanation}
                     </Text>
                   )}
                 </View>
               )}
             </View>
           </View>
        </TouchableOpacity>

                 {/* My Learning Status */}
         <Text style={styles.sectionTitle}>나의 학습 현황</Text>
        <View style={styles.learningStatus}>
          <View style={styles.accuracyRow}>
            <Text style={styles.accuracyLabel}>전체 정답률</Text>
            <Text style={styles.accuracyPercentage}>{overallStats.overallAccuracy}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${overallStats.overallAccuracy}%` }]} />
          </View>
        </View>

        <View style={styles.statsRow}>
                      <View style={styles.statBox}>
              <Text style={styles.statLabel}>총 답변한 문제</Text>
              <Text style={styles.statValue}>{overallStats.totalQuestionsAnswered}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>연속 학습 일수</Text>
              <Text style={styles.statValue}>7</Text>
            </View>
        </View>

                 {/* Recent Study Topics */}
         <Text style={styles.sectionTitle}>최근 학습 주제</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.topicsScrollView}
          contentContainerStyle={styles.topicsContainer}
        >
          {recentTopics.length === 0 ? (
            <View style={styles.topicCard}>
              <Image 
                source={{ 
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp83xA8viLLIDl77iAt4Odpb412nLE1quV4sY-aN1qC6gOdwKSFkG4C53o-lIVJP1kvdC27V7Oh0wfahBQlGHQ7fdZTaYwipBridTjCsVXoj0F8oT4_CLXdjcYb-qlx90OKROjtxD0R5H98PrNEptv6dL3fXg1MSVZwxc9XgFW2kupraEKPe8haAxQYzOz6vJvYRyoRnabrbQsnbun4CyI_qKD89eBNAQEvyBOVauK8SihBkauY0Gs7fG15HLww7vsl2H1lGJCfIc'
                }}
                style={styles.topicImage}
              />
                             <View style={styles.topicInfo}>
                 <Text style={styles.topicName}>아직 최근 주제가 없습니다</Text>
                 <Text style={styles.topicSubtitle}>퀴즈를 시작하여 최근 주제를 확인하세요</Text>
               </View>
            </View>
          ) : recentTopics.map((t, idx) => (
            <TouchableOpacity
              key={`${t.subject}-${idx}`}
              style={styles.topicCard}
              onPress={() => navigation.navigate('Study', { screen: 'Quiz', params: { subject: t.subject } })}
            >
              <Image 
                source={{ 
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVR6KhIUyC0at0R4TqlbtW1Pb1drKdgJIyNh-WpNN2vozngNw_4EIG6qSJGIDqNItJ_cjywHg9c_KfhLYBuSrPv5PWPrTW45v7G_aeudld1eaMW4k2KI5HOcLNPOm9Jnfiqd7F5RbCTj2WQTjv0VqY5M20bFscbRldwpvmE47R-JkbK1lrZS8WKPEzwEPnjlEzHrqESijEDtfpHY0pOdeMly_VBNutmcm5FezGx1aQHhWPD7pokW9-eQlRdGJw9I-RWPILgglyvTI'
                }}
                style={styles.topicImage}
              />
              <View style={styles.topicInfo}>
                <Text style={styles.topicName}>{t.subject}</Text>
                <Text style={styles.topicSubtitle}>{t.percentage}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Add extra bottom padding to ensure proper spacing above tab bar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
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
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16, // Remove StatusBar.currentHeight since we're handling it with insets
    paddingBottom: 8,
    gap: 12,
  },
  appLogo: {
    width: 32,
    height: 32,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '700', // Bold weight to match Manrope Bold
    color: '#111618',
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
  bottomSpacer: {
    height: 24, // Add extra space at the bottom for proper spacing above tab bar
  },
});

export default HomeScreen;