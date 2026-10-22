import { Container, Section } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function ContactCta() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="rounded-2xl border border-champagne/50 bg-card px-6 py-12 text-center shadow-sm sm:px-12">
            <h2 className="text-3xl font-semibold sm:text-4xl">Let&rsquo;s plan your next meal</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Ask about the menu, a celebration or a corporate order. Message us on WhatsApp on {siteConfig.contact.phoneDisplay} and we will reply with the details.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <WhatsAppButton size="lg" label="Message us on WhatsApp" message="Hello Lolarshons Gourmet, I would like to make an enquiry." />
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact details</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
