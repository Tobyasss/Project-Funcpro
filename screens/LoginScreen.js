import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      
      <TextInput
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      
      <Button
        title="Login"
        onPress={() => navigation.navigate('Selection')}
      />
      
      {/* Tambahkan tombol Register */}
      <View style={styles.registerContainer}>
        <Text>Don't have an account?</Text>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
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
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
