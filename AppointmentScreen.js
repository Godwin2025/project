import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Button from '../components/Button';

const AppointmentScreen = ({ navigation }) => {
  // State variables for appointment booking
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];
  
  // Available doctors
  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Physician' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiologist' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Dermatologist' },
    { id: 4, name: 'Dr. David Williams', specialty: 'Pediatrician' }
  ];

  // Handle date selection
  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  // Handle time slot selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Handle doctor selection
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form inputs
    if (!selectedDate) {
      Alert.alert('Missing Information', 'Please select a date for your appointment.');
      return;
    }
    
    if (!selectedTime) {
      Alert.alert('Missing Information', 'Please select a time slot for your appointment.');
      return;
    }
    
    if (!selectedDoctor) {
      Alert.alert('Missing Information', 'Please select a doctor for your appointment.');
      return;
    }
    
    if (!reason.trim()) {
      Alert.alert('Missing Information', 'Please provide a reason for your visit.');
      return;
    }
    
    // Show loading state
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success message
      Alert.alert(
        'Appointment Scheduled',
        `Your appointment has been scheduled with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    }, 1500);
  };

  // Get disabled dates (past dates)
  const getDisabledDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate() - 1).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#3498db' }
            }}
            minDate={new Date().toISOString().split('T')[0]}
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            theme={{
              selectedDayBackgroundColor: '#3498db',
              todayTextColor: '#3498db',
              arrowColor: '#3498db',
            }}
          />
        </View>

        {selectedDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timeContainer}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.selectedTimeSlot
                  ]}
                  onPress={() => handleTimeSelect(time)}
                >
                  <Text style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {selectedTime && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Doctor</Text>
            {doctors.map((doctor) => (
              <TouchableOpacity
                key={doctor.id}
                style={[
                  styles.doctorCard,
                  selectedDoctor.id === doctor.id && styles.selectedDoctorCard
                ]}
                onPress={() => handleDoctorSelect(doctor)}
              >
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                </View>
                {selectedDoctor.id === doctor.id && (
                  <View style={styles.selectedDoctorIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {selectedDoctor && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reason for Visit</Text>
            <TextInput
              style={styles.input}
              placeholder="Briefly describe your symptoms or reason for the appointment"
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={4}
            />

            <View style={styles.submitContainer}>
              <Button
                title="Schedule Appointment"
                onPress={handleSubmit}
                loading={isSubmitting}
              />
            </View>
          </View>
        )}
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
    padding: 15,
  },
  section: {
    marginBottom: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1c1c1e',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '31%',
    padding: 10,
    backgroundColor: '#f0f0f5',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: '#3498db',
  },
  timeText: {
    color: '#1c1c1e',
  },
  selectedTimeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  doctorCard: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedDoctorCard: {
    borderColor: '#3498db',
    backgroundColor: '#f0f7fd',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 5,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#86868b',
  },
  selectedDoctorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3498db',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1c1c1e',
    height: 100,
    textAlignVertical: 'top',
  },
  submitContainer: {
    marginTop: 20,
  },
});

export default AppointmentScreen;