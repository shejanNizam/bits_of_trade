"use client";

import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Is BitsOfTrade a trading platform or broker?",
      answer:
        "No. BitsOfTrade is not a trading platform or broker. It is a discipline and learning system designed to help traders build better habits, track behavior, and reduce emotional trading mistakes.",
    },
    {
      id: 2,
      question: "Does BitsOfTrade give buy/sell signals?",
      answer:
        "No. BitsOfTrade does not provide any buy/sell signals, tips, or trade recommendations. Our focus is on helping you develop discipline and self-awareness — not on telling you what to trade.",
    },
    {
      id: 3,
      question: "Is this suitable for beginners in India?",
      answer:
        "Yes. BitsOfTrade is designed for traders at all levels, including beginners. The Learning Hub provides foundational knowledge, and the Discipline Guard helps new traders avoid common behavioral mistakes from the start.",
    },
    {
      id: 4,
      question: "Do I need broker integration to use BitsOfTrade?",
      answer:
        "No. BitsOfTrade works independently of any broker. You can manually log trades or upload them via CSV. No API connection or broker linking is required.",
    },
    {
      id: 5,
      question: "Why is nothing free on the platform?",
      answer:
        "We believe free tools create misaligned incentives. When a product is free, you become the product. BitsOfTrade charges for access so we can focus entirely on helping you trade better — not on selling your data or pushing ads.",
    },
    {
      id: 6,
      question: "Can I cancel anytime?",
      answer:
        "Yes. You can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your access will continue until the end of your current billing period.",
    },
    {
      id: 7,
      question: "Who should NOT use BitsOfTrade?",
      answer:
        "BitsOfTrade is not for traders looking for signals, shortcuts, or get-rich-quick strategies. If you're not willing to reflect on your behavior and put in the work to improve your discipline, this platform is not for you.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl">
        {/* Border Container */}
        <div className="rounded-2xl py-6 md:py-10">
          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs?.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                >
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <IoChevronDownOutline
                    className={`w-5 h-5 text-gray-800 dark:text-gray-300 shrink-0 transition-transform duration-300 ${
                      openIndex === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === faq.id ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-4 md:p-5 pt-0 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
