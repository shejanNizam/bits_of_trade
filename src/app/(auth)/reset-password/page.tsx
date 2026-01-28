"use client";

import { Button, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

// 🔥 Uncomment when API is integrated
// import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
// import { useResetPasswordMutation } from "@/lib/redux/features/authApi";

// ==================== TYPES ====================
interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

// 🔥 Uncomment when API is ready
// interface ResetPasswordResponse {
//   success: boolean;
//   data?: {
//     message: string;
//   };
//   message: string;
// }

// interface ApiError {
//   data?: {
//     message: string;
//   };
//   message?: string;
// }

// ==================== COMPONENT ====================
const ResetPassword: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<ResetPasswordFormValues>();
  const { token } = theme.useToken();

  // ==================== API INTEGRATION ====================
  // 🔥 Uncomment when backend API is ready
  // const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // 🔥 Mock loading state - Remove when API is integrated
  const isLoading = false;

  // ==================== FORM SUBMIT HANDLER ====================
  const onFinish = async (values: ResetPasswordFormValues): Promise<void> => {
    try {
      console.log("Reset password form values:", values);

      // ==================== PASSWORD MATCH VALIDATION ====================
      // Note: This is also handled by Form.Item validation, but keeping as double-check
      if (values.password !== values.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // ==================== API CALL ====================
      // 🔥 Uncomment when backend is ready
      /*
      // Get token from localStorage
      const authToken = localStorage.getItem("user_token");

      if (!authToken) {
        ErrorSwal({
          title: "No Token Found",
          text: "Please request a new password reset link.",
        });
        router.push("/forgot-password");
        return;
      }

      const response: ResetPasswordResponse = await resetPassword({
        token: authToken,
        body: {
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
      }).unwrap();

      // Success notification
      SuccessSwal({
        title: "Password Reset Successful!",
        text: response?.message || response?.data?.message || "Your password has been reset successfully.",
      });

      // Remove token from localStorage
      localStorage.removeItem("user_token");

      // Redirect to login page
      router.push("/login");
      */

      // ==================== MOCK SUCCESS ====================
      // 🔥 Remove this block when API is integrated
      console.log("Mock reset password");
      alert(
        "Password reset successful! (Mock - Remove when API ready)\n\nYour password has been updated.\nRedirecting to login...",
      );

      // Mock redirect
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      // ==================== ERROR HANDLING ====================
      console.error("Reset password error:", error);

      // 🔥 Uncomment when backend is ready
      /*
      const apiError = error as ApiError;
      ErrorSwal({
        title: "Password Reset Failed",
        text: apiError?.data?.message || apiError?.message || "Something went wrong. Please try again.",
      });
      */

      // 🔥 Mock error - Remove when API integrated
      const errorMessage = (error as Error)?.message || "Something went wrong!";
      alert(`Password reset failed: ${errorMessage} (Mock error)`);
    }
  };

  // ==================== NAVIGATION HANDLERS ====================
  const handleBack = (): void => {
    router.back();
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="shadow-lg dark:shadow-gray-800/50 rounded-2xl w-full max-w-md p-8 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
        {/* ==================== BACK BUTTON ==================== */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 dark:text-gray-400 hover:opacity-70 focus:outline-none transition-opacity z-50"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* ==================== HEADER ==================== */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-blue-600 dark:text-blue-400 transition-colors">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2 transition-colors">
            Please enter your new password
          </p>
        </div>

        {/* ==================== RESET PASSWORD FORM ==================== */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
        >
          {/* ==================== NEW PASSWORD FIELD ==================== */}
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

          {/* ==================== CONFIRM PASSWORD FIELD ==================== */}
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

          {/* ==================== SUBMIT BUTTON ==================== */}
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

          {/* ==================== LOGIN LINK ==================== */}
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

export default ResetPassword;
