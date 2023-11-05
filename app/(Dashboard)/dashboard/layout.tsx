import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex bg-slate-950">
        <div className="flex-none">
          <div className="w-64 h-screen text-xs bg-black/20 flex grow flex-col gap-y-2 overflow-y-auto p-3 ring-1 ring-white/10">
            <UserButton afterSignOutUrl="/" />
            <nav className="flex flex-1 flex-col gap-y-0.5">
              <li>
                <Link href="/dashboard" className="flex flex-col rounded-lg py-1.5 px-3 hover:bg-white/10">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard/contacts" className="flex flex-col rounded-lg py-1.5 px-3 hover:bg-white/10">
                  Contacts
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="flex flex-col rounded-lg py-1.5 px-3 hover:bg-white/10">
                  Settings
                </Link>
              </li>
            </nav>
          </div>
        </div>
        <div className="flex-auto p-5 flex-col content-center">{children}</div>
      </main>
    </>
  );
}
