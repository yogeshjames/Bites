import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create UserContext
const UserContext = createContext();

// Custom Hook for easy usage
export const useUser = () => useContext(UserContext);

// Context Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Verify token and fetch user details
        const response = await axios.get("http://localhost:5000/api/auth/verifyToken", {
          withCredentials: true, // Include cookies automatically
        });

        if (response.data.success) {
          setUser(response.data.user); // Assuming backend sends user data on successful verification
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("User verification failed:", error);
        setUser(null); // Clear user state if token verification fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
