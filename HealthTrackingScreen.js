import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import Button from '../components/Button';

const HealthTrackingScreen = ({ navigation }) => {
  // Sample health data
  const [healthData, setHealthData] = useState({
    steps: {
      current: 7854,
      goal: 10000,
      unit: 'steps',
      icon: '👣'
    },
    heartRate: {
      current: 72,
      range: '65-75',
      unit: 'bpm',
      icon: '❤️'
    },
    sleep: {
      current: 7.5,
      goal: 8,
      unit: 'hours',
      icon: '😴'
    },
    weight: {
      current: 158,
      previous: 160,
      unit: 'lbs',
      icon: '⚖️'
    },
    bloodPressure: {
      current: '120/80',
      range: '90-140/60-90',
      unit: 'mmHg',
      icon: '📊'
    },
    water: {
      current: 5,
      goal: 8,
      unit: 'glasses',
      icon: '💧'
    }
  });
  
  // Mock weekly data for steps chart
  const weeklySteps = [
    { day: 'Mon', steps: 8542 },
    { day: 'Tue', steps: 10247 },
    { day: 'Wed', steps: 7854 },
    { day: 'Thu', steps: 9321 },
    { day: 'Fri', steps: 6578 },
    { day: 'Sat', steps: 5421 },
    { day: 'Sun', steps: 8123 },
  ];
  
  // Calculate progress for progress bars
  const calculateProgress = (current, goal) => {
    const progress = (current / goal) * 100;
    return progress > 100 ? 100 : progress;
  };
  
  const renderMetricItem = (key, data) => {
    const showProgress = data.goal !== undefined;
    const progress = showProgress ? calculateProgress(data.current, data.goal) : null;
    
    return (
      <View key={key} style={styles.metricItem}>
        <View style={styles.metricHeader}>
          <Text style={styles.metricIcon}>{data.icon}</Text>
          <Text style={styles.metricName}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
        </View>
        
        <Text style={styles.metricValue}>
          {data.current} <Text style={styles.metricUnit}>{data.unit}</Text>
        </Text>
        
        {showProgress && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
            <Text style={styles.progressText}>
              {progress.toFixed(0)}% of {data.goal} {data.unit}
            </Text>
          </View>
        )}
        
        {data.range && (
          <Text style={styles.metricRange}>Normal range: {data.range}</Text>
        )}
        
        {data.previous && (
          <Text style={styles.metricPrevious}>
            {data.previous > data.current ? '↓ ' : '↑ '}
            {Math.abs(data.current - data.previous)} {data.unit} since last week
          </Text>
        )}
      </View>
    );
  };
  
  const renderBarChart = () => {
    const maxSteps = Math.max(...weeklySteps.map(day => day.steps));
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Step Count</Text>
        <View style={styles.chart}>
          {weeklySteps.map((item, index) => {
            const height = (item.steps / maxSteps) * 150;
            return (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.bar, { height }]}>
                  <Text style={styles.barValue}>{(item.steps / 1000).toFixed(1)}k</Text>
                </View>
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  
  const addHealthData = () => {
    Alert.alert(
      'Add Health Data',
      'In a real app, this would open a form to add new health measurements.',
      [{ text: 'OK' }]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Tracking</Text>
          <Text style={styles.subtitle}>Monitor your health metrics</Text>
        </View>
        
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Daily Summary</Text>
          <Text style={styles.summaryDate}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
        
        <View style={styles.metricsContainer}>
          {Object.entries(healthData).map(([key, data]) => renderMetricItem(key, data))}
        </View>
        
        {renderBarChart()}
        
        <View style={styles.actionButtons}>
          <Button 
            title="Add Health Data" 
            onPress={addHealthData}
          />
          <Button 
            title="View Health History" 
            onPress={() => Alert.alert('Health History', 'This would show your health tracking history.')}
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
          />
          <Button 
            title="Back to Home" 
            onPress={() => navigation.navigate('Home')}
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#86868b',
    textAlign: 'center',
  },
  summary: {
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 5,
  },
  summaryDate: {
    fontSize: 16,
    color: '#86868b',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  metricName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 10,
  },
  metricUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#7f8c8d',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    marginBottom: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  metricRange: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  metricPrevious: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  chart: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: 20,
    backgroundColor: '#3498db',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
  },
  barValue: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  barLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#7f8c8d',
  },
  actionButtons: {
    marginBottom: 30,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  secondaryButtonText: {
    color: '#3498db',
  },
});

export default HealthTrackingScreen;