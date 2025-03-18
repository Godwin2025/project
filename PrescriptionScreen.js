import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import Button from '../components/Button';

const PrescriptionScreen = ({ navigation }) => {
  // Sample prescription data
  const [prescriptions, setPrescriptions] = useState([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      instructions: 'Take once daily with or without food',
      remainingDoses: 23,
      totalDoses: 30,
      refillsLeft: 2,
      nextRefillDate: '2025-04-15',
      doctor: 'Dr. Sarah Johnson',
      pharmacy: 'Heartland Pharmacy',
      lastFilled: '2025-03-01',
      expirationDate: '2026-03-01',
    },
    {
      id: '2',
      name: 'Atorvastatin',
      dosage: '20mg',
      instructions: 'Take once daily in the evening',
      remainingDoses: 14,
      totalDoses: 30,
      refillsLeft: 0,
      nextRefillDate: '2025-03-25',
      doctor: 'Dr. Sarah Johnson',
      pharmacy: 'Heartland Pharmacy',
      lastFilled: '2025-02-25',
      expirationDate: '2026-02-25',
      isExpiring: true
    },
    {
      id: '3',
      name: 'Metformin',
      dosage: '500mg',
      instructions: 'Take twice daily with meals',
      remainingDoses: 42,
      totalDoses: 60,
      refillsLeft: 3,
      nextRefillDate: '2025-05-10',
      doctor: 'Dr. Michael Chen',
      pharmacy: 'Heartland Pharmacy',
      lastFilled: '2025-03-10',
      expirationDate: '2026-03-10',
    }
  ]);
  
  const [expandedId, setExpandedId] = useState(null);
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const requestRefill = (prescription) => {
    Alert.alert(
      'Refill Request',
      `Request a refill for ${prescription.name} ${prescription.dosage}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert(
              'Refill Requested',
              `Your refill request for ${prescription.name} has been sent to ${prescription.pharmacy}.`,
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };
  
  const calculateProgress = (remaining, total) => {
    return (remaining / total) * 100;
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const renderPrescriptionItem = (prescription) => {
    const isExpanded = expandedId === prescription.id;
    const progress = calculateProgress(prescription.remainingDoses, prescription.totalDoses);
    const isLow = prescription.remainingDoses <= prescription.totalDoses * 0.2;
    
    return (
      <View 
        key={prescription.id} 
        style={[
          styles.prescriptionItem,
          isExpanded && styles.prescriptionItemExpanded
        ]}
      >
        <TouchableOpacity 
          style={styles.prescriptionHeader}
          onPress={() => toggleExpand(prescription.id)}
        >
          <View style={styles.prescriptionIcon}>
            <Text style={styles.prescriptionIconText}>Rx</Text>
          </View>
          
          <View style={styles.prescriptionBasicInfo}>
            <View style={styles.prescriptionNameRow}>
              <Text style={styles.prescriptionName}>
                {prescription.name}
              </Text>
              <Text style={styles.prescriptionDosage}>
                {prescription.dosage}
              </Text>
            </View>
            
            <Text style={styles.prescriptionInstructions} numberOfLines={isExpanded ? 0 : 1}>
              {prescription.instructions}
            </Text>
            
            <View style={styles.progressContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${progress}%` },
                  isLow && styles.progressBarLow
                ]} 
              />
            </View>
            
            <View style={styles.prescriptionStatusRow}>
              <Text style={[
                styles.prescriptionRemaining,
                isLow && styles.prescriptionLow
              ]}>
                {prescription.remainingDoses} doses left
              </Text>
              
              {prescription.isExpiring && (
                <Text style={styles.prescriptionExpiring}>
                  Refill soon
                </Text>
              )}
              
              {prescription.refillsLeft === 0 && (
                <Text style={styles.prescriptionNoRefills}>
                  No refills left
                </Text>
              )}
            </View>
          </View>
          
          <Text style={styles.expandIcon}>
            {isExpanded ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.prescriptionDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Prescribing Doctor:</Text>
              <Text style={styles.detailValue}>{prescription.doctor}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Pharmacy:</Text>
              <Text style={styles.detailValue}>{prescription.pharmacy}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Last Filled:</Text>
              <Text style={styles.detailValue}>{formatDate(prescription.lastFilled)}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Next Refill Date:</Text>
              <Text style={styles.detailValue}>{formatDate(prescription.nextRefillDate)}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expiration Date:</Text>
              <Text style={styles.detailValue}>{formatDate(prescription.expirationDate)}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Refills Remaining:</Text>
              <Text style={styles.detailValue}>{prescription.refillsLeft}</Text>
            </View>
            
            <View style={styles.prescriptionActions}>
              <Button 
                title="Request Refill" 
                onPress={() => requestRefill(prescription)}
                disabled={prescription.refillsLeft === 0}
              />
            </View>
          </View>
        )}
      </View>
    );
  };
  
  const addPrescription = () => {
    Alert.alert(
      'Add Prescription',
      'In a real app, this would open a form to add a new prescription or scan a prescription label.',
      [{ text: 'OK' }]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Prescriptions</Text>
          <Text style={styles.subtitle}>Manage your medications</Text>
        </View>
        
        <View style={styles.prescriptionsContainer}>
          {prescriptions.map(prescription => renderPrescriptionItem(prescription))}
        </View>
        
        <View style={styles.actionButtons}>
          <Button 
            title="Add Prescription" 
            onPress={addPrescription}
          />
          <Button 
            title="Medication Schedule" 
            onPress={() => Alert.alert('Medication Schedule', 'This would show your daily medication schedule.')}
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
  prescriptionsContainer: {
    marginBottom: 20,
  },
  prescriptionItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  prescriptionItemExpanded: {
    borderWidth: 2,
    borderColor: '#3498db',
  },
  prescriptionHeader: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prescriptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  prescriptionIconText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  prescriptionBasicInfo: {
    flex: 1,
  },
  prescriptionNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  prescriptionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 8,
  },
  prescriptionDosage: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  prescriptionInstructions: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 10,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 3,
  },
  progressBarLow: {
    backgroundColor: '#e74c3c',
  },
  prescriptionStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prescriptionRemaining: {
    fontSize: 14,
    color: '#7f8c8d',
    marginRight: 10,
  },
  prescriptionLow: {
    color: '#e74c3c',
    fontWeight: '500',
  },
  prescriptionExpiring: {
    fontSize: 14,
    color: '#e67e22',
    fontWeight: '500',
    backgroundColor: '#fef9e7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 10,
  },
  prescriptionNoRefills: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '500',
    backgroundColor: '#fae5e5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  expandIcon: {
    fontSize: 12,
    color: '#95a5a6',
    marginLeft: 5,
    width: 20,
    textAlign: 'center',
  },
  prescriptionDetails: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    width: '40%',
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
  },
  prescriptionActions: {
    marginTop: 10,
  },
  actionButtons: {
    marginBottom: 30,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3498db',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#3498db',
  },
});

export default PrescriptionScreen;