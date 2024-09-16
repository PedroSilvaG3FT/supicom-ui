import { Separator } from "@/_core/components/fragments/separator";
import SignInExample from "../../_components/firebase/sign-in-example";
import SignUpExample from "../../_components/firebase/sign-up-example";
import {
  Tabs,
  TabContent,
  TabWrapper,
} from "@/_core/components/fragments/ui/tabs";

export default function AuthenticationPage() {
  const tabs = [
    {
      value: "signin",
      title: "Sign In",
      content: (
        <TabContent className="min-h-[440px]">
          <SignInExample />
        </TabContent>
      ),
    },
    {
      value: "signup",
      title: "Sign Up",
      content: (
        <TabContent className="min-h-[440px]">
          <SignUpExample />
        </TabContent>
      ),
    },
  ];

  return (
    <section>
      <h1 className="page-title">Authentication</h1>
      <Separator className="my-4" />

      <TabWrapper>
        <Tabs tabs={tabs} contentClassName="!mt-6 min-h-[200px]" />
      </TabWrapper>
    </section>
  );
}
