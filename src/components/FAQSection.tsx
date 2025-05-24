
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How does Richie ensure SEBI and FPSB compliance?",
      answer: "Richie's AI engine is built with SEBI and FPSB guidelines embedded into every template. Our plans include all mandatory disclosures, risk assessments, and regulatory requirements. Every plan is automatically validated against current compliance standards before generation."
    },
    {
      question: "Can I customize the generated financial plans?",
      answer: "Absolutely! While Richie generates comprehensive plans automatically, you have full control to edit, add sections, modify recommendations, and include your own analysis. The AI provides the foundation, and you add your professional expertise."
    },
    {
      question: "How does the pay-per-plan pricing work?",
      answer: "Simple - you only pay ₹199 when you generate a financial plan. No monthly fees, no hidden costs. You can also purchase credit packs (20, 50, or 100 plans) at discounted rates for better value."
    },
    {
      question: "Is my client data secure?",
      answer: "Yes, security is our top priority. All data is encrypted in transit and at rest. We follow industry-standard security practices and are SOC 2 compliant. Your client information is never shared or used for any purpose other than generating their financial plans."
    },
    {
      question: "Can I add my team members to Richie?",
      answer: "Yes, you can invite team members to collaborate on client management and plan generation. All team members have equal access in the current version, with role-based permissions coming soon."
    },
    {
      question: "Do I need any special software to use Richie?",
      answer: "No, Richie is a web-based platform that works on any modern browser. It's optimized for both desktop and mobile use, so you can access your clients and generate plans from anywhere."
    },
    {
      question: "How long does it take to generate a financial plan?",
      answer: "Most comprehensive financial plans are generated in 3-5 minutes. Complex plans with multiple goals might take up to 10 minutes. This is compared to the traditional 4-6 hours of manual work."
    },
    {
      question: "Can I integrate Richie with my existing tools?",
      answer: "Currently, Richie integrates with Google Calendar for reminders. We're working on integrations with popular CRM systems and portfolio management tools. Let us know what integrations would be most valuable for your practice."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about using Richie for your financial planning practice
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-medium text-gray-900 py-4 hover:text-blue-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="mailto:hello@richie.ai" 
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Get in touch with our team →
          </a>
        </div>
      </div>
    </section>
  );
};
