export async function uploadImageToSupabase(
  imageData: string,
  folder: 'blog' | 'projects' | 'hero',
  fileName?: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    console.log('🚀 Starting Supabase upload...')
    console.log('📂 Folder:', folder)
    console.log('📝 FileName:', fileName)
    
    const response = await fetch('/api/upload-to-supabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageData,
        folder,
        fileName
      })
    })
    
    console.log('📡 Response status:', response.status)
    
    const data = await response.json()
    console.log('📦 Response data:', data)
    
    return data
  } catch (error) {
    console.error('❌ Upload error:', error)
    return { success: false, error: 'Upload failed' }
  }
}

export function getSupabasePublicUrl(path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/portfolio-images/${path}`
}

export async function deleteImageFromSupabase(
  imagePath: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/delete-from-supabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imagePath })
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Delete error:', error)
    return { success: false, error: 'Delete failed' }
  }
}

