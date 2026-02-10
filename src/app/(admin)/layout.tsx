import { Sidebar } from "@/components/layout/sidebar";
import { PageTutorial } from "@/components/admin/page-tutorial";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-md border-b border-border z-40 flex items-center px-4 justify-between">
        <span className="font-bold text-primary">Entre Marés</span>
      </div>

      <main className="flex-1 overflow-y-auto w-full pt-14 lg:pt-0">
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
