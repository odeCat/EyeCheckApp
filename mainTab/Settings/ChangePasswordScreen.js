import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Ionicons } from '@expo/vector-icons';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // desgin for the alert
  const CustomAlert = ({ visible, message, onClose }) => {
    return (
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alertContainer}>
            <Ionicons name="warning-outline" size={50} color="#F9D648" />
            <Text style={styles.alertTitle}>Notice</Text>
            <Text style={styles.alertMessage}>{message}</Text>
  
            <TouchableOpacity onPress={onClose} style={styles.okButton}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  //Function to change password
    const handleChangePassword = async (event) => {
      // Persist the event to prevent it from being nullified
      event.persist();
  
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
  
      if (error) {
        setAlertMessage("Error", error.message);
        setAlertVisible(true);
        setLoading(false);
      } else {
        setAlertMessage("Password changed successfully.");
        setAlertVisible(true);
        setLoading(false);
        setNewPassword(''); // Clear the input field
      }
    };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.subtitle}>
        Enter your new password below, we're just being extra safe
      </Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>

      {/* Custom Alert Modal */}
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  alertMessage: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  okButton: {
    marginTop: 20,
    backgroundColor: '#A6EBB7',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  okButtonText: {
    color: '#000',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#888',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#45A188',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangePassword;
