import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('human');
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
    
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>About Us</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>

        <View style={styles.textBox}>
            <Text style={styles.sectionHeader}>Learn more about the developers behind the EyeCheck App</Text>

            <Text style={styles.subHeader}>What is the goal of the Eye Check App?</Text>
            <Text style={styles.contentText}>
            This study can democratize access to vision testing, particularly in areas with limited healthcare facilities. It empowers individuals to take charge of their eye health, contributing to a more informed and health-conscious society.
            </Text>

            <Text style={styles.subHeader}>Developers</Text>
            <Text style={styles.contentText}>
                Lead programmer: Tiongson, Kyle D.
                Developers: Olleres, Catherine A. and Raloso, John Paul D.
            </Text>

            <Text style={styles.subHeader}>Have any questions about the app? Contact us at</Text>
            <Text style={styles.contentText}>
                Email: 
                eyecheck09@gmail.com
            </Text>

            <Text style={styles.subHeader}>Want to set an appointment to further check your eye health?</Text>
            <Text style={styles.contentText}>
                Contact these Clinics on Facebook   

                <Text style={{color: 'blue', textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.facebook.com/GamosaDiagnosticandMedicalClinic')}>   Smartguys Community Healthcare Inc.</Text>
                <Text style={{color: 'blue', textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.facebook.com/EyeFixOptix')}>   EyeFix Optics</Text>
            </Text>
        </View>
        
        <Text style={styles.updateText}>Last updated: June 24, 2024</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#004d40',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  textBox: {
    backgroundColor: '#FAFAFA',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
  },
  updateText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 10,
  },
});

export default AboutUs;