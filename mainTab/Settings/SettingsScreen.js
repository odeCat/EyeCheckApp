import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [birth_date, setBirth] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation();

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    navigation.navigate("Welcome");
  }

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
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>{first_name} {last_name}</Text>
      </View>

      {/* Account Settings Section */}
      <Text style={styles.sectionHeader}>Account Settings</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ProfileScreen')}>
        <Text style={styles.optionText}>Edit profile</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.optionText}>Change password</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      {/* Log out */}
      <TouchableOpacity style={styles.option} onPress={signOut}>
        <Text style={styles.optionText}>Log out</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      {/* More Section */}
      <Text style={styles.sectionHeader}>More</Text>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AboutUs')}>
        <Text style={styles.optionText}>About us</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
        <Text style={styles.optionText}>Privacy policy</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Terms')}>
        <Text style={styles.optionText}>Terms and conditions</Text>
        <Text style={styles.arrow}>{'>'}</Text>

      </TouchableOpacity>
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007260',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 14,
    color: '#888',
    marginVertical: 10,
    marginLeft: 20,
  },
  option: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
    color: '#888',
  },
});

export default SettingsScreen;