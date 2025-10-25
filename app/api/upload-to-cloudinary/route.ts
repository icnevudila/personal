import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { imageData, folder, fileName } = await request.json()
    
    // Check if Cloudinary is configured
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET
    
    console.log('🔍 Cloudinary config:', { cloudName: cloudName ? 'Set' : 'Missing', apiKey: apiKey ? 'Set' : 'Missing' })
    
    if (!cloudName || !apiKey || !apiSecret) {
      console.error('❌ Cloudinary not configured!')
      return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 503 })
    }
    
    // Upload to Cloudinary using unsigned upload
    const uploadFormData = new FormData()
    uploadFormData.append('file', imageData)
    uploadFormData.append('upload_preset', 'unsigned_portfolio') // Change this to your unsigned preset
    uploadFormData.append('folder', folder)
    if (fileName) {
      uploadFormData.append('public_id', fileName)
    }
    
    console.log('📤 Uploading to Cloudinary...')
    
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadFormData
      }
    )
    
    const cloudinaryData = await cloudinaryResponse.json()
    
    console.log('📦 Cloudinary response:', cloudinaryData)
    
    if (cloudinaryData.error) {
      console.error('❌ Cloudinary error:', cloudinaryData.error)
      return NextResponse.json({ error: cloudinaryData.error.message }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      url: cloudinaryData.secure_url 
    })
  } catch (error) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

