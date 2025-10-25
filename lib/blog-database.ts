import { supabase } from './supabase'

export interface BlogPost {
  id?: number
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  category: string
  featured?: boolean
  content?: string
  image?: string
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })
  
  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  
  return data || []
}

export async function saveBlogPost(post: BlogPost): Promise<boolean> {
  const { error } = await supabase
    .from('blog_posts')
    .upsert(post, { onConflict: 'slug' })
  
  if (error) {
    console.error('Error saving blog post:', error)
    return false
  }
  
  return true
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('slug', slug)
  
  if (error) {
    console.error('Error deleting blog post:', error)
    return false
  }
  
  return true
}

