import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView
} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  mediaDevices
} from 'react-native-webrtc';
import Button from '../components/Button';

const VideoConsultScreen = ({ navigation }) => {
  // State variables for WebRTC
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [callStatus, setCallStatus] = useState('Disconnected');
  
  // WebRTC peer connection reference
  const peerConnection = useRef(null);

  // Initialize WebRTC when component mounts
  useEffect(() => {
    // Clean up when component unmounts
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

  // Function to initialize local media stream
  const startLocalStream = async () => {
    try {
      const constraints = {
        audio: true,
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
          facingMode: 'user'
        }
      };

      const stream = await mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      Alert.alert(
        'Camera/Microphone Error',
        'Unable to access camera or microphone. Please check permissions.'
      );
    }
  };

  // Function to initialize WebRTC peer connection
  const setupPeerConnection = async (stream) => {
    // STUN/TURN servers configuration for NAT traversal
    const configuration = { 
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ] 
    };

    // Create new peer connection
    const pc = new RTCPeerConnection(configuration);
    
    // Add local stream tracks to peer connection
    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream);
    });

    // Handle ICE candidate events
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // In a real app, send this candidate to the remote peer
        console.log('Generated ICE candidate', event.candidate);
      }
    };

    // Handle connection state changes
    pc.onconnectionstatechange = (event) => {
      switch (pc.connectionState) {
        case 'connected':
          setCallStatus('Connected');
          break;
        case 'disconnected':
        case 'failed':
          setCallStatus('Disconnected');
          handleEndCall();
          break;
        case 'closed':
          setCallStatus('Call Ended');
          break;
      }
    };

    // Handle remote stream addition
    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    peerConnection.current = pc;
    return pc;
  };

  // Function to start a call
  const startCall = async () => {
    try {
      setCallStatus('Initializing...');
      
      // Get local media stream
      const stream = await startLocalStream();
      if (!stream) return;
      
      // Setup peer connection
      const pc = await setupPeerConnection(stream);
      
      // In a real app, this is where you would:
      // 1. Create an offer
      // 2. Set local description
      // 3. Send the offer to the remote peer via your signaling server
      
      setIsInCall(true);
      setCallStatus('Calling...');
      
      // Simulate connection for demo purposes (in real app, you'd wait for answer)
      setTimeout(() => {
        if (pc.connectionState !== 'connected') {
          setCallStatus('Connected to Demo');
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error starting call:', error);
      Alert.alert('Call Error', 'Failed to start call. Please try again.');
      setCallStatus('Disconnected');
    }
  };

  // Function to end a call
  const handleEndCall = () => {
    setIsInCall(false);
    setCallStatus('Disconnected');
    
    // Close peer connection
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    
    // Stop local stream
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    
    // Clear remote stream
    setRemoteStream(null);
  };

  // Function to toggle audio mute
  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  // Function to toggle video
  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  // Function to switch camera (front/back)
  const switchCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack._switchCamera();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video Consultation</Text>
        <Text style={styles.status}>Status: {callStatus}</Text>
      </View>

      <View style={styles.videoContainer}>
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
            objectFit="cover"
          />
        )}
        
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.localVideo}
            objectFit="cover"
            zOrder={1}
          />
        )}
        
        {!isInCall && !localStream && (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              Start a consultation to connect with a healthcare professional
            </Text>
          </View>
        )}
      </View>

      <View style={styles.controlsContainer}>
        {isInCall ? (
          <>
            <TouchableOpacity 
              style={[styles.controlButton, isMuted && styles.controlButtonActive]} 
              onPress={toggleMute}
            >
              <Text style={styles.controlText}>{isMuted ? 'Unmute' : 'Mute'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.controlButton, styles.endCallButton]} 
              onPress={handleEndCall}
            >
              <Text style={styles.endCallText}>End Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.controlButton, !isVideoEnabled && styles.controlButtonActive]} 
              onPress={toggleVideo}
            >
              <Text style={styles.controlText}>{isVideoEnabled ? 'Hide Video' : 'Show Video'}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={switchCamera}
            >
              <Text style={styles.controlText}>Switch Camera</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Button 
            title="Start Consultation" 
            onPress={startCall} 
            style={styles.startCallButton}
          />
        )}
      </View>

      <ScrollView style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About Video Consultations</Text>
        <Text style={styles.infoText}>
          Video consultations allow you to connect with healthcare professionals remotely, 
          saving time and eliminating travel. Your consultation is secure and private.
        </Text>
        
        <Text style={styles.infoSubtitle}>Before your consultation:</Text>
        <Text style={styles.infoText}>
          • Ensure you have a stable internet connection{'\n'}
          • Find a quiet, private location{'\n'}
          • Prepare any questions you have for the healthcare provider{'\n'}
          • Have your current medications list ready{'\n'}
          • Test your camera and microphone before starting
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    padding: 15,
    backgroundColor: '#e6f0fd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: '#86868b',
  },
  videoContainer: {
    height: 300,
    backgroundColor: '#000',
    position: 'relative',
  },
  remoteVideo: {
    flex: 1,
    backgroundColor: '#555',
  },
  localVideo: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 100,
    height: 150,
    backgroundColor: '#222',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  controlButton: {
    margin: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: '#b5b5b5',
  },
  controlText: {
    color: '#1c1c1e',
    fontWeight: '500',
  },
  endCallButton: {
    backgroundColor: '#ff3b30',
  },
  endCallText: {
    color: 'white',
    fontWeight: 'bold',
  },
  startCallButton: {
    width: '90%',
  },
  infoContainer: {
    flex: 1,
    padding: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1c1c1e',
  },
  infoSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#1c1c1e',
  },
  infoText: {
    fontSize: 14,
    color: '#4c4c4e',
    lineHeight: 21,
  },
});

export default VideoConsultScreen;