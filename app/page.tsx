import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Education } from '@/components/Education'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Blog } from '@/components/Blog'
import { Contact } from '@/components/Contact'
import { QuoteButton } from '@/components/QuoteButton'
import { Testimonials } from '@/components/Testimonials'
import { BuyMeACoffee } from '@/components/BuyMeACoffee'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Blog />
      <Testimonials />
      <BuyMeACoffee />
      <Contact />
      <QuoteButton />
    </>
  )
}



