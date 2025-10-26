import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Education } from '@/components/Education'
import { Skills } from '@/components/Skills'
import { PortfolioSites } from '@/components/PortfolioSites'
import { Blog } from '@/components/Blog'
import { Contact } from '@/components/Contact'
import { QuoteButton } from '@/components/QuoteButton'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Skills />
      <PortfolioSites />
      <Blog isHomePage={true} />
      <Contact />
      <QuoteButton />
    </>
  )
}



