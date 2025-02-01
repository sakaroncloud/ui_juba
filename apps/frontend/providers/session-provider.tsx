"use client"
import { getSession, Session } from "@/lib/actions/session";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the type for the context state
interface sessionContextType {
    session: Session | null | undefined,
    change: boolean,
    setChange: React.Dispatch<React.SetStateAction<boolean>>
}


// Create the context with default values
const SessionContext = createContext<sessionContextType | undefined>(undefined);

// Create a provider component
interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const [change, setChange] = useState(true);
    const [session, setSession] = useState<sessionContextType["session"]>(null);

    useEffect(() => {
        console.log("fetching again")
        const fetchSession = async () => {
            const session = await getSession()
            setSession(session)
        }
        fetchSession()
    }, [change]);

    return (
        <SessionContext.Provider value={{ change, session, setChange }}>
            {children}
        </SessionContext.Provider>
    );
};

// Custom hook to use the SessionContext
export const useSession = (): sessionContextType => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSessionContext must be used within a GalleryProvider");
    }
    return context;
};
