import CustomHeading from "@/components/shared/CustomHeading";
import { BsQuote } from "react-icons/bs";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
}

export default function TradersReview() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "BitsOfTrade didn't change my strategy. It changed when I stop trading. That alone reduced a lot of unnecessary losses.",
      name: "Bharat Joshi",
      role: "Day Trader",
    },
    {
      id: 2,
      quote:
        "I realized most of my bad trades came after I was already up or down for the day. Seeing that pattern clearly helped me take fewer trades.",
      name: "Mohandas Karamchand",
      role: "Swing Trader",
    },
    {
      id: 3,
      quote:
        "This feels less like a trading tool and more like a mirror. It shows me what I do when I'm not disciplined.",
      name: "Rudransh",
      role: "Options Trader",
    },
    {
      id: 4,
      quote:
        "I still make mistakes. But now I know exactly which ones repeat — and when.",
      name: "Agastya",
      role: "Futures Trader",
    },
  ];

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
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <BsQuote
                  color="#D8B4FE"
                  className="w-10 h-10 text-gray-200 dark:text-gray-700 transition-colors"
                />
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-colors">
                {`"${testimonial.quote}"`}
              </p>

              {/* Author Info */}
              <div>
                <p className="font-bold text-gray-900 dark:text-white transition-colors">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
