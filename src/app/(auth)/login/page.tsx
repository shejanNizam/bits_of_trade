"use client";

import { useLoginMutation } from "@/redux/api/authApi/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Button, Checkbox, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";

// ==================== TYPES (Aligned with your API) ====================
interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

interface LoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    subscription_type: string;
    profile_picture: string | null;
    created_at: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

interface ApiError {
  success: boolean;
  data: {
    errors?: {
      field?: string;
      message?: string;
    }[];
  };
}

// ==================== LOGIN CONTENT COMPONENT ====================
const LoginContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm<LoginFormValues>();
  const { token: antdToken } = theme.useToken();
  const dispatch = useDispatch();

  const redirectPath = searchParams.get("from") || "/onboarding";

  const [login, { isLoading }] = useLoginMutation();

  // ==================== FORM SUBMIT HANDLER ====================
  const onFinish = async (values: LoginFormValues): Promise<void> => {
    try {
      const response: LoginResponse = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (response?.tokens?.access) {
        localStorage.setItem("token", response.tokens.access);
        dispatch(
          setCredentials({
            user: response?.user,
            token: response?.tokens?.access,
          }),
        );

        SuccessSwal({
          title: "Login successful!",
          text: `Welcome back, ${response.message}!`,
        });

        router.push(redirectPath);
      }
    } catch (error) {
      const apiError = error as ApiError;

      ErrorSwal({
        title: "Login failed!",
        text:
          apiError?.data?.errors?.[0]?.message ||
          "Login failed. Please try again.",
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="shadow-2xl dark:shadow-gray-800/50 rounded-2xl w-full max-w-xl p-8 md:p-16 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 dark:text-gray-400 hover:opacity-70 transition-opacity"
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center">
          <h2
            className="text-2xl md:text-4xl font-semibold mb-8 pb-2 border-b-2 text-blue-600 dark:text-blue-400"
            style={{ borderColor: antdToken.colorPrimary }}
          >
            Login
          </h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-0"
        >
          <Form.Item<LoginFormValues>
            label={
              <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                Email
              </span>
            }
            name="email"
            rules={[
              { type: "email", message: "Enter a valid email" },
              { required: true, message: "Email is required" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              size="large"
              className="dark:bg-gray-700 dark:text-white"
            />
          </Form.Item>

          <Form.Item<LoginFormValues>
            label={
              <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                Password
              </span>
            }
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              size="large"
              className="dark:bg-gray-700 dark:text-white"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <Form.Item<LoginFormValues>
              name="remember"
              valuePropName="checked"
              className="mb-0"
            >
              <Checkbox className="dark:text-white">Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Link
                href="/forgot-password"
                className="text-blue-600 dark:text-blue-400 underline font-bold"
              >
                Forgot password?
              </Link>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full"
              style={{ height: 60 }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>

          <p className="text-center pt-4 dark:text-gray-300">
            {"Don't have an account?"}
            <Link
              href="/signup"
              className="text-blue-600 dark:text-blue-400 font-bold underline"
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
};

export default Login;
