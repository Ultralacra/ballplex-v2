import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimationProvider from "@/components/AnimationProvider";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <AnimationProvider>{children}</AnimationProvider>
      </main>
      <Footer />
    </>
  );
}
