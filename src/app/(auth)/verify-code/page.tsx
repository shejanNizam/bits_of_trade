"use client";

import { Button, Form, Input, InputRef, theme } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

// 🔥 Uncomment when API is integrated
// import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
// import { useVerifyOTPMutation, useResendOTPMutation } from "@/lib/redux/features/authApi";

// ==================== TYPES ====================
interface VerifyCodeFormValues {
  code: string[];
}

// 🔥 Uncomment when API is ready
// interface VerifyOTPResponse {
//   success: boolean;
//   data: {
//     token: string;
//     message: string;
//   };
//   message: string;
// }

// interface ResendOTPResponse {
//   success: boolean;
//   message: string;
// }

// interface ApiError {
//   data?: {
//     message: string;
//   };
//   message?: string;
// }

// ==================== INNER COMPONENT WITH SEARCH PARAMS ====================
const VerifyCodeContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm<VerifyCodeFormValues>();
  const { token } = theme.useToken();

  console.log(form);

  // Get email from URL params
  const email = searchParams.get("email") || "";

  // ==================== STATE ====================
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRefs = useRef<(InputRef | null)[]>([]);

  // ==================== API INTEGRATION ====================
  // 🔥 Uncomment when backend API is ready
  // const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
  // const [resendOTP, { isLoading: isResending }] = useResendOTPMutation();

  // 🔥 Mock loading states - Remove when API is integrated
  const isVerifying = false;
  const isResending = false;

  // ==================== COUNTDOWN TIMER ====================
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // ==================== INPUT HANDLERS ====================
  const handleChange = (value: string, index: number): void => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are filled
    if (newCode.every((digit) => digit !== "") && index === 5) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ): void => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    // Only process if pasted data contains only digits
    if (!/^\d+$/.test(pastedData)) {
      alert("Please paste only numeric digits");
      return;
    }

    const newCode = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
    setCode(newCode);

    // Focus last filled input or first empty input
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();

    // Auto-submit if 6 digits pasted
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  // ==================== VERIFY OTP HANDLER ====================
  const handleVerify = async (otp: string): Promise<void> => {
    try {
      console.log("Verifying OTP:", otp, "for email:", email);

      // ==================== API CALL ====================
      // 🔥 Uncomment when backend is ready
      /*
      const response: VerifyOTPResponse = await verifyOTP({
        email: email,
        otp: otp,
      }).unwrap();

      // Store token if provided
      if (response?.data?.token) {
        localStorage.setItem("user_token", response.data.token);
      }

      // Success notification
      SuccessSwal({
        title: "Verification Successful!",
        text: response?.message || "Your email has been verified successfully.",
      });

      // Redirect to reset password or login
      router.push("/reset-password");
      */

      // ==================== MOCK SUCCESS ====================
      // 🔥 Remove this block when API is integrated
      console.log("Mock verify OTP - Code:", otp);
      alert(
        `OTP verified successfully! (Mock - Remove when API ready)\n\nCode: ${otp}\nEmail: ${email}\n\nRedirecting to reset password...`,
      );

      // Mock redirect
      setTimeout(() => {
        router.push("/reset-password");
      }, 1000);
    } catch (error) {
      // ==================== ERROR HANDLING ====================
      console.error("Verify OTP error:", error);

      // Clear the code inputs on error
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      // 🔥 Uncomment when backend is ready
      /*
      const apiError = error as ApiError;
      ErrorSwal({
        title: "Verification Failed",
        text: apiError?.data?.message || apiError?.message || "Invalid OTP. Please try again.",
      });
      */

      // 🔥 Mock error - Remove when API integrated
      const errorMessage = (error as Error)?.message || "Invalid OTP!";
      alert(`Verification failed: ${errorMessage} (Mock error)`);
    }
  };

  // ==================== RESEND OTP HANDLER ====================
  const handleResendOTP = async (): Promise<void> => {
    if (!canResend) return;

    try {
      console.log("Resending OTP to:", email);

      // ==================== API CALL ====================
      // 🔥 Uncomment when backend is ready
      /*
      const response: ResendOTPResponse = await resendOTP({
        email: email,
      }).unwrap();

      // Success notification
      SuccessSwal({
        title: "OTP Sent!",
        text: response?.message || "A new verification code has been sent to your email.",
      });

      // Reset timer and code
      setResendTimer(60);
      setCanResend(false);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      */

      // ==================== MOCK SUCCESS ====================
      // 🔥 Remove this block when API is integrated
      alert(
        `New OTP sent successfully! (Mock - Remove when API ready)\n\nA new code has been sent to:\n${email}`,
      );

      // Reset timer and code
      setResendTimer(60);
      setCanResend(false);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      // ==================== ERROR HANDLING ====================
      console.error("Resend OTP error:", error);

      // 🔥 Uncomment when backend is ready
      /*
      const apiError = error as ApiError;
      ErrorSwal({
        title: "Failed to Resend OTP",
        text: apiError?.data?.message || apiError?.message || "Something went wrong. Please try again.",
      });
      */

      // 🔥 Mock error - Remove when API integrated
      const errorMessage = (error as Error)?.message || "Failed to resend!";
      alert(`Resend failed: ${errorMessage} (Mock error)`);
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
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-blue-600 dark:text-blue-400 transition-colors">
            Verify Code
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2 transition-colors">
            Enter the 6-digit code sent to
          </p>
          <p className="text-center text-gray-900 dark:text-white font-semibold mt-1 transition-colors">
            {email || "your email"}
          </p>
        </div>

        {/* ==================== OTP INPUT FIELDS ==================== */}
        <div className="mb-6">
          <div className="flex justify-center gap-3 mb-4">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                maxLength={1}
                className="w-12 h-14 text-center text-2xl font-bold bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                style={{
                  backgroundColor: token.colorBgContainer,
                  color: token.colorText,
                }}
              />
            ))}
          </div>
        </div>

        {/* ==================== VERIFY BUTTON ==================== */}
        <Button
          type="primary"
          size="large"
          loading={isVerifying}
          onClick={() => handleVerify(code.join(""))}
          disabled={code.some((digit) => digit === "")}
          className="w-full mb-4 transition-all hover:scale-[1.02]"
          style={{ height: 60 }}
        >
          {isVerifying ? "Verifying..." : "Verify Code"}
        </Button>

        {/* ==================== RESEND OTP ==================== */}
        <div className="text-center">
          {!canResend ? (
            <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">
              Resend code in{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {resendTimer}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              disabled={isResending}
              className="text-blue-600 dark:text-blue-400 font-semibold text-sm underline hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </button>
          )}
        </div>

        {/* ==================== LOGIN LINK ==================== */}
        <p className="text-center mt-6 text-gray-700 dark:text-gray-300 transition-colors">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-bold underline hover:opacity-80 transition-opacity"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

// ==================== LOADING FALLBACK ====================
function VerifyCodeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT WITH SUSPENSE ====================
const VerifyCode: React.FC = () => {
  return (
    <Suspense fallback={<VerifyCodeLoading />}>
      <VerifyCodeContent />
    </Suspense>
  );
};

export default VerifyCode;
