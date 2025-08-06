import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.")
    // Return a mock client that won't crash the build
    return {
      from: () => ({
        select: () => ({ eq: () => ({ single: () => ({ data: null, error: { message: "Database not available" } }) }) }),
        insert: () => ({ select: () => ({ data: null, error: { message: "Database not available" } }) }),
        update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: { message: "Database not available" } }) }) }) }),
        delete: () => ({ eq: () => ({ data: null, error: { message: "Database not available" } }) }),
        order: () => ({ data: [], error: { message: "Database not available" } }),
        in: () => ({ order: () => ({ data: [], error: { message: "Database not available" } }) }),
      }),
      auth: {
        getSession: () => ({ data: { session: null }, error: { message: "Database not available" } }),
      },
      storage: {
        from: () => ({
          upload: () => ({ data: null, error: { message: "Database not available" } }),
          createSignedUrl: () => ({ data: null, error: { message: "Database not available" } }),
        }),
      },
    }
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // This will throw in middleware, but we can safely ignore it
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options })
        } catch (error) {
          // This will throw in middleware, but we can safely ignore it
        }
      },
    },
  })
}
