import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ_ITEMS } from '@/mocks/faq-items';
import { cn } from '@/lib/utils';

export function LandingFaq() {
  return (
    <section id="faq" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-3 md:mb-4 text-foreground uppercase">
            Sobre
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Perguntas frequentes sobre o SteamTrack e como usar a ferramenta.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className={cn(
              'rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm overflow-hidden',
            )}
          >
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className={cn(
                  'border-white/10 px-4 md:px-6 last:border-b-0',
                  index > 0 && 'border-t',
                )}
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline hover:text-primary transition-colors py-5 md:py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5 md:pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
