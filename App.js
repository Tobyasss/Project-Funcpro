import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TabunganProvider } from './screens/TabunganContext';

// Import screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SelectionScreen from './screens/SelectionScreen';
import AdminPasswordScreen from './screens/AdminPasswordScreen';
import AdminPage from './screens/AdminPage';
import UserTabNavigator from './screens/UserTabNavigator';
import TasHadiah from './screens/TasHadiah';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TabunganProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Selection" component={SelectionScreen} />
          <Stack.Screen name="AdminPasswordScreen" component={AdminPasswordScreen} />
          <Stack.Screen name="AdminPage" component={AdminPage} />
          <Stack.Screen name="UserPage" component={UserTabNavigator} options={{ title: 'User Page' }} />
          <Stack.Screen name="TasHadiah" component={TasHadiah} />
        </Stack.Navigator>
      </NavigationContainer>
    </TabunganProvider>
  );
}
