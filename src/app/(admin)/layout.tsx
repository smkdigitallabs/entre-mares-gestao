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
      <main className="flex-1 overflow-y-auto">
        {/* Top bar for page-specific tools */}
        <div className="sticky top-0 z-30 flex justify-end items-center px-8 py-4 bg-background/50 backdrop-blur-sm">
          <PageTutorial />
        </div>
        
        <div className="p-8 pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
