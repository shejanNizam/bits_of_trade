"use client";

import { useLoginMutation } from "@/redux/api/authApi/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { ApiError, LoginFormValues, LoginResponse } from "@/types/auth";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Button, Checkbox, Divider, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";

// ==================== TYPES ====================
interface GoogleNotification {
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
  isDismissedMoment: () => boolean;
  getNotDisplayedReason: () => string;
  getSkippedReason: () => string;
  getDismissedReason: () => string;
}

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

interface GoogleButtonConfig {
  type?: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: string;
  shape?: "rectangular" | "pill" | "circle" | "square";
  width?: number;
}

interface GoogleIdConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: GoogleIdConfig) => void;
          prompt: (
            callback?: (notification: GoogleNotification) => void,
          ) => void;
          renderButton: (
            element: HTMLElement,
            config: GoogleButtonConfig,
          ) => void;
          cancel: () => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

// ==================== GOOGLE BUTTON ====================
const GoogleLoginButton: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef<boolean>(false);

  const handleGoogleSuccess = async (idToken: string): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: idToken }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw { data };

      if (data?.tokens?.access) {
        localStorage.setItem("token", data.tokens.access);
        dispatch(
          setCredentials({ user: data.user, token: data.tokens.access }),
        );

        SuccessSwal({ title: "Success!", text: "Signed in with Google!" });

        // Logic: Redirect based on onboarding status
        if (data.user.onboarding_completed) {
          router.push("/user-dashboard");
        } else {
          router.push("/onboarding");
        }
      }
    } catch (error) {
      const apiError = error as ApiError;
      ErrorSwal({
        title: "Google Sign-in Failed",
        text:
          apiError?.data?.error ||
          apiError?.data?.errors?.[0]?.message ||
          "Could not sign in with Google.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initializeGoogle = (): void => {
    if (isInitialized.current) return;
    if (!window.google?.accounts?.id) return;

    isInitialized.current = true;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: (response: GoogleCredentialResponse) => {
        if (response.credential) {
          handleGoogleSuccess(response.credential);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  };

  useEffect(() => {
    if (!document.getElementById("google-gsi-script")) {
      const script = document.createElement("script");
      script.id = "google-gsi-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => initializeGoogle();
      document.head.appendChild(script);
    } else if (window.google?.accounts?.id) {
      initializeGoogle();
    }
  });

  const handleClick = (): void => {
    if (!window.google?.accounts?.id) {
      ErrorSwal({
        title: "Error",
        text: "Google Sign-in is not ready. Please refresh the page.",
      });
      return;
    }

    initializeGoogle();

    window.google.accounts.id.prompt((notification: GoogleNotification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        if (buttonRef.current) {
          window.google.accounts.id.renderButton(buttonRef.current, {
            type: "standard",
            theme: "outline",
            size: "large",
            width: buttonRef.current.offsetWidth,
          });
          const btn = buttonRef.current.querySelector(
            "div[role=button]",
          ) as HTMLElement | null;
          btn?.click();
        }
      }
    });
  };

  return (
    <div className="relative w-full">
      <div
        ref={buttonRef}
        className="absolute opacity-0 pointer-events-none"
        style={{ zIndex: -1, width: "100%" }}
      />
      <Button
        size="large"
        onClick={handleClick}
        loading={isLoading}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        style={{ height: 50 }}
        icon={!isLoading ? <FcGoogle size={20} /> : undefined}
      >
        {isLoading ? "Signing in..." : "Continue with Google"}
      </Button>
    </div>
  );
};

// ==================== LOGIN CONTENT COMPONENT ====================
const LoginContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm<LoginFormValues>();
  const { token: antdToken } = theme.useToken();
  const dispatch = useDispatch();

  // If "from" exists, we use it only if onboarding is completed
  const redirectPath = searchParams.get("from") || "/user-dashboard";

  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values: LoginFormValues): Promise<void> => {
    try {
      const response: LoginResponse = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (response?.tokens?.access) {
        localStorage.setItem("token", response.tokens.access);
        localStorage.setItem("user_id", String(response.user.id));

        dispatch(
          setCredentials({
            user: response?.user,
            token: response?.tokens?.access,
          }),
        );

        SuccessSwal({
          title: "Login successful!",
          text: `Welcome back, ${response.user.first_name || "Trader"}!`,
        });

        if (response.user.onboarding_completed) {
          router.push(redirectPath);
        } else {
          router.push("/onboarding");
        }
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

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-white dark:bg-gray-900 transition-colors">
      <div className="shadow-2xl dark:shadow-gray-800/50 rounded-2xl w-full max-w-xl p-8 md:p-16 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => router.back()}
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
              <span className="font-semibold text-gray-900 dark:text-white">
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
              <span className="font-semibold text-gray-900 dark:text-white">
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
            <Form.Item className="mb-0">
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

          <Divider className="dark:border-gray-600 my-2">
            <span className="text-gray-400 dark:text-gray-500 text-sm px-2">
              or
            </span>
          </Divider>

          <Form.Item className="mb-0">
            <GoogleLoginButton />
          </Form.Item>

          <p className="text-center pt-4 dark:text-gray-300">
            {"Don't have an account? "}
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
