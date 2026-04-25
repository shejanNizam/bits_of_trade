"use client";

import { useForgetPasswordMutation } from "@/redux/api/authApi/authApi";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Button, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

// ==================== TYPES ====================
interface ForgotPasswordFormValues {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

interface ApiError {
  data?: {
    message?: string;
    email?: string[];
    non_field_errors?: string[];
  };
  status?: number;
  message?: string;
}

// ==================== COMPONENT ====================
const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<ForgotPasswordFormValues>();
  const { token } = theme.useToken();

  // API Hook
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation({});

  // ==================== FORM SUBMIT HANDLER ====================
  const onFinish = async (values: ForgotPasswordFormValues): Promise<void> => {
    try {
      // API Call - sends email in request body
      const response: ForgotPasswordResponse = await forgotPassword({
        email: values.email,
      }).unwrap();

      // Show success message (API always returns success for security)
      await SuccessSwal({
        title: "Reset Link Sent!",
        text:
          response?.message ||
          "If an account with that email exists, a password reset link has been sent to your email address.",
      });

      // Redirect to login page or a confirmation page
      router.push("/login?reset=requested");
    } catch (error) {
      // Error Handling - though this endpoint shouldn't typically error for non-existent emails
      console.error("Password reset request error:", error);

      const apiError = error as ApiError;

      // Extract error message from various possible formats
      let errorMessage =
        "Unable to process your request. Please try again later.";

      if (apiError?.data?.message) {
        errorMessage = apiError.data.message;
      } else if (apiError?.data?.email && Array.isArray(apiError.data.email)) {
        errorMessage = apiError.data.email[0];
      } else if (
        apiError?.data?.non_field_errors &&
        Array.isArray(apiError.data.non_field_errors)
      ) {
        errorMessage = apiError.data.non_field_errors[0];
      } else if (apiError?.message) {
        errorMessage = apiError.message;
      }

      await ErrorSwal({
        title: "Request Failed",
        text: errorMessage,
      });
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
          className="absolute top-4 left-4 text-gray-500 dark:text-gray-400 hover:opacity-70 focus:outline-none transition-opacity"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* ==================== HEADER ==================== */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-blue-600 dark:text-blue-400 transition-colors">
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2 transition-colors">
            {
              "Enter your email address and we'll send you a link to reset your password"
            }
          </p>
        </div>

        {/* ==================== FORGOT PASSWORD FORM ==================== */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-0"
        >
          {/* ==================== EMAIL FIELD ==================== */}
          <Form.Item<ForgotPasswordFormValues>
            label={
              <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                Email Address
              </span>
            }
            name="email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email address",
              },
              {
                required: true,
                message: "Email is required",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="you@example.com"
              aria-label="Email Address"
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors"
              style={{
                backgroundColor: token.colorBgContainer,
                color: token.colorText,
              }}
            />
          </Form.Item>

          {/* ==================== SUBMIT BUTTON ==================== */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full transition-all hover:scale-[1.02]"
              style={{ height: 52 }}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form.Item>

          {/* ==================== LOGIN LINK ==================== */}
          <p className="text-center text-gray-700 dark:text-gray-300 transition-colors">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:opacity-80 transition-opacity"
            >
              Back to Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
