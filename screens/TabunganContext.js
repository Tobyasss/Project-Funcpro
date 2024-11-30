// TabunganContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const TabunganContext = createContext();

// Create a provider component
export const TabunganProvider = ({ children }) => {
  const [poinUser, setPoinUser] = useState(0); // Store user points
  const [redeemedHadiah, setRedeemedHadiah] = useState([]); // Store redeemed rewards
  const [hadiahList, setHadiahList] = useState([   // List of rewards available for redemption
    { id: '1', nama: 'Voucher Belanja', poin: 50 },
    { id: '2', nama: 'Smartphone', poin: 200 },
    { id: '3', nama: 'Tiket Liburan', poin: 500 },
  ]);

  // Function to add points to the user account
  const tambahTabungan = (points) => {
    setPoinUser((prevPoin) => prevPoin + points); // Add or subtract points from the user's current points
  };

  // Function to add a redeemed reward to the user's account
  const addRedeemedHadiah = (hadiah) => {
    setRedeemedHadiah((prevHadiah) => [...prevHadiah, hadiah]); // Add redeemed reward to the list
  };

  // Function to add a new reward (hadiah) to the list
  const addHadiah = (nama, poin) => {
    const newHadiah = { id: (hadiahList.length + 1).toString(), nama, poin };
    setHadiahList((prevHadiahList) => [...prevHadiahList, newHadiah]);
  };

  // Function to remove a reward by ID
  const removeHadiah = (id) => {
    setHadiahList((prevHadiahList) => prevHadiahList.filter((hadiah) => hadiah.id !== id));
  };

  return (
    <TabunganContext.Provider
      value={{
        poinUser,
        redeemedHadiah,
        hadiahList,
        tambahTabungan,
        addRedeemedHadiah,
        addHadiah,  // Export the addHadiah function
        removeHadiah,
      }}
    >
      {children}
    </TabunganContext.Provider>
  );
};

// Custom hook to access the context
export const useTabungan = () => useContext(TabunganContext);
