"use client";

import {createContext, useContext, useEffect, useState} from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

// Create the context with a default value (best practice)
const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleTheme: () => {}, // Placeholder function
});

export const useTheme = (): ThemeContextType => {
    const theme = useContext(ThemeContext);
    if (theme === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }return theme;
};

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children})  => {
    const [darkMode, setDarkMode] = useState(() => {
      if (typeof window !== 'undefined') {
        const savedTheme = window.localStorage.getItem("darkMode");
        return savedTheme ? JSON.parse(savedTheme) : false;
      }
      return false; // Default value for server-side rendering
    });
  
    useEffect(() => {
      if (typeof window !== 'undefined'){
        window.localStorage.setItem("darkMode", JSON.stringify(darkMode)); // Update localStorage when theme changes
      if (darkMode){
        document.documentElement.classList.add("dark", darkMode); // Add or remove the "dark" class from the document root
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
    }, [darkMode]);

    const toggleTheme = () => {setDarkMode((prev: boolean) => !prev)}; // Toggle the theme

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}