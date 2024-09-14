"use client";

import { loadingStore } from "@/_store/loading.store";
import AppLoadingIndicator from "./app-loading-indicator";

export default function AppLoading() {
  const _loadingStore = loadingStore((state) => state);

  if (!_loadingStore.show) return <></>;

  return (
    <section className="h-screen w-screen fixed z-[1000] top-0 left-0 flex gap-4 flex-col items-center justify-center backdrop-blur">
      <AppLoadingIndicator />
      {!!_loadingStore.message && <p>{_loadingStore.message}</p>}
    </section>
  );
}
