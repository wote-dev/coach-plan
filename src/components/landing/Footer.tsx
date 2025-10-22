import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative isolate py-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-white/60">© {new Date().getFullYear()} Coach Plan. All rights reserved.</div>
        <nav className="flex items-center gap-4 text-sm text-white/70">
          <Link href="/coach-ai" className="hover:text-white">Try</Link>
          <Link href="/planner" className="hover:text-white">Planner</Link>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#security" className="hover:text-white">Security</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
