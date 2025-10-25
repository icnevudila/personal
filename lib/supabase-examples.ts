/**
 * Supabase Kullanım Örnekleri
 * 
 * Bu dosya Supabase'in nasıl kullanılacağına dair örnekler içerir.
 * Gerçek kodunuzda bu örnekleri kullanabilirsiniz.
 */

import { supabase } from './supabase'

// ========== Blog Posts Örneği ==========

export interface BlogPost {
  id?: number
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  slug: string
  category: string
  featured?: boolean
  image?: string
}

// Blog posts getir
export async function getBlogPosts(): Promise<BlogPost[]> {
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

// Tek bir blog post getir
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data
}

// Blog post ekle
export async function addBlogPost(post: BlogPost): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single()

  if (error) {
    console.error('Error adding blog post:', error)
    return null
  }

  return data
}

// Blog post güncelle
export async function updateBlogPost(
  id: number,
  updates: Partial<BlogPost>
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating blog post:', error)
    return null
  }

  return data
}

// Blog post sil
export async function deleteBlogPost(id: number): Promise<boolean> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)

  if (error) {
    console.error('Error deleting blog post:', error)
    return false
  }

  return true
}

// ========== Projects Örneği ==========

export interface Project {
  id?: number
  title: string
  description: string
  image: string
  technologies: string[]
  featured?: boolean
}

// Projects getir
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data || []
}

// Featured projects getir
export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }

  return data || []
}

// ========== Images Örneği ==========

export interface Image {
  id?: number
  url: string
  section: string // 'hero', 'about', 'blog', etc.
  alt: string
}

// Section'a göre görsel getir
export async function getImagesBySection(section: string): Promise<Image[]> {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .eq('section', section)

  if (error) {
    console.error('Error fetching images:', error)
    return []
  }

  return data || []
}

// Görsel ekle
export async function addImage(image: Image): Promise<Image | null> {
  const { data, error } = await supabase
    .from('images')
    .insert(image)
    .select()
    .single()

  if (error) {
    console.error('Error adding image:', error)
    return null
  }

  return data
}

// ========== Real-time Subscription Örneği ==========

// Blog posts için real-time dinleme
export function subscribeToBlogPosts(
  callback: (payload: any) => void
) {
  const channel = supabase
    .channel('blog_posts_changes')
    .on(
      'postgres_changes',
      {
        event: '*', // INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'blog_posts',
      },
      callback
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

