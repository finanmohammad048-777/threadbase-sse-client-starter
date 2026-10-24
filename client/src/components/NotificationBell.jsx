import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationDropdown from "./NotificationDropdown.jsx";

export default function NotificationBell() {
  const { unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function handleMouseDown(event) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((previousOpen) => !previousOpen)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        aria-expanded={open}
        style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>

        {unreadCount > 0 && (
          <span style={{
            position: "absolute",
            top: "-2px",
            right: "-2px",
            background: "#ef4444",
            color: "#fff",
            borderRadius: "999px",
            fontSize: "0.65rem",
            fontWeight: 700,
            minWidth: "16px",
            height: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 3px",
          }}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && <NotificationDropdown onClose={() => setOpen(false)} />}
    </div>
  );
}
