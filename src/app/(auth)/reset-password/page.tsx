"use client";

import { useResetPasswordMutation } from "@/redux/api/authApi/authApi";
import { getApiErrorMessage } from "@/utils/apiError";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Button, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordResponse {
  detail?: string;
  message?: string;
}

const ResetPasswordContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm<ResetPasswordFormValues>();
  const { token } = theme.useToken();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const uid = searchParams.get("uid")?.trim() || "";
  const resetToken = searchParams.get("token")?.trim() || "";
  const isResetLinkMissing = !uid || !resetToken;

  const onFinish = async (values: ResetPasswordFormValues): Promise<void> => {
    if (isResetLinkMissing) {
      await ErrorSwal({
        title: "Invalid Reset Link",
        text: "Please request a new password reset link and try again.",
      });
      router.push("/forgot-password");
      return;
    }

    if (values.password !== values.confirmPassword) {
      await ErrorSwal({
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    try {
      const response: ResetPasswordResponse = await resetPassword({
        uid,
        token: resetToken,
        new_password1: values.password,
        new_password2: values.confirmPassword,
      }).unwrap();

      await SuccessSwal({
        title: "Password Reset Successful!",
        text:
          response?.detail ||
          response?.message ||
          "Your password has been reset successfully.",
      });

      router.push("/login");
    } catch (error) {
      await ErrorSwal({
        title: "Password Reset Failed",
        text: getApiErrorMessage(
          error,
          "The reset link is invalid or expired. Please request a new one.",
          ["new_password1", "new_password2", "uid", "token"],
        ),
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="shadow-lg dark:shadow-gray-800/50 rounded-2xl w-full max-w-md p-8 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-gray-600 dark:text-gray-400 hover:opacity-70 focus:outline-none transition-opacity z-50"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-blue-600 dark:text-blue-400 transition-colors">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2 transition-colors">
            Please enter your new password
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
        >
          <Form.Item<ResetPasswordFormValues>
            label={
              <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                New Password
              </span>
            }
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your new password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Enter your new password"
              size="large"
              aria-label="New Password"
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors"
              style={{
                backgroundColor: token.colorBgContainer,
                color: token.colorText,
              }}
            />
          </Form.Item>

          <Form.Item<ResetPasswordFormValues>
            label={
              <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                Confirm Password
              </span>
            }
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your new password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm your new password"
              size="large"
              aria-label="Confirm New Password"
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors"
              style={{
                backgroundColor: token.colorBgContainer,
                color: token.colorText,
              }}
            />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full transition-all hover:scale-[1.02]"
              style={{ height: 60 }}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </Form.Item>

          <p className="text-center pt-4 text-gray-700 dark:text-gray-300 transition-colors">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="text-blue-600 dark:text-blue-400 font-bold underline hover:opacity-80 transition-opacity"
            >
              Log In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

const ResetPassword: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 dark:bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
