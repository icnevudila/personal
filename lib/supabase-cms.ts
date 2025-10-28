import { supabase } from './supabase'

// Types
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content?: string
  slug: string
  category: string
  image?: string
  date: string
  read_time: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export interface YouTubeChannel {
  id: string
  channel_name: string
  channel_url: string
  subscriber_count: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface YouTubeVideo {
  id: string
  channel_id: string
  title: string
  duration: string
  thumbnail?: string
  url?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies?: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  created_at: string
  updated_at: string
}

// Blog Posts Functions
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })

  if (error) {
    console.log('📝 Supabase not configured, using fallback data')
    return []
  }

  return data || []
}

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching all blog posts:', error)
    return []
  }

  return data || []
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data
}

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single()

  if (error) {
    console.error('Error creating blog post:', error)
    return null
  }

  return data
}

export const updateBlogPost = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
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

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting blog post:', error)
    return false
  }

  return true
}

// YouTube Functions
export const getYouTubeChannel = async (): Promise<YouTubeChannel | null> => {
  const { data, error } = await supabase
    .from('youtube_channel')
    .select('*')
    .eq('is_active', true)
    .single()

  if (error) {
    console.log('📝 YouTube channel not configured')
    return null
  }

  return data
}

export const getYouTubeVideos = async (channelId: string): Promise<YouTubeVideo[]> => {
  const { data, error } = await supabase
    .from('youtube_videos')
    .select('*')
    .eq('channel_id', channelId)
    .order('created_at', { ascending: false })

  if (error) {
    console.log('📝 YouTube videos not configured')
    return []
  }

  return data || []
}

export const updateYouTubeChannel = async (id: string, updates: Partial<YouTubeChannel>): Promise<YouTubeChannel | null> => {
  const { data, error } = await supabase
    .from('youtube_channel')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating YouTube channel:', error)
    return null
  }

  return data
}

export const createYouTubeVideo = async (video: Omit<YouTubeVideo, 'id' | 'created_at' | 'updated_at'>): Promise<YouTubeVideo | null> => {
  const { data, error } = await supabase
    .from('youtube_videos')
    .insert([video])
    .select()
    .single()

  if (error) {
    console.error('Error creating YouTube video:', error)
    return null
  }

  return data
}

export const updateYouTubeVideo = async (id: string, updates: Partial<YouTubeVideo>): Promise<YouTubeVideo | null> => {
  const { data, error } = await supabase
    .from('youtube_videos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating YouTube video:', error)
    return null
  }

  return data
}

export const deleteYouTubeVideo = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('youtube_videos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting YouTube video:', error)
    return false
  }

  return true
}

// Projects Functions
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data || []
}

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    return null
  }

  return data
}

export const updateProject = async (id: string, updates: Partial<Project>): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating project:', error)
    return null
  }

  return data
}

export const deleteProject = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    return false
  }

  return true
}

// Real-time subscriptions
export const subscribeToBlogPosts = (callback: (payload: any) => void) => {
  return supabase
    .channel('blog_posts_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, callback)
    .subscribe()
}

export const subscribeToYouTubeChannel = (callback: (payload: any) => void) => {
  return supabase
    .channel('youtube_channel_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'youtube_channel' }, callback)
    .subscribe()
}

export const subscribeToProjects = (callback: (payload: any) => void) => {
  return supabase
    .channel('projects_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, callback)
    .subscribe()
}

// Site Settings Functions
export const getSiteSettings = async (): Promise<SiteSetting[]> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .order('key')

  if (error) {
    console.log('📝 Supabase not configured, using fallback site settings')
    return []
  }
  return data || []
}

export const getSiteSetting = async (key: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single()

  if (error) {
    console.log(`📝 Site setting '${key}' not found`)
    return null
  }
  return data?.value || null
}

export const updateSiteSetting = async (key: string, value: string): Promise<boolean> => {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value })

  if (error) {
    console.error('Error updating site setting:', error)
    return false
  }
  return true
}

export const subscribeToSiteSettings = (callback: (payload: any) => void) => {
  return supabase
    .channel('site_settings_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, callback)
    .subscribe()
}
