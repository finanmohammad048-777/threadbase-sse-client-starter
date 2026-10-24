import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown({ onClose }) {
  const { notifications, unreadCount, dispatch } = useNotifications();

  return (
    <section
      aria-label="Notifications"
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        width: "min(360px, 90vw)",
        maxHeight: "min(480px, 80vh)",
        overflowY: "auto",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        zIndex: 50,
      }}
    >
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.85rem 1rem",
        borderBottom: "1px solid #e5e7eb",
      }}>
        <strong>Notifications</strong>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={() => dispatch({ type: "MARK_ALL_READ" })}
            style={{ border: 0, background: "none", color: "#4f46e5", cursor: "pointer" }}
          >
            Mark all as read
          </button>
        )}
      </header>

      {notifications.length > 0 ? (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={onClose}
            />
          ))}
        </ul>
      ) : (
        <p style={{ margin: 0, padding: "1.25rem", color: "#6b7280", textAlign: "center" }}>
          You&apos;re all caught up.
        </p>
      )}
    </section>
  );
}
