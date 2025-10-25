import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
    }

    const { imagePath } = await request.json()
    
    if (!imagePath) {
      return NextResponse.json({ error: 'Image path required' }, { status: 400 })
    }
    
    // Delete from Supabase Storage
    const { error } = await supabase.storage
      .from('portfolio-images')
      .remove([imagePath])
    
    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

