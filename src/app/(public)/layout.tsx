import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimationProvider from "@/components/AnimationProvider";
import { RECAPTCHA_SITE_KEY } from "@/lib/recaptcha";

const GA_MEASUREMENT_ID = "G-P11D5D2BY9";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <AnimationProvider>{children}</AnimationProvider>
      </main>
      <Footer />
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
