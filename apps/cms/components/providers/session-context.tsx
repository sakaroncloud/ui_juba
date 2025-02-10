"use client";
import { getSession, Session } from "@/lib/actions/session";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the type for the context state
interface sessionContextType {
  session: Session | null;
  change: Boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
const SessionContext = createContext<sessionContextType | undefined>(undefined);

// Create a provider component
interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [session, setSession] = useState<sessionContextType["session"]>(null);
  const [change, setChange] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const fetchSession = async () => {
      const sess = await getSession();
      if (sess) {
        setSession(sess);
      }
    };
    fetchSession();
  }, [change, pathname]);

  return (
    <SessionContext.Provider value={{ session, change, setChange }}>
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
