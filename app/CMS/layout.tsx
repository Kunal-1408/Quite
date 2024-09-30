import SidebarDemo from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="grid grid-cols-5 bg-slate-50 dark:bg-neutral-700" >
        <SidebarDemo/>
        <main className="col-span-4">{children}</main>
      </div>
    );
  }
  