import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Waste Management App</Text>
      <Button
        title="Go to Admin Home"
        onPress={() => navigation.navigate('AdminHome')}
      />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="Go to User Home"
        onPress={() => navigation.navigate('UserHome')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
