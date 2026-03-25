// frontend/src/app/verify/page.tsx
'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Beams from '@/src/components/ui/Beams'
import { verifyRegistrationOTP } from '@/src/app/actions/auth'

// We wrap the form in a sub-component so we can safely use useSearchParams() inside a Suspense boundary
function VerifyForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email') || ''

    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!email) {
            setError('No email found to verify.')
            setLoading(false)
            return
        }

        const result = await verifyRegistrationOTP(email, token)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push('/profile')
        }
    }

    return (
        <div className="relative z-10 w-full max-w-md p-4 sm:p-6 mx-4 pointer-events-auto">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />

            <div className="bg-transparent p-8 sm:p-10">
                <div className="mb-8">
                    <h3 className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase mb-2">Security</h3>
                    <h1 className="text-5xl text-white font-italianno tracking-wide">Verify email</h1>
                    <p className="text-[11px] text-white/60 mt-4 leading-relaxed">
                        We sent a secure 8-digit code to <br />
                        <span className="text-white font-bold">{email || 'your email'}</span>
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-[3px] bg-red-950/50 border border-red-900/50 text-red-200 text-xs">
                        {error}
                    </div>
                )}

                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Authentication Code</label>
                        <input
                            type="text"
                            required
                            maxLength={8} // Updated to 8
                            placeholder="00000000" // Updated to 8
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full border-b border-white/30 pb-2 text-2xl tracking-[0.5em] text-center text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors bg-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || token.length !== 8} // Updated validation to 8
                        className="w-full bg-white text-black py-3 mt-4 text-sm font-bold tracking-wide hover:bg-neutral-200 transition-colors rounded-[3px] disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Confirm Identity'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-[11px] text-white/60">
                        Wrong email? <Link href="/register" className="text-white font-bold hover:underline">Go back</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function VerifyPage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center bg-black selection:bg-white selection:text-black">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Beams />
            </div>
            {/* Suspense is required by Next.js when using useSearchParams in a client component */}
            <Suspense fallback={<div className="text-white z-10">Loading...</div>}>
                <VerifyForm />
            </Suspense>
        </div>
    )
}