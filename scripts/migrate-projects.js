const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase environment variables not found!')
  console.error('Please check your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Projects data
const projects = [
  {
    title: "Nova Finance Dashboard",
    description: "Finansal verilerinizi akıllı analitik ile yönetin. Fintech dashboard konsepti ile gelir, gider ve kullanıcı takibi için tasarlanmış modern arayüz.",
    image: "/portfolio/nova finance.jpg",
    technologies: ["Fintech UI", "Data Visualization", "Figma", "Dashboard Design"],
    featured: true
  },
  {
    title: "Aurora Analytics",
    description: "Modern AI analiz paneli. Gerçek zamanlı veri görselleştirme ve makine öğrenimi içgörüleri için temiz, sezgisel arayüz.",
    image: "/portfolio/auraroa.jpg",
    technologies: ["AI Dashboard", "Data Visualization", "Figma", "Design System"],
    featured: true
  },
  {
    title: "Cortex Dashboard",
    description: "Makine öğrenimi izleme ekranı. Model performansı ve tahminlerin anlık takibi için optimize edilmiş minimalist tasarım.",
    image: "/portfolio/Phoenix_10_A_minimalist_creative_workspace_scene_viewed_from_a_3.jpg",
    technologies: ["ML Monitoring", "UI/UX Design", "Figma", "Prototyping"],
    featured: true
  },
  {
    title: "VisionFlow UI",
    description: "Görsel veri işleme yönetim paneli. Karmaşık görüntü analiz işlemlerini sade bir arayüzde sunuyor.",
    image: "/portfolio/mindflolio.jpg",
    technologies: ["Computer Vision UI", "Workflow Design", "Figma"],
    featured: false
  },
  {
    title: "NeuraBoard",
    description: "Optimizasyon kontrol paneli. Model hiperparametrelerini ve eğitim süreçlerini yönetmek için tasarlandı.",
    image: "/portfolio/Phoenix_10_A_minimalist_creative_workspace_scene_viewed_from_a_3.jpg",
    technologies: ["AI Optimization", "Dashboard Design", "Figma"],
    featured: false
  },
  {
    title: "Mindfolio Blog",
    description: "Modern blog platformu. İçerik üretimi ve tasarım dünyasındaki yenilikleri paylaşan minimalist blog arayüzü.",
    image: "/portfolio/blog.jpg",
    technologies: ["Blog Platform", "AI Content", "UI/UX Design", "Figma"],
    featured: true
  },
  {
    title: "Promptly AI Tools",
    description: "Prompts yönetim platformu. AI prompt'ları düzenlemek, test etmek ve optimize etmek için sezgisel araçlar.",
    image: "/portfolio/luma.jpg",
    technologies: ["Prompt Engineering", "UI Design", "Figma"],
    featured: false
  },
  {
    title: "Omnia Insight",
    description: "Gerçek zamanlı analiz arayüzü. Büyük veri setlerini anlık olarak görselleştiren performans odaklı tasarım.",
    image: "/portfolio/auraroa.jpg",
    technologies: ["Real-time Analytics", "UI/UX", "Figma"],
    featured: false
  },
  {
    title: "Luma Studio",
    description: "Kreatif ajans ana sayfası konsepti. Portföy çalışmalarını modern ve etkileyici şekilde sergileyen temiz tasarım.",
    image: "/portfolio/luma.jpg",
    technologies: ["Creative Agency", "Web Design", "Next.js"],
    featured: false
  },
  {
    title: "HealLink Medical Portal",
    description: "Hasta yönetim arayüzü konsepti. Sağlık verilerini düzenli ve güvenli şekilde sunan kullanıcı dostu panel.",
    image: "/portfolio/blog.jpg",
    technologies: ["Healthcare UI", "UX Design", "Figma"],
    featured: false
  },
  {
    title: "DataScape",
    description: "AI destekli veri görselleştirme paneli. Karmaşık veri setlerini anlaşılır grafiklere dönüştüren sezgisel arayüz.",
    image: "/portfolio/Phoenix_10_A_minimalist_creative_workspace_scene_viewed_from_a_3.jpg",
    technologies: ["Data Visualization", "AI Tools", "Figma"],
    featured: false
  },
  {
    title: "Mimosa Store",
    description: "Minimal e-ticaret vitrini. Ürün gösterimine odaklanan sade ve profesyonel online mağaza tasarımı.",
    image: "/portfolio/luma.jpg",
    technologies: ["E-Commerce", "UI/UX", "Figma"],
    featured: false
  }
]

async function migrateProjects() {
  console.log('🚀 Starting projects migration to Supabase...')
  
  try {
    // First, check if projects table exists and is empty
    const { data: existingProjects, error: fetchError } = await supabase
      .from('projects')
      .select('id')
      .limit(1)
    
    if (fetchError) {
      console.error('❌ Error checking existing projects:', fetchError)
      return
    }
    
    if (existingProjects && existingProjects.length > 0) {
      console.log('⚠️  Projects table already has data. Skipping migration.')
      return
    }
    
    // Insert projects
    const { data, error } = await supabase
      .from('projects')
      .insert(projects)
      .select()
    
    if (error) {
      console.error('❌ Error inserting projects:', error)
      return
    }
    
    console.log(`✅ Successfully migrated ${data.length} projects to Supabase!`)
    console.log('📊 Projects migrated:')
    data.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title} ${project.featured ? '(Featured)' : ''}`)
    })
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

// Run migration
migrateProjects()
