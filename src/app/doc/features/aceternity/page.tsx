import { Separator } from "@/_core/components/fragments/separator";
import { LinkPreview } from "@/_core/components/fragments/ui/link-preview";

export default function AceternityPage() {
  return (
    <section>
      <h1 className="page-title">Aceternity</h1>
      <Separator className="my-4" />

      <p>
        Aceternity UI is a modern React component library known for its sleek
        designs, smooth animations, and seamless integration with Framer Motion,
        a powerful and versatile animation library. With Aceternity UI, you can
        easily create engaging and interactive user interfaces that captivate
        users with smooth transitions and dynamic visual effects.
      </p>

      <p className="my-4">
        The integration with Framer Motion allows developers to leverage the
        full animation capabilities of the library, adding movement and life to
        React components in an intuitive and declarative way. Whether creating
        subtle entrance and exit animations, complex layout transitions, or
        delicate micro-interactions, Aceternity UI and Framer Motion work
        together to provide an intuitive development experience and visually
        stunning results. Through easily customizable animation properties and
        variants, developers can control every aspect of the motion, from
        duration and timing curves to trigger events, crafting engaging and
        memorable digital experiences.
      </p>

      <LinkPreview
        className="font-semibold underline"
        url="https://ui.aceternity.com/components"
      >
        Complete documentation
      </LinkPreview>
    </section>
  );
}
