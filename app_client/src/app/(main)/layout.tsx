import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AuthProvider from "@/components/provider/AuthProvider";
import { getProfileAction } from "@/lib/actions/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getProfileAction();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <AuthProvider initialUser={user}>{children}</AuthProvider>
      </main>
      <Footer />
    </>
  );
}
