import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
    }

    const { imageData, folder, fileName } = await request.json()
    
    console.log('📤 API: Uploading to Supabase...')
    console.log('📁 Folder:', folder)
    console.log('📝 FileName:', fileName)
    
    // Base64'ü buffer'a çevir
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    // File path
    const filePath = `${folder}/${fileName || Date.now()}.jpg`
    console.log('🛤️ File path:', filePath)
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, buffer, {
        contentType: 'image/jpeg',
        upsert: true
      })
    
    if (error) {
      console.error('❌ Upload error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    console.log('✅ Upload successful:', data)
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath)
    
    console.log('🔗 Public URL:', publicUrl)
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      path: filePath
    })
  } catch (error) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

