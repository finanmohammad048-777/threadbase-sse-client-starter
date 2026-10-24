import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { notificationReducer } from "../reducers/notificationReducer.js";
import apiClient from "../services/apiClient.js";

// ── Context ───────────────────────────────────────────────────
const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
    unreadCount: 0,
  });

  useEffect(() => {
    if (!user) {
      dispatch({ type: "LOAD_NOTIFICATIONS", payload: [] });
      return undefined;
    }

    let active = true;
    apiClient
      .get("/api/notifications")
      .then(({ data }) => {
        if (!Array.isArray(data)) {
          throw new Error("Notification history response must be an array.");
        }
        if (active) dispatch({ type: "LOAD_NOTIFICATIONS", payload: data });
      })
      .catch((error) => {
        if (active) console.error("[notifications] Failed to load history:", error);
      });

    return () => {
      active = false;
    };
  }, [user]);

  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
