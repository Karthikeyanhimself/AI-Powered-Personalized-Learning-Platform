// frontend/src/app/profile/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/server'
import prisma from '@/src/lib/prisma'
import Link from 'next/link'

export default async function ProfilePage() {
    const supabase = await createClient()

    // 1. Get the securely authenticated user from Supabase
    const { data: { user }, error } = await supabase.auth.getUser()

    // If they aren't logged in, kick them back to login
    if (error || !user) {
        redirect('/login')
    }

    // 2. Fetch all their rich profile data from your Prisma database
    const dbUser = await prisma.user.findUnique({
        where: { id: user.id }
    })

    // If they are in Supabase but not in Prisma (e.g. they used the old link), show an error state
    if (!dbUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Profile setup incomplete. Please register again using the OTP flow.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black py-20 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Header Section */}
                <div className="mb-12 border-b border-white/10 pb-8">
                    <h3 className="text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase mb-2">User Profile</h3>
                    <h1 className="text-5xl font-italianno tracking-wide">
                        {dbUser.firstName} {dbUser.lastName}
                    </h1>
                    <p className="text-white/60 text-sm mt-2">{dbUser.email}</p>
                </div>

                {/* Database Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Card 1: Personal Info */}
                    <div className="relative p-6 sm:p-8">
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />

                        <h2 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-6">Personal Details</h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] text-white/50 uppercase tracking-wider">Full Name</p>
                                <p className="text-sm font-medium">{dbUser.firstName} {dbUser.middleName} {dbUser.lastName}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/50 uppercase tracking-wider">Phone</p>
                                <p className="text-sm font-medium">{dbUser.phone || 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/50 uppercase tracking-wider">Country</p>
                                <p className="text-sm font-medium">{dbUser.country || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Academic Info */}
                    <div className="relative p-6 sm:p-8">
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />

                        <h2 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-6">Academic Profile</h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] text-white/50 uppercase tracking-wider">Status</p>
                                <p className="text-sm font-medium capitalize">{dbUser.studyStatus?.replace('_', ' ') || 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/50 uppercase tracking-wider">Field of Study</p>
                                <p className="text-sm font-medium">{dbUser.fieldOfStudy || 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/50 uppercase tracking-wider">Platform Level</p>
                                <p className="text-sm font-medium text-cyan-400 capitalize">{dbUser.learningLevel}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-12 text-center">
                    <Link href="/" className="text-[11px] text-white/50 hover:text-white transition-colors uppercase tracking-widest font-bold">
                        Return to Home
                    </Link>
                </div>

            </div>
        </div>
    )
}