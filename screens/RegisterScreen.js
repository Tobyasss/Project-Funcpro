import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase
const supabaseUrl = 'https://cguhrsbelfkjggjievtx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndWhyc2JlbGZramdnamlldnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4ODg4NjQsImV4cCI6MjA0OTQ2NDg2NH0.liJhtOBLlqQfIa2H4yor97e61N0lAGNRPg2NHuI0Et8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and password cannot be empty!');
      return;
    }

    try {
      const { data, error } = await supabase.from('users').insert([
        { username, password },
      ]);

      if (error) {
        throw error;
      }

      Alert.alert('Success', 'Account Registered!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: '100%',
  },
});
