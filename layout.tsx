import ClientSidebar from '@/components/client-sidebar';

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <ClientSidebar />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
