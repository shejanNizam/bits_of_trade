"use client";

import { useSignupMutation } from "@/redux/api/authApi/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { Button, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";

// ==================== TYPES (Aligned with your API) ====================
interface SignupFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string; // Used locally in AntD form
  agree: boolean;
}

interface SignupResponse {
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

// interface ApiError {
//   data?: {
//     message?: string;
//     detail?: string;
//   };
//   message?: string;
// }

interface ApiError {
  success: boolean;
  data: {
    errors?: {
      field?: string;
      message?: string;
    }[];
  };
}

// ==================== COMPONENT ====================
const Signup: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<SignupFormValues>();
  const { token } = theme.useToken();
  const dispatch = useDispatch();

  const [signup, { isLoading }] = useSignupMutation();

  // ==================== FORM SUBMIT HANDLER ====================
  const onFinish = async (values: SignupFormValues): Promise<void> => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
        password_confirm: values.confirmPassword,
        first_name: values.first_name,
        last_name: values.last_name,
      };

      const response: SignupResponse = await signup(payload).unwrap();

      // Update Redux state with user and access token
      if (response?.tokens?.access) {
        dispatch(
          setCredentials({
            user: response.user,
            token: response.tokens.access,
          }),
        );
      }

      SuccessSwal({
        title: "Success!",
        text: response.message || "Account created successfully!",
      });

      // Redirect to dashboard or login
      router.push("/login");
    } catch (error) {
      const apiError = error as ApiError;
      console.log(apiError);

      ErrorSwal({
        title: "Signup failed!",
        text:
          apiError?.data?.errors?.[0]?.message ||
          "Registration failed. Please try again.",
      });
    }
  };

  const handleBack = (): void => {
    router.back();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-white dark:bg-gray-900 transition-colors pt-20">
      <div className="shadow-2xl dark:shadow-gray-800/50 rounded-2xl w-full max-w-xl p-8 md:p-16 -mt-25 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 dark:text-gray-400 hover:opacity-70 transition-opacity"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="flex flex-col items-center">
          <h2
            className="text-2xl md:text-4xl font-semibold mb-8 pb-2 border-b-2 text-blue-600 dark:text-blue-400"
            style={{ borderColor: token.colorPrimary }}
          >
            Create Account
          </h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            {/* FIRST NAME */}
            <Form.Item<SignupFormValues>
              label={
                <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                  First Name
                </span>
              }
              name="first_name"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="John" size="large" />
            </Form.Item>

            {/* LAST NAME */}
            <Form.Item<SignupFormValues>
              label={
                <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                  Last Name
                </span>
              }
              name="last_name"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Doe" size="large" />
            </Form.Item>
          </div>

          {/* EMAIL */}
          <Form.Item<SignupFormValues>
            label={
              <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                Email
              </span>
            }
            name="email"
            rules={[
              { type: "email", message: "Invalid email" },
              { required: true, message: "Email is required" },
            ]}
          >
            <Input placeholder="example@mail.com" size="large" />
          </Form.Item>

          {/* PASSWORD */}
          <Form.Item<SignupFormValues>
            label={
              <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                Password
              </span>
            }
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Min 6 characters" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>

          {/* CONFIRM PASSWORD */}
          <Form.Item<SignupFormValues>
            label={
              <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                Confirm Password
              </span>
            }
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Confirm your password" },
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
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>

          {/* TERMS */}
          {/* <Form.Item<SignupFormValues>
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Accept terms to continue")),
              },
            ]}
          >
            <Checkbox className="dark:text-gray-300">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-500 underline">
                Terms
              </Link>
            </Checkbox>
          </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              className="w-full"
              style={{ height: 50 }}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </Form.Item>

          <p className="text-center dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-bold underline">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
