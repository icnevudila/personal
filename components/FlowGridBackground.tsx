'use client'

export default function FlowGridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
        }}
      />
      
      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              rgba(249,115,22,0.15) 0 1px,
              transparent 1px 50px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(100,116,139,0.1) 0 1px,
              transparent 1px 50px
            )
          `,
          backgroundSize: '100px 100px',
          animation: 'drift 30s linear infinite',
        }}
      />
      
      {/* Subtle Flow Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.1) 50%, transparent 100%)',
          animation: 'flowVertical 40s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(100,116,139,0.1) 50%, transparent 100%)',
          animation: 'flowHorizontal 35s ease-in-out infinite',
        }}
      />
      
    </div>
  )
}

