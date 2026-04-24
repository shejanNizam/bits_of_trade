"use client";

import CustomHeading from "@/components/shared/CustomHeading";
import { useGetAllReviewQuery } from "@/redux/features/review/reviewApi";
import { BsQuote } from "react-icons/bs";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export default function TradersReview() {
  const { data, isLoading, error } = useGetAllReviewQuery({});

  // Filter visible reviews and sort by display_order
  const visibleReviews =
    data?.filter((review: Review) => review.is_visible) || [];
  const sortedReviews = [...visibleReviews].sort(
    (a: Review, b: Review) => a.display_order - b.display_order,
  );

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <CustomHeading>What Traders Are Saying</CustomHeading>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
              Loading reviews...
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm animate-pulse"
              >
                <div className="mb-6">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
                <div className="mt-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || sortedReviews.length === 0) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <CustomHeading>What Traders Are Saying</CustomHeading>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
              Join thousands of disciplined traders who have transformed their
              performance by understanding their own behavior.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Fallback default testimonials if API fails */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="mb-6">
                <BsQuote className="w-10 h-10 text-gray-200 dark:text-gray-700" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {
                  "BitsOfTrade didn't change my strategy. It changed when I stop trading. That alone reduced a lot of unnecessary losses."
                }
              </p>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">
                  Bharat Joshi
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Day Trader
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="mb-6">
                <BsQuote className="w-10 h-10 text-gray-200 dark:text-gray-700" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                I realized most of my bad trades came after I was already up or
                down for the day. Seeing that pattern clearly helped me take
                fewer trades.
              </p>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">
                  Mohandas Karamchand
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Swing Trader
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <CustomHeading>What Traders Are Saying</CustomHeading>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            Join thousands of disciplined traders who have transformed their
            performance by understanding their own behavior.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sortedReviews.map((review: Review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <BsQuote className="w-10 h-10 text-gray-200 dark:text-gray-700 transition-colors" />
              </div>

              {/* Rating Stars */}
              {renderStars(review.rating)}

              {/* Testimonial Text */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-colors">
                {`"${review.review_text}"`}
              </p>

              {/* Author Info */}
              <div>
                <p className="font-bold text-gray-900 dark:text-white transition-colors">
                  {review.reviewer_name}
                </p>
                {/* Optional: You can add a role field to the API or remove it */}
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  Verified Trader
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
