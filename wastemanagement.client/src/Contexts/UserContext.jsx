import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const savedUserData = sessionStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  const [totalCoins, setTotalCoins] = useState(() => {
    const savedTotalCoins = sessionStorage.getItem("totalCoins");
    return savedTotalCoins ? JSON.parse(savedTotalCoins) : 0;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    return isAdmin ? JSON.parse(isAdmin) : false;
  });

  useEffect(() => {
    if (userData !== null) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    if (totalCoins !== null) {
      sessionStorage.setItem("totalCoins", JSON.stringify(totalCoins));
    }
  }, [totalCoins]);

  useEffect(() => {
    if (isAdmin !== null) {
      sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    }
  }, [isAdmin]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        totalCoins,
        setTotalCoins,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
