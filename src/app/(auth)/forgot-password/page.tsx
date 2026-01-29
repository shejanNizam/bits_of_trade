"use client";

import { Button, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

// 🔥 Uncomment when API is integrated
// import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
// import { useForgotPasswordMutation } from "@/lib/redux/features/authApi";

// ==================== TYPES ====================
interface ForgotPasswordFormValues {
  email: string;
}

// 🔥 Uncomment when API is ready
// interface ForgotPasswordResponse {
//   success: boolean;
//   data: {
//     token: string;
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
const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<ForgotPasswordFormValues>();
  const { token } = theme.useToken();

  // ==================== API INTEGRATION ====================
  // 🔥 Uncomment when backend API is ready
  // const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  // 🔥 Mock loading state - Remove when API is integrated
  const isLoading = false;

  // ==================== FORM SUBMIT HANDLER ====================
  const onFinish = async (values: ForgotPasswordFormValues): Promise<void> => {
    try {
      console.log("Forgot password form values:", values);

      // ==================== API CALL ====================
      // 🔥 Uncomment when backend is ready
      /*
      const response: ForgotPasswordResponse = await forgotPassword({
        email: values.email,
      }).unwrap();

      // Store token if provided
      if (response?.success && response?.data?.token) {
        localStorage.setItem("user_token", response.data.token);
      }

      // Success notification
      SuccessSwal({
        title: "OTP Sent!",
        text: `${response.message || "Verification code sent to"} ${values.email}`,
      });

      // Redirect to verify email page with email in query
      router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
      */

      // ==================== MOCK SUCCESS ====================
      // 🔥 Remove this block when API is integrated
      console.log("Mock forgot password - Email:", values.email);
      alert(
        `OTP sent successfully! (Mock - Remove when API ready)\n\nA verification code has been sent to:\n${values.email}\n\nRedirecting to verification page...`,
      );

      // Mock redirect
      setTimeout(() => {
        router.push(`/verify-code?email=${encodeURIComponent(values.email)}`);
      }, 1000);
    } catch (error) {
      // ==================== ERROR HANDLING ====================
      console.error("Forgot password error:", error);

      // 🔥 Uncomment when backend is ready
      /*
      const apiError = error as ApiError;
      ErrorSwal({
        title: "Failed to send OTP",
        text: apiError?.data?.message || apiError?.message || "Something went wrong. Please try again.",
      });
      */

      // 🔥 Mock error - Remove when API integrated
      const errorMessage = (error as Error)?.message || "Something went wrong!";
      alert(`Failed to send OTP: ${errorMessage} (Mock error)`);
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
            Enter your account email to receive OTP
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
                Email
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
              placeholder="Enter your email"
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
              style={{ height: 60 }}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </Form.Item>

          {/* ==================== LOGIN LINK ==================== */}
          <p className="text-center text-gray-700 dark:text-gray-300 transition-colors">
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

export default ForgotPassword;
