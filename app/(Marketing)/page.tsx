import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link href="/dashboard" className="bg-white text-black px-3 py-1.5 rounded-lg hover:bg-white/90">go to dashboard</Link>
      </div>
    </main>
  );
}
