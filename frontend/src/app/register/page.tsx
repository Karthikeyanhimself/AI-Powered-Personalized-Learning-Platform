// frontend/src/app/register/page.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation' // Needed for routing
import Beams from '@/src/components/ui/Beams' // Using your updated path
import { registerUser } from '@/src/app/actions/auth' // Importing our Server Action

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        firstName: '', middleName: '', lastName: '',
        email: '', phone: '', country: '',
        studyStatus: '', fieldOfStudy: '', password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // Convert state to FormData for the Server Action
        const formPayload = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            formPayload.append(key, value)
        })

        const result = await registerUser(formPayload)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            // Success! Route them to the Verify page with their email attached
            router.push(`/verify?email=${encodeURIComponent(formData.email)}`)
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-black selection:bg-white selection:text-black py-20 overflow-hidden">

            <div className="absolute inset-0 z-0 pointer-events-none fixed">
                <Beams />
            </div>

            <div className="relative z-10 w-full max-w-2xl p-4 sm:p-6 mx-4 pointer-events-auto">

                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />

                <div className="bg-transparent p-6 sm:p-8">

                    <div className="mb-6">
                        <h3 className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase mb-2">Register</h3>
                        <h1 className="text-5xl text-white font-italianno tracking-wide">Create your account</h1>
                    </div>

                    {/* Display Error if one occurs */}
                    {error && (
                        <div className="mb-6 p-3 rounded-[3px] bg-red-950/50 border border-red-900/50 text-red-200 text-xs">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">First Name</label>
                                <input type="text" name="firstName" required placeholder="Karthikeyan" value={formData.firstName} onChange={handleChange} className="w-full border-b border-white/30 pb-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors bg-transparent" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Middle (Opt)</label>
                                <input type="text" name="middleName" placeholder="M." value={formData.middleName} onChange={handleChange} className="w-full border-b border-white/30 pb-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors bg-transparent" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Last Name</label>
                                <input type="text" name="lastName" required placeholder="Doe" value={formData.lastName} onChange={handleChange} className="w-full border-b border-white/30 pb-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors bg-transparent" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Email</label>
                                <input type="email" name="email" required placeholder="jane@framer.com" value={formData.email} onChange={handleChange} className="w-full border-b border-white/30 pb-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors bg-transparent" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Phone</label>
                                <input type="tel" name="phone" required placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} className="w-full border-b border-white/30 pb-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors bg-transparent" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Country</label>
                                <select name="country" required value={formData.country} onChange={handleChange} className="w-full border-b border-white/30 pb-1.5 text-sm text-white focus:outline-none focus:border-white transition-colors bg-transparent cursor-pointer [&>option]:bg-black [&>option]:text-white">
                                    <option value="" disabled>Select...</option>
                                    <option value="IN">India</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="CA">Canada</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Study Status</label>
                                <select name="studyStatus" required value={formData.studyStatus} onChange={handleChange} className="w-full border-b border-white/30 pb-1.5 text-sm text-white focus:outline-none focus:border-white transition-colors bg-transparent cursor-pointer [&>option]:bg-black [&>option]:text-white">
                                    <option value="" disabled>Select...</option>
                                    <option value="high_school">High School</option>
                                    <option value="nearing_graduation">Nearing Graduation</option>
                                    <option value="independent">Independent Learner</option>
                                    <option value="professional">Working Professional</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Field of Study</label>
                                <input type="text" name="fieldOfStudy" required placeholder="Computer Science" value={formData.fieldOfStudy} onChange={handleChange} className="w-full border-b border-white/30 pb-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors bg-transparent" />
                            </div>
                        </div>

                        <div className="space-y-1 pt-1">
                            <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest block">Create Password</label>
                            <input type="password" name="password" required placeholder="••••••••" value={formData.password} onChange={handleChange} className="w-full border-b border-white/30 pb-1.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors bg-transparent" />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black py-3 mt-4 text-sm font-bold tracking-wide hover:bg-neutral-200 transition-colors rounded-[3px] disabled:opacity-50"
                        >
                            {loading ? 'Creating Account...' : 'Complete Registration'}
                        </button>
                    </form>

                    <div className="mt-5 text-center">
                        <p className="text-[11px] text-white/60">
                            Already have an account? <Link href="/login" className="text-white font-bold hover:underline">Sign in</Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}