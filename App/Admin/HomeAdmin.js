import supabase from "../Supabase";
import { useEffect, useState } from "react";
import { Alert, Modal, Text, View, FlatList, TextInput, Button, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function AdminScreen({ user, navigation }) {
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [pointsToAdd, setPointsToAdd] = useState(0);

    const fetchListUser = async () => {
        const { data, error } = await supabase.from('users').select('*');
        if (error) {
            Alert.alert('Error', 'Terjadi kesalahan saat mengambil data');
        }
        else {
            setListUser(data);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchListUser();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView className='flex-1 bg-blue-100'>
            <StatusBar style="auto" backgroundColor='#dbeafe' />
            <View className="absolute top-10 right-0 ">
                <Button
                    title="Logout"
                    onPress={() => { navigation.navigate("Login") }}
                    color="#1E40AF"
                />
            </View>
            <View className='flex-1 items-center justify-between px-4'>
                <View className='flex items-center justify-center h-1/3 px-4'>
                    <Text className='text-4xl font-bold text-center mb-4 text-blue-900'>Halo, {user.username}!</Text>
                    <View className='flex flex-row gap-8 w-full'>
                        <Button
                            title="Manage Penukaran"
                            onPress={() => navigation.push('ManageTukar', { user })}
                            color="#1E40AF"
                        />
                        <Button
                            title='Manage Reward'
                            onPress={() => navigation.push('ManageReward', { user })}
                            color="#1E40AF"
                        />
                    </View>
                </View>

                <View className='w-full h-2/3 mb-4'>
                    <Text className='text-2xl font-bold text-center mb-4 text-blue-900'>List User</Text>
                    <View className='w-full h-2/3 mb-4'>
                        <FlatList
                            data={listUser}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => setSelectedUser(item)}
                                    className='flex flex-row justify-between items-center p-4 mb-4 bg-white rounded-md shadow-md'>
                                    <Text className='text-lg font-bold text-blue-900'>{item.username}</Text>
                                    <Text className='text-lg text-blue-900'>{item.points} Points</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </View>


            {selectedUser && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!selectedUser}
                    onRequestClose={() => setSelectedUser(null)}
                >
                    <View className="flex-1 justify-center items-center bg-none">
                        <View className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
                            <Text className="text-2xl font-bold text-center mb-4 text-blue-900">Tambah Poin</Text>
                            <Text className="text-lg mb-2">Username: {selectedUser.username}</Text>
                            <Text className="text-lg mb-4">Poin Saat Ini: {selectedUser.points}</Text>
                            <TextInput
                                placeholder="Masukkan jumlah poin"
                                keyboardType="numeric"
                                className="border border-gray-300 p-2 rounded mb-4"
                                onChangeText={(text) => setPointsToAdd(Number(text))}
                            />
                            <View className="flex flex-row justify-between">
                                <Button
                                    title="Batal"
                                    onPress={() => setSelectedUser(null)}
                                    color="#1E40AF"
                                />
                                <Button
                                    title="Tambah"
                                    onPress={async () => {
                                        const { data, error } = await supabase
                                            .from('users')
                                            .update({ points: selectedUser.points + pointsToAdd })
                                            .eq('id', selectedUser.id);
                                        const { data: history, error: errorHistory } = await supabase.from('history_sampah').insert({
                                            user_id: selectedUser.id,
                                            points: pointsToAdd,
                                        });
                                        if (error || errorHistory) {
                                            Alert.alert('Error', 'Terjadi kesalahan saat menambah poin');
                                            setSelectedUser(null);
                                            setPointsToAdd(0);
                                        } else {
                                            setSelectedUser(null);
                                            fetchListUser();
                                            setPointsToAdd(0);
                                        }
                                    }}
                                    color="#1E40AF"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

        </SafeAreaView>
    )

}

function ManageRewardScreen({ navigation }) {

    const [rewards, setRewards] = useState([]);
    const [selectedReward, setSelectedReward] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const [newRewardName, setNewRewardName] = useState('');
    const [newRewardPoints, setNewRewardPoints] = useState(0);

    const fetchRewards = async () => {
        const { data, error } = await supabase.from('rewards').select('*');
        if (error) {
            Alert.alert('Error', 'Terjadi kesalahan saat mengambil data');
        } else {
            setRewards(data);
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Manage Reward',
        });
        const unsubscribe = navigation.addListener('focus', () => {
            fetchRewards();
        });
        return unsubscribe;
    }, [navigation]);

    console.log(selectedReward);
    return (
        <View className='flex-1 bg-blue-100'>
            <StatusBar style="auto" backgroundColor='#FFF' />
            <View className='flex-1 items-center justify-between px-4'>
                <View className='flex items-center justify-center h-1/3 px-4'>
                    <Text className='text-4xl font-bold text-center mb-4 text-blue-900'>Manage Reward</Text>
                    <Button
                        title="Tambah Reward"
                        onPress={() => setShowAddModal(true)}
                        color="#1E40AF"
                    />
                </View>

                <View className='w-full h-2/3 mb-4'>
                    <Text className='text-2xl font-bold text-center mb-4 text-blue-900'>List Reward</Text>
                    <FlatList
                        data={rewards}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => setSelectedReward(item)}
                                className='flex flex-row justify-between items-center p-4 mb-4 bg-white rounded-md shadow-md'>
                                <Text className='text-lg font-bold text-blue-900'>{item.name}</Text>
                                <Text className='text-lg text-blue-900'>{item.required_points} Points</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>

            {selectedReward && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!selectedReward}
                    onRequestClose={() => setSelectedReward(null)}
                >
                    <View className="flex-1 justify-center items-center bg-none">
                        <View className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
                            <Text className="text-2xl font-bold text-center mb-4 text-blue-900">Edit Reward</Text>
                            <TextInput
                                placeholder="Reward Name"
                                value={selectedReward.name}
                                className="border border-gray-300 p-2 rounded mb-4"
                                onChangeText={(text) => setSelectedReward({ ...selectedReward, name: text })}
                            />
                            <TextInput
                                placeholder="Reward Points"
                                value={selectedReward.required_points.toString()}
                                keyboardType="numeric"
                                className="border border-gray-300 p-2 rounded mb-4"
                                onChangeText={(text) => setSelectedReward({ ...selectedReward, required_points: Number(text) })}
                            />
                            <View className="flex flex-row justify-between">
                                <Button
                                    title="Cancel"
                                    onPress={() => setSelectedReward(null)}
                                    color="#1E40AF"
                                />
                                <Button
                                    title="Save"
                                    onPress={async () => {
                                        const { data, error } = await supabase
                                            .from('rewards')
                                            .update({ name: selectedReward.name, required_points: Number(selectedReward.required_points) })
                                            .eq('id', selectedReward.id);
                                        if (error) {
                                            Alert.alert('Error', 'Terjadi kesalahan saat mengedit reward');
                                        } else {
                                            setSelectedReward(null);
                                            fetchRewards();
                                        }
                                    }}
                                    color="#1E40AF"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            {showAddModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showAddModal}
                    onRequestClose={() => setShowAddModal(false)}
                >
                    <View className="flex-1 justify-center items-center bg-none">
                        <View className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
                            <Text className="text-2xl font-bold text-center mb-4 text-blue-900">Tambah Reward</Text>
                            <TextInput
                                placeholder="Reward Name"
                                className="border border-gray-300 p-2 rounded mb-4"
                                onChangeText={(text) => setNewRewardName(text)}
                            />
                            <TextInput
                                placeholder="Reward Points"
                                keyboardType="numeric"
                                className="border border-gray-300 p-2 rounded mb-4"
                                onChangeText={(text) => setNewRewardPoints(Number(text))}
                            />
                            <View className="flex flex-row justify-between">
                                <Button
                                    title="Cancel"
                                    onPress={() => setShowAddModal(false)}
                                    color="#1E40AF"
                                />
                                <Button
                                    title="Add"
                                    onPress={async () => {
                                        const { data, error } = await supabase
                                            .from('rewards')
                                            .insert({ name: newRewardName, required_points: newRewardPoints });
                                        if (error) {
                                            Alert.alert('Error', 'Terjadi kesalahan saat menambah reward');
                                        } else {
                                            setShowAddModal(false);
                                            fetchRewards();
                                        }
                                    }}
                                    color="#1E40AF"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    )
}

