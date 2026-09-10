"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BellIcon, CheckIcon, AlertIcon } from "./icons";
import { useLanguage } from "../../lib/i18n/useLanguage";
import type { Notification } from "../../lib/notifications";

interface NotificationBellProps {
  notifications: Notification[];
  onClose: () => void;
}

const TYPE_ICONS: Record<Notification["type"], typeof BellIcon> = {
  info: BellIcon,
  success: CheckIcon,
  warning: AlertIcon,
};

const TYPE_COLORS: Record<Notification["type"], string> = {
  info: "text-[var(--muted)]",
  success: "text-[var(--success)]",
  warning: "text-[var(--warning)]",
};

export function NotificationBell({ notifications, onClose }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  function handleNotificationClick(n: Notification) {
    setIsOpen(false);
    onClose();
    if (n.href) {
      router.push(n.href);
    }
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--surface)]"
      >
        <BellIcon className="w-5 h-5 text-[var(--muted)]" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--primary)] text-white text-[10px] font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-[var(--border)] z-50"
        >
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-[var(--muted)]">
                {lang === "en" ? "No notifications" : "कोई सूचना नहीं"}
              </div>
            ) : (
              notifications.map((n) => {
                const Icon = TYPE_ICONS[n.type];
                return (
                  <button
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className="w-full flex items-start gap-3 p-3 hover:bg-[var(--surface)] transition-colors text-left border-b border-[var(--border)] last:border-b-0"
                  >
                    <div className="mt-0.5 shrink-0">
                      <Icon className={`w-4 h-4 ${TYPE_COLORS[n.type]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium text-[var(--foreground)] ${!n.read ? "font-semibold" : ""}`}>
                          {lang === "hi" ? n.titleHi : n.title}
                        </span>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[var(--muted)] mt-0.5 truncate">
                        {lang === "hi" ? n.messageHi : n.message}
                      </p>
                      <span className="text-[10px] text-[var(--muted)] mt-1 block">
                        {n.timestamp}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
          {notifications.length > 0 && (
            <div className="p-2 border-t border-[var(--border)]">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onClose();
                }}
                className="w-full text-center text-xs font-medium text-[var(--primary)] hover:underline py-1"
              >
                {lang === "en" ? "Mark all as read" : "सभी पठित चिह्नित करें"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
