import supabase from "../Supabase";
import { useEffect, useState } from "react";
import { Alert, Modal, Text, View, FlatList, TextInput, Button, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function UserScreen({ user, navigation }) {

    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        const { data, error } = await supabase.from('history_sampah').select("*").eq('user_id', user.id);
        if (error) {
            Alert.alert('Error', 'Terjadi kesalahan saat mengambil data');
        }
        else {
            setHistory(data);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchHistory();
        });
        return unsubscribe;
    }, [navigation]);



    return (
        <SafeAreaView className='flex-1 bg-blue-100'>
            <StatusBar style="auto" backgroundColor='#dbeafe' />
            <View className='flex-1 items-center justify-between px-4'>
                <View className='flex items-center justify-center h-1/3 px-4'>
                    <Text className='text-4xl font-bold text-center mb-4 text-blue-900'>Selamat Datang, {user.username}!</Text>
                    <Text className='text-2xl text-center mb-8 text-blue-700'>Total Points: {user.points}</Text>
                    <View className='flex flex-row gap-8 w-full'>
                        <Button
                            title="Tukar Point"
                            onPress={() => navigation.push('Tukar', { user })}
                            color="#1E40AF"
                        />
                        <Button
                            title='History Tukar'
                            onPress={() => navigation.push('History', { user })}
                            color="#1E40AF"
                        />
                    </View>
                </View>

                <View className='w-full h-2/3 mb-4'>
                    <Text className='text-2xl font-bold text-center mb-4 text-blue-900'>History</Text>
                    <FlatList
                        data={history}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View className='bg-white p-4 mb-4 rounded-md shadow'>
                                    <Text className='text-lg text-blue-900 font-bold'>Tanggal: {new Date(item.created_at).toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
                                    <Text className='text-lg text-blue-900'>Setoran Sampah: {item.points} Kg</Text>
                                    <Text className='text-lg text-blue-900'>Point diterima: {item.points}</Text>
                                </View>
                            )
                        }}
                    >

                    </FlatList>
                </ View>
                <View className='w-full'>
                    <Button
                        title="Logout"
                        onPress={() => navigation.push('Login')}
                        color="#1E40AF"
                    />
                </View>
            </View>
        </SafeAreaView>
    )

}


function TukarScreen({ route, navigation }) {
    const [user, setUser] = useState(route.params.user);

    const [reward, setReward] = useState([]);
    const [selectedReward, setSelectedReward] = useState(null);
    <StatusBar style="auto" backgroundColor='#fff' />

    const fetchReward = async () => {
        const { data, error } = await supabase.from('rewards').select('*');
        if (error) {
            Alert.alert('Error', 'Terjadi kesalahan saat mengambil data');
        }
        else {
            setReward(data);
        }
    }

    const handleTukar = async () => {
        console.log(user.points, selectedReward.required_points)
        if (user.points < selectedReward.required_points) {
            Alert.alert('Error', 'Point tidak cukup');
            return;
        } else {
            const newPoint = user.points - selectedReward.required_points;
            const { data, error } = await supabase.from('users').update({ points: newPoint }).eq('id', user.id);
            const { data: data2, error: error2 } = await supabase.from('history').insert({ user_id: user.id, reward_id: selectedReward.id, points_used: selectedReward.required_points });
            if (error || error2) {
                Alert.alert('Error', 'Terjadi kesalahan saat tukar point');
                console.log(error, error2);
                return;
            }
            setSelectedReward(null);
            setUser({ ...user, points: newPoint });
            Alert.alert('Success', 'Tukar point berhasil');
            return;
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Tukar Point',

        });
        const unsubscribe = navigation.addListener('focus', () => {
            fetchReward();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View className="p-4 bg-blue-100 h-full">
            <FlatList
                data={reward}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View className='bg-white p-6 mb-4 rounded-lg shadow-lg'>
                            <Text className='text-xl text-blue-900 font-bold mb-2'>{item.name}</Text>
                            <Text className='text-lg text-blue-700 mb-4'>Point yang dibutuhkan: {item.required_points}</Text>
                            <Button
                                title="Tukar"
                                onPress={() => {
                                    setSelectedReward(item);
                                }}
                                color="#1E40AF"
                            />
                        </View>
                    )
                }}
            />

            <Modal
                visible={selectedReward !== null}
                onRequestClose={() => setSelectedReward(null)}
                transparent={true}
                animationType="slide"
            >
                <View className='flex-1 items-center justify-center'>
                    <View className='bg-white p-6 rounded-lg shadow-lg w-11/12'>
                        <Text className='text-4xl font-bold text-center mb-4 text-blue-900'>Tukar Point</Text>
                        <Text className='text-lg text-blue-900 font-bold'>{selectedReward?.name}</Text>
                        <Text className='text-lg text-blue-900 mb-4'>Point yang dibutuhkan: {selectedReward?.required_points}</Text>
                        <Button
                            title="Tukar"
                            onPress={
                                handleTukar
                            }
                            color="#1E40AF"
                        />
                        <View className='h-4 w-full'></View>
                        <Button
                            title="Close"
                            onPress={() => setSelectedReward(null)}
                            color="#6B7280"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )

}
function HistoryTukarScreen({ route, navigation }) {
    const [user, setUser] = useState(route.params.user);
    const [history, setHistory] = useState([]);
    <StatusBar style="auto" backgroundColor='#fff' />

    const fetchHistory = async () => {
        const { data, error } = await supabase.from('history').select('*,rewards(name)').eq('user_id', user.id);

        if (error) {
            Alert.alert('Error', 'Terjadi kesalahan saat mengambil data');
        }
        else {
            setHistory(data);
        }
    }
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'History Tukar',
        });

        const unsubscribe = navigation.addListener('focus', () => {
            fetchHistory();
        });
        return unsubscribe;
    }, [navigation]);

    console.log(history);
    return (
        <View className="p-4 bg-blue-100 h-full">
            <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View className='bg-white p-4 mb-4 rounded-lg shadow-lg'>
                            <Text className='text-xl text-blue-900 font-bold mb-2'>{item.rewards.name}</Text>
                            <Text className='text-lg text-blue-900'>Point: {item.points_used}</Text>
                            <Text className='text-lg text-blue-900'>Tanggal: {new Date(item.redeemed_at).toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                    )
                }}
            />
        </View>)
}




export { UserScreen, TukarScreen, HistoryTukarScreen };