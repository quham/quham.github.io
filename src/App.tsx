import React, { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Mail, Check, ChevronDown, User, Zap, Sparkles, Brain, Unlock, Infinity, Route, MessageSquare, Bot, Package, Wrench, TrendingUp, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  goal: z.string().min(3, { message: 'Please share a short goal (3+ characters).' }),
})

function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      pulse: number
    }> = []

    const colors = ['#00ff88', '#0088ff', '#ff0088', '#ffaa00', '#aa00ff']
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(12, 27, 61, 0.95)')
      gradient.addColorStop(0.5, 'rgba(15, 33, 71, 0.95)')
      gradient.addColorStop(1, 'rgba(12, 27, 61, 0.95)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.02
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        const pulsatingSize = particle.size + Math.sin(particle.pulse) * 0.5
        const pulsatingOpacity = particle.opacity + Math.sin(particle.pulse * 2) * 0.2

        ctx.shadowBlur = 20
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulsatingSize, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(pulsatingOpacity * 255)
          .toString(16)
          .padStart(2, '0')}`
        ctx.fill()

        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const lineOpacity = (1 - distance / 150) * 0.3
            ctx.strokeStyle = `rgba(0, 255, 136, ${lineOpacity})`
            ctx.lineWidth = 1
            ctx.shadowBlur = 5
            ctx.shadowColor = '#00ff88'
            ctx.stroke()
          }
        })
      })
      ctx.shadowBlur = 0
      requestAnimationFrame(animate)
    }
    animate()
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

function FuturisticWaitlistForm({ className = '' }: { className?: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', goal: '' },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Waitlist signup:', values)
    alert(`Thanks ${values.name}! We'll notify you at ${values.email} when the course launches.\nYour goal: ${values.goal}`)
    form.reset()
  }
  return (
    <Card className={`w-full max-w-md mx-auto backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl ${className}`}>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">What do you want most out of the course?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Automate client onboarding, master prompting, build a custom no-code assistant, etc."
                      {...field}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20 min-h-[96px]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 shadow-lg shadow-cyan-500/25 border-0 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 mr-2" /> 🚀 Join the Future
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

function ScrollFadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  )
}

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const modules = [
    {
      title: 'Unlocking AI’s Power: Current Capabilities & Limitations',
      description:
        'Discover just how far AI can take you, but be aware of where it might fail. You’ll know exactly what AI can and cannot do, giving you the confidence to use it boldly while avoiding costly mistakes.',
      unlock: 'AI true potential. understanding of the limitless possibilities with AI',
      unlockIcon: Infinity,
    },
    {
      title: 'Spotting High Impact Opportunities in Your Life',
      description:
        'Turn everyday problems into AI-powered solutions. You’ll learn how to scan your personal and professional life identifying 3-5 high-impact opportunities so you can reclaim time, boost productivity, and spark creativity.',
      unlock: 'Your AI roadmap. A step-by-step plan for transforming the way you work, create, and think.',
      unlockIcon: Route,
    },
    {
      title: 'Mastering the C.L.E.A.R Prompting Method',
      description:
        'Never settle for mediocre AI outputs again. You’ll master a simple but powerful framework that transforms vague prompts into precision instructions, transforming the outputs you get from AI.',
      unlock: 'C.L.E.A.R.R. prompts. Simple, powerful. Get exactly what you want.',
      unlockIcon: MessageSquare,
    },
    {
      title: 'ChatGPT Like a Pro: Getting Maximum Value',
      description:
        'From your average Google search ChatGPT user to the top 5%. You’ll learn the insider techniques, hidden features, and creative hacks that turn ChatGPT into your personal thought partner.',
      unlock: 'ChatGPT, unleashed. From chatbot to your personal strategist, researcher, and brainstorming engine.',
      unlockIcon: Bot,
    },
    {
      title: 'Beyond GPT: Discovering the Most Impactful AI Tools',
      description:
        'When ChatGPT isn’t enough, you’ll know exactly where to go next. You’ll build a personal toolkit of cutting-edge apps and learn a simple system to keep finding the newest, most powerful tools for your life.',
      unlock: 'Your AI arsenal. The tools that give you an edge, and the system to keep it fresh and relevant.',
      unlockIcon: Package,
    },
    {
      title: 'Your First AI Build: No-Code Tools & Automation',
      description:
        'Go from user to creator—without writing a single line of code. You’ll walk through building your own fully personalised AI tool or automation that solves your specific need in your life or work.',
      unlock: 'Your first AI build. Custom, no-code, built by you to solve your problem perfectly.',
      unlockIcon: Wrench,
    },
    {
      title: 'Leveling Up: Reviewing & Improving Your AI Creation',
      description:
        'Turn a good AI tool into a great one. You’ll learn how to test, refine, and upgrade your AI creations so they stay effective, efficient, and ahead of the curve.',
      unlock: 'Always better. A system for upgrading your tools so they grow with you.',
      unlockIcon: TrendingUp,
    },
  ]


  const faqs = [
    { question: 'What\'s the time commitment?', answer: 'Here\'s the beautiful part - this course has "negative time commitment". We recommend spending 2–4 hours a week but the skills you gain will save you 5+ hours every week for life. That\'s like earning time back. Plus, the pace is really up to you, with weekly live Q&As you can ask questions from whichever module your on.' },
    { question: 'Do I need any technical or programming background?', answer: 'Absolutely not! You don\'t need to know a single line of code. We believe English is the new programming language. Everything you\'ll build uses no-code tools that anyone can master. Even if you\'ve never touched tools like ChatGPT, we\'ll guide you from the basics to advanced techniques. You\'ll surpass people who\'ve been using GPT for years in just weeks.' },
    { question: 'When does the course start and how much does it cost?', answer: 'We\'ll email everyone on the waitlist with the exact start date, pricing, and exclusive early-bird discounts. Waitlist members will get prioritised access and the best deals!' },
    { question: 'Are all the AI tools you covered free to use?', answer: 'Yes! Every tool we cover is either free or has a free version. When building your personalized AI arsenal, we\'ll also highlight premium tools that might be worth investing in, depending on your needs. We\'ll show you exactly which free alternatives you can use and when an upgrade could be worth it.' },
    { question: 'What kind of support and community do I get?', answer: 'Absolutely. As a student, you\'ll get access to: a private Discord group for academy graduates, Live Q&A weekly, Q&A forum for imbetween Live weeklys, A dedicated AI tutor providing 24/7 support. You\'re never learning alone, and you\'ll get real results, not just watch videos.' },
    { question: 'What devices can I use?', answer: 'A laptop or desktop is ideal, but the course works well on mobile and tablet. You can learn on the train, at lunch, or anywhere you like.' },
    { question: 'What if I\'m not completely satisfied?', answer: 'We offer a 100% money-back guarantee. If you\'re not blown away after the results of the first two modules, get every penny back.' },
    { question: 'How is this different from other AI courses?', answer: 'Most AI courses are heavy on theory, light on results. We\'re the opposite - every single module ends with you actually transforming how you use AI in your life. You\'ll see immediate results, not just learn for the sake of learning.' },
  ]

  return (
    <div className="min-h-screen bg-navy-900 relative overflow-hidden" style={{ backgroundColor: '#0c1b3d' }}>
      <section className="relative min-h-screen flex items-center justify-center">
        <FuturisticBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/20 to-navy-900/60" style={{ background: 'linear-gradient(to bottom, transparent, rgba(12, 27, 61, 0.2), rgba(12, 27, 61, 0.6))' }} />
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-32 w-40 h-40 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          <ScrollFadeIn>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-medium">Coming Soon!</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master AI in Your
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse pb-1">Digital Future</span>
              <span className="block text-2xl md:text-3xl text-gray-300 font-normal mt-4">— No Coding Required</span>
            </h1>
          </ScrollFadeIn>
          <ScrollFadeIn className="mt-8">
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your workflow with cutting-edge AI tools. Save hours daily, amplify your creativity, and build your own AI solutions in just weeks.
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn className="mt-12">
            <Button
              onClick={() => setIsWaitlistOpen(true)}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 shadow-lg shadow-cyan-500/25 border-0 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 mr-2" /> 🚀 Join the Future
            </Button>
          </ScrollFadeIn>
        </div>
      </section>

      <ScrollFadeIn>
        <section className="py-20 relative" style={{ backgroundColor: '#0c1b3d' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" style={{ background: 'linear-gradient(to bottom, #0c1b3d, #0f2147, #0c1b3d)' }} />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Is This Course Right for <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> You</span>?
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="backdrop-blur-md bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 shadow-2xl shadow-green-500/10">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-400 flex items-center">
                    <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center mr-3">
                      <Check className="w-5 h-5" />
                    </div>
                    Perfect for
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4 text-green-300">
                    {[
                      'Professionals, entrepreneurs, and freelancers ready to reclaim 5+ hours a week, supercharge their productivity, and stay ahead in their field.',
                      'ChatGPT users who know AI much more than a replacement for Google and want to finally unlock its *real* potential.',
                      'Ambitious learners who see the AI wave coming and want practical, usable skills *now* to work smarter, not harder.',
                      'Professionals drowning in routine tasks who want to experience the \"I can\'t believe I ever did this manually!\" moment as hours of work turn into minutes.',
                    ].map((text) => (
                      <li key={text} className="flex items-start group hover:text-green-200 transition-colors">
                        <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:bg-green-400/30 transition-colors">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        {text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
                <Card className="backdrop-blur-md bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-400/30 shadow-2xl shadow-red-500/10">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-400 flex items-center">
                    <div className="w-8 h-8 bg-red-400/20 rounded-full flex items-center justify-center mr-3">
                        <X className="w-5 h-5" />
                    </div>
                    Not for you if
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4 text-red-300">
                    {[
                      'Looking for AI theory? Sorry we’re here to make you unstoppable *using* AI, not explain it under the hood.',
                      'Anyone wanting to code AI from scratch. There\'s no coding here (Except in English).',
                      'University students without a business, idea, project, or real-life context to apply these skills.',
                      'People without any computer-based work (e.g., manual labour roles) where AI application is limited.',
                    ].map((text) => (
                        <li key={text} className="flex items-start group hover:text-red-200 transition-colors">
                          <div className="w-6 h-6 bg-red-400/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:bg-red-400/30 transition-colors">
                            <X className="w-3 h-3 text-red-400" />
                          </div>
                          {text}
                        </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0c1b3d' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Neural Network</span> Course Modules
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module, index) => (
                <Card
                  key={index}
                  className={`group hover:scale-[1.02] transition-all duration-300 backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-400/50 shadow-2xl hover:shadow-cyan-500/20`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 justify-start">
                      <Badge className="mb-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-400 border-cyan-400/30 hover:from-cyan-400/30 hover:to-blue-500/30">
                        <Brain className="w-3 h-3 mr-1" /> Module {index + 1}
                      </Badge>
                      {index === modules.length - 1 && (
                        <Badge className="mb-2 bg-gradient-to-r from-purple-400/20 to-pink-500/20 text-purple-300 border-purple-400/30 hover:from-purple-400/30 hover:to-pink-500/30">
                          Bonus
                        </Badge>
                      )}
                    </div>
                    <CardTitle className={`text-lg text-white group-hover:text-cyan-400 transition-colors`}>{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2 px-6 pb-6">
                    <p className={`text-gray-300 group-hover:text-gray-200 transition-colors`}>{module.description}</p>
                    {module.unlock && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:from-cyan-400/30 group-hover:to-blue-500/30 group-hover:border-cyan-400/50 transition-colors">
                            <Unlock className="w-4 h-4" />
                          </div>
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-200 group-hover:from-cyan-400/20 group-hover:to-blue-500/20 group-hover:border-cyan-400/40 transition-colors">
                            {module.unlockIcon ? <module.unlockIcon className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </div>
                        </div>
                        <p className="text-cyan-200 mt-2">You'll unlock: {module.unlock}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button
                onClick={() => setIsWaitlistOpen(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold px-6 py-3 shadow-lg shadow-cyan-500/25 border-0 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 mr-2" /> 🚀 Join the Future
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">20+</div>
                <div className="text-gray-300 mt-2">AI Tools Covered</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{modules.length}</div>
                <div className="text-gray-300 mt-2">Comprehensive Modules</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">5+</div>
                <div className="text-gray-300 mt-2">Hours Saved Weekly</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Lifetime</div>
                <div className="text-gray-300 mt-2">Access Included</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Live Q&A</div>
                <div className="text-gray-300 mt-2">Weekly</div>
              </div>
            </div>
          </div>
        </section>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <section className="py-20 relative" style={{ backgroundColor: '#0c1b3d' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-800 via-navy-800 to-navy-800" style={{ background: 'linear-gradient(to bottom, #0f2147, #0f2147, #0f2147)' }} />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Meet Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> AI Guide</span>
            </h2>
            <Card className="max-w-3xl mx-auto backdrop-blur-md bg-white/5 border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md opacity-50" />
                    <Avatar className="w-32 h-32 relative border-4 border-white/20">
                      <AvatarImage src="/assets/images/default.svg" alt="Instructor" />
                      <AvatarFallback className="bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-white">
                        <User className="w-16 h-16 text-cyan-400" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">Quham Adefila</h3>
                    <p className="text-cyan-400 font-semibold mb-4">AI Educator & Developer</p>
                    <p className="text-gray-300 leading-relaxed">
                      <strong>*Meet Quham - the AI expert who bridges the gap between cutting-edge technology and real-world results.*</strong>
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-4">
                      From <strong>pioneering research at Google DeepMind</strong> (creators of Gemini) to applying AI and automation in finance at <strong>JP Morgan</strong>, Quham has worked at the forefront of AI innovation. He's also built solutions at a range of AI startups and even founded an AI startup serving the NHS and local authorities in Social Care. Along the way, he spotted a clear problem: most people were barely scratching the surface of AI's potential.
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-4">
                      Armed with a <strong>Master's in AI from Imperial College London</strong>, <strong>7+ years of teaching</strong>, and <strong>1M+ views</strong> on his educational content, Quham has helped everyone from Fortune 500 companies to individual professionals turn complex AI concepts into practical skills that transform the way they work.
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-4">
                      His mission is simple: make you unstoppable with AI, no coding required.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <section className="py-20 relative" style={{ backgroundColor: '#0c1b3d' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Neural FAQ</span> Database
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-indigo-400/50 transition-colors">
                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-white/5 transition-colors">
                    <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 bg-white/5">
                    <p className="text-gray-300">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <section className="py-16 bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
          <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8">
              Don't Wait — <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Master AI Today</span>
            </h2>
            <Button
              onClick={() => setIsWaitlistOpen(true)}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 shadow-lg shadow-cyan-500/25 border-0 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 mr-2" /> 🚀 Join the Future
            </Button>
          </div>
        </section>
      </ScrollFadeIn>

      <footer className="py-8 text-white text-center relative" style={{ backgroundColor: '#0c1b3d' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900 to-transparent" style={{ background: 'linear-gradient(to top, #0c1b3d, #0c1b3d, transparent)' }} />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">Everyday AI Mastery</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Everyday AI Mastery. All rights reserved. • Powered by Neural Intelligence</p>
        </div>
      </footer>
      {isWaitlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsWaitlistOpen(false)} />
          <div className="relative z-10 w-full max-w-xl">
            <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-white">Join the Waitlist</CardTitle>
                <Button variant="ghost" className="text-white/70 hover:text-white p-2 h-8 w-8" onClick={() => setIsWaitlistOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <FuturisticWaitlistForm />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}


