// frontend/src/components/GlobalDock.tsx
'use client';

import { useRouter } from 'next/navigation';
import Dock from '@/src/components/ui/Dock'; // Adjust path if needed based on your folder structure
import { Home, Info, Mail, LogIn, LayoutDashboard, Package, BrainCircuit, User, LogOut } from 'lucide-react';
import { signOutUser } from '@/src/app/actions/auth';

interface GlobalDockProps {
    isLoggedIn: boolean;
}

export default function GlobalDock({ isLoggedIn }: GlobalDockProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        // 1. Destroy the session on the server
        await signOutUser();

        // 2. Redirect to the public homepage
        router.push('/');

        // 3. Force Next.js to re-fetch Server Components (updates the layout state instantly)
        router.refresh();
    };

    const loggedOutItems = [
        { icon: <Home size={18} strokeWidth={1.5} />, label: 'Home', onClick: () => router.push('/') },
        { icon: <Info size={18} strokeWidth={1.5} />, label: 'About Us', onClick: () => router.push('/#about') },
        { icon: <Mail size={18} strokeWidth={1.5} />, label: 'Contact', onClick: () => router.push('/#contact') },
        { icon: <LogIn size={18} strokeWidth={1.5} />, label: 'Sign In', onClick: () => router.push('/login') },
    ];

    const loggedInItems = [
        { icon: <LayoutDashboard size={18} strokeWidth={1.5} />, label: 'Dashboard', onClick: () => router.push('/dashboard') },
        { icon: <Package size={18} strokeWidth={1.5} />, label: 'Modules', onClick: () => router.push('/modules') },
        { icon: <BrainCircuit size={18} strokeWidth={1.5} />, label: 'AI Tutor', onClick: () => console.log('Open Tutor') },
        { icon: <User size={18} strokeWidth={1.5} />, label: 'Profile', onClick: () => router.push('/profile') },
        // Added the Sign Out button here with a distinct action
        { icon: <LogOut size={18} strokeWidth={1.5} className="text-red-400 hover:text-red-300 transition-colors" />, label: 'Sign Out', onClick: handleSignOut },
    ];

    return <Dock items={isLoggedIn ? loggedInItems : loggedOutItems} />;
}