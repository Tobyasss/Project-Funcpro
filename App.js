import { Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserScreen, HistoryTukarScreen, TukarScreen } from './App/User/HomeUser';
import { AdminScreen, ManageRewardScreen, ManageTukarScreen } from './App/Admin/HomeAdmin';
import './global.css';
import { LoginScreen, RegisterScreen } from './App/Login';
import supabase from './App/Supabase';






const Stack = createNativeStackNavigator();

function HomeScreen({ route, navigation }) {
  const [user, setUser] = useState(route.params.data);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.from('users').select().eq('id', user.id).single();
      if (error) {
        Alert.alert('Error', 'Terjadi kesalahan saat mengambil data pengguna');
      } else {
        setUser(data);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchUser();
    });

    fetchUser();

    return unsubscribe;
  }, [navigation]);

  return (
    user.isadmin === true ? (
      AdminScreen({ user, navigation })
    ) : (
      UserScreen({ user, navigation })
    )
  );
}




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }} w
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tukar" component={TukarScreen} />
        <Stack.Screen name="History" component={HistoryTukarScreen} />
        <Stack.Screen name="ManageReward" component={ManageRewardScreen} />
        <Stack.Screen name="ManageTukar" component={ManageTukarScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}