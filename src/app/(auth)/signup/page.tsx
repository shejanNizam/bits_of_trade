// "use client";

// import { useSignupMutation } from "@/redux/api/authApi/authApi";
// import { setCredentials } from "@/redux/slices/authSlice";
// import { ApiError, SignupFormValues, SignupResponse } from "@/types/auth";
// import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
// import { Button, Form, Input, theme } from "antd";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FaArrowLeft } from "react-icons/fa";
// import { useDispatch } from "react-redux";

// // ==================== COMPONENT ====================
// const Signup: React.FC = () => {
//   const router = useRouter();
//   const [form] = Form.useForm<SignupFormValues>();
//   const { token } = theme.useToken();
//   const dispatch = useDispatch();

//   const [signup, { isLoading }] = useSignupMutation();

//   // ==================== FORM SUBMIT HANDLER ====================
//   const onFinish = async (values: SignupFormValues): Promise<void> => {
//     try {
//       const payload = {
//         email: values.email,
//         password: values.password,
//         password_confirm: values.confirmPassword,
//         first_name: values.first_name,
//         last_name: values.last_name,
//       };

//       const response: SignupResponse = await signup(payload).unwrap();

//       if (response?.tokens?.access) {
//         dispatch(
//           setCredentials({
//             user: response.user,
//             token: response.tokens.access,
//           }),
//         );
//       }

//       SuccessSwal({
//         title: "Success!",
//         text: response.message || "Account created successfully!",
//       });

//       // Redirect to dashboard or login
//       router.push("/login");
//     } catch (error) {
//       const apiError = error as ApiError;
//       console.log(apiError);

//       ErrorSwal({
//         title: "Signup failed!",
//         text:
//           apiError?.data?.errors?.[0]?.message ||
//           "Registration failed. Please try again.",
//       });
//     }
//   };

//   const handleBack = (): void => {
//     router.back();
//   };

//   return (
//     <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-white dark:bg-gray-900 transition-colors pt-20">
//       <div className="shadow-2xl dark:shadow-gray-800/50 rounded-2xl w-full max-w-xl p-8 md:p-16 -mt-25 relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//         <button
//           onClick={handleBack}
//           className="absolute top-4 left-4 text-gray-600 dark:text-gray-400 hover:opacity-70 transition-opacity"
//         >
//           <FaArrowLeft size={24} />
//         </button>

//         <div className="flex flex-col items-center">
//           <h2
//             className="text-2xl md:text-4xl font-semibold mb-8 pb-2 border-b-2 text-blue-600 dark:text-blue-400"
//             style={{ borderColor: token.colorPrimary }}
//           >
//             Create Account
//           </h2>
//         </div>

//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onFinish}
//           className="space-y-2"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
//             {/* FIRST NAME */}
//             <Form.Item<SignupFormValues>
//               label={
//                 <span className="font-semibold text-gray-900 dark:text-white transition-colors">
//                   First Name
//                 </span>
//               }
//               name="first_name"
//               rules={[{ required: true, message: "Required" }]}
//             >
//               <Input placeholder="John" size="large" />
//             </Form.Item>

//             {/* LAST NAME */}
//             <Form.Item<SignupFormValues>
//               label={
//                 <span className="font-semibold text-gray-900 dark:text-white transition-colors">
//                   Last Name
//                 </span>
//               }
//               name="last_name"
//               rules={[{ required: true, message: "Required" }]}
//             >
//               <Input placeholder="Doe" size="large" />
//             </Form.Item>
//           </div>

//           {/* EMAIL */}
//           <Form.Item<SignupFormValues>
//             label={
//               <span className="font-semibold text-gray-900 dark:text-white transition-colors">
//                 Email
//               </span>
//             }
//             name="email"
//             rules={[
//               { type: "email", message: "Invalid email" },
//               { required: true, message: "Email is required" },
//             ]}
//           >
//             <Input placeholder="example@mail.com" size="large" />
//           </Form.Item>

//           {/* PASSWORD */}
//           <Form.Item<SignupFormValues>
//             label={
//               <span className="font-semibold text-gray-900 dark:text-white transition-colors">
//                 Password
//               </span>
//             }
//             name="password"
//             rules={[
//               { required: true, message: "Password is required" },
//               { min: 6, message: "Min 6 characters" },
//             ]}
//             hasFeedback
//           >
//             <Input.Password placeholder="••••••••" size="large" />
//           </Form.Item>

