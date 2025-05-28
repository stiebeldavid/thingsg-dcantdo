
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      question: "Why is it blank?",
      answer: "Because there are no things G-d can't do."
    },
    {
      question: "Am I supposed to fill in the blank space myself?",
      answer: "No! It's already filled in."
    },
    {
      question: "So there's really nothing G-d can't do?",
      answer: "Exactly."
    },
    {
      question: "Can G-d create a rock so heavy that He can't lift it?",
      answer: "Yes."
    },
    {
      question: "Ha! That means He can't lift it!",
      answer: "Actually, He can lift it."
    },
    {
      question: "Wait—then He can't create such a rock in the first place!",
      answer: "No, He can do that too."
    },
    {
      question: "That doesn't make any sense. It's a paradox!",
      answer: "G-d is not limited by our ability to understand what He can and cannot do."
    },
    {
      question: "Woah.",
      answer: "Yes. Woah is right."
    },
    {
      question: "But what about something really impossible?",
      answer: "Nope, He can do all those things, too."
    },
    {
      question: "But that would require a miracle. He can't do impossible things within nature.",
      answer: "Nope, He can even do impossible things without using miracles, completely within natural means."
    },
    {
      question: "But everyone would notice and know that He did it.",
      answer: "Not necessarily. G-d does many amazing (and seemingly impossible) things that many people just ascribe to coincidence or happenstance. It's a choice whether to notice G-d or not."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            About "Things G-d Can't Do"
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Q: {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  A: {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 pb-8">
          <p className="text-gray-600 mb-4">
            Want to learn more? Get the book!
          </p>
          <button
            onClick={() => window.open('https://www.amazon.com/dp/1300448296?tag=TGCD', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Order on Amazon
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
