import React, { createContext, useState, useContext } from 'react';

// Create the context
const TabunganContext = createContext();

// Create a provider component
export const TabunganProvider = ({ children }) => {
  const [poinUser, setPoinUser] = useState(100); // Example state for points
  const [redeemedHadiah, setRedeemedHadiah] = useState([]); // Store redeemed hadiah

  // Function to add points when trash is added
  const tambahTabungan = ({ jenis, berat }) => {
    const pointsAdded = berat * 10; // Convert weight to points (1 kg = 10 points)
    setPoinUser((prevPoin) => prevPoin + pointsAdded);
  };

  // Function to add redeemed hadiah
  const addRedeemedHadiah = (hadiah) => {
    setRedeemedHadiah((prevRedeemed) => [...prevRedeemed, hadiah]);
    setPoinUser(poinUser - hadiah.poin); // Deduct points when hadiah is redeemed
  };

  return (
    <TabunganContext.Provider value={{ poinUser, redeemedHadiah, addRedeemedHadiah, tambahTabungan }}>
      {children}
    </TabunganContext.Provider>
  );
};

// Custom hook to access the context
export const useTabungan = () => useContext(TabunganContext);
