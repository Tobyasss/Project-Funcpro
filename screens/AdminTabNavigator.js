import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddHadiah from './AddHadiah';  // Komponen untuk menambah hadiah
import RemoveHadiah from './RemoveHadiah';  // Komponen untuk menghapus hadiah

const Tab = createBottomTabNavigator();

export default function AdminTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tambah Hadiah" component={AddHadiah} />
      <Tab.Screen name="Hapus Hadiah" component={RemoveHadiah} />
    </Tab.Navigator>
  );
}
