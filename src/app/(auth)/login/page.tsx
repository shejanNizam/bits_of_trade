"use client";

import { Button, Checkbox, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";

// 🔥 Uncomment when Redux is integrated
// import { useDispatch } from "react-redux";
// import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
// import { useLoginMutation } from "@/lib/redux/features/authApi";
// import { setCredentials } from "@/lib/redux/slices/authSlice";

// ==================== TYPES ====================
interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

// 🔥 Uncomment when API is ready
// interface LoginResponse {
//   data: {
//     token: string;
//     user: {
//       id: string;
//       email: string;
//       name: string;
//       // Add other user fields
//     };
//   };
//   message: string;
// }

// interface ApiError {
//   data?: {
//     message: string;
//   };
//   message?: string;
// }

// ==================== LOGIN CONTENT COMPONENT ====================
const LoginContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm<LoginFormValues>();
  const { token } = theme.useToken();

  // 🔥 Uncomment when Redux is integrated
  // const dispatch = useDispatch();

  // Get redirect path from URL params
  const redirectPath = searchParams.get("from") || "/onboarding";

  // ==================== API INTEGRATION ====================
  // 🔥 Uncomment when backend API is ready
  // const [login, { isLoading }] = useLoginMutation();

  // 🔥 Mock loading state - Remove when API is integrated
  const isLoading = false;

  // ==================== FORM SUBMIT HANDLER ====================
  const onFinish = async (values: LoginFormValues): Promise<void> => {
    try {
      console.log("Login form values:", values);

      // ==================== API CALL ====================
      // 🔥 Uncomment when backend is ready
      /*
      const response: LoginResponse = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      // Store authentication token
      if (response?.data?.token) {
        // Store in localStorage
        localStorage.setItem("user_token", response.data.token);
        
        // Store in cookies (7 days expiry)
        const maxAge = 60 * 60 * 24 * 7; // 7 days
        document.cookie = `authToken=${response.data.token}; path=/; max-age=${maxAge}; secure; samesite=strict`;

        // Update Redux state
        dispatch(
          setCredentials({
            user: response.data.user,
            token: response.data.token,
          })
        );

        // Success notification
        SuccessSwal({
          title: "Login successful!",
          text: `Welcome back, ${response.data.user.name || "User"}!`,
        });

        // Redirect to intended page or home
        router.push(redirectPath);
      }
      */

      // ==================== MOCK SUCCESS ====================
      // 🔥 Remove this block when API is integrated
      console.log("Mock login - Email:", values.email);
      alert("Login successful! (Mock - Remove when API ready)");
      router.push(redirectPath);
      // Mock redirect
      // setTimeout(() => {
      //   router.push(redirectPath);
      // }, 500);
    } catch (error) {
      // ==================== ERROR HANDLING ====================
      console.error("Login error:", error);

      // 🔥 Uncomment when backend is ready
      /*
      const apiError = error as ApiError;
      ErrorSwal({
        title: "Login failed!",
        text: apiError?.data?.message || apiError?.message || "Something went wrong. Please try again.",
      });
      */

      // 🔥 Mock error - Remove when API integrated
      const errorMessage = (error as Error)?.message || "Something went wrong!";
      alert(`Login failed: ${errorMessage} (Mock error)`);
    }
  };

  // ==================== NAVIGATION HANDLERS ====================
  const handleBack = (): void => {
    router.back();
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="shadow-2xl dark:shadow-gray-800/50 rounded-2xl w-full max-w-xl p-8 md:p-16 -mt-50 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
        {/* ==================== BACK BUTTON ==================== */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 hover:opacity-70 focus:outline-none transition-opacity text-gray-600 dark:text-gray-400"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* ==================== HEADER ==================== */}
        <div className="flex flex-col items-center">
          <h2
            className="text-2xl md:text-4xl font-semibold mb-8 pb-2 border-b-2 text-blue-600 dark:text-blue-400 transition-colors"
            style={{
              borderColor: token.colorPrimary,
            }}
          >
            Login
          </h2>
        </div>

        {/* ==================== LOGIN FORM ==================== */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-0"
        >
          <div className="grid grid-cols-1">
            {/* ==================== EMAIL FIELD ==================== */}
            <Form.Item<LoginFormValues>
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
                  message: "Please enter your email",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                size="large"
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors"
                style={{
                  backgroundColor: token.colorBgContainer,
                  color: token.colorText,
                }}
              />
            </Form.Item>

            {/* ==================== PASSWORD FIELD ==================== */}
            <Form.Item<LoginFormValues>
              label={
                <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                  Password
                </span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Enter your password"
                size="large"
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors"
                style={{
                  backgroundColor: token.colorBgContainer,
                  color: token.colorText,
                }}
              />
            </Form.Item>
          </div>

          {/* ==================== REMEMBER ME & FORGOT PASSWORD ==================== */}
          <div className="flex justify-between items-center">
            <Form.Item<LoginFormValues>
              name="remember"
              valuePropName="checked"
              className="mb-0"
            >
              <Checkbox>
                <span className="font-bold text-gray-900 dark:text-white transition-colors">
                  Remember me
                </span>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Link
                href="/forgot-password"
                className="font-bold underline hover:opacity-80 transition-opacity text-blue-600 dark:text-white"
              >
                Forgot password?
              </Link>
            </Form.Item>
          </div>

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
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>

          {/* ==================== SIGNUP LINK ==================== */}
          <p className="text-center pt-4 text-gray-700 dark:text-gray-300 transition-colors">
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="font-bold underline hover:opacity-80 transition-opacity text-blue-600 dark:text-blue-400"
            >
              Create Account
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT WITH SUSPENSE ====================
const Login: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex justify-center items-center bg-white dark:bg-gray-900">
          <div className="text-gray-900 dark:text-white">Loading...</div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
};

export default Login;
