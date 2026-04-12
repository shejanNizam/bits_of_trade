"use client";
import {
  useClearAllNotificationsMutation,
  useDeleteNotificationMutation,
  useGetNotificationSettingsQuery,
  useGetUnreadNotificationsQuery,
  useListNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
  useUpdateNotificationSettingsMutation,
} from "@/redux/features/notification/notificationApi";
import { message } from "antd";
import {
  AlertCircle,
  Bell,
  Check,
  CheckCircle,
  Filter,
  Info,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  notification_type: string;
  severity: string;
  title: string;
  message: string;
  is_read: boolean;
  rule_id: string | null;
  rule_name: string | null;
  session_id: string | null;
  session_date: string | null;
  trade_id: string | null;
  created_at: string;
}

export default function Notification() {
  const [filters, setFilters] = useState({
    unread: false,
    type: "",
    severity: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    notify_rule_triggered: true,
    notify_rule_violated: true,
    notify_session_locked: true,
    notify_session_unlocked: true,
    auto_delete_after_days: 30,
  });

  const {
    data: notificationsData,
    isLoading: isLoadingNotifications,
    refetch: refetchNotifications,
    error: notificationsError,
  } = useListNotificationsQuery(filters);

  const {
    data: unreadData,
    isLoading: isLoadingUnread,
    refetch: refetchUnread,
    error: unreadError,
  } = useGetUnreadNotificationsQuery({});

  const {
    data: settings,
    isLoading: isLoadingSettings,
    refetch: refetchSettings,
  } = useGetNotificationSettingsQuery({});

  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [clearAllNotifications] = useClearAllNotificationsMutation();
  const [updateNotificationSettings] = useUpdateNotificationSettingsMutation();

  const getNotificationsArray = (): Notification[] => {
    if (!notificationsData) return [];

    if (Array.isArray(notificationsData)) {
      return notificationsData;
    }

    if (notificationsData.results && Array.isArray(notificationsData.results)) {
      return notificationsData.results;
    }

    if (notificationsData.data && Array.isArray(notificationsData.data)) {
      return notificationsData.data;
    }

    return [];
  };

  const getUnreadCount = (): number => {
    if (!unreadData) return 0;
    return unreadData.unread_count || 0;
  };

  const notifications = getNotificationsArray();
  const unreadCount = getUnreadCount();

  useEffect(() => {
    if (settings) {
      setSettingsForm({
        notify_rule_triggered: settings.notify_rule_triggered ?? true,
        notify_rule_violated: settings.notify_rule_violated ?? true,
        notify_session_locked: settings.notify_session_locked ?? true,
        notify_session_unlocked: settings.notify_session_unlocked ?? true,
        auto_delete_after_days: settings.auto_delete_after_days ?? 30,
      });
    }
  }, [settings]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
      message.success("Notification marked as read");
      refetchNotifications();
      refetchUnread();
    } catch (error) {
      console.error("Failed to mark as read:", error);
      message.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const result = await markAllAsRead({}).unwrap();
      message.success(`Marked ${result.marked_read} notifications as read`);
      refetchNotifications();
      refetchUnread();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      message.error("Failed to mark all notifications as read");
    }
  };

  const handleDeleteNotification = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        await deleteNotification(id).unwrap();
        message.success("Notification deleted successfully");
        refetchNotifications();
        refetchUnread();
      } catch (error) {
        console.error("Failed to delete notification:", error);
        message.error("Failed to delete notification");
      }
    }
  };

  const handleClearAll = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all notifications? This action cannot be undone.",
      )
    ) {
      try {
        const result = await clearAllNotifications({}).unwrap();
        message.success(`Successfully deleted ${result.deleted} notifications`);
        refetchNotifications();
        refetchUnread();
      } catch (error) {
        console.error("Failed to clear all notifications:", error);
        message.error("Failed to clear all notifications");
      }
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateNotificationSettings(settingsForm).unwrap();
      refetchSettings();
      message.success("Settings updated successfully!");
    } catch (error) {
      console.error("Failed to update settings:", error);
      message.error("Failed to update settings");
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "error":
        return {
          bg: "bg-red-50 dark:bg-red-950/20",
          border: "border-red-200 dark:border-red-800",
          text: "text-red-700 dark:text-red-400",
          icon: (
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
          ),
          badge: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
        };
      case "warning":
        return {
          bg: "bg-yellow-50 dark:bg-yellow-950/20",
          border: "border-yellow-200 dark:border-yellow-800",
          text: "text-yellow-700 dark:text-yellow-400",
          icon: (
            <AlertCircle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
          ),
          badge:
            "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
        };
      case "info":
        return {
          bg: "bg-blue-50 dark:bg-blue-950/20",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-700 dark:text-blue-400",
          icon: <Info className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
          badge:
            "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
        };
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-900/20",
          border: "border-gray-200 dark:border-gray-700",
          text: "text-gray-700 dark:text-gray-400",
          icon: <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />,
          badge:
            "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
        };
    }
  };

  if (isLoadingNotifications || isLoadingUnread || isLoadingSettings) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-gray-500 dark:text-gray-400">
          Loading notifications...
        </div>
      </div>
    );
  }

  if (notificationsError || unreadError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <h2 className="text-red-800 dark:text-red-400 font-semibold mb-2">
            Error Loading Notifications
          </h2>
          <p className="text-red-600 dark:text-red-500 text-sm">
            {notificationsError
              ? JSON.stringify(notificationsError)
              : "Failed to load notifications"}
          </p>
          <button
            onClick={() => {
              refetchNotifications();
              refetchUnread();
            }}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Stay updated with your trading activity
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            <Filter className="w-5 h-5" />
          </button>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              <CheckCircle className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Unread Count Banner */}
      {unreadCount > 0 && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                You have {unreadCount} unread notification
                {unreadCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.unread}
                onChange={(e) =>
                  setFilters({ ...filters, unread: e.target.checked })
                }
                className="rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Unread only
              </span>
            </label>

            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="rule_triggered">Rule Triggered</option>
              <option value="rule_violated">Rule Violated</option>
              <option value="session_locked">Session Locked</option>
              <option value="session_unlocked">Session Unlocked</option>
            </select>

            <select
              value={filters.severity}
              onChange={(e) =>
                setFilters({ ...filters, severity: e.target.value })
              }
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          {(filters.unread || filters.type || filters.severity) && (
            <button
              onClick={() =>
                setFilters({ unread: false, type: "", severity: "" })
              }
              className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              No notifications found
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const severityStyle = getSeverityStyles(notification.severity);
            return (
              <div
                key={notification.id}
                className={`group relative p-4 rounded-xl border transition-all duration-200 ${
                  !notification.is_read
                    ? `${severityStyle.bg} ${severityStyle.border} shadow-sm`
                    : "bg-white dark:bg-gray-900/30 border-gray-200 dark:border-gray-700 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="shrink-0 mt-1">{severityStyle.icon}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3
                          className={`text-sm font-semibold ${
                            !notification.is_read
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${severityStyle.badge}`}
                          >
                            {notification.severity?.toUpperCase() || "INFO"}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {notification.created_at
                              ? new Date(
                                  notification.created_at,
                                ).toLocaleString()
                              : "Unknown date"}
                          </span>
                          {!notification.is_read && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleDeleteNotification(notification.id)
                          }
                          className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition"
                          title="Delete"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {notification.message}
                    </p>

                    {(notification.rule_name || notification.session_date) && (
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-500">
                        {notification.rule_name && (
                          <span>Rule: {notification.rule_name}</span>
                        )}
                        {notification.session_date && (
                          <span>Session: {notification.session_date}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Clear All Button */}
        {notifications.length > 0 && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
              Clear all notifications
            </button>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Preferences
          </h2>
        </div>

        <form onSubmit={handleUpdateSettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
              <input
                type="checkbox"
                checked={settingsForm.notify_rule_triggered}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    notify_rule_triggered: e.target.checked,
                  })
                }
                className="rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rule Triggered
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Soft rule threshold breaches
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
              <input
                type="checkbox"
                checked={settingsForm.notify_rule_violated}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    notify_rule_violated: e.target.checked,
                  })
                }
                className="rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rule Violated
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Hard rule threshold breaches
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
              <input
                type="checkbox"
                checked={settingsForm.notify_session_locked}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    notify_session_locked: e.target.checked,
                  })
                }
                className="rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Session Locked
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  When session is locked
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
              <input
                type="checkbox"
                checked={settingsForm.notify_session_unlocked}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    notify_session_unlocked: e.target.checked,
                  })
                }
                className="rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Session Unlocked
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  When session is unlocked
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/30">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Auto-delete after:
            </label>
            <select
              value={settingsForm.auto_delete_after_days}
              onChange={(e) =>
                setSettingsForm({
                  ...settingsForm,
                  auto_delete_after_days: parseInt(e.target.value),
                })
              }
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="0">Never</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
