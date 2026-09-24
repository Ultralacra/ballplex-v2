import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimationProvider from "@/components/AnimationProvider";

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
    </>
  );
}
