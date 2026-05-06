"use client";

import { useDeleteAccountMutation } from "@/redux/features/accountDeletion/accountDeletionApi";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { clearAuthCookie } from "@/utils/cookieUtils";
import { Checkbox, Form, Input, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertTriangle, Database, ShieldCheck, Trash2 } from "lucide-react";

interface DeleteAccountFormValues {
  password: string;
  confirmPermanent: boolean;
}

interface ApiErrorPayload {
  error?: string;
  message?: string;
  detail?: string;
}

const getErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: unknown }).data;

    if (typeof data === "string") {
      return data;
    }

    if (typeof data === "object" && data !== null) {
      const payload = data as ApiErrorPayload;
      return (
        payload.error ||
        payload.message ||
        payload.detail ||
        "Failed to delete account. Please try again."
      );
    }
  }

  return "Failed to delete account. Please try again.";
};

export default function DataPrivacy() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<DeleteAccountFormValues>();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const [pendingPassword, setPendingPassword] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_id");
    clearAuthCookie();
    dispatch(logout());
  };

  const handleSubmit = (values: DeleteAccountFormValues) => {
    setPendingPassword(values.password);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    const refresh = localStorage.getItem("refresh") || undefined;

    try {
      const response = await deleteAccount({
        password: pendingPassword,
        ...(refresh ? { refresh } : {}),
      }).unwrap();

      message.success(
        response.message ||
          "Your account and associated data have been deleted.",
      );
      setIsConfirmOpen(false);
      setPendingPassword("");
      form.resetFields();
      clearSession();
      router.replace("/login");
    } catch (error) {
      message.error(getErrorMessage(error));
      setIsConfirmOpen(false);
      setPendingPassword("");
      form.setFieldValue("password", "");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Data & Privacy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage account data and permanent deletion.
        </p>
      </div>

      <section className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-lg bg-blue-50 dark:bg-blue-950/30 p-2 text-blue-600 dark:text-blue-400">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Account Data
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Account deletion permanently removes your profile, trading logs,
              journal entries, subscriptions, and related account records.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900/50 rounded-xl border border-red-200 dark:border-red-900/60 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-lg bg-red-50 dark:bg-red-950/30 p-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Account
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              This is a hard delete with no recovery window. Confirm with your
              current password before continuing.
            </p>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="mt-6 max-w-xl"
            >
              <Form.Item<DeleteAccountFormValues>
                name="password"
                label={
                  <span className="font-medium text-gray-900 dark:text-white">
                    Current Password
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Enter your current password.",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item<DeleteAccountFormValues>
                name="confirmPermanent"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Confirm permanent account deletion."),
                          ),
                  },
                ]}
              >
                <Checkbox>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    I understand this permanently deletes my account and related
                    data.
                  </span>
                </Checkbox>
              </Form.Item>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" />
                Delete account
              </button>
            </Form>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/30">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your current session is cleared after a successful deletion. If a
            refresh token is available locally, it is sent for server-side
            blacklisting.
          </p>
        </div>
      </section>

      <Modal
        title="Delete account permanently?"
        open={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onOk={handleConfirmDelete}
        okText="Delete account"
        okButtonProps={{ danger: true, loading: isLoading }}
        cancelButtonProps={{ disabled: isLoading }}
        centered
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This will permanently remove your account and all associated data.
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
