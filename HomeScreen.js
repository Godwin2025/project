import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  
  // Menu items for the healthcare app
  const menuItems = [
    {
      id: '1',
      title: 'Video Consultation',
      description: 'Consult with doctors virtually',
      icon: '📹',
      screen: 'VideoConsultation',
      color: '#e3f2fd'
    },
    {
      id: '2',
      title: 'Book Appointment',
      description: 'Schedule in-person or virtual visits',
      icon: '📅',
      screen: 'AppointmentBooking',
      color: '#e8f5e9'
    },
    {
      id: '3',
      title: 'Health Tracking',
      description: 'Monitor your health metrics',
      icon: '❤️',
      screen: 'HealthTracking',
      color: '#fff8e1'
    },
    {
      id: '4',
      title: 'Prescriptions',
      description: 'Manage your medications',
      icon: '💊',
      screen: 'Prescriptions',
      color: '#f3e5f5'
    },
  ];
  
  // Sample upcoming appointment for banner
  const upcomingAppointment = {
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: 'Wednesday, Mar 15, 2025',
    time: '2:30 PM',
    type: 'Video Consultation'
  };
  
  const handleMenuItemPress = (screen) => {
    navigation.navigate(screen);
  };
  
  const renderUpcomingAppointmentBanner = () => {
    return (
      <TouchableOpacity 
        style={styles.appointmentBanner}
        onPress={() => navigation.navigate('VideoConsultation')}
      >
        <View style={styles.appointmentIconContainer}>
          <Text style={styles.appointmentIcon}>📅</Text>
        </View>
        
        <View style={styles.appointmentInfo}>
          <Text style={styles.upcomingLabel}>UPCOMING APPOINTMENT</Text>
          <Text style={styles.appointmentDoctor}>
            {upcomingAppointment.doctorName} • {upcomingAppointment.specialty}
          </Text>
          <Text style={styles.appointmentDateTime}>
            {upcomingAppointment.date} at {upcomingAppointment.time}
          </Text>
        </View>
        
        <View style={styles.appointmentActionContainer}>
          <View style={styles.appointmentType}>
            <Text style={styles.appointmentTypeText}>
              {upcomingAppointment.type}
            </Text>
          </View>
          <Text style={styles.arrowIcon}>▶</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderMenuItems = () => {
    return (
      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem, 
              { backgroundColor: item.color },
              { width: (screenWidth - 60) / 2 } // Adjust width based on screen size
            ]}
            onPress={() => handleMenuItemPress(item.screen)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const renderRecentActivitySection = () => {
    return (
      <View style={styles.recentActivitySection}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        <View style={styles.activityItem}>
          <View style={styles.activityIconContainer}>
            <Text style={styles.activityIcon}>❤️</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Blood Pressure Update</Text>
            <Text style={styles.activityTimestamp}>Today, 9:30 AM</Text>
            <Text style={styles.activityDescription}>
              Reading: 120/80 mmHg - Within normal range
            </Text>
          </View>
        </View>
        
        <View style={styles.activityItem}>
          <View style={styles.activityIconContainer}>
            <Text style={styles.activityIcon}>💊</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Medication Reminder</Text>
            <Text style={styles.activityTimestamp}>Yesterday, 8:00 PM</Text>
            <Text style={styles.activityDescription}>
              Took Lisinopril 10mg - 23 doses remaining
            </Text>
          </View>
        </View>
        
        <View style={styles.activityItem}>
          <View style={styles.activityIconContainer}>
            <Text style={styles.activityIcon}>📹</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Video Consultation</Text>
            <Text style={styles.activityTimestamp}>Feb 10, 2025</Text>
            <Text style={styles.activityDescription}>
              Completed 20 min call with Dr. Emily Rodriguez
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => Alert.alert('View All', 'This would show all activity history.')}
        >
          <Text style={styles.viewAllButtonText}>View All Activity</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Alex</Text>
            <Text style={styles.subgreeting}>How are you feeling today?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileButtonText}>👤</Text>
          </TouchableOpacity>
        </View>
        
        {renderUpcomingAppointmentBanner()}
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Services</Text>
          {renderMenuItems()}
        </View>
        
        {renderRecentActivitySection()}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 5,
  },
  subgreeting: {
    fontSize: 16,
    color: '#86868b',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 20,
  },
  appointmentBanner: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  appointmentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentIcon: {
    fontSize: 20,
  },
  appointmentInfo: {
    flex: 1,
  },
  upcomingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3498db',
    marginBottom: 5,
  },
  appointmentDoctor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 3,
  },
  appointmentDateTime: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  appointmentActionContainer: {
    alignItems: 'center',
  },
  appointmentType: {
    backgroundColor: '#e1f5fe',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 5,
  },
  appointmentTypeText: {
    fontSize: 12,
    color: '#0288d1',
    fontWeight: '600',
  },
  arrowIcon: {
    fontSize: 12,
    color: '#bdc3c7',
  },
  menuSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 15,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    height: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  recentActivitySection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 3,
  },
  activityTimestamp: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 5,
  },
  activityDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  viewAllButtonText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
});

export default HomeScreen;