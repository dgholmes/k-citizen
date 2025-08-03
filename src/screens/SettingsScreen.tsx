import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';

const SettingsScreen = () => {
  const [soundEffects, setSoundEffects] = React.useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingValue}>English</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Theme</Text>
            <Text style={styles.settingValue}>System Default</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Font Size</Text>
            <Text style={styles.settingValue}>Medium</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio</Text>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingLabel}>Sound Effects</Text>
            <Text style={styles.settingValue}>On</Text>
          </View>
          <Switch
            value={soundEffects}
            onValueChange={setSoundEffects}
            trackColor={{ false: '#E0E0E0', true: '#4A90E2' }}
            thumbColor={soundEffects ? '#fff' : '#fff'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Reset Progress</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        
        <View style={styles.appInfo}>
          <Text style={styles.appName}>K-Citizen, Inc.</Text>
          <Text style={styles.appVersion}>v 1.0.0</Text>
          <Text style={styles.appDescription}>
            This is an app designed to help foreigners prepare for the South Korean naturalization interview.
          </Text>
        </View>
      </View>
    </ScrollView>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
  },
  arrow: {
    fontSize: 18,
    color: '#666',
  },
  appInfo: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default SettingsScreen;