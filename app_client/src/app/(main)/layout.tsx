import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AuthProvider from "@/components/provider/AuthProvider";
import { getAuthUser } from "@/lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

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
