import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "../context/NotificationContext.jsx";
import apiClient from "../services/apiClient.js";

export default function NotificationItem({ notification, onClose }) {
  const { dispatch } = useNotifications();
  const { mutate: markRead } = useMutation({
    mutationFn: (id) => apiClient.patch(`/api/notifications/${id}/read`),
    onMutate: (id) => {
      dispatch({ type: "MARK_READ", payload: id });
    },
    onError: (error, id) => {
      dispatch({ type: "MARK_UNREAD", payload: id });
      console.error("[notifications] Failed to mark notification as read:", error);
    },
  });

  function handleClick() {
    if (!notification.isRead) markRead(notification.id);
    onClose();
  }

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        style={{
          width: "100%",
          padding: "0.85rem 1rem",
          border: 0,
          borderBottom: "1px solid #f3f4f6",
          cursor: "pointer",
          textAlign: "left",
          background: notification.isRead ? "#fff" : "#eff6ff",
          display: "flex",
          gap: "0.75rem",
        }}
      >
        {!notification.isRead && (
          <span
            aria-label="Unread"
            style={{
              marginTop: 6,
              flexShrink: 0,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#3b82f6",
            }}
          />
        )}
        <span>
          <span style={{ display: "block", marginBottom: 2, fontSize: "0.875rem" }}>
            {notification.message}
          </span>
          <time style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
            {new Date(notification.timestamp).toLocaleString()}
          </time>
        </span>
      </button>
    </li>
  );
}
