import SEO from "@/components/SEO";
import Page from "@/components/Layout/Page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  component: RouteComponent,
});

const faqs = [
  {
    question: "Does Zemonie keep any sensitive information from users?",
    answer:
      "No, we don't. We only save the transactions you enter, then visualize them so you can understand your spending habits. We never ask for or store bank account numbers, credit card details, phone numbers, or any government-issued IDs.",
  },
  {
    question: "Which categories are currently supported by Zemonie?",
    answer:
      "We have created common categories for both income and expense transactions (e.g., Salary, Freelance, Food, Transport, Entertainment, and more). However, we are still working on improving and adding more categories if needed.",
  },
  {
    question: "Is Zemonie free?",
    answer:
      "Yes, Zemonie is currently free and will remain free for the foreseeable future. We want you to focus on managing your money without worrying about subscription costs.",
  },
  {
    question: "Which stage is Zemonie at?",
    answer:
      "We are currently in the open-beta stage. The app is functional but not yet feature-complete. Our team is actively working toward releasing the official version as soon as possible.",
  },
  {
    question: "What are the future plans for Zemonie?",
    answer:
      "After releasing the official version, we plan to build more features — one of them is a friends list with a leaderboard, along with personalised titles and badges based on your spending behaviours. Stay tuned!",
  },
  {
    question: "Does Zemonie share your information?",
    answer:
      "No, we do not sell or share your information with any company. Your authentication credentials are handled securely by Better-Auth, and all other information is kept safely on our servers.",
  },
  {
    question: "Can I delete my account and data?",
    answer:
      "Yes. You can request account deletion at any time. Once your account is deleted, all your personal information and transaction data will be permanently removed from our systems.",
  },
];

function RouteComponent() {
  return (
    <>
      <SEO
        title="FAQ"
        description="Frequently asked questions about Zemonie — privacy, pricing, features, and more."
        canonicalPath="/faq"
      />
      <Page className="py-12">
        <div className="max-w-3xl mx-auto px-5 lg:px-0">
          <div className="mb-10">
            <div className="w-16 h-1 bg-primary rounded-full mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-500 mt-2">
              Everything you need to know about Zemonie.
            </p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-neutral-950 shadow-2xl p-8 lg:p-10">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-base lg:text-lg font-semibold text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Page>
    </>
  );
}
