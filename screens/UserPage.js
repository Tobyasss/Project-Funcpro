import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function UserPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Page</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});
