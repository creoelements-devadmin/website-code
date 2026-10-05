import { Plus } from "lucide-react";
import { useState } from "react";
import { faqServiceData } from "../data/FaqServiceData";

// eslint-disable-next-line react/prop-types
const FAQ = ({ serviceSlug, serviceName }) => {
  const faqs = faqServiceData[serviceSlug] || [];
  const [openIndex, setOpenIndex] = useState(-1);

  if (faqs.length === 0) return null;

  return (
    <section className="w-full px-6 py-10 sm:px-10 ">
      <div className="mx-auto grid   gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
        {/* Sticky intro column */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className=" text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40 ">Common Questions</span>
           <h1 className=" text-[42px] leading-[1.05] text-btnPrimary sm:text-5xl">
            Before we <span className="text-primary italic">begin.</span>
          </h1>
          <p className="mt-5 max-w-[36ch]  text-[15px] leading-relaxed text-btnPrimary/60">
            Everything you need to know before starting your next digital,
            creative, or brand project with Creo Elements.
          </p>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-btnPrimary/10  ">
          <p className="pt-6 text-xs uppercase tracking-[1px] pb-2 text-primary">
            {serviceName}
          </p>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div key={faq.question} className="group">
                <button
                  type="button"
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={headerId}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-sm"
                >
                  <span
                    className={`  text-[16px] leading-snug group-hover:pl-4 transition-all duration-700  sm:text-[17px] ${
                      isOpen ? "text-primary font-medium" : "text-btnPrimary"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-primary bg-primary text-white rotate-45"
                        : "border-btnPrimary/20 text-btnPrimary group-hover:border-primary group-hover:text-primary"
                    }`}
                  >
                    <Plus size={16} strokeWidth={2.25} />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${ isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0" }`}
                >
                  <div className="min-h-0">
                    <p className="  pb-6 pr-10  text-[15px] leading-relaxed text-btnPrimary/65">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;