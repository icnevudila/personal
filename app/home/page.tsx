import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Education } from '@/components/Education'
import { Skills } from '@/components/Skills'
import { PortfolioSites } from '@/components/PortfolioSites'
import { Blog } from '@/components/Blog'
import { Contact } from '@/components/Contact'
import { QuoteButton } from '@/components/QuoteButton'
import { BuyMeACoffee } from '@/components/BuyMeACoffee'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Education />
      <Skills />
      <PortfolioSites />
      <Blog isHomePage={true} />
      <BuyMeACoffee />
      <Contact />
      <QuoteButton />
    </div>
  )
}
