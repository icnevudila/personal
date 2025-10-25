import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const { imageData, section } = await request.json()

    if (!imageData || !section) {
      return NextResponse.json(
        { success: false, error: 'Missing image data or section' },
        { status: 400 }
      )
    }

    // Cloudinary'ye yükle (base64)
    const uploadResult = await cloudinary.uploader.upload(imageData, {
      folder: `portfolio/${section}`,
      resource_type: 'image',
      format: 'jpg',
      quality: 'auto',
    })

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}

