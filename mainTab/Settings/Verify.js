import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { supabase } from '../../lib/supabase';

const Verify = () => {
  const [verifyCode, setCode] = useState('');
  const [confirmCode, setconfirmCode] = useState('');

  //Function to verify
  const verifyCodeFunction = () => {
    const email = 'eyecheck09@gmail.com';
    const subject = 'User Notification';
    const body = 'A user has asked to be verified.';

    // Construct the mailto URL
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's email client
    Linking.openURL(mailtoUrl).catch((err) => console.error('Error opening email client', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your account</Text>
      <Text style={styles.text}>
        Click the button to send us an email, so we can verify your account. This is to confirm if you are using a verified email
      </Text>
      <TouchableOpacity style={styles.button} onPress={verifyCodeFunction}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>
        Note: After sending us an email, please log in again to your account. Failing to send us an email will lead to terminating your account.
      </Text>

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#888',
  },
  button: {
    height: 50,
    backgroundColor: '#39B68D',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Verify;