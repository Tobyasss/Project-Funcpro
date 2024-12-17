import { Text, View, Button, TextInput, Alert, FlatList, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import './global.css'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import supabase from './App/Supabase';
import { UserScreen, HistoryTukarScreen, TukarScreen } from './App/User/HomeUser';
import LoginScreen from './App/Login';

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

function AdminScreen({ user, navigation }) {
  return (
    <SafeAreaView className='flex-1 bg-blue-100'>
      <StatusBar style="auto" backgroundColor='#dbeafe' />
      <View className='flex-1 items-center justify-center px-4'>
        <Text className='text-4xl font-bold text-center mb-4'>Selamat Datang, {user.username}!</Text>
        <Button
          title="Logout"
          onPress={() => navigation.push('Login')}
        />
      </View>
    </SafeAreaView>
  )

}



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tukar" component={TukarScreen} />
        <Stack.Screen name="History" component={HistoryTukarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}