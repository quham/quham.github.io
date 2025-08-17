import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Mail, Check, ChevronDown, User, Zap, Sparkles, Brain, Unlock, Infinity, Route, MessageSquare, Bot, Package, Wrench, TrendingUp, X } from 'lucide-react'
import emailjs from '@emailjs/browser'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ThemeToggle } from '@/components/ThemeToggle'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  goal: z.string().min(3, { message: 'Please share a short goal (3+ characters).' }),
})

function FuturisticBackground({ theme }: { theme: 'light' | 'dark' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const isVisibleRef = useRef(true)

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

    // Reduce particle count for better performance
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

    const colors = theme === 'light' 
      ? ['#00b4d8', '#0077b6', '#7209b7', '#f72585', '#00d4aa']
      : ['#00ff88', '#0088ff', '#ff0088', '#ffaa00', '#aa00ff']

    // Reduced from 50 to 20 particles for better performance
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, // Reduced velocity
        vy: (Math.random() - 0.5) * 0.5, // Reduced velocity
        size: Math.random() * 3 + 1, // Reduced max size
        opacity: Math.random() * 0.4 + 0.2, // Reduced opacity
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Performance optimization: only animate when visible
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    function animate() {
      if (!ctx || !canvas || !isVisibleRef.current) return
      
      if (theme === 'light') {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
        gradient.addColorStop(0.5, 'rgba(248, 250, 252, 0.95)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.95)')
        ctx.fillStyle = gradient
      } else {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, 'rgba(12, 27, 61, 0.95)')
        gradient.addColorStop(0.5, 'rgba(15, 33, 71, 0.95)')
        gradient.addColorStop(1, 'rgba(12, 27, 61, 0.95)')
        ctx.fillStyle = gradient
      }
      
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Simplified particle rendering
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.01 // Reduced pulse speed
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        const pulsatingSize = particle.size + Math.sin(particle.pulse) * 0.3
        const pulsatingOpacity = particle.opacity + Math.sin(particle.pulse * 2) * 0.1

        // Reduced shadow blur for performance
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulsatingSize, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(pulsatingOpacity * 255)
          .toString(16)
          .padStart(2, '0')}`
        ctx.fill()

        // Simplified connection logic - only connect nearby particles
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 100) { // Reduced connection distance
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const lineOpacity = (1 - distance / 100) * 0.2 // Reduced opacity
            const lineColor = theme === 'light' ? '#00b4d8' : '#00ff88'
            ctx.strokeStyle = `${lineColor}${Math.floor(lineOpacity * 255)
              .toString(16)
              .padStart(2, '0')}`
            ctx.lineWidth = 0.5 // Reduced line width
            ctx.shadowBlur = 2 // Reduced shadow
            ctx.shadowColor = lineColor
            ctx.stroke()
          }
        })
      })
      ctx.shadowBlur = 0
      
      // Use requestAnimationFrame with throttling for better performance
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

function FuturisticWaitlistForm({ className = '', theme }: { className?: string; theme: 'light' | 'dark' }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', goal: '' },
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // EmailJS configuration - you'll need to set these up
    const serviceId = 'YOUR_EMAILJS_SERVICE_ID' // Replace with your actual service ID
    const templateId = 'YOUR_EMAILJS_TEMPLATE_ID' // Replace with your actual template ID
    const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY' // Replace with your actual public key

    // Prepare email data
    const templateParams = {
      to_email: 'your-email@example.com', // Replace with your actual email
      from_name: values.name,
      from_email: values.email,
      goal: values.goal,
      message: `New waitlist signup from ${values.name} (${values.email})\n\nGoal: ${values.goal}`
    }

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully:', response)
        alert(`Thanks ${values.name}! We'll notify you at ${values.email} when the Academy launches.\nYour goal: ${values.goal}`)
        form.reset()
      })
      .catch((error) => {
        console.error('Email failed to send:', error)
        alert('Thanks for signing up! We received your information and will be in touch soon.')
        form.reset()
      })
  }
  
  const isLight = theme === 'light'
  const cardClasses = isLight 
    ? 'bg-white/90 border-gray-200 shadow-xl'
    : 'backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl'
  
  const inputClasses = isLight
    ? 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20'
    : 'bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/20'
  
  const labelClasses = isLight ? 'text-gray-700 font-medium' : 'text-white font-medium'
  const messageClasses = isLight ? 'text-red-600' : 'text-red-300'

  return (
    <Card className={`w-full max-w-md mx-auto ${cardClasses} ${className}`}>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClasses}>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      className={inputClasses}
                    />
                  </FormControl>
                  <FormMessage className={messageClasses} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClasses}>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                      className={inputClasses}
                    />
                  </FormControl>
                  <FormMessage className={messageClasses} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClasses}>What do you want most out of the Academy?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Automate client onboarding, master prompting, build a custom no-code assistant, etc."
                      {...field}
                      className={`${inputClasses} min-h-[96px]`}
                    />
                  </FormControl>
                  <FormMessage className={messageClasses} />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 shadow-lg shadow-cyan-500/25 border-0 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 mr-2" /> Join the Future
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Disconnect observer once element is visible to save resources
          observer.disconnect()
        }
      }, 
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start animation slightly before element comes into view
      }
    )
    
    if (ref.current) observer.observe(ref.current)
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  // Set theme on mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Memoize modules data to prevent unnecessary re-renders
  const modules = useMemo(() => [
    {
      title: 'AI\'s Power',
      description:
        'Discover just how far AI can take you and be aware of where it might fail. Understanding AI what AI can and can\'t do will isn\'t only empowering but sparks ideas about the potential uses you didn\'t realise were possible.',
      unlock: 'Unlock AI\'s true potential, understand of the limitless possibilities.',
      unlockIcon: Infinity,
    },
    {
      title: 'Your High Impact Opportunities',
      description:
        'Turn everyday problems into AI-powered solutions. You\'ll learn how to scan your personal and professional life identifying 3-5 high-impact opportunities to reclaim time or boost productivity.',
      unlock: 'Your personalised AI roadmap. A step-by-step plan transforming the way you work, create, and think.',
      unlockIcon: Route,
    },
    {
      title: 'C.L.E.A.R.R Prompts',
      description:
        'Tired of AI not giving you generic or unhelpful responses. You\'ll master a simple but powerful framework to transform your prompting skills so you never get mediocre AI outputs again.',
      unlock: 'C.L.E.A.R.R. prompts. Simple, powerful. The AI outputs you want.',
      unlockIcon: MessageSquare,
    },
    {
      title: 'ChatGPT Like a Pro',
      description:
        'Still using ChatGPT like it\'s google search. It\'s so much more! Become the top 5% of ChatGpt users. You\'ll learn the insider techniques, hidden features, and creative hacks transforming chatgpt for you.',
      unlock: 'ChatGPT, unleashed. Your personal thought partner. A strategist, researcher, and brainstorming engine.',
      unlockIcon: Bot,
    },
    {
      title: 'Beyond GPT',
      description:
        'Chatgpt is only the beginning. You\'ll build a personal toolkit of cutting-edge AI apps perfect for you to incorporate and learn a simple system to keep finding the newest, most powerful tools for your life.',
      unlock: 'Your AI arsenal. The tools that give you an edge, and the system to keep it fresh and relevant.',
      unlockIcon: Package,
    },
    {
      title: 'Built for you by you',
      description:
        'Even more personalised! Go from user to creator without writing a single line of code. You\'ll walk through building your own fully personalised AI tool or automation that solves your specific need.',
      unlock: 'A fully customised tool for your problem built by you. And it\'s only the first!',
      unlockIcon: Wrench,
    },
    {
      title: 'Leveling Up',
      description:
        'It get\'s even better. Turn a good AI tool into a great one. You\'ll learn how to test, refine, and upgrade your AI creations so they stay effective, efficient, and ahead of the curve.',
      unlock: 'Always better! A system for upgrading your tools to grow with you.',
      unlockIcon: TrendingUp,
    },
  ], [])

  // Memoize FAQs data to prevent unnecessary re-renders
  const faqs = useMemo(() => [
    { question: 'What\'s the time commitment?', answer: 'Here\'s the beautiful part - this course has "negative time commitment". We recommend spending 2–4 hours a week but the skills you gain will save you 5+ hours every week for life. So really you earn time back. Plus the pace is really up to you with weekly live Q&As you can ask questions about whichever module your on.' },
    { question: 'Do I need any technical or programming background?', answer: 'Absolutely not! You don\'t need to know a single line of code. We believe English is the new programming language. Everything you\'ll build uses no-code tools that anyone can master. Even if you\'ve never touched tools like ChatGPT, we\'ll guide you from the basics to advanced techniques. You\'ll surpass people who\'ve been using GPT for years in just weeks.' },
    { question: 'When does the course start and how much does it cost?', answer: 'We\'ll email everyone on the waitlist with the exact start date, pricing, and exclusive early-bird discounts. Waitlist members will get prioritised access and the best deals!' },
    { question: 'Are all the AI tools you covered free to use?', answer: 'Yes! Every tool we cover is either free or has a free version. When building your personalized AI arsenal, we\'ll also highlight premium tools that might be worth investing in, depending on your needs. We\'ll show you exactly which free alternatives you can use and when an upgrade could be worth it.' },
    { question: 'What kind of support and community do I get?', answer: 'Absolutely. As a student, you\'ll get access to: a private Discord group for academy graduates, Live Q&A weekly, Q&A forum for imbetween Live weeklys, A dedicated AI tutor providing 24/7 support. You\'re never learning alone, and you\'ll get real results, not just watch videos.' },
    { question: 'What devices can I use?', answer: 'A laptop or desktop is ideal, but the course works well on mobile and tablet. You can learn on the train, at lunch, or anywhere you like.' },
    { question: 'What if I\'m not completely satisfied?', answer: 'We offer a 100% money-back guarantee. If you\'re not blown away after the results of the first two modules, get every penny back.' },
    { question: 'How is this different from other AI courses?', answer: 'Most AI courses are heavy on theory, light on results. We\'re the opposite - every single module ends with you actually transforming how you use AI in your life. You\'ll see immediate results, not just learn for the sake of learning.' },
  ], [])

  // Memoize theme-dependent values to prevent unnecessary recalculations
  const themeValues = useMemo(() => {
    const isLight = theme === 'light'
    return {
      isLight,
      bgColor: isLight ? 'bg-white' : 'bg-navy-900',
      textColor: isLight ? 'text-gray-900' : 'text-white',
      cardBg: isLight ? 'bg-white/90 border-gray-200 shadow-xl' : 'backdrop-blur-md bg-white/5 border border-white/10',
      glassEffect: isLight ? 'bg-white/80 border-gray-200' : 'backdrop-blur-md bg-white/10 border border-white/20'
    }
  }, [theme])

  // Memoize callback functions to prevent unnecessary re-renders
  const handleWaitlistOpen = useCallback(() => setIsWaitlistOpen(true), [])
  const handleWaitlistClose = useCallback(() => setIsWaitlistOpen(false), [])

  return (
    <div className={`min-h-screen min-h-dvh ${themeValues.bgColor} relative overflow-hidden`} data-theme={theme}>
      <ThemeToggle theme={theme} onThemeChange={setTheme} />
      
      <section className="relative min-h-screen min-h-dvh flex items-center justify-center">
        <FuturisticBackground theme={theme} />
        <div className={`absolute inset-0 ${themeValues.isLight ? 'bg-gradient-to-b from-transparent via-white/20 to-white/60' : 'bg-gradient-to-b from-transparent via-navy-900/20 to-navy-900/60'}`} />
        <div className={`absolute top-20 left-20 w-32 h-32 ${themeValues.isLight ? 'bg-cyan-400/20' : 'bg-cyan-400/20'} rounded-full blur-xl animate-pulse`} />
        <div className={`absolute top-40 right-32 w-24 h-24 ${themeValues.isLight ? 'bg-purple-500/20' : 'bg-purple-500/20'} rounded-full blur-xl animate-pulse delay-1000`} />
        <div className={`absolute bottom-40 left-32 w-40 h-40 ${themeValues.isLight ? 'bg-pink-500/20' : 'bg-pink-500/20'} rounded-full blur-xl animate-pulse delay-2000`} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          <ScrollFadeIn>
            <div className={`inline-flex items-center gap-2 ${themeValues.isLight ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border-cyan-400/30' : 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border-cyan-400/30'} backdrop-blur-sm border rounded-full px-6 py-2 mb-8`}>
              <Sparkles className={`w-5 h-5 ${themeValues.isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
              <span className={`${themeValues.isLight ? 'text-cyan-600' : 'text-cyan-400'} font-medium`}>Coming Soon!</span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-bold ${themeValues.textColor} mb-6 leading-tight`}>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse pb-1">AI Advantage </span>
              <br />
              Academy
              <span className={`block text-2xl md:text-3xl ${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} font-normal mt-4`}>— No Coding Required</span>
            </h1>
          </ScrollFadeIn>
          <ScrollFadeIn className="mt-8">
            <p className={`text-xl md:text-2xl ${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} mb-12 max-w-3xl mx-auto leading-relaxed`}>
              Leverage AI to save 5+ hours a week, supercharge your productivity, and stay ahead in your field.
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn className="mt-12">
            <Button
              onClick={handleWaitlistOpen}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 shadow-lg shadow-cyan-500/25 border-0 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 mr-2" /> Join the Future
            </Button>
          </ScrollFadeIn>
        </div>
      </section>

      <ScrollFadeIn>
        <section className={`py-20 relative min-h-dvh ${themeValues.isLight ? 'bg-gray-50' : 'bg-navy-900'}`}>
          <div className={`absolute inset-0 ${themeValues.isLight ? 'bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50' : 'bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900'}`} />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <h2 className={`text-4xl font-bold text-center ${themeValues.textColor} mb-16`}>
              Is This Right for <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> You</span>?
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className={`${themeValues.cardBg} shadow-2xl`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${themeValues.isLight ? 'text-green-600' : 'text-green-400'} flex items-center`}>
                    <div className={`w-8 h-8 ${themeValues.isLight ? 'bg-green-500/20' : 'bg-green-400/20'} rounded-full flex items-center justify-center mr-3`}>
                      <Check className="w-5 h-5" />
                    </div>
                    Perfect if
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className={`space-y-4 ${themeValues.isLight ? 'text-green-700' : 'text-green-300'}`}>
                    {[
                      'You\'re a professional, freelancer or entrepreneur, ready to reclaim <strong>5+ hours</strong> a week, supercharge their productivity, and stay ahead in their field.',
                      'You use Chatgpt and know AI is much more than a replacement for Google and want to unlock its <strong>real</strong> potential.',
                      // 'You\'re ambitious and want to work smarter. You recognise better use of AI will mean you <strong>outperform</strong> everyone else.',
                      'You\'re ambitious and smart enough to see the truth: those who master AI will <strong>outperform</strong> those who don\'t.',
                      'You\'re someone drowning in routine tasks that take hours instead of minutes. You want that "This <strong>used to</strong>  take me forever!" breakthrough.', //vs that "I can\'t believe I used to do this manually!" moment
                    ].map((text) => (
                      <li key={text} className="flex items-start group transition-colors">
                        <div className={`w-6 h-6 ${themeValues.isLight ? 'bg-green-500/20' : 'bg-green-400/20'} rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:bg-green-400/30 transition-colors`}>
                          <Check className={`w-3 h-3 ${themeValues.isLight ? 'text-green-600' : 'text-green-400'}`} />
                        </div>
                        <span dangerouslySetInnerHTML={{ __html: text }} />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className={`${themeValues.cardBg} shadow-2xl`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${themeValues.isLight ? 'text-red-600' : 'text-red-400'} flex items-center`}>
                    <div className={`w-8 h-8 ${themeValues.isLight ? 'bg-red-500/20' : 'bg-red-400/20'} rounded-full flex items-center justify-center mr-3`}>
                      <X className="w-5 h-5" />
                    </div>
                    Not for you if
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className={`space-y-4 ${themeValues.isLight ? 'text-red-700' : 'text-red-300'}`}>
                    {[
                      'Looking for AI theory? Sorry we\'re here to make you unstoppable <strong>using</strong> AI, not explain what\'s under the hood.',
                      'You want to code or build models from scratch. There\'s no coding here (Except in English).',
                      'You don\'t have a business, idea, project, or real-life context to <strong>apply</strong> these skills (e.g. most students).',
                      'You don\'t have any computer-based work (e.g., manual labour roles) so your potential for AI application is limited.',
                    ].map((text) => (
                      <li key={text} className="flex items-start group transition-colors">
                        <div className={`w-6 h-6 ${themeValues.isLight ? 'bg-red-500/20' : 'bg-red-400/20'} rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:bg-red-400/30 transition-colors`}>
                          <X className={`w-3 h-3 ${themeValues.isLight ? 'text-red-600' : 'text-red-400'}`} />
                        </div>
                        <span dangerouslySetInnerHTML={{ __html: text }} />
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
        <section className={`py-20 relative overflow-hidden ${themeValues.isLight ? 'bg-white' : 'bg-navy-900'}`}>
          <div className={`absolute inset-0 ${themeValues.isLight ? 'bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50' : 'bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20'}`} />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <h2 className={`text-4xl font-bold text-center ${themeValues.textColor} mb-16`}>
            Academy <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Modules</span> 
              
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {modules.map((module, index) => (
                <Card
                  key={index}
                  className={`group hover:scale-[1.02] transition-all duration-300 ${themeValues.cardBg} hover:border-cyan-400/50 shadow-2xl hover:shadow-cyan-500/20 ${
                    index === modules.length - 1 ? 'lg:col-start-2' : ''
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 justify-start">
                      <Badge className={`mb-2 ${themeValues.isLight ? 'bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-blue-700 border-blue-600/30 hover:from-blue-600/30 hover:to-blue-700/30' : 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-400 border-cyan-400/30 hover:from-cyan-400/30 hover:to-blue-500/30'}`}>
                        {module.unlockIcon && <module.unlockIcon className="w-3 h-3 mr-1" />} Module {index + 1}
                      </Badge>
                      {index === modules.length - 1 && (
                        <Badge className="mb-2 bg-gradient-to-r from-purple-400/20 to-pink-500/20 text-purple-300 border-purple-400/30 hover:from-purple-400/30 hover:to-pink-500/30">
                          Bonus
                        </Badge>
                      )}
                    </div>
                    <CardTitle className={`text-lg ${themeValues.isLight ? 'text-gray-800' : 'text-white'} ${themeValues.isLight ? 'group-hover:text-blue-600' : 'group-hover:text-cyan-400'} transition-colors`}>{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2 px-6 pb-6">
                    <div className="relative">
                                             <p className={`${themeValues.isLight ? 'text-black group-hover:text-black' : 'text-gray-300 group-hover:text-gray-200'} transition-colors line-clamp-2 group-hover:line-clamp-none`}>
                          {module.description}
                        </p>
                      <div className={`absolute bottom-0 right-0 ${themeValues.isLight ? 'bg-gradient-to-l from-gray-50 to-transparent' : 'bg-gradient-to-l from-white/5 to-transparent'} w-8 h-6 group-hover:hidden transition-all duration-300`} />
                    </div>
                    {module.unlock && (
                      <div className="mt-4">
                        <p className={themeValues.isLight ? 'text-blue-700' : 'text-cyan-200'}>
                          <Unlock className={`w-4 h-4 ${themeValues.isLight ? 'text-blue-600' : 'text-cyan-300'} inline mr-2`} />
                          {module.unlock}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            

            <div className="mt-8 text-center">
              <p className={`text-sm ${themeValues.isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                <span className="text-amber-300">Note:</span> Module content and structure are currently being finalized and may be refined before launch.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">20+</div>
                <div className={`${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} mt-2`}>AI Tools Covered</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{modules.length}</div>
                <div className={`${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} mt-2`}>Comprehensive Modules</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">5+</div>
                <div className={`${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} mt-2`}>Hours Saved Weekly</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Lifetime</div>
                <div className={`${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} mt-2`}>Access Included</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Live Q&A</div>
                <div className={`${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} mt-2`}>Weekly</div>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <Button
                onClick={handleWaitlistOpen}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold px-6 py-3 shadow-lg shadow-cyan-500/25 border-0 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 mr-2" /> Be the First to Know
              </Button>
            </div>
          </div>
        </section>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <section className={`py-20 relative ${themeValues.isLight ? 'bg-gray-100' : 'bg-navy-800'}`}>
          <div className={`absolute inset-0 ${themeValues.isLight ? 'bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100' : 'bg-gradient-to-b from-navy-800 via-navy-800 to-navy-800'}`} />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className={`text-4xl font-bold text-center ${themeValues.textColor} mb-16`}>
              The Academy <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Lead</span>
            </h2>
            <Card className={`max-w-3xl mx-auto ${themeValues.cardBg} shadow-2xl`}>
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
                    <h3 className={`text-2xl font-bold ${themeValues.textColor} mb-2`}>Quham Adefila</h3>
                    <p className="text-cyan-400 font-semibold mb-4">AI Educator & Developer</p>
                    <p className={`${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} leading-relaxed`}>
                      <span dangerouslySetInnerHTML={{ __html: '<strong>Meet Quham: the AI expert takes the complex world of AI and enables people to use it to achieve real world results.</strong>' }} />
                    </p>
                    <p className={`${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} leading-relaxed mt-4`}>
                      From <span dangerouslySetInnerHTML={{ __html: '<strong>pioneering research at Google DeepMind</strong>' }} /> (creators of Gemini) to applying AI and automation in finance at <span dangerouslySetInnerHTML={{ __html: '<strong>JP Morgan</strong>' }} />, Quham has worked at the forefront of AI innovation. He's also built AI solutions at a range of startups shaping the future and even founded an AI startup in Social Care, serving the NHS and local authorities. Along the way, he spotted a clear problem: most people were barely scratching the surface of AI's potential.
                    </p>
                    <p className={`${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} leading-relaxed mt-4`}>
                      Armed with a <span dangerouslySetInnerHTML={{ __html: '<strong>Master\'s in AI from Imperial College London</strong>' }} />, <span dangerouslySetInnerHTML={{ __html: '<strong>7+ years of teaching</strong>' }} />, and <span dangerouslySetInnerHTML={{ __html: '<strong>1M+ views</strong>' }} /> on his educational content, Quham has helped everyone from Fortune 500 companies to individual professionals turn complex AI concepts into practical skills that transform the way they work.
                    </p>
                    <p className={`${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'} leading-relaxed mt-4`}>
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
        <section className={`py-20 relative ${themeValues.isLight ? 'bg-white' : 'bg-navy-900'}`}>
          <div className={`absolute inset-0 ${themeValues.isLight ? 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50' : 'bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20'}`} />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className={`text-4xl font-bold text-center ${themeValues.textColor} mb-16`}>
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">FAQ</span> 
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className={`${themeValues.cardBg} rounded-lg overflow-hidden hover:border-indigo-400/50 transition-colors`}>
                  <AccordionTrigger className={`px-6 py-4 text-left hover:bg-white/5 transition-colors ${themeValues.isLight ? 'hover:bg-gray-50' : 'hover:bg-white/5'}`}>
                    <span className={`font-semibold ${themeValues.isLight ? 'text-gray-800' : 'text-white'} group-hover:text-indigo-400 transition-colors`}>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className={`px-6 pb-4 ${themeValues.isLight ? 'bg-gray-50' : 'bg-white/5'}`}>
                    <p className={`${themeValues.isLight ? 'text-gray-600' : 'text-gray-300'}`}>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <section className={`py-16 ${themeValues.isLight ? 'bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100' : 'bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-900'} relative overflow-hidden`}>
          <div className={`absolute inset-0 ${themeValues.isLight ? 'bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10' : 'bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10'}`} />
          <div className={`absolute top-10 left-10 w-20 h-20 ${themeValues.isLight ? 'bg-cyan-400/20' : 'bg-cyan-400/20'} rounded-full blur-xl animate-pulse`} />
          <div className={`absolute bottom-10 right-10 w-32 h-32 ${themeValues.isLight ? 'bg-blue-500/20' : 'bg-blue-500/20'} rounded-full blur-xl animate-pulse delay-1000`} />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className={`text-3xl font-bold ${themeValues.textColor} mb-8`}>
              Don't Wait — <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Gain your AI Advantage Today</span>
            </h2>
            <Button
              onClick={handleWaitlistOpen}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-3 shadow-lg shadow-cyan-500/25 border-0 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 mr-2" /> Unlock My AI Advantage
            </Button>
          </div>
        </section>
      </ScrollFadeIn>

      <footer className={`py-8 ${themeValues.textColor} text-center relative ${themeValues.isLight ? 'bg-gray-50' : 'bg-navy-900'}`}>
        <div className={`absolute inset-0 ${themeValues.isLight ? 'bg-gradient-to-t from-gray-50 via-gray-50 to-transparent' : 'bg-gradient-to-t from-navy-900 via-navy-900 to-transparent'}`} />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">AI Advantage Academy</span>
          </div>
          <p className={`text-sm ${themeValues.isLight ? 'text-gray-500' : 'text-gray-500'}`}>© 2025 AI Advantage Academy. All rights reserved.</p>
        </div>
      </footer>
      
      {isWaitlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleWaitlistClose} />
          <div className="relative z-10 w-full max-w-xl">
            <Card className={`${themeValues.cardBg} shadow-2xl`}>
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className={themeValues.textColor}>Join the Waitlist</CardTitle>
                <Button variant="ghost" className={`${themeValues.isLight ? 'text-gray-600 hover:text-gray-800' : 'text-white/70 hover:text-white'} p-2 h-8 w-8`} onClick={handleWaitlistClose}>
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <FuturisticWaitlistForm theme={theme} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}


