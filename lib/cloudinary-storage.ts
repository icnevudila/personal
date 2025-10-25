export async function uploadImageToCloudinary(
  imageData: string,
  folder: 'blog' | 'projects' | 'hero' | 'logo',
  fileName?: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    console.log('🚀 Starting Cloudinary upload...')
    
    const response = await fetch('/api/upload-to-cloudinary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageData,
        folder,
        fileName
      })
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('❌ Upload error:', error)
    return { success: false, error: 'Upload failed' }
  }
}

