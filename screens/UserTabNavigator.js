import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabunganSampah from './TabunganSampah';
import PenukaranPoin from './PenukaranPoin';
import TasHadiah from './TasHadiah';

const Tab = createBottomTabNavigator();

export default function UserTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tabungan Sampah" component={TabunganSampah} />
      <Tab.Screen name="Penukaran Poin" component={PenukaranPoin} />
      <Tab.Screen name="Tas Hadiah" component={TasHadiah} />
    </Tab.Navigator>
  );
}
