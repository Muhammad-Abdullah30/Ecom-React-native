import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const logout = () => {
    setUser(null);
    // If using async storage or similar:
    // await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
