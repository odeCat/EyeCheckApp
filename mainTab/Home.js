import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, ScrollView, TouchableOpacity  } from 'react-native';
import { Avatar, Icon, Card } from 'react-native-elements';
import COLORS from '../colors';
import fonts from '../fonts';
import { supabase } from "../lib/supabase";


const Home = ({ navigation }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  //getting the data from supabase
  useEffect(() => {
    const fetchSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
            console.error("Error fetching session:", error);
            return;
        }
        if (session) {
            setSession(session);
            getProfile(session); // Fetch profile data when the session is set
        } else {
            console.log("No session available.");
        }
    };

    fetchSession();
}, []);

  const getProfile = async (session) => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!!!");
      const { data, error } = await supabase
        .from("profiles")
        .select(`first_name, last_name, avatar_url`)
        .eq("id", session.user.id)
        .single();

      if (error) {
        Alert.alert("Error fetching profile:", error.message);
        return;
      }

      if (data) {
        setFirstname(data.first_name);
        setLastname(data.last_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      Alert.alert("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={fonts.poppinsBold}>Welcome, {first_name} {last_name} 👋</Text>
          <Text style={styles.subtitle}>Patient</Text>
        </View>
      </View>

      {/* Category Buttons */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('EyeCareFAQScreen')}>
          <Text style={styles.categoryText}>Treatments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('EyeCareFAQScreen', { initialTab: 'FAQs' })}>
          <Text style={styles.categoryText}>FAQs</Text>
        </TouchableOpacity>

      </View>

      {/* Side Scrollable Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        <Card containerStyle={styles.card}>
          <TouchableOpacity  onPress={() => navigation.navigate('QuickGuide')}>
            <Image style={styles.cardImage} source={require('../assets/Eye.jpg')}  />
            <Text style={styles.cardText}>Visual Acuity Test</Text>
            <Text style={styles.cardSubText}>Check your Vision</Text>
          </TouchableOpacity>
        </Card>

        <Card containerStyle={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('ResultScreen')}>
            <Image style={styles.cardImage} source={require('../assets/Result.jpg')}  />
            <Text style={styles.cardText}>Result</Text>
            <Text style={styles.cardSubText}>View Result</Text>
          </TouchableOpacity>
        </Card>
        
        {/* Add more cards if needed */}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '5%', 
    paddingVertical: '2%', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    color: 'grey',
  },
  avatar: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginRight: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
  },
  notificationDot: {
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  cardsContainer: {
    flexDirection: 'row',  // Set to row for horizontal scrolling
    paddingVertical: 10,
  },
  card: {
    width: 300,  // Increased width for larger card
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,  // Margin for spacing between cards
  },
  cardImage: {
    width: '100%',
    height: 300,  // Increased height for larger image
  },
  cardText: {
    // fontFamily: fonts.poppinsBold,
    fontWeight: 'bold',
    fontSize: 18,  // Increased font size for better readability
    marginTop: 10,
    marginBottom: 5,
  },
  cardSubText: {
    fontSize: 14,  // Increased font size for better readability
    color: 'grey',
    marginBottom: 10,
  },
});

export default Home;