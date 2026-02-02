import Image from "next/image";

import bannerImage from "../../assets/banner_image.svg";
import CustomPrimaryButton from "../shared/CustomPrimaryButton";
import CustomSecondaryButton from "../shared/CustomSecondaryButton";

export default function Banner() {
  return (
    <section className="relative bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/30 dark:bg-blue-500/20 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-40 right-40 w-32 h-32 bg-blue-200 dark:bg-blue-600/20 rounded-full opacity-40" />
      <div className="absolute bottom-20 left-1/2 w-24 h-24 bg-blue-100 dark:bg-blue-700/20 rounded-full opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="flex flex-col items-start text-left space-y-6">
            {/* Badge - Updated */}
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 rounded-full px-4 py-2 border border-blue-200 dark:border-blue-500/20 transition-colors duration-300">
              <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-medium">
                World&apos;s first discipline &amp; risk governance layer
              </span>
            </div>

            {/* Main Heading */}
            <div className="w-full">
              <h1 className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 dark:text-white transition-colors duration-300">
                Built for Traders Who Want Longevity, Not Excitement
              </h1>
              {/* Blue underline decoration - full width */}
              <svg
                className="w-full max-w-70 h-4 mt-4"
                viewBox="0 0 280 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 14C70 2 210 2 278 8"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Description */}
            <p className="text-lg max-w-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-300">
              A discipline-first trading journal that enforces rules, introduces
              consequences, and prevents overtrading from becoming a habit.
            </p>

            {/* CTA Buttons - Updated */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <CustomPrimaryButton>Take Discipline Test</CustomPrimaryButton>

              <CustomSecondaryButton className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center border border-gray-300 dark:border-gray-600 group-hover:border-white rounded-full transition-colors duration-300">
                  <svg
                    className="w-4 h-4 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </span>
                View Demo
              </CustomSecondaryButton>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-start">
            {/* Main Image Container */}
            <div className="relative w-full">
              <div className="relative bg-gray-900 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl dark:shadow-slate-900/50 aspect-4/3 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                <Image
                  src={bannerImage}
                  alt="Trading platform preview"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative blue circle */}
              <div className="absolute -bottom-4 right-8 w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full opacity-70 -z-10" />
            </div>

            {/* Quote Card - Updated */}
            <div className="relative z-10 bg-linear-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-slate-800/50 rounded-xl shadow-lg dark:shadow-slate-900/30 p-6 mt-6 border-l-[6px] border-blue-500 dark:border-blue-400 transition-all duration-300 hover:shadow-xl dark:hover:shadow-slate-900/50 hover:scale-[1.02]">
              <p className="text-sm md:text-base leading-relaxed mb-4 text-gray-800 dark:text-gray-200 italic transition-colors duration-300">
                &quot;Most traders don&apos;t fail because they lack knowledge.
                They fail because their behavior breaks under pressure.&quot;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  BJ
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">
                    Bharat Joshi
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
