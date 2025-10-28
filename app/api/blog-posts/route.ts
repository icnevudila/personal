import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts } from '@/lib/supabase-cms'

export async function GET(request: NextRequest) {
  try {
    const blogPosts = await getBlogPosts()
    
    return NextResponse.json(blogPosts, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    console.error('Blog posts API error:', error)
    
    // Fallback veriler
    const fallbackPosts = [
      {
        id: '1',
        title: 'Web Tasarımı Temelleri',
        excerpt: 'Modern web tasarımının temel prensiplerini öğrenin.',
        content: 'Bu kapsamlı rehberde modern web tasarımının temel prensiplerini öğreneceksiniz.',
        slug: 'web-tasarimi-temelleri',
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read_time: '5 min',
        featured: true,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'React ile Modern UI',
        excerpt: 'React kullanarak modern ve responsive kullanıcı arayüzleri geliştirin.',
        content: 'React ile modern UI geliştirme teknikleri ve en iyi uygulamalar.',
        slug: 'react-modern-ui',
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&q=80',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        read_time: '7 min',
        featured: true,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'JavaScript ES6+ Özellikleri',
        excerpt: 'Modern JavaScript özelliklerini öğrenin ve kodunuzu daha verimli hale getirin.',
        content: 'ES6+ JavaScript özellikleri ve modern geliştirme teknikleri.',
        slug: 'javascript-es6-features',
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop&q=80',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        read_time: '6 min',
        featured: false,
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
    
    return NextResponse.json(fallbackPosts, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  }
}
