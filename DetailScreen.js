import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  Alert
} from 'react-native';
import Button from '../components/Button';

const DetailScreen = ({ route, navigation }) => {
  // This screen could display detailed information passed via route parameters
  // For demonstration purposes, we'll just show a generic detail view
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Details</Text>
          <Text style={styles.subtitle}>Additional information</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Information</Text>
          <Text style={styles.cardText}>
            This screen would typically display detailed information about a selected item,
            such as a specific health metric, appointment, prescription, or doctor profile.
          </Text>
          <Text style={styles.cardText}>
            The content would be passed through the navigation route parameters and rendered 
            dynamically based on the selected item.
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Related Actions</Text>
          <Text style={styles.cardText}>
            Users would be able to perform related actions here, such as:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Viewing historical health data</Text>
            <Text style={styles.bulletPoint}>• Scheduling follow-up appointments</Text>
            <Text style={styles.bulletPoint}>• Setting reminders</Text>
            <Text style={styles.bulletPoint}>• Sharing information with healthcare providers</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <Button 
            title="Take Action" 
            onPress={() => Alert.alert('Action', 'This would perform a relevant action based on the detail type.')}
          />
          <Button 
            title="Back" 
            onPress={() => navigation.goBack()}
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
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 15,
    lineHeight: 24,
  },
  bulletPoints: {
    marginTop: 10,
    marginLeft: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 24,
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

export default DetailScreen;