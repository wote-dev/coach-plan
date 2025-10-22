import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md px-4 py-2.5">
          <Link href="/" className="font-extrabold text-white tracking-tight text-lg">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #1E8FD5 0%, #CCFF00 100%)' }}>
              Coach Plan
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how-it-works" className="hover:text-white">How it works</a>
            <a href="#roi" className="hover:text-white">Outcomes</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#security" className="hover:text-white">Security</a>
            <a href="#team" className="hover:text-white">Team</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/coach-ai" className="hidden sm:inline-flex items-center rounded-full px-4 py-2 text-[13px] font-semibold text-white/90 ring-1 ring-white/25 hover:ring-white/40">
              Try free
            </Link>
            <a href="#book-demo" className="inline-flex items-center rounded-full px-4 py-2 text-[13px] font-bold text-[#06141F] shadow-xl" style={{ background: 'linear-gradient(180deg, #CCFF00 0%, #B8FF36 100%)' }}>
              Book demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
