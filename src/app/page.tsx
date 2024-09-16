import { FlipWords } from "@/_core/components/fragments/ui/flip-words";
import { WavyBackground } from "@/_core/components/fragments/ui/wavy-background";

export default function Home() {
  const words = ["better", "cute", "beautiful", "modern"];

  return (
    <WavyBackground>
      <section className="p-16 h-screen flex flex-col items-center justify-end">
        <div className="flex justify-center items-center px-4 mb-4">
          <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
            Build
            <FlipWords words={words} /> <br />
            projects with Next boilerplate
          </div>
        </div>
      </section>
    </WavyBackground>
  );
}
