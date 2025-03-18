import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Button from '../components/Button';

const AppointmentBookingScreen = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [step, setStep] = useState(1);
  
  // Sample data for doctors
  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '12 years',
      image: '👩‍⚕️'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      experience: '8 years',
      image: '👨‍⚕️'
    },
    {
      id: '3',
      name: 'Dr. Robert Williams',
      specialty: 'Neurologist',
      experience: '15 years',
      image: '👨‍⚕️'
    },
    {
      id: '4',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      experience: '10 years',
      image: '👩‍⚕️'
    },
    {
      id: '5',
      name: 'Dr. David Kim',
      specialty: 'Orthopedic Surgeon',
      experience: '14 years',
      image: '👨‍⚕️'
    }
  ];
  
  // Sample data for specialties
  const specialties = [
    'Cardiologist',
    'Dermatologist',
    'Neurologist',
    'Pediatrician',
    'Orthopedic Surgeon',
    'General Physician',
    'Psychiatrist',
    'Gynecologist',
    'Ophthalmologist',
    'ENT Specialist'
  ];
  
  // Available time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ];
  
  // Check if a doctor was passed as a parameter
  useEffect(() => {
    if (route.params?.doctorId) {
      const doctor = doctors.find(doc => doc.id === route.params.doctorId);
      if (doctor) {
        setSelectedDoctor(doctor);
        setSelectedSpecialty(doctor.specialty);
        setStep(3); // Skip to date selection
      }
    }
  }, [route.params]);
  
  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
    setStep(2);
  };
  
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(3);
  };
  
  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setStep(4);
  };
  
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(5);
  };
  
  const confirmAppointment = () => {
    Alert.alert(
      'Confirm Appointment',
      `Book appointment with ${selectedDoctor.name} on ${formatDate(selectedDate)} at ${selectedTime}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert(
              'Appointment Confirmed',
              `Your appointment with ${selectedDoctor.name} has been booked for ${formatDate(selectedDate)} at ${selectedTime}.`,
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Home')
                }
              ]
            );
          }
        }
      ]
    );
  };
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const renderSpecialtySelection = () => {
    return (
      <View style={styles.selectionContainer}>
        <Text style={styles.selectionTitle}>Select Specialty</Text>
        <ScrollView style={styles.specialtyList}>
          {specialties.map((specialty, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.specialtyItem,
                selectedSpecialty === specialty && styles.selectedItem
              ]}
              onPress={() => handleSpecialtySelect(specialty)}
            >
              <Text style={[
                styles.specialtyText,
                selectedSpecialty === specialty && styles.selectedItemText
              ]}>
                {specialty}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  const renderDoctorSelection = () => {
    const filteredDoctors = selectedSpecialty 
      ? doctors.filter(doctor => doctor.specialty === selectedSpecialty)
      : doctors;
    
    return (
      <View style={styles.selectionContainer}>
        <Text style={styles.selectionTitle}>Select Doctor</Text>
        <Text style={styles.selectionSubtitle}>
          {selectedSpecialty ? `${selectedSpecialty}s` : 'All Doctors'}
        </Text>
        
        <ScrollView style={styles.doctorList}>
          {filteredDoctors.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              style={[
                styles.doctorItem,
                selectedDoctor?.id === doctor.id && styles.selectedDoctorItem
              ]}
              onPress={() => handleDoctorSelect(doctor)}
            >
              <View style={styles.doctorImageContainer}>
                <Text style={styles.doctorImage}>{doctor.image}</Text>
              </View>
              
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <Text style={styles.doctorExperience}>{doctor.experience} experience</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Button 
          title="Back to Specialties" 
          onPress={() => setStep(1)}
          style={styles.secondaryButton}
          textStyle={styles.secondaryButtonText}
        />
      </View>
    );
  };
  
  const renderDateSelection = () => {
    // Get current date and format it for marking
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    // Create marked dates object
    const markedDates = {};
    
    // Mark today
    markedDates[todayString] = { marked: true, dotColor: '#3498db' };
    
    // Mark selected date
    if (selectedDate) {
      markedDates[selectedDate] = { 
        selected: true, 
        selectedColor: '#3498db',
        marked: selectedDate === todayString,
        dotColor: '#fff'
      };
    }
    
    // Disable past dates and weekend dates (for demo purposes)
    const disabledDates = {};
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30); // Allow booking up to 30 days in advance
    
    for (let d = new Date(today); d <= maxDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      if (d < today) {
        disabledDates[dateString] = { disabled: true, disableTouchEvent: true };
      }
    }
    
    return (
      <View style={styles.selectionContainer}>
        <Text style={styles.selectionTitle}>Select Date</Text>
        <Text style={styles.selectionSubtitle}>
          Appointment with {selectedDoctor.name}
        </Text>
        
        <Calendar
          style={styles.calendar}
          onDayPress={handleDateSelect}
          markedDates={{...markedDates, ...disabledDates}}
          minDate={todayString}
          maxDate={maxDate.toISOString().split('T')[0]}
          hideExtraDays={true}
          theme={{
            calendarBackground: 'white',
            textSectionTitleColor: '#2c3e50',
            selectedDayBackgroundColor: '#3498db',
            selectedDayTextColor: 'white',
            todayTextColor: '#3498db',
            dayTextColor: '#2c3e50',
            textDisabledColor: '#bdc3c7',
            dotColor: '#3498db',
            selectedDotColor: 'white',
            arrowColor: '#3498db',
            monthTextColor: '#2c3e50',
            textMonthFontWeight: 'bold'
          }}
        />
        
        <Button 
          title="Back to Doctor Selection" 
          onPress={() => setStep(2)}
          style={styles.secondaryButton}
          textStyle={styles.secondaryButtonText}
        />
      </View>
    );
  };
  
  const renderTimeSelection = () => {
    return (
      <View style={styles.selectionContainer}>
        <Text style={styles.selectionTitle}>Select Time</Text>
        <Text style={styles.selectionSubtitle}>
          {formatDate(selectedDate)}
        </Text>
        
        <View style={styles.timeSlotContainer}>
          {timeSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.selectedTimeSlot,
                // Randomly disable some time slots to simulate availability
                index % 3 === 0 && styles.disabledTimeSlot
              ]}
              onPress={() => index % 3 !== 0 && handleTimeSelect(time)}
              disabled={index % 3 === 0}
            >
              <Text style={[
                styles.timeSlotText,
                selectedTime === time && styles.selectedTimeSlotText,
                index % 3 === 0 && styles.disabledTimeSlotText
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Button 
          title="Back to Date Selection" 
          onPress={() => setStep(3)}
          style={styles.secondaryButton}
          textStyle={styles.secondaryButtonText}
        />
      </View>
    );
  };
  
  const renderConfirmation = () => {
    return (
      <View style={styles.confirmationContainer}>
        <Text style={styles.confirmationTitle}>Confirm Appointment</Text>
        
        <View style={styles.confirmationCard}>
          <View style={styles.confirmationDoctorContainer}>
            <View style={styles.doctorImageContainer}>
              <Text style={styles.doctorImage}>{selectedDoctor.image}</Text>
            </View>
            
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{selectedDoctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{selectedDoctor.specialty}</Text>
            </View>
          </View>
          
          <View style={styles.confirmationDetails}>
            <View style={styles.confirmationDetail}>
              <Text style={styles.confirmationLabel}>Date:</Text>
              <Text style={styles.confirmationValue}>{formatDate(selectedDate)}</Text>
            </View>
            
            <View style={styles.confirmationDetail}>
              <Text style={styles.confirmationLabel}>Time:</Text>
              <Text style={styles.confirmationValue}>{selectedTime}</Text>
            </View>
            
            <View style={styles.confirmationDetail}>
              <Text style={styles.confirmationLabel}>Appointment Type:</Text>
              <Text style={styles.confirmationValue}>Video Consultation</Text>
            </View>
          </View>
          
          <View style={styles.confirmationNote}>
            <Text style={styles.confirmationNoteText}>
              Please be available 5 minutes before your scheduled appointment.
              You will receive a reminder notification before your appointment.
            </Text>
          </View>
        </View>
        
        <View style={styles.confirmationActions}>
          <Button 
            title="Confirm Appointment" 
            onPress={confirmAppointment}
          />
          
          <Button 
            title="Change Time" 
            onPress={() => setStep(4)}
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
          />
          
          <Button 
            title="Cancel" 
            onPress={() => navigation.goBack()}
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
          />
        </View>
      </View>
    );
  };
  
  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicatorContainer}>
        {[1, 2, 3, 4, 5].map((stepNumber) => (
          <View 
            key={stepNumber} 
            style={[
              styles.stepDot,
              step >= stepNumber && styles.activeStepDot,
              step === stepNumber && styles.currentStepDot
            ]}
          />
        ))}
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Book Appointment</Text>
        </View>
        
        {renderStepIndicator()}
        
        {step === 1 && renderSpecialtySelection()}
        {step === 2 && renderDoctorSelection()}
        {step === 3 && renderDateSelection()}
        {step === 4 && renderTimeSelection()}
        {step === 5 && renderConfirmation()}
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
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d1d1d6',
    marginHorizontal: 5,
  },
  activeStepDot: {
    backgroundColor: '#3498db',
  },
  currentStepDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 3,
  },
  selectionContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  selectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 5,
  },
  selectionSubtitle: {
    fontSize: 16,
    color: '#86868b',
    marginBottom: 20,
  },
  specialtyList: {
    maxHeight: 400,
  },
  specialtyItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
  },
  specialtyText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  selectedItem: {
    backgroundColor: '#3498db',
  },
  selectedItemText: {
    color: 'white',
    fontWeight: '600',
  },
  doctorList: {
    maxHeight: 400,
  },
  doctorItem: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
  },
  selectedDoctorItem: {
    backgroundColor: '#e1f0fa',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  doctorImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e9f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  doctorImage: {
    fontSize: 30,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  doctorExperience: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeSlot: {
    width: '30%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  selectedTimeSlot: {
    backgroundColor: '#3498db',
  },
  selectedTimeSlotText: {
    color: 'white',
    fontWeight: '600',
  },
  disabledTimeSlot: {
    backgroundColor: '#ecf0f1',
  },
  disabledTimeSlotText: {
    color: '#bdc3c7',
  },
  confirmationContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmationCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  confirmationDoctorContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#f5f7fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  confirmationDetails: {
    padding: 15,
  },
  confirmationDetail: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  confirmationLabel: {
    width: '40%',
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  confirmationValue: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  confirmationNote: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  confirmationNoteText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  confirmationActions: {
    alignItems: 'center',
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

export default AppointmentBookingScreen;