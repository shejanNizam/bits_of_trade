"use client";

import { Button, Checkbox, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

// 🔥 Uncomment when Redux is integrated
// import { useDispatch } from "react-redux";
// import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
// import { useSignupMutation } from "@/lib/redux/features/authApi";
// import { setCredentials } from "@/lib/redux/slices/authSlice";

// ==================== TYPES ====================
interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

// 🔥 Uncomment when API is ready
// interface SignupResponse {
//   data: {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       // Add other user fields
//     };
//     token?: string;
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
const Signup: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<SignupFormValues>();
  const { token } = theme.useToken();

  // 🔥 Uncomment when Redux is integrated
  // const dispatch = useDispatch();

  // ==================== API INTEGRATION ====================
  // 🔥 Uncomment when backend API is ready
  // const [signup, { isLoading }] = useSignupMutation();

  // 🔥 Mock loading state - Remove when API is integrated
  const isLoading = false;

  // ==================== FORM SUBMIT HANDLER ====================
  const onFinish = async (values: SignupFormValues): Promise<void> => {
    try {
      console.log("Signup form values:", values);

      // ==================== API CALL ====================
      // 🔥 Uncomment when backend is ready
      /*
      const response: SignupResponse = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).unwrap();

      // Update Redux state (if token is returned during signup)
      if (response?.data?.user) {
        dispatch(
          setCredentials({
            user: response.data.user,
            token: response.data.token, // If provided during signup
          })
        );
      }

      // Success notification
      SuccessSwal({
        title: "Account created successfully!",
        text: `Welcome, ${response.data.user.name}! Please log in.`,
      });

      // Redirect to login page
      router.push("/login");
      */

      // ==================== MOCK SUCCESS ====================
      // 🔥 Remove this block when API is integrated
      console.log("Mock signup - User:", values.name, values.email);
      alert(
        `Account created successfully! (Mock - Remove when API ready)\nName: ${values.name}\nEmail: ${values.email}`,
      );

      // Mock redirect
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } catch (error) {
      // ==================== ERROR HANDLING ====================
      console.error("Signup error:", error);

      // 🔥 Uncomment when backend is ready
      /*
      const apiError = error as ApiError;
      ErrorSwal({
        title: "Signup failed!",
        text: apiError?.data?.message || apiError?.message || "Something went wrong. Please try again.",
      });
      */

      // 🔥 Mock error - Remove when API integrated
      const errorMessage = (error as Error)?.message || "Something went wrong!";
      alert(`Signup failed: ${errorMessage} (Mock error)`);
    }
  };

  // ==================== NAVIGATION HANDLERS ====================
  const handleBack = (): void => {
    router.back();
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-white dark:bg-gray-900 transition-colors pt-20">
      <div className="shadow-2xl dark:shadow-gray-800/50 rounded-2xl w-full max-w-xl p-8 md:p-16 -mt-25 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
        {/* ==================== BACK BUTTON ==================== */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 dark:text-gray-400 hover:opacity-70 focus:outline-none transition-opacity"
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
            Create Account
          </h2>
        </div>

        {/* ==================== SIGNUP FORM ==================== */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-2"
        >
          <div className="grid grid-cols-1">
            {/* ==================== NAME FIELD ==================== */}
            <Form.Item<SignupFormValues>
              label={
                <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                  Name
                </span>
              }
              name="name"
              rules={[
                { required: true, message: "Please enter your name" },
                { min: 2, message: "Name must be at least 2 characters" },
              ]}
            >
              <Input
                placeholder="Enter your name"
                size="large"
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors"
                style={{
                  backgroundColor: token.colorBgContainer,
                  color: token.colorText,
                }}
              />
            </Form.Item>

            {/* ==================== EMAIL FIELD ==================== */}
            <Form.Item<SignupFormValues>
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
                { required: true, message: "Please enter your email" },
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
            <Form.Item<SignupFormValues>
              label={
                <span className="font-semibold text-gray-900 dark:text-white transition-colors">
                  Password
                </span>
              }
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
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

            {/* ==================== CONFIRM PASSWORD FIELD ==================== */}
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
                { required: true, message: "Please confirm your password" },
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
                placeholder="Confirm your password"
                size="large"
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 transition-colors"
                style={{
                  backgroundColor: token.colorBgContainer,
                  color: token.colorText,
                }}
              />
            </Form.Item>
          </div>

          {/* ==================== TERMS AGREEMENT ==================== */}
          <Form.Item<SignupFormValues>
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must agree to the terms")),
              },
            ]}
          >
            <Checkbox>
              <span className="text-gray-900 dark:text-white transition-colors">
                I agree to the{" "}
                <Link
                  href="/terms-of-use"
                  className="text-blue-600 dark:text-blue-400 font-bold underline hover:opacity-80 transition-opacity"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 dark:text-blue-400 font-bold underline hover:opacity-80 transition-opacity"
                >
                  Privacy Policy
                </Link>
              </span>
            </Checkbox>
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
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </Form.Item>

          {/* ==================== LOGIN LINK ==================== */}
          <p className="text-center pt-4 text-gray-700 dark:text-gray-300 transition-colors">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 dark:text-blue-400 font-bold underline hover:opacity-80 transition-opacity"
            >
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
