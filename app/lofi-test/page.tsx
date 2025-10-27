import LofiText from '@/components/LofiText'

export default function LofiTestPage() {
  return (
    <main className="bg-[#0e0e0e] text-white min-h-screen flex flex-col items-center justify-center gap-6 font-sans px-4 text-center">
      <LofiText as="h1" delay={0.2} className="text-6xl font-semibold">
        Ali Düvenci
      </LofiText>
      <LofiText as="p" delay={0.4} className="text-gray-400 max-w-xl mx-auto">
        calm creativity. minimalist code. crafted design.
      </LofiText>
      <LofiText as="h2" delay={0.8} className="text-3xl mt-16 font-medium">
        ✦ Hover over this text ✦
      </LofiText>
      <LofiText as="p" delay={1.0} className="text-gray-500 max-w-md">
        When you hover, the letters breathe — warm light, soft motion, subtle glow. 
      </LofiText>
    </main>
  )
}
