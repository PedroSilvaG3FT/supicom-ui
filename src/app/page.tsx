import { AppToggleTheme } from "@/_shared/components/app-toggle-theme";
import Image from "next/image";

export default function Home() {
  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <Image
        priority
        width={180}
        height={38}
        alt="Next.js logo"
        className="dark:invert"
        src="https://nextjs.org/icons/next.svg"
      />

      <h1 className="my-2 text-primary">Next boilerplate</h1>
      <p className="mb-4">Description</p>

      <AppToggleTheme />
    </section>
  );
}
