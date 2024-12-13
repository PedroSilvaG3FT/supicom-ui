import "./globals.scss";
import "react-quill/dist/quill.snow.css";
import "react-phone-number-input/style.css";

import type { Metadata } from "next";
import { enviroments } from "@/env/enviroments";
import { cn } from "@/_core/components/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import AppToast from "@/_shared/components/app-toast";
import { Montserrat as FontSans } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import WrapperProvider from "@/_core/providers/wrapper.provider";
import AppLoading from "@/_shared/components/loading/app-loading";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: `Supicom - Soluções Industriais`,
  description: `Supicom Indústria e Comércio LTDA oferece fabricação, aluguel e manutenção de máquinas industriais com soluções sob medida para diversos setores.`,
  keywords: `fabricação de máquinas industriais, aluguel de equipamentos, manutenção de máquinas, Supicom, equipamentos industriais`,
  openGraph: {
    type: `website`,
    url: `https://www.supicom.com.br`,
    title: `Supicom Indústria e Comércio LTDA`,
    siteName: `Supicom Indústria e Comércio LTDA`,
    description: `Fabricação, aluguel e manutenção de máquinas industriais de alta qualidade.`,
    images: [
      {
        width: 800,
        height: 600,
        url: `/images/favicon.png`,
        alt: `Supicom - Máquinas Industriais`,
      },
    ],
  },
  twitter: {
    card: `summary_large_image`,
    images: [`/images/favicon.png`],
    title: `Supicom Indústria e Comércio LTDA`,
    description: `Soluções em fabricação, aluguel e manutenção de máquinas industriais.`,
  },
  icons: { icon: `/images/favicon.png` },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.png" sizes="any" />
        <GoogleAnalytics
          gaId={enviroments.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}
        />
      </head>
      <body
        className={cn(
          "min-h-[100dvh] bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <WrapperProvider>
            <AppToast />
            <AppLoading />

            {children}
          </WrapperProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
