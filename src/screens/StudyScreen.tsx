import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StudyScreen = ({ navigation }: any) => {
  const subjects = [
    {
      id: 'korean-history',
      name: 'Korean History',
      percentage: '100%',
      questions: '100 Questions',
      progress: 75,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgkrH_ANer4wNutEJ5vpXH4AqchLZjzpOeBFi5QiYwFDFcCELH-UfUAbv_KefVdasWL7dR0j3kFEXj2nzhSko6cmcsLzRlyKLm1pIlmK9T7hBA6SI9JBtx2YGQL60S8gxASQz3k0-BDrpwmJS7DGhOXDqP4G3582aVMys44LHp_Gf_cXMIoi8VlPLQJzXkc83BlZ8xP2SyM0A9fTC0fmuATRAPBl7TgiGBFLuDGM1D0jQyTUS6zpWoM-QiotyYExOD9Vhl7dU4Sjs'
    },
    {
      id: 'korean-culture',
      name: 'Korean Culture',
      percentage: '100%',
      questions: '100 Questions',
      progress: 100,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0wJZlxXAvkI4IS9CP_qt1sULEObaWcZ18e-iM7sBPZGAm_ZtbK4_Ozi9HpuIyoof24fx50pN5npSp0RkiceGajEYxaDXmxQixD5_rvjRiX1wa15y9lVRvu85V-r0Vt8JnNGDj2Qy0OHsehiQxHQoJTwWqYqvLhMVT8tdl7s5XWRYQ9VN18aiOih0K3EY7mHPs9crwAynX-4oNEgT_szh2rA9yDdXYvcESsI5MFCXk2nzLJN5slGB_8ZbyrAC6ZYqoJaac38uHzto'
    },
    {
      id: 'korean-politics',
      name: 'Korean Politics',
      percentage: '100%',
      questions: '100 Questions',
      progress: 100,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsHYhsUGIDF2oOQg-NOInrft6Ev7wR9G01j8Cg4DtWjHkGln2ShqRY-nDN03dCzomVQySQWgWlbYc3Kp8nWuIRQ7N0WdNM3ZiJp-yHlKi5ht-C6O3-CUeAc_NFLxqixNkRFHQJP-J_Uf6ulvv41nswjWkPDmNKG3PysF5IsnIzyyO3Bs_WtVON05Fd_TMqxWtbkgkrtqsTq8HvahJfoDGt7qniQLAxvCOyRhSKfke_BzlyopVDFwrIi6vda-Cv7uC3zUt_hVBwvyI'
    },
    {
      id: 'korean-geography',
      name: 'Korean Geography',
      percentage: '100%',
      questions: '100 Questions',
      progress: 100,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsSsjOZnQ4yanIKOwlLfDQC96POeQEeh5gWvA9hB29kjeYuJkJZ_shyUvA0SmZYLFNokBhrzQhCJGKxvV_VJjufpU8DHC4BEyz7cUGJWuAPBxMu39BUnAXdh7w7r5Du_wOIRSNeWfffTKuiF0jwr8iDCbUE-kbL4dElU6G5L8dOm7CNU2_NEy47k3T7NnacO3jRSAZbRPGGHbeiit9QBh2YJqxBD7z55Nm0DwdRp8xxbB-sE0onJHI3dV4F4icHPuMn3qJ68p_bTY'
    },
    {
      id: 'korean-language',
      name: 'Korean Language',
      percentage: '100%',
      questions: '100 Questions',
      progress: 100,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuuY5G5F_08JKPP_TycRd_vFGCR6iMlchgamyxsHqBoPORN7jN5DhAWZVYcQt-pitYG5Zogd2CIfyAvQ6E-HcZaY0cFYzLDl95iDu8O83z9hnLX1pjyPM7SGk5huyeDiAMj09LR5fxASRo3GNBC73Px5a7gyOO-DbqCSh_kxk9O0gbqMncqVKBOqxppWAudall0H7CDQ9jmWEQXZ1ksQQciMeVutnozmv_1xbrm0L3H0g71biuYvyWcrJMPhL8mYqhtO646kT3juo'
    },
    {
      id: 'korean-economy',
      name: 'Korean Economy',
      percentage: '63%',
      questions: '120 Questions',
      progress: 63,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmV-vYPxfG6rEis7It_VD7ZMuUacmt9IBjtKbykmAoU_c8yKze5zKsE82ja9gwb5_o_oTkswi8brc7W04yj8WOno3vdQYobOp4bi1pWC7W6WlWavE7ANAYgkm1DKm4-F564y03cRSibUykC1ISAi7_8a98UKlC-8ttRRanzsCgXzOSpYdeJ8qZPFXkXcdiZBO9VCuDnug7dyouUeW_yFiL-7OOLBbW7o1XLeb5KqTf-URq2_hyKimHtpg10PSu_5Pkv70mL63Gxgg'
    },
    {
      id: 'korean-society',
      name: 'Korean Society',
      percentage: '56%',
      questions: '90 Questions',
      progress: 56,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxYdMSMjhh7q5rN9v_xmAB-mKBNFYyXUQrJJdkPk7Lmghv5nfPdQoZF-Po6B09L80s5LACSzTQzUDRZSbouuHPdakKc5CrBlZ8-gED5mEZrLi16fWl_FZQRYmUuotAut8iaLLDy3CEk-cOIHMvjJO9GVdAIYhZL0DhejYgCFgeJoMiK-bRpnYgGkSyTDlHPen2YWusoacK3zJrFt6kQ4jdgDNWYEhB3B0HOyjltULKkEm0sUwT_0aqHV4bdRYbOLo4xhLcqqYp0cU'
    },
    {
      id: 'korean-laws',
      name: 'Korean Laws',
      percentage: '42%',
      questions: '60 Questions',
      progress: 42,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ09YL4k-Z9h0pnPEnaq6NIYLwBvgaBfJbUXCSPKoEEAoH-ytjgj3qOj0ceQ-lKfc7i6IIbSOxLjayTXlgT8ri7IJP4A1X5kDdYgDA27dB2KnEovfpzg9GhB-GukVHrwcjuz5Ecc2vuZzLrICC0QPz3o2rKjvhX-TpFap_oUv36rPcgzcpDU9s9q4ZJ-VItSJ04BpRLtmcIB4U9OIysDDkk-yiI5wMY3ShQ2WDkaGf1bshw7eCBhW6LztIJhTlcwJ2l4-zSx-B_U4'
    }
  ];

  const renderSubjectCard = (subject: any) => (
    <TouchableOpacity
      key={subject.id}
      style={styles.subjectCard}
      onPress={() => navigation.navigate('Quiz', { subject: subject.name })}
      activeOpacity={0.8}
    >
      <View style={styles.subjectContent}>
        <View style={styles.subjectInfo}>
          <View style={styles.subjectHeader}>
            <Text style={styles.subjectName}>{subject.name}</Text>
            <Text style={styles.subjectPercentage}>{subject.percentage}</Text>
          </View>
          <Text style={styles.subjectQuestions}>{subject.questions}</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${subject.progress}%` }
              ]} 
            />
          </View>
        </View>
        <Image 
          source={{ uri: subject.image }}
          style={styles.subjectImage}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.header}>
        <Text style={styles.title}>Study</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>Subjects</Text>
        <ScrollView 
          style={styles.subjectsContainer}
          showsVerticalScrollIndicator={false}
        >
          {subjects.map(renderSubjectCard)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 44,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700', // Bold weight to match Manrope Bold
    color: '#121516',
    fontFamily: 'System', // System font as fallback
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700', // Bold weight to match Manrope Bold
    color: '#121516',
    marginBottom: 16,
    marginTop: 20,
    fontFamily: 'System', // System font as fallback
  },
  subjectsContainer: {
    flex: 1,
  },
  subjectCard: {
    marginBottom: 16,
  },
  subjectContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 16,
  },
  subjectInfo: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '700', // Bold weight to match Manrope Bold
    color: '#121516',
    fontFamily: 'System', // System font as fallback
  },
  subjectPercentage: {
    fontSize: 14,
    fontWeight: '400', // Regular weight to match Manrope Regular
    color: '#6a7b81',
    fontFamily: 'System', // System font as fallback
  },
  subjectQuestions: {
    fontSize: 14,
    fontWeight: '400', // Regular weight to match Manrope Regular
    color: '#6a7b81',
    fontFamily: 'System', // System font as fallback
  },
  progressBar: {
    backgroundColor: '#E9ECEF',
    borderRadius: 6,
    height: 6,
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: '#121516',
    height: 6,
    borderRadius: 6,
  },
  subjectImage: {
    width: 112,
    height: 72,
    borderRadius: 12,
    flexShrink: 0,
  },
});

export default StudyScreen;