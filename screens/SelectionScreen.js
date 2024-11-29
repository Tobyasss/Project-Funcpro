import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Role</Text>
      <Button title="User Page" onPress={() => navigation.navigate('UserPage')} />
      <Button title="Admin Page" onPress={() => navigation.navigate('AdminPasswordScreen')} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});
