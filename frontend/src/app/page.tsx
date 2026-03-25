// frontend/src/app/page.tsx
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import GridScan from "@/src/components/GridScan";

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* 3D Grid Background - Fixed to viewport, dark theme, soft silver lines */}
      <div className="fixed inset-0 w-screen h-screen z-0 bg-slate-950 pointer-events-auto">
        <GridScan />
      </div>

      {/* Foreground Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pointer-events-none">

        {/* Small "pill" badge */}
        <div className="inline-flex items-center rounded-full px-5 py-2 text-xs uppercase tracking-widest font-semibold text-slate-300 ring-1 ring-inset ring-slate-700/50 bg-slate-900/50 backdrop-blur-md mb-8">
          <span>Welcome to the future of learning</span>
        </div>

        {/* Main Headline - Now using the elegant Playfair font */}
        <h1 className="text-5xl md:text-7xl font-medium tracking-normal text-white mb-6 drop-shadow-lg leading-tight">
          Master any skill with <br className="hidden md:block" />
          <span className="font-italianno italic text-slate-300 tracking-wide" style={{ wordSpacing: '0.2em' }}>
            Intelligent AI Tutors
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Dynamic curricula, real-time RAG-powered doubt clearing, and ML-driven difficulty adjustment. The platform adapts to you.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto pointer-events-auto">
          <Button asChild size="lg" className="h-14 px-10 text-sm tracking-wide uppercase font-semibold rounded-full bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Link href="/login">Start Learning</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 px-10 text-sm tracking-wide uppercase font-semibold rounded-full bg-transparent border-slate-600 text-white hover:bg-slate-800 hover:text-white transition-all">
            <Link href="#methodology">See How It Works</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}