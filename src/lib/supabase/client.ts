import { createBrowserClient } from "@supabase/ssr"

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export const createClient = () => {
  try {
    if (supabaseInstance) return supabaseInstance

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase credentials are missing")
      console.error("URL:", supabaseUrl)
      console.error("Key:", supabaseAnonKey ? "Present" : "Missing")
      return null
    }

    // Validate URL format
    try {
      new URL(supabaseUrl)
    } catch (error) {
      console.error("Invalid Supabase URL format:", supabaseUrl)
      return null
    }

    console.log("Initializing Supabase client with URL:", supabaseUrl)

    supabaseInstance = createBrowserClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
        global: {
          headers: {
            'X-Client-Info': 'van-velzen-autorecycling',
          },
        },
      },
    )

    return supabaseInstance
  } catch (error) {
    console.error("Error initializing Supabase client:", error)
    return null
  }
}
