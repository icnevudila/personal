import { createClient } from '@supabase/supabase-js'

// Hardcoded values for Vercel deployment (temporary fix)
const supabaseUrl = 'https://uwcgcwgxtezmecldnsnr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y2djd2d4dGV6bWVjbGRuc25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNzQ0NDYsImV4cCI6MjA3Njk1MDQ0Nn0.2EkJGmgauM-trUp9hdEXyXdM9xdFKnrdGL4MxY36f9g'

// Debug: Environment variables kontrolü
console.log('🔍 Supabase Configuration Check:')
console.log('🔑 Supabase URL:', supabaseUrl)
console.log('🔑 Supabase Key:', supabaseAnonKey.substring(0, 20) + '...')
console.log('🔑 Using hardcoded values for Vercel deployment')

// Always create a client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return true // Always true with hardcoded values
}

