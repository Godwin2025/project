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

const VideoConsultationScreen = ({ navigation }) => {
  // Sample doctors data
  const [doctors, setDoctors] = useState([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      reviewCount: 124,
      experience: '12 years',
      availability: 'Available today',
      nextSlot: '2:30 PM',
      image: '👩‍⚕️',
      isOnline: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      rating: 4.7,
      reviewCount: 98,
      experience: '8 years',
      availability: 'Available tomorrow',
      nextSlot: '10:15 AM',
      image: '👨‍⚕️',
      isOnline: true
    },
    {
      id: '3',
      name: 'Dr. Robert Williams',
      specialty: 'Neurologist',
      rating: 4.8,
      reviewCount: 132,
      experience: '15 years',
      availability: 'Available today',
      nextSlot: '5:00 PM',
      image: '👨‍⚕️',
      isOnline: false
    },
    {
      id: '4',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      rating: 4.9,
      reviewCount: 156,
      experience: '10 years',
      availability: 'Available tomorrow',
      nextSlot: '9:30 AM',
      image: '👩‍⚕️',
      isOnline: true
    },
    {
      id: '5',
      name: 'Dr. David Kim',
      specialty: 'Orthopedic Surgeon',
      rating: 4.6,
      reviewCount: 87,
      experience: '14 years',
      availability: 'Available Friday',
      nextSlot: '11:45 AM',
      image: '👨‍⚕️',
      isOnline: false
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Sample upcoming appointments
  const upcomingAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2025-03-15',
      time: '2:30 PM',
      status: 'Confirmed',
      image: '👩‍⚕️'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: '2025-03-20',
      time: '10:15 AM',
      status: 'Pending',
      image: '👨‍⚕️'
    }
  ];
  
  // Sample past consultations
  const pastConsultations = [
    {
      id: '1',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      date: '2025-02-10',
      time: '9:30 AM',
      status: 'Completed',
      image: '👩‍⚕️'
    },
    {
      id: '2',
      doctorName: 'Dr. Robert Williams',
      specialty: 'Neurologist',
      date: '2025-01-25',
      time: '3:45 PM',
      status: 'Completed',
      image: '👨‍⚕️'
    },
    {
      id: '3',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2025-01-05',
      time: '1:00 PM',
      status: 'Completed',
      image: '👩‍⚕️'
    }
  ];
  
  const startConsultation = (doctor) => {
    Alert.alert(
      'Start Video Consultation',
      `Starting video call with ${doctor.name}.`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Join Call',
          onPress: () => Alert.alert('Video Call', 'In a real app, this would connect you to a WebRTC video call with the doctor.')
        }
      ]
    );
  };
  
  const scheduleConsultation = (doctor) => {
    Alert.alert(
      'Schedule Consultation',
      `Schedule a video consultation with ${doctor.name}.`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Continue',
          onPress: () => navigation.navigate('AppointmentBooking', { doctorId: doctor.id })
        }
      ]
    );
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const renderDoctorItem = (doctor) => {
    return (
      <View key={doctor.id} style={styles.doctorItem}>
        <View style={styles.doctorHeader}>
          <View style={styles.doctorImageContainer}>
            <Text style={styles.doctorImage}>{doctor.image}</Text>
            {doctor.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.ratingText}>{doctor.rating}</Text>
              <Text style={styles.reviewCount}>({doctor.reviewCount} reviews)</Text>
            </View>
            
            <Text style={styles.doctorExperience}>{doctor.experience} experience</Text>
          </View>
        </View>
        
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityText}>
            {doctor.availability} • Next at {doctor.nextSlot}
          </Text>
        </View>
        
        <View style={styles.doctorActions}>
          {doctor.isOnline ? (
            <Button 
              title="Start Consultation" 
              onPress={() => startConsultation(doctor)}
            />
          ) : (
            <Button 
              title="Schedule" 
              onPress={() => scheduleConsultation(doctor)}
              style={styles.secondaryButton}
              textStyle={styles.secondaryButtonText}
            />
          )}
        </View>
      </View>
    );
  };
  
  const renderAppointmentItem = (appointment) => {
    return (
      <View key={appointment.id} style={styles.appointmentItem}>
        <View style={styles.appointmentHeader}>
          <View style={styles.doctorImageContainer}>
            <Text style={styles.doctorImage}>{appointment.image}</Text>
          </View>
          
          <View style={styles.appointmentInfo}>
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.doctorSpecialty}>{appointment.specialty}</Text>
            
            <View style={styles.appointmentTimeContainer}>
              <Text style={styles.calendarIcon}>📅</Text>
              <Text style={styles.appointmentDate}>
                {formatDate(appointment.date)} at {appointment.time}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.appointmentStatusContainer}>
          <Text 
            style={[
              styles.appointmentStatus,
              appointment.status === 'Confirmed' && styles.statusConfirmed,
              appointment.status === 'Pending' && styles.statusPending,
              appointment.status === 'Completed' && styles.statusCompleted,
            ]}
          >
            {appointment.status}
          </Text>
        </View>
        
        <View style={styles.appointmentActions}>
          {appointment.status === 'Confirmed' && (
            <Button 
              title="Join Call" 
              onPress={() => Alert.alert('Video Call', 'In a real app, this would connect you to your scheduled video consultation.')}
            />
          )}
          
          {appointment.status === 'Pending' && (
            <Button 
              title="Confirm" 
              onPress={() => Alert.alert('Confirm Appointment', 'This would confirm your pending appointment.')}
              style={styles.secondaryButton}
              textStyle={styles.secondaryButtonText}
            />
          )}
          
          {appointment.status === 'Completed' && (
            <Button 
              title="View Summary" 
              onPress={() => Alert.alert('Consultation Summary', 'This would show a summary of your past consultation.')}
              style={styles.secondaryButton}
              textStyle={styles.secondaryButtonText}
            />
          )}
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Video Consultations</Text>
          <Text style={styles.subtitle}>Consult with doctors virtually</Text>
        </View>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'doctors' && styles.activeTab]}
            onPress={() => setActiveTab('doctors')}
          >
            <Text style={[styles.tabText, activeTab === 'doctors' && styles.activeTabText]}>
              Find Doctors
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'past' && styles.activeTab]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
              Past
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'doctors' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Available Doctors</Text>
            {doctors.map(doctor => renderDoctorItem(doctor))}
          </View>
        )}
        
        {activeTab === 'upcoming' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Upcoming Consultations</Text>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => renderAppointmentItem(appointment))
            ) : (
              <Text style={styles.emptyStateText}>No upcoming consultations scheduled.</Text>
            )}
          </View>
        )}
        
        {activeTab === 'past' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Past Consultations</Text>
            {pastConsultations.length > 0 ? (
              pastConsultations.map(appointment => renderAppointmentItem(appointment))
            ) : (
              <Text style={styles.emptyStateText}>No past consultations found.</Text>
            )}
          </View>
        )}
        
        <View style={styles.actionButtons}>
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#e4e4e4',
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#86868b',
  },
  activeTabText: {
    color: '#3498db',
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 15,
  },
  doctorItem: {
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
  doctorHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  doctorImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e9f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  doctorImage: {
    fontSize: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#2ecc71',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
    bottom: 0,
    right: 0,
  },
  doctorInfo: {
    flex: 1,
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
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  doctorExperience: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  availabilityContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  availabilityText: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
  },
  doctorActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appointmentItem: {
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
  appointmentHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  calendarIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#34495e',
  },
  appointmentStatusContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 15,
    marginBottom: 15,
  },
  appointmentStatus: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  statusConfirmed: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
  },
  statusPending: {
    backgroundColor: '#fff8e1',
    color: '#f57c00',
  },
  statusCompleted: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
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

export default VideoConsultationScreen;