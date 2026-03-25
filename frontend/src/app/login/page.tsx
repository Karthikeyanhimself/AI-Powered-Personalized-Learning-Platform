// frontend/src/app/login/page.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Beams from '@/src/components/ui/Beams'
import { loginUser } from '@/src/app/actions/auth'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)

        const result = await loginUser(formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            // 1. Force the layout to re-check the session (updates the Dock)
            router.refresh()
            // 2. Route the user to their protected profile
            router.push('/profile')
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-black selection:bg-white selection:text-black">

            <div className="absolute inset-0 z-0 pointer-events-none">
                <Beams />
            </div>

            <div className="relative z-10 w-full max-w-md p-4 sm:p-6 mx-4 pointer-events-auto">

                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />

                <div className="bg-transparent p-8 sm:p-10">

                    <div className="mb-8">
                        <h3 className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase mb-2">Login</h3>
                        <h1 className="text-5xl text-white font-italianno tracking-wide">Welcome back</h1>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="mb-6 p-3 rounded-[3px] bg-red-950/50 border border-red-900/50 text-red-200 text-xs">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Email</label>
                            <input
                                type="email"
                                required
                                placeholder="jane@framer.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-b border-white/30 pb-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors bg-transparent"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-b border-white/30 pb-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors bg-transparent"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-3.5 h-3.5 accent-white bg-transparent border-white/30 rounded-sm cursor-pointer" />
                                <span className="text-[11px] text-white/60 group-hover:text-white transition-colors">Remember for 30 days</span>
                            </label>
                            <Link href="#" className="text-[11px] text-white/60 hover:text-white transition-colors">
                                I've forgot password
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black py-3 mt-4 text-sm font-bold tracking-wide hover:bg-neutral-200 transition-colors rounded-[3px] disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-[11px] text-white/60">
                            Don't have an account? <Link href="/register" className="text-white font-bold hover:underline">Sign up</Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}