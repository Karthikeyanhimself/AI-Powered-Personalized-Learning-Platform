// frontend/src/app/actions/auth.ts
'use server'

import { createClient } from '@/src/lib/supabase/server'
import prisma from '@/src/lib/prisma'

export async function registerUser(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    // 1. Send credentials and metadata to Supabase
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                // We pack all the extra form data into Supabase's secure metadata payload
                firstName: formData.get('firstName'),
                middleName: formData.get('middleName'),
                lastName: formData.get('lastName'),
                phone: formData.get('phone'),
                country: formData.get('country'),
                studyStatus: formData.get('studyStatus'),
                fieldOfStudy: formData.get('fieldOfStudy'),
            }
        }
    })

    if (error) return { error: error.message }
    return { success: true, email }
}

export async function verifyRegistrationOTP(email: string, token: string) {
    const supabase = await createClient()

    // 1. Verify the 6-digit code for a new signup
    const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup',
    })

    if (error) return { error: error.message }

    // 2. If verified successfully, create the user in our Prisma Database
    if (data.user && data.user.user_metadata) {
        const meta = data.user.user_metadata

        // Check if they already exist just in case
        const existingUser = await prisma.user.findUnique({ where: { id: data.user.id } })

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    id: data.user.id,
                    email: data.user.email!,
                    firstName: meta.firstName,
                    middleName: meta.middleName || null,
                    lastName: meta.lastName,
                    phone: meta.phone || null,
                    country: meta.country || null,
                    studyStatus: meta.studyStatus || null,
                    fieldOfStudy: meta.fieldOfStudy || null,
                },
            })
        }
    }

    return { success: true }
}

export async function signOutUser() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return { success: true }
}

export async function loginUser(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}