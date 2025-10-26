import { About } from '@/components/About'
import { Education } from '@/components/Education'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container-custom py-16">
        <About />
        <Education />
      </div>
    </div>
  )
}
