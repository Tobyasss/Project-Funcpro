import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import supabase from './Supabase';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const { data, error } = await supabase.from('users').select().eq('username', username).eq('password', password).single();
        if (error) {
            Alert.alert('Error', "Username atau Password salah");
        }
        else {
            navigation.navigate('Home', { data });
        }

    }
    return (
        <SafeAreaView className='flex-1 bg-blue-100'>
            <StatusBar style="auto" backgroundColor='#dbeafe' />
            <View className='flex-1 items-center justify-center px-4'>
                <Text className='text-4xl font-bold text-center mb-8 text-blue-900'>Login</Text>
                <TextInput
                    className='w-full border border-gray-300 rounded-md p-4 mb-4 text-lg bg-white'
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#9CA3AF"
                />
                <TextInput
                    className='w-full border border-gray-300 rounded-md p-4 mb-8 text-lg bg-white'
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#9CA3AF"
                />
                <View className='w-full'>
                    <Button
                        title="Login"
                        onPress={handleLogin}
                        color="#1E40AF"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
export default LoginScreen;