import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NeraGuide from "@/components/assistant/NeraGuide";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <NeraGuide />
      <Footer />
    </>
  );
}