//           {/* CONFIRM PASSWORD */}
//           <Form.Item<SignupFormValues>
//             label={
//               <span className="font-semibold text-gray-900 dark:text-white transition-colors">
//                 Confirm Password
//               </span>
//             }
//             name="confirmPassword"
//             dependencies={["password"]}
//             hasFeedback
//             rules={[
//               { required: true, message: "Confirm your password" },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue("password") === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(new Error("Passwords do not match"));
//                 },
//               }),
//             ]}
//           >
//             <Input.Password placeholder="••••••••" size="large" />
//           </Form.Item>

//           {/* TERMS */}
//           {/* <Form.Item<SignupFormValues>
//             name="agree"
//             valuePropName="checked"
//             rules={[
//               {
//                 validator: (_, value) =>
//                   value
//                     ? Promise.resolve()
//                     : Promise.reject(new Error("Accept terms to continue")),
//               },
//             ]}
//           >
//             <Checkbox className="dark:text-gray-300">
//               I agree to the{" "}
//               <Link href="/terms" className="text-blue-500 underline">
//                 Terms
//               </Link>
//             </Checkbox>
//           </Form.Item> */}

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               size="large"
//               loading={isLoading}
//               className="w-full"
//               style={{ height: 50 }}
//             >
//               {isLoading ? "Signing up..." : "Sign Up"}
//             </Button>
//           </Form.Item>

//           <p className="text-center dark:text-gray-400">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-600 font-bold underline">
//               Login
//             </Link>
//           </p>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

"use client";

import { useSignupMutation } from "@/redux/api/authApi/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { ApiError, SignupFormValues, SignupResponse } from "@/types/auth";
import { ErrorSwal, SuccessSwal } from "@/utils/allSwal";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button, Divider, Form, Input, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";

// ==================== GOOGLE BUTTON INNER ====================
const GoogleLoginButton: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoogleSuccess = async (tokenResponse: {
    access_token: string;
  }) => {
    try {
      // 1. Get user info from Google using the access token
      const googleUserInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        },
      ).then((res) => res.json());

      // 2. Send the email (or token) to your backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: googleUserInfo.email,
            // add more fields if your backend needs: first_name, last_name, google_token, etc.
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) throw { data };

      if (data?.tokens?.access) {
        dispatch(
          setCredentials({ user: data.user, token: data.tokens.access }),
        );
      }

      SuccessSwal({ title: "Success!", text: "Signed in with Google!" });
      router.push("/dashboard");
    } catch (error) {
      const apiError = error as ApiError;
      ErrorSwal({
        title: "Google Sign-in Failed",
        text:
          apiError?.data?.errors?.[0]?.message ||
          "Could not sign in with Google.",
      });
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () =>
      ErrorSwal({
        title: "Error",
        text: "Google login was cancelled or failed.",
      }),
  });

  return (
    <Button
      size="large"
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
      style={{ height: 50 }}
      icon={<FcGoogle size={20} />}
    >
      Continue with Google
    </Button>
  );
};

// ==================== COMPONENT ====================
const Signup: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<SignupFormValues>();
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();

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
      router.push("/login");
    } catch (error) {
      const apiError = error as ApiError;
      ErrorSwal({
        title: "Signup failed!",
        text:
          apiError?.data?.errors?.[0]?.message ||
          "Registration failed. Please try again.",
      });
    }
  };

  const handleBack = (): void => router.back();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
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
              <Form.Item
                label={
                  <span className="font-semibold text-gray-900 dark:text-white">
                    First Name
                  </span>
                }
                name="first_name"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="John" size="large" />
              </Form.Item>
              <Form.Item
                label={
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Last Name
                  </span>
                }
                name="last_name"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Doe" size="large" />
              </Form.Item>
            </div>

            <Form.Item
              label={
                <span className="font-semibold text-gray-900 dark:text-white">
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

            <Form.Item
              label={
                <span className="font-semibold text-gray-900 dark:text-white">
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

            <Form.Item
              label={
                <span className="font-semibold text-gray-900 dark:text-white">
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
                    if (!value || getFieldValue("password") === value)
                      return Promise.resolve();
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

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

            {/* ===== DIVIDER + GOOGLE BUTTON ===== */}
            <Divider className="dark:border-gray-600">
              <span className="text-gray-400 dark:text-gray-500 text-sm">
                or
              </span>
            </Divider>

            <GoogleLoginButton />
            {/* ===================================== */}

            <p className="text-center dark:text-gray-400 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-bold underline">
                Login
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
