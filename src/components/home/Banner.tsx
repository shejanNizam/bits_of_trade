import Image from "next/image";

import bannerImage from "../../assets/banner_image.svg";

export default function Banner() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-40 right-40 w-32 h-32 bg-blue-200 rounded-full opacity-40" />
      <div className="absolute bottom-20 left-1/2 w-24 h-24 bg-blue-100 rounded-full opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="flex flex-col items-start text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-xs md:text-sm text-primary">
                World&apos;s first discipline &amp; risk governance layer
              </span>
            </div>

            {/* Main Heading */}
            <div className="w-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
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
            <p className="text-lg max-w-lg leading-relaxed">
              A discipline-first trading journal that enforces rules, introduces
              consequences, and prevents overtrading from becoming a habit.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="rounded-full bg-primary hover:bg-secondary text-white font-medium px-6 py-3 transition-colors cursor-pointer">
                Take the Discipline Test
              </button>
              <button className="rounded-full flex items-center gap-2 text-gray-700 font-medium px-4 py-3 transition-colors cursor-pointer hover:bg-secondary hover:text-white">
                <span className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full">
                  <svg
                    className="w-4 h-4 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </span>
                View Demo
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-start">
            {/* Main Image Container */}
            <div className="relative w-full">
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl aspect-4/3">
                <Image
                  src={bannerImage}
                  alt="Trading platform preview"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative blue circle */}
              <div className="absolute -bottom-4 right-8 w-16 h-16 bg-blue-100 rounded-full opacity-70 -z-10" />
            </div>

            {/* Quote Card - Below Image */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6 border-l-8 border-primary">
              <p className="text-sm md:text-lg leading-relaxed mb-3">
                &quot;Most traders don&apos;t fail because they lack knowledge.
                They fail because their behavior breaks under pressure.&quot;
              </p>
              <p className="font-bold text-gray-500">
                — <span>Bharat Joshi</span>, Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