function ManageTukarScreen({ navigation }) {
    const [listTukar, setListTukar] = useState([]);
    const [selectedTukar, setSelectedTukar] = useState(null);

    const fetchListTukar = async () => {
        const { data, error } = await supabase
            .from('history')
            .select('*, rewards(name, required_points), users(username)')
            .order('redeemed_at', { ascending: false });
        if (error) {
            Alert.alert('Error', 'Terjadi kesalahan saat mengambil data');
        } else {
            setListTukar(data);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Manage Penukaran',
        });
        const unsubscribe = navigation.addListener('focus', () => {
            fetchListTukar();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View className='flex-1 bg-blue-100'>
            <StatusBar style="auto" backgroundColor='#FFF' />
            <View className='flex-1 items-center justify-between px-4'>
                <View className='flex items-center justify-center h-1/3 px-4'>
                    <Text className='text-4xl font-bold text-center mb-4 text-blue-900'>Manage Penukaran</Text>
                    <Text className='text-xl text-center text-blue-900'>Tekan Penukaran Untuk Menyelesaikan Penukaran </Text>
                </View>

                <View className='w-full h-2/3 mb-4'>
                    <Text className='text-2xl font-bold text-center mb-4 text-blue-900'>List Penukaran</Text>
                    <FlatList
                        data={listTukar}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => setSelectedTukar(item)}
                                className='flex flex-row justify-between items-center p-4 mb-4 bg-white rounded-md shadow-md'>
                                <View>
                                    <Text className='text-lg font-bold text-blue-900'>{item.users.username}</Text>
                                    <Text className='text-lg text-blue-900'>{item.rewards.name}</Text>
                                </View>
                                <Text className='text-lg text-blue-900'>{item.rewards.required_points} Points</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>

            {selectedTukar && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!selectedTukar}
                    onRequestClose={() => setSelectedTukar(null)}
                >
                    <View className="flex-1 justify-center items-center bg-none">
                        <View className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
                            <Text className="text-2xl font-bold text-center mb-4 text-blue-900">Selesaikan Penukaran</Text>
                            <Text className="text-lg mb-2">Username: {selectedTukar.users.username}</Text>
                            <Text className="text-lg mb-2">Reward: {selectedTukar.rewards.name}</Text>
                            <Text className="text-lg mb-4">Points: {selectedTukar.rewards.required_points}</Text>
                            <View className="flex flex-row justify-between">
                                <Button
                                    title="Batal"
                                    onPress={() => setSelectedTukar(null)}
                                    color="#1E40AF"
                                />
                                <Button
                                    title="Selesaikan"
                                    onPress={async () => {
                                        const { error } = await supabase
                                            .from('history')
                                            .delete()
                                            .eq('id', selectedTukar.id);
                                        if (error) {
                                            Alert.alert('Error', 'Terjadi kesalahan saat menyelesaikan penukaran');
                                        } else {
                                            setSelectedTukar(null);
                                            fetchListTukar();
                                        }
                                    }}
                                    color="#1E40AF"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

export { AdminScreen, ManageRewardScreen, ManageTukarScreen };