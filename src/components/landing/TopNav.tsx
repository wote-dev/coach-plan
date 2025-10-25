import Link from 'next/link';
import Image from 'next/image';

const NAV_ITEMS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#roi', label: 'Outcomes' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#security', label: 'Security' },
  { href: '#team', label: 'Team' },
] as const;

export default function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-6 sm:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Tennaova"
            width={80}
            height={22}
            className="h-5 w-auto"
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/coach-ai"
            className="hidden items-center rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/90 transition-colors hover:text-white sm:flex"
          >
            Try free
          </Link>
          <a
            href="https://cal.com/danielzverev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-[#CCFF00] px-4 py-2 text-[13px] font-semibold text-[#05080F] transition-transform hover:translate-y-[-1px]"
          >
            Book demo
          </a>
        </div>
      </div>
    </header>
  );
}
