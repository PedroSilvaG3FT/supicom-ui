import { Separator } from "@/_core/components/fragments/separator";
import { LinkPreview } from "@/_core/components/fragments/ui/link-preview";

export default function ShadcnUiPage() {
  return (
    <section>
      <h1 className="page-title">ShadcnUi</h1>
      <Separator className="my-4" />

      <p>
        Shadcn/UI is a powerful collection of customizable React components
        designed to work seamlessly with Tailwind CSS. It offers developers a
        quick and efficient way to build modern, responsive user interfaces
        without sacrificing flexibility or control. By providing a wide range of
        pre-built components - from basic elements like buttons and forms to
        more complex features such as data tables with sorting and pagination -
        Shadcn/UI significantly accelerates the development process while
        ensuring a consistent and professional look across your application.
      </p>

      <p className="my-4">
        Whether you're creating admin dashboards, landing pages, or complex web
        applications, Shadcn/UI equips you with the tools to bring your vision
        to life. Its integration with Tailwind CSS allows for extensive
        customization, enabling you to tailor each component to your specific
        needs. By leveraging Shadcn/UI, developers can focus more on building
        unique features and less on reinventing common UI elements, resulting in
        faster development cycles and more polished end products. To get
        started, simply visit the Shadcn/UI documentation, explore the available
        components, and begin incorporating them into your next project.
      </p>

      <LinkPreview
        url="https://ui.shadcn.com/docs"
        className="font-semibold underline"
      >
        Complete documentation
      </LinkPreview>
    </section>
  );
}
