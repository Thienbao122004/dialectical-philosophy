"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Chatbox from "@/components/chatbox"
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Lightbulb,
  Users,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Star,
  Sparkles,
  TrendingUp,
  Brain,
  Layers,
  Activity,
  Infinity,
  Eye,
  Heart,
  Cpu,
  Network,
  ExternalLink,
  Download,
  Share2,
  MessageCircle,
  ThumbsUp,
  Award,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Github,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Play,
  Pause,
  Volume2,
  Settings,
  Filter,
  Search,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Bookmark,
  Copy,
} from "lucide-react"

const useAnimatedCounter = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return { count, setIsVisible }
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [heroCountersStarted, setHeroCountersStarted] = useState(false)
  const [statsCountersStarted, setStatsCountersStarted] = useState(false)
  const [showFloatingMenu, setShowFloatingMenu] = useState(false)
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const conceptRef = useRef<HTMLElement>(null)
  const relationshipRef = useRef<HTMLElement>(null)
  const examplesRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLElement>(null)
  const interactiveRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)

  const heroCounter1 = useAnimatedCounter(1818)
  const heroCounter2 = useAnimatedCounter(150)
  const heroCounter3 = useAnimatedCounter(2)

  const statsCounter1 = useAnimatedCounter(200, 3000)
  const statsCounter2 = useAnimatedCounter(50, 3000)
  const statsCounter3 = useAnimatedCounter(1000, 3000)
  const statsCounter4 = useAnimatedCounter(100, 3000)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  useEffect(() => {
    setIsLoaded(true)
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY
        setScrollY(currentY)
        const doc = document.documentElement
        const total = Math.max(doc.scrollHeight - window.innerHeight, 1)
        setScrollProgress(Math.min((currentY / total) * 100, 100))

        const sections = [
          { ref: heroRef, id: "hero" },
          { ref: conceptRef, id: "concept" },
          { ref: relationshipRef, id: "relationship" },
          { ref: interactiveRef, id: "interactive" },
          { ref: timelineRef, id: "timeline" },
          { ref: examplesRef, id: "examples" },
          { ref: statsRef, id: "stats" },
        ]

        for (const section of sections) {
          if (section.ref.current) {
            const rect = section.ref.current.getBoundingClientRect()
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section.id)
              break
            }
          }
        }

        ticking = false
      })
    }

    let lastMove = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMove > 16) {
        setMousePosition({ x: e.clientX, y: e.clientY })
        lastMove = now
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Start counters when sections appear
  useEffect(() => {
    if (activeSection === "hero" && !heroCountersStarted) {
      setHeroCountersStarted(true)
      heroCounter1.setIsVisible(true)
      heroCounter2.setIsVisible(true)
      heroCounter3.setIsVisible(true)
    }
    if (activeSection === "stats" && !statsCountersStarted) {
      setStatsCountersStarted(true)
      statsCounter1.setIsVisible(true)
      statsCounter2.setIsVisible(true)
      statsCounter3.setIsVisible(true)
      statsCounter4.setIsVisible(true)
    }
  }, [activeSection])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll(".stagger-child")
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("animate-in")
            }, index * 150)
          })
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const generateAdvancedParticles = () => {
    const particles: JSX.Element[] = []
    const isReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768
    const total = isReduced || isMobile ? 0 : 30
    for (let i = 0; i < total; i++) {
      const size = Math.random() * 4 + 1
      const speed = Math.random() * 2 + 1
      const hue = Math.random() * 60 + 200 // Blue to purple range

      particles.push(
        <div
          key={i}
          className="absolute rounded-full animate-pulse particle-physics"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(${hue}, 70%, 60%)`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            boxShadow: `0 0 ${size * 2}px hsl(${hue}, 70%, 60%, 0.5)`,
            transform: `translateZ(${Math.random() * 100}px)`,
          }}
        />,
      )
    }
    return particles
  }

  return (
    <TooltipProvider>
      <div
        className={`min-h-screen bg-background overflow-x-hidden relative transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
      <div className="fixed inset-0 pointer-events-none z-0 perspective-1000">{generateAdvancedParticles()}</div>

      <div
        className="fixed w-8 h-8 pointer-events-none z-50 transition-all duration-500 ease-out mix-blend-difference"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background: `radial-gradient(circle, oklch(var(--primary)) 0%, transparent 70%)`,
          transform: `scale(${scrollY > 100 ? 2 : 1}) rotate(${scrollY * 0.5}deg)`,
        }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border/50 transition-all duration-300">
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl text-primary flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl mr-3 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500 shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">Φ</span>
              </div>
              <span className="group-hover:text-secondary transition-colors duration-300 text-2xl">Biện Chứng</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { href: "#concept", label: "Khái Niệm", id: "concept" },
                { href: "#relationship", label: "Mối Quan Hệ", id: "relationship" },
                { href: "#interactive", label: "Tương Tác", id: "interactive" },
                { href: "#timeline", label: "Tiến Trình", id: "timeline" },
                { href: "#examples", label: "Ví Dụ", id: "examples" },
              ].map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group transition-all duration-300 hover:scale-105 cursor-pointer ${
                    activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-all duration-300 bg-transparent hover:bg-primary/10 hover:border-primary/50 magnetic-hover"
                    onClick={() => scrollToSection('interactive')}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Khám Phá
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Khám phá mô hình tương tác biện chứng</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/quiz">
                    <Button
                      variant="default"
                      size="sm"
                      className="hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent magnetic-hover"
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      Quiz
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Kiểm tra kiến thức với 10 câu hỏi trắc nghiệm</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>

      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000"
      >
        {/* Multiple parallax background layers with 3D transforms */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/15 to-accent/10"
            style={{
              transform: `translateY(${scrollY * 0.5}px) rotateX(${scrollY * 0.02}deg)`,
              transformStyle: "preserve-3d",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-tl from-accent/10 via-transparent to-primary/10"
            style={{
              transform: `translateY(${scrollY * 0.3}px) rotateY(${scrollY * 0.01}deg)`,
              transformStyle: "preserve-3d",
            }}
          />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {[
            {
              size: "w-40 h-40",
              color: "from-primary/30",
              position: "top-20 left-10",
              speed: 0.3,
              delay: "0s",
              rotation: 0,
            },
            {
              size: "w-32 h-32",
              color: "from-secondary/25",
              position: "top-40 right-20",
              speed: 0.4,
              delay: "1s",
              rotation: 45,
            },
            {
              size: "w-48 h-48",
              color: "from-accent/20",
              position: "bottom-40 left-1/4",
              speed: 0.2,
              delay: "2s",
              rotation: 90,
            },
            {
              size: "w-36 h-36",
              color: "from-primary/25",
              position: "top-1/3 right-1/3",
              speed: 0.35,
              delay: "1.5s",
              rotation: 135,
            },
            {
              size: "w-44 h-44",
              color: "from-secondary/20",
              position: "bottom-20 right-10",
              speed: 0.25,
              delay: "0.5s",
              rotation: 180,
            },
            {
              size: "w-28 h-28",
              color: "from-accent/30",
              position: "top-1/2 left-20",
              speed: 0.45,
              delay: "3s",
              rotation: 225,
            },
          ].map((shape, index) => (
            <div
              key={index}
              className={`absolute ${shape.size} bg-gradient-to-br ${shape.color} to-transparent rounded-full animate-pulse floating-shape-3d`}
              style={{
                transform: `translateY(${scrollY * shape.speed}px) rotate(${scrollY * 0.1 + shape.rotation}deg) translateZ(${Math.sin(scrollY * 0.01 + index) * 50}px)`,
                animationDelay: shape.delay,
                transformStyle: "preserve-3d",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 py-2">
          <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-2000 ease-out">
            <h1 className="text-7xl md:text-9xl font-bold mb-12 text-balance leading-tight hero-title vietnamese-text mt-16">
              Mối Quan Hệ{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient inline-block hover:scale-105 transition-transform duration-500">
                Biện Chứng
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-foreground mb-16 text-pretty leading-relaxed max-w-5xl mx-auto hero-subtitle vietnamese-text">
              Khám phá sự tương tác phức tạp và động giữa{" "}
              <span className="text-primary font-semibold bg-primary/15 px-3 py-2 rounded-lg border border-primary/20 hover:scale-105 transition-all duration-300 inline-block">
                cơ sở hạ tầng
              </span>{" "}
              và{" "}
              <span className="text-primary font-semibold bg-primary/15 px-3 py-2 rounded-lg border border-primary/20 hover:scale-105 transition-all duration-300 inline-block">
                kiến trúc thượng tầng
              </span>{" "}
              trong triết học Marxist
            </p>

            <div className="flex flex-col sm:flex-row gap-24 justify-center mb-20">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="text-xl px-12 py-8 hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-3xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent group magnetic-hover"
                  >
                    <BookOpen className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    Khám Phá Ngay
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-hidden w-[95vw] min-w-[900px]" style={{width: '75vw', maxWidth: '95vw'}}>
                  <DialogHeader className="pb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                        <Brain className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl font-bold text-primary">Khám Phá Triết Học Marxist</DialogTitle>
                        <p className="text-muted-foreground">Hành trình hiểu về mối quan hệ biện chứng</p>
                      </div>
                    </div>
                  </DialogHeader>
                  
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-muted p-1 h-auto">
                      <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <Info className="h-4 w-4" />
                        Tổng Quan
                      </TabsTrigger>
                      <TabsTrigger value="concepts" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <Target className="h-4 w-4" />
                        Khái Niệm
                      </TabsTrigger>
                      <TabsTrigger value="examples" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <Award className="h-4 w-4" />
                        Ví Dụ
                      </TabsTrigger>
                      <TabsTrigger value="resources" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <BookOpen className="h-4 w-4" />
                        Tài Liệu
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="mt-6 max-h-[60vh] overflow-y-auto">
                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="p-6 border-primary/20 hover:border-primary/40 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                              <Layers className="h-8 w-8 text-primary" />
                              <h3 className="text-xl font-bold">Cơ Sở Hạ Tầng</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              Nền tảng vật chất của xã hội bao gồm lực lượng sản xuất và quan hệ sản xuất.
                            </p>
                            <div className="space-y-2">
                              {[
                                { icon: Cpu, text: "Công nghệ & máy móc" },
                                { icon: Users, text: "Lực lượng lao động" },
                                { icon: Network, text: "Quan hệ sở hữu" }
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <item.icon className="h-4 w-4 text-primary" />
                                  <span>{item.text}</span>
                                </div>
                              ))}
                            </div>
                          </Card>
                          
                          <Card className="p-6 border-secondary/20 hover:border-secondary/40 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                              <Globe className="h-8 w-8 text-secondary" />
                              <h3 className="text-xl font-bold">Kiến Trúc Thượng Tầng</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              Các thể chế xã hội được xây dựng trên nền tảng cơ sở hạ tầng.
                            </p>
                            <div className="space-y-2">
                              {[
                                { icon: Eye, text: "Hệ thống chính trị" },
                                { icon: Heart, text: "Văn hóa & giáo dục" },
                                { icon: Brain, text: "Ý thức hệ & tôn giáo" }
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <item.icon className="h-4 w-4 text-secondary" />
                                  <span>{item.text}</span>
                                </div>
                              ))}
                            </div>
                          </Card>
                        </div>
                        
                        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Sparkles className="h-6 w-6 text-accent" />
                            <h4 className="font-semibold">Mối Quan Hệ Biện Chứng</h4>
                          </div>
                          <p className="text-muted-foreground">
                            Không phải mối quan hệ một chiều, mà là sự tương tác động và phức tạp. 
                            Cơ sở hạ tầng quyết định kiến trúc thượng tầng, nhưng thượng tầng cũng có thể phản tác động lại.
                          </p>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <Button onClick={() => scrollToSection('concept')} className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/80 hover:to-primary">
                            <ChevronRight className="h-4 w-4 mr-2" />
                            Khám Phá Chi Tiết
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 border-blue-200" onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: 'Mối Quan Hệ Biện Chứng',
                                text: 'Khám phá triết học Marxist về mối quan hệ giữa cơ sở hạ tầng và kiến trúc thượng tầng',
                                url: window.location.href
                              })
                            } else {
                              navigator.clipboard.writeText(window.location.href)
                              alert('✅ Đã sao chép link!')
                            }
                          }}>
                            <Share2 className="h-4 w-4" />
                            Chia Sẻ
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2 hover:bg-green-50 border-green-200" onClick={() => {
                            localStorage.setItem('dialectical_bookmark', JSON.stringify({
                              title: 'Mối Quan Hệ Biện Chứng - Triết Học Marxist',
                              url: window.location.href,
                              timestamp: new Date().toISOString()
                            }))
                            const notification = document.createElement('div')
                            notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
                            notification.innerHTML = '🔖 Đã lưu bookmark thành công!'
                            document.body.appendChild(notification)
                            setTimeout(() => notification.remove(), 3000)
                          }}>
                            <Bookmark className="h-4 w-4" />
                            Lưu
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="concepts" className="space-y-4">
                        <div className="space-y-6">
                          <div className="border-l-4 border-primary pl-6">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                              <Layers className="h-5 w-5 text-primary" />
                              Cơ Sở Hạ Tầng (Base)
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              Tầng móng của xã hội, quyết định bản chất và hướng phát triển của toàn bộ cấu trúc xã hội.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-primary/5 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Lực Lượng Sản Xuất</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  <li>• Phương tiện sản xuất</li>
                                  <li>• Đối tượng lao động</li>
                                  <li>• Sức lao động</li>
                                </ul>
                              </div>
                              <div className="bg-primary/5 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Quan Hệ Sản Xuất</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  <li>• Quan hệ sở hữu</li>
                                  <li>• Quan hệ phân phối</li>
                                  <li>• Quan hệ trao đổi</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-l-4 border-secondary pl-6">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                              <Globe className="h-5 w-5 text-secondary" />
                              Kiến Trúc Thượng Tầng (Superstructure)
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              Các thể chế và ý thức hệ phản ánh và phục vụ cho cơ sở hạ tầng kinh tế.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {[
                                { title: "Chính Trị", items: ["Nhà nước", "Pháp luật", "Quân đội"], icon: Eye },
                                { title: "Xã Hội", items: ["Gia đình", "Giáo dục", "Y tế"], icon: Users },
                                { title: "Ý Thức", items: ["Tôn giáo", "Triết học", "Nghệ thuật"], icon: Brain }
                              ].map((category, idx) => (
                                <div key={idx} className="bg-secondary/5 rounded-lg p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <category.icon className="h-4 w-4 text-secondary" />
                                    <h4 className="font-semibold">{category.title}</h4>
                                  </div>
                                  <ul className="text-sm text-muted-foreground space-y-1">
                                    {category.items.map((item, i) => (
                                      <li key={i}>• {item}</li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="examples" className="space-y-4">
                        <div className="grid gap-6">
                          {[
                            {
                              title: "Cách Mạng Công Nghiệp",
                              period: "1760-1840",
                              description: "Máy hơi nước thay đổi sản xuất → Hình thành giai cấp công nhân → Thay đổi cấu trúc chính trị",
                              impact: "Cao",
                              color: "primary"
                            },
                            {
                              title: "Cách Mạng Thông Tin",
                              period: "1950-Hiện tại",
                              description: "Internet & AI thay đổi cách làm việc → Văn hóa số → Chính phủ điện tử",
                              impact: "Rất Cao",
                              color: "secondary"
                            },
                            {
                              title: "Cách Mạng Xanh",
                              period: "2000-Tương lai",
                              description: "Công nghệ sạch → Ý thức môi trường → Chính sách xanh toàn cầu",
                              impact: "Đang phát triển",
                              color: "accent"
                            }
                          ].map((example, idx) => (
                            <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-xl font-bold mb-1">{example.title}</h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    {example.period}
                                  </div>
                                </div>
                                <Badge variant={example.color === "primary" ? "default" : "secondary"}>
                                  {example.impact}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground leading-relaxed">{example.description}</p>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="resources" className="space-y-4">
                        <div className="grid gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-primary" />
                              Tác Phẩm Kinh Điển
                            </h3>
                            <div className="grid gap-3">
                              {[
                                { title: "Ý Thức Hệ Đức", authors: "Marx & Engels", year: "1845", pages: "692" },
                                { title: "Phê Bình Kinh Tế Chính Trị", authors: "Karl Marx", year: "1859", pages: "312" },
                                { title: "Tư Bản (Tập 1)", authors: "Karl Marx", year: "1867", pages: "1152" }
                              ].map((book, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                  <div>
                                    <h4 className="font-semibold">{book.title}</h4>
                                    <p className="text-sm text-muted-foreground">{book.authors} • {book.year} • {book.pages} trang</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="hover:bg-blue-50" onClick={() => {
                                      const loading = document.createElement('div')
                                      loading.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[100]'
                                      loading.innerHTML = `
                                        <div class="bg-white rounded-lg p-8 text-center">
                                          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                          <p class="text-lg font-semibold">Đang chuẩn bị ${book.title}...</p>
                                          <p class="text-sm text-gray-600 mt-2">Vui lòng đợi trong giây lát</p>
                                        </div>
                                      `
                                      document.body.appendChild(loading)
                                      
                                      setTimeout(() => {
                                        loading.remove()
                                        alert('📥 File PDF đã sẵn sàng tải xuống!')
                                      }, 2000)
                                    }}>
                                      <Download className="h-4 w-4 mr-1" />
                                      PDF
                                    </Button>
                                    <Button size="sm" variant="outline" className="hover:bg-green-50" onClick={() => {
                                      window.open(`https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.authors + ' PDF')}`, '_blank')
                                    }}>
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Globe className="h-5 w-5 text-secondary" />
                              Tài Nguyên Online
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {[
                                { name: "Marxists Internet Archive", desc: "Bộ sưu tập tác phẩm đầy đủ", icon: ExternalLink },
                                { name: "Stanford Encyclopedia", desc: "Bài viết học thuật chính thống", icon: BookOpen },
                                { name: "Coursera Philosophy", desc: "Khóa học trực tuyến", icon: Play },
                                { name: "Reddit r/philosophy", desc: "Cộng đồng thảo luận", icon: MessageCircle }
                              ].map((resource, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-105" onClick={() => {
                                  const popup = document.createElement('div')
                                  popup.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[100]'
                                  popup.innerHTML = `
                                    <div class="bg-white rounded-xl p-6 max-w-md mx-4">
                                      <h3 class="text-xl font-bold mb-4 text-center">${resource.name}</h3>
                                      <p class="text-gray-600 mb-6 text-center">${resource.desc}</p>
                                      <div class="flex gap-3">
                                        <button onclick="window.open('https://${resource.name.toLowerCase().includes('marxists') ? 'marxists.org' : resource.name.toLowerCase().includes('stanford') ? 'plato.stanford.edu' : resource.name.toLowerCase().includes('coursera') ? 'coursera.org' : 'reddit.com/r/philosophy'}', '_blank')" 
                                          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                          🚀 Truy cập ngay
                                        </button>
                                        <button onclick="this.closest('.fixed').remove()" 
                                          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                          Đóng
                                        </button>
                                      </div>
                                    </div>
                                  `
                                  document.body.appendChild(popup)
                                  popup.onclick = (e) => {
                                    if (e.target === popup) popup.remove()
                                  }
                                }}>
                                  <resource.icon className="h-6 w-6 text-accent" />
                                  <div>
                                    <h4 className="font-semibold text-lg">{resource.name}</h4>
                                    <p className="text-sm text-muted-foreground">{resource.desc}</p>
                                  </div>
                                  <ChevronRight className="h-5 w-5 text-gray-400" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </DialogContent>
              </Dialog>
              
                <Tooltip>
                  <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-xl px-12 py-8 bg-background/50 hover:scale-110 transition-all duration-500 hover:bg-gradient-to-r hover:from-accent/20 hover:to-primary/20 group magnetic-hover border-2"
                    onClick={() => scrollToSection('interactive')}
                  >
                    <Lightbulb className="mr-3 h-6 w-6 group-hover:text-accent transition-colors duration-300" />
                    Tương Tác Trực Quan
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Xem mô hình động biện chứng tương tác</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto">
              {[
                { counter: heroCounter1, number: 1818, label: "Năm Sinh Marx", icon: Star, suffix: "", tooltip: "Karl Marx sinh năm 1818 tại Trier, Đức" },
                { counter: heroCounter2, number: 150, label: "Năm Ảnh Hưởng", icon: TrendingUp, suffix: "+", tooltip: "Hơn 150 năm ảnh hưởng đến tư tưởng thế giới" },
                { counter: heroCounter3, number: 2, label: "Tầng Cấu Trúc", icon: Target, suffix: "+", tooltip: "Cơ sở hạ tầng và Kiến trúc thượng tầng" },
              ].map((stat, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      className="text-center group hover:scale-125 transition-all duration-500 cursor-pointer magnetic-hover"
                      style={{ animationDelay: `${index * 0.3}s` }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-500">
                        {stat.counter.count}
                        {stat.suffix}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center justify-center group-hover:text-foreground transition-colors duration-300">
                        <stat.icon className="mr-2 h-5 w-5" />
                        {stat.label}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stat.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center group cursor-pointer hover:scale-110 transition-all duration-300">
            <ArrowDown className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            <div className="w-px h-20 bg-gradient-to-b from-muted-foreground to-transparent mt-2" />
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" ref={conceptRef} className="relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full text-primary text-sm font-medium mb-8 border border-primary/20">
              <Target className="mr-2 h-5 w-5" />
              Khái Niệm Cốt Lõi
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Hai Tầng Cấu Trúc Xã Hội</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Hiểu về mối quan hệ phức tạp và động giữa nền tảng kinh tế và các thể chế xã hội
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Infrastructure Card */}
            <div className="scroll-animate opacity-0 translate-x-8 transition-all duration-1000 ease-out">
              <Card className="p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-0 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🏗️</span>
                    </div>
                    <h3 className="text-3xl font-bold text-primary">Cơ Sở Hạ Tầng</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                    Bao gồm lực lượng sản xuất (công nghệ, lao động, tài nguyên) và quan hệ sản xuất (quan hệ sở hữu,
                    phân phối). Đây là nền tảng vật chất của xã hội.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Công nghệ và phương tiện sản xuất",
                      "Quan hệ lao động và sở hữu",
                      "Hệ thống kinh tế và thương mại",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center text-muted-foreground">
                        <div
                          className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Superstructure Card */}
            <div
              className="scroll-animate opacity-0 translate-x-8 transition-all duration-1000 ease-out"
              style={{ transitionDelay: "0.2s" }}
            >
              <Card className="p-8 border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-500 hover:shadow-2xl hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-0 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🏛️</span>
                    </div>
                    <h3 className="text-3xl font-bold text-secondary">Kiến Trúc Thượng Tầng</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                    Các thể chế chính trị, pháp lý, văn hóa, tôn giáo và ý thức hệ được xây dựng trên nền tảng cơ sở hạ
                    tầng kinh tế.
                  </p>
                  <div className="space-y-3">
                    {["Hệ thống chính trị và pháp luật", "Văn hóa và giáo dục", "Tôn giáo và ý thức hệ"].map(
                      (item, index) => (
                        <div key={index} className="flex items-center text-muted-foreground">
                          <div
                            className="w-2 h-2 bg-secondary rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          />
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Relationship Section */}
      <section
        id="relationship"
        ref={relationshipRef}
        className="bg-gradient-to-br from-muted/30 to-muted/10 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full text-primary text-sm font-medium mb-8 border border-primary/20">
              <Globe className="mr-2 h-5 w-5" />
              Mối Quan Hệ Biện Chứng
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Tương Tác Động Và Phức Tạp</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Không phải là mối quan hệ một chiều, mà là sự tương tác động và phức tạp qua thời gian
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 p-12">
            {[
              {
                icon: "⬇️",
                title: "Quyết Định",
                description:
                  "Cơ sở hạ tầng quyết định bản chất của kiến trúc thượng tầng. Thay đổi kinh tế dẫn đến sự hình thành giai cấp công nhân, thay đổi cấu trúc xã hội và chính trị.",
                color: "primary",
                delay: "0s",
              },
              {
                icon: "⬆️",
                title: "Phản Tác Động",
                description:
                  "Kiến trúc thượng tầng có thể phản tác động lại cơ sở hạ tầng, thúc đẩy hoặc cản trở sự phát triển kinh tế.",
                color: "secondary",
                delay: "0.2s",
              },
              {
                icon: "🔄",
                title: "Tương Tác",
                description:
                  "Mối quan hệ động, liên tục biến đổi theo thời gian và hoàn cảnh lịch sử cụ thể của từng xã hội.",
                color: "accent",
                delay: "0.4s",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out"
                style={{ transitionDelay: item.delay }}
              >
                <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      item.color === "primary" ? "from-primary/5" : item.color === "secondary" ? "from-secondary/5" : "from-accent/5"
                    } to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <CardContent className="p-0 relative z-10">
                    <div
                      className={`w-20 h-20 ${item.color === "primary" ? "bg-primary/10" : item.color === "secondary" ? "bg-secondary/10" : "bg-accent/10"} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-4xl">{item.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="interactive"
        ref={interactiveRef}
        className="py-32 px-6 bg-gradient-to-br from-muted/20 to-background relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full text-primary text-sm font-medium mb-8 border border-primary/20">
              <Brain className="mr-2 h-5 w-5" />
              Tương Tác Trực Quan
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance">Mô hình Động</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
              Khám phá mối quan hệ biện chứng thông qua các biểu đồ tương tác
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-1500 ease-out">
              <div className="relative bg-gradient-to-br from-card/50 to-card/30 rounded-3xl p-12 border border-border/50 hover:border-primary/30 transition-all duration-500 group">
                {/* Infrastructure Layer */}
                <div className="relative mb-16">
                  <div className="flex items-center justify-center mb-8">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-full max-w-2xl bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-8 hover:scale-105 transition-all duration-500 group/infra cursor-pointer magnetic-hover">
                          <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover/infra:scale-110 transition-transform duration-300">
                              <Layers className="h-8 w-8 text-primary-foreground" />
                            </div>
                          </div>
                          <h3 className="text-3xl font-bold text-center text-primary mb-4">Cơ Sở Hạ Tầng</h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                              { icon: Cpu, label: "Công Nghệ", tooltip: "Máy móc, công nghệ sản xuất" },
                              { icon: Users, label: "Lao Động", tooltip: "Lực lượng lao động, tay nghề" },
                              { icon: Network, label: "Quan Hệ", tooltip: "Quan hệ sở hữu, phân phối" },
                            ].map((item, index) => (
                              <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                  <div className="flex flex-col items-center p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-300 cursor-pointer">
                                    <item.icon className="h-6 w-6 text-primary mb-2" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{item.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Nền tảng vật chất của xã hội - bao gồm lực lượng sản xuất và quan hệ sản xuất</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Animated arrows */}
                  <div className="flex justify-center space-x-8">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div
                        key={i}
                        className="w-1 h-16 bg-gradient-to-t from-primary to-secondary rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.5}s` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Superstructure Layer */}
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-full max-w-2xl bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-2xl p-8 hover:scale-105 transition-all duration-500 group/super cursor-pointer magnetic-hover">
                          <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center shadow-lg group-hover/super:scale-110 transition-transform duration-300">
                              <Globe className="h-8 w-8 text-secondary-foreground" />
                            </div>
                          </div>
                          <h3 className="text-3xl font-bold text-center text-secondary-foreground mb-4">Kiến Trúc Thượng Tầng</h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                              { icon: Eye, label: "Chính Trị", tooltip: "Hệ thống chính trị, pháp luật" },
                              { icon: Heart, label: "Văn Hóa", tooltip: "Văn hóa, giáo dục, nghệ thuật" },
                              { icon: Brain, label: "Ý Thức", tooltip: "Ý thức hệ, tôn giáo, triết học" },
                            ].map((item, index) => (
                              <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                  <div className="flex flex-col items-center p-3 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-all duration-300 cursor-pointer">
                                    <item.icon className="h-6 w-6 text-secondary-foreground mb-2" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{item.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Các thể chế xã hội được xây dựng trên nền tảng cơ sở hạ tầng</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Feedback arrows */}
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                  <div className="flex flex-col space-y-4">
                    {Array.from({ length: 2 }, (_, i) => (
                      <div
                        key={i}
                        className="w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 1}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="timeline"
        ref={timelineRef}
        className="bg-gradient-to-br from-accent/5 to-primary/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full text-primary text-sm font-medium mb-8 border border-primary/20">
              <TrendingUp className="mr-2 h-5 w-5" />
              Tiến Trình Lịch Sử
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Sự Phát Triển Tư Tưởng</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Từ những ý tưởng ban đầu đến ảnh hưởng toàn cầu
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full" />

            {[
              {
                year: "1818-1883",
                title: "Karl Marx",
                description: "Phát triển lý thuyết về mối quan hệ giữa cơ sở hạ tầng và kiến trúc thượng tầng",
                side: "left",
                color: "primary",
                delay: "0s",
              },
              {
                year: "1845-1846",
                title: "Ý Thức Hệ Đức",
                description: "Lần đầu tiên trình bày chi tiết về khái niệm cơ sở hạ tầng và kiến trúc thượng tầng",
                side: "right",
                color: "secondary",
                delay: "0.2s",
              },
              {
                year: "1859",
                title: "Phê Bình Kinh Tế Chính Trị",
                description: "Hoàn thiện lý thuyết về mối quan hệ biện chứng giữa hai tầng cấu trúc xã hội",
                side: "left",
                color: "accent",
                delay: "0.4s",
              },
              {
                year: "Hiện Tại",
                title: "Ứng Dụng Đương Đại",
                description: "Áp dụng lý thuyết để hiểu xã hội hiện đại và các thay đổi công nghệ",
                side: "right",
                color: "primary",
                delay: "0.6s",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-16 scroll-animate opacity-0 transition-all duration-1000 ease-out ${
                  item.side === "left" ? "justify-start translate-x-8" : "justify-end -translate-x-8"
                }`}
                style={{ transitionDelay: item.delay }}
              >
                <div className={`w-1/2 ${item.side === "left" ? "pr-12" : "pl-12"}`}>
                  <Card className="p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        item.color === "primary" ? "from-primary/5" : item.color === "secondary" ? "from-secondary/5" : "from-accent/5"
                      } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <CardContent className="p-0 relative z-10">
                      <div className={`${item.color === "primary" ? "text-primary" : item.color === "secondary" ? "text-secondary" : "text-accent"} font-bold text-lg mb-2`}>{item.year}</div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 ${item.color === "primary" ? "bg-primary" : item.color === "secondary" ? "bg-secondary" : "bg-accent"} rounded-full border-4 border-background shadow-lg hover:scale-150 transition-transform duration-300 z-10`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" ref={examplesRef} className="">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 border border-primary/20">
              <Users className="mr-2 h-4 w-4" />
              Ví Dụ Thực Tiễn
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Minh Chứng Lịch Sử</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Những ví dụ cụ thể cho thấy mối quan hệ biện chứng này trong thực tế
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: "Cách Mạng Công Nghiệp",
                description:
                  "Sự phát triển của máy móc và công nghệ sản xuất (cơ sở hạ tầng) đã dẫn đến sự hình thành giai cấp công nhân, thay đổi cấu trúc xã hội và chính trị.",
                period: "Thế kỷ 18-19",
                gradient: "from-primary to-primary/60",
                delay: "0s",
              },
              {
                title: "Cách Mạng Số",
                description:
                  "Internet và công nghệ thông tin đã thay đổi cách thức sản xuất, đồng thời tạo ra những hình thức văn hóa và tổ chức xã hội mới.",
                period: "Thế kỷ 20-21",
                gradient: "from-secondary to-secondary/60",
                delay: "0.3s",
              },
            ].map((example, index) => (
              <div
                key={index}
                className="scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out"
                style={{ transitionDelay: example.delay }}
              >
                <Card className="p-10 hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <CardContent className="p-0 relative z-10">
                    <h3 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                      {example.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{example.description}</p>
                    <div className="flex items-center text-primary font-semibold">
                      <Users className="mr-3 h-5 w-5" />
                      {example.period}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stats"
        ref={statsRef}
        className="py-32 px-6 bg-gradient-to-br from-accent/5 to-primary/5 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full text-primary text-sm font-medium mb-8 border border-primary/20">
              <Activity className="mr-2 h-5 w-5" />
              Tác Động Toàn Cầu
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance">Ảnh Hưởng Lịch Sử</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                counter: statsCounter1,
                number: 200,
                label: "Năm Phát Triển",
                icon: Star,
                color: "primary",
                suffix: "+",
                tooltip: "Từ 1818 đến nay, tư tưởng Marx đã phát triển hơn 200 năm"
              },
              {
                counter: statsCounter2,
                number: 50,
                label: "Quốc Gia Áp Dụng",
                icon: Globe,
                color: "secondary",
                suffix: "+",
                tooltip: "Hơn 50 quốc gia đã và đang áp dụng các nguyên lý Marxist"
              },
              {
                counter: statsCounter3,
                number: 1000,
                label: "Nghiên Cứu",
                icon: BookOpen,
                color: "accent",
                suffix: "+",
                tooltip: "Hàng nghìn công trình nghiên cứu về triết học Marx"
              },
              {
                counter: statsCounter4,
                number: 100,
                label: "Tác Động (%)",
                icon: Infinity,
                color: "primary",
                suffix: "",
                tooltip: "Tác động toàn diện đến triết học, chính trị và xã hội học"
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out stagger-child"
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 hover:scale-110 group relative overflow-hidden h-full magnetic-hover cursor-pointer">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          stat.color === "primary" ? "from-primary/5" : stat.color === "secondary" ? "from-secondary/5" : "from-accent/5"
                        } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />
                      <CardContent className="p-0 relative z-10">
                        <div
                          className={`w-20 h-20 bg-${stat.color}/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <stat.icon className={`h-10 w-10 ${stat.color === "primary" ? "text-primary" : stat.color === "secondary" ? "text-secondary" : "text-accent"}`} />
                        </div>
                        <div
                          className={`text-4xl font-bold ${stat.color === "primary" ? "text-primary" : stat.color === "secondary" ? "text-secondary" : "text-accent"} mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          {stat.counter.count}
                          {stat.suffix}
                        </div>
                        <p className="text-muted-foreground font-medium">{stat.label}</p>

                        {/* Progress bar */}
                        <div className="mt-4 w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${
                              stat.color === "primary"
                                ? "from-primary to-primary/60"
                                : stat.color === "secondary"
                                ? "from-secondary to-secondary/60"
                                : "from-accent to-accent/60"
                            } rounded-full transition-all duration-2000 ease-out`}
                            style={{ width: `${(stat.counter.count / stat.number) * 100}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stat.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-muted/50 to-background border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="mb-12">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full text-primary text-sm font-medium mb-8 border border-primary/20">
                <Sparkles className="mr-2 h-4 w-4" />
                Tương Lai Triết Học
                <Sparkles className="ml-2 h-4 w-4" />
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent vietnamese-text">
              Khám Phá Sâu Hơn
            </h3>
            <p className="text-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed text-lg vietnamese-text">
              Triết học Marxist về mối quan hệ biện chứng giữa cơ sở hạ tầng và kiến trúc thượng tầng vẫn có ý nghĩa
              quan trọng trong việc hiểu xã hội hiện đại và định hướng tương lai.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="text-lg px-12 py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent group"
                  >
                    <BookOpen className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    Tìm Hiểu Thêm
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] w-[90vw] min-w-[800px]" style={{width: '90vw', maxWidth: '90vw'}}>
                  <DialogHeader className="pb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                        <BookOpen className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl font-bold text-primary">Tài Liệu Tham Khảo</DialogTitle>
                        <p className="text-muted-foreground">Kho tàng kiến thức triết học Marxist</p>
                      </div>
                    </div>
                  </DialogHeader>
                  
                  <Tabs defaultValue="books" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-muted p-1 h-auto">
                      <TabsTrigger value="books" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <BookOpen className="h-4 w-4" />
                        Sách Kinh Điển
                      </TabsTrigger>
                      <TabsTrigger value="courses" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <Play className="h-4 w-4" />
                        Khóa Học
                      </TabsTrigger>
                      <TabsTrigger value="online" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <Globe className="h-4 w-4" />
                        Tài Nguyên Online
                      </TabsTrigger>
                      <TabsTrigger value="tools" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <Settings className="h-4 w-4" />
                        Công Cụ
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="mt-6 max-h-[60vh] overflow-y-auto">
                      <TabsContent value="books" className="space-y-6">
                        <div className="grid gap-4">
                          {[
                            {
                              title: "Ý Thức Hệ Đức",
                              authors: "Karl Marx & Friedrich Engels",
                              year: "1845-1846",
                              pages: "692",
                              description: "Tác phẩm đầu tiên trình bày hoàn chỉnh về quan điểm duy vật lịch sử",
                              level: "Trung cấp",
                              rating: 4.8,
                              downloads: "250K"
                            },
                            {
                              title: "Phê Bình Kinh Tế Chính Trị",
                              authors: "Karl Marx",
                              year: "1859",
                              pages: "312",
                              description: "Lần đầu tiên trình bày chi tiết về mối quan hệ cơ sở hạ tầng - thượng tầng",
                              level: "Nâng cao",
                              rating: 4.9,
                              downloads: "180K"
                            },
                            {
                              title: "Tư Bản (Tập 1)",
                              authors: "Karl Marx",
                              year: "1867",
                              pages: "1152",
                              description: "Kiệt tác phân tích về chế độ tư bản chủ nghĩa và quy luật vận động của nó",
                              level: "Chuyên gia",
                              rating: 4.9,
                              downloads: "320K"
                            }
                          ].map((book, idx) => (
                            <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-primary/30 hover:border-primary">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold">{book.title}</h3>
                                    <Badge variant={book.level === "Chuyên gia" ? "destructive" : book.level === "Nâng cao" ? "default" : "secondary"}>
                                      {book.level}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{book.authors} • {book.year} • {book.pages} trang</p>
                                  <p className="text-muted-foreground mb-4">{book.description}</p>
                                  
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      {book.rating}/5.0
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Download className="h-4 w-4" />
                                      {book.downloads} lượt tải
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col gap-2 ml-4">
                                  <Button 
                                    size="sm" 
                                    disabled={downloadingPdf === book.title}
                                    onClick={async () => {
                                      setDownloadingPdf(book.title)
                                      try {
                                        await new Promise(resolve => setTimeout(resolve, 2000))
                                        
                                        // Create a dummy PDF download
                                        const pdfContent = `Tài liệu: ${book.title}\nTác giả: ${book.authors}\nNăm xuất bản: ${book.year}\n\nĐây chỉ là bản demo thui hehe!`
                                        const blob = new Blob([pdfContent], { type: 'text/plain' })
                                        const url = URL.createObjectURL(blob)
                                        const a = document.createElement('a')
                                        a.href = url
                                        a.download = `${book.title.replace(/\s+/g, '_')}.txt`
                                        document.body.appendChild(a)
                                        a.click()
                                        document.body.removeChild(a)
                                        URL.revokeObjectURL(url)
                                        
                                        alert('✅ Tải xuống thành công!')
                                      } catch (error) {
                                        alert('❌ Lỗi khi tải file. Vui lòng thử lại.')
                                      } finally {
                                        setDownloadingPdf(null)
                                      }
                                    }}
                                  >
                                    {downloadingPdf === book.title ? (
                                      <>
                                        <div className="w-4 h-4 mr-1 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Đang tải...
                                      </>
                                    ) : (
                                      <>
                                        <Download className="h-4 w-4 mr-1" />
                                        Tải PDF
                                      </>
                                    )}
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.authors)}`, '_blank')}>
                                    <Search className="h-4 w-4 mr-1" />
                                    Tìm kiếm
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={async () => {
                                    try {
                                      await navigator.clipboard.writeText(`${book.title} - ${book.authors} (${book.year})`)
                                      alert('✅ Đã sao chép thông tin sách!')
                                    } catch (error) {
                                      alert('❌ Không thể sao chép. Vui lòng thử lại.')
                                    }
                                  }}>
                                    <Copy className="h-4 w-4 mr-1" />
                                    Sao chép
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="courses" className="space-y-6">
                        <div className="grid gap-4">
                          {[
                            {
                              title: "Triết Học Marxist Cơ Bản",
                              platform: "Coursera",
                              instructor: "Prof. David Harvey",
                              duration: "8 tuần",
                              level: "Người mới",
                              students: "45.2K",
                              rating: 4.7,
                              price: "Miễn phí",
                              language: "Tiếng Anh (Phụ đề Việt)"
                            },
                            {
                              title: "Lịch Sử Tư Tưởng Xã Hội",
                              platform: "edX",
                              instructor: "TS. Nguyễn Văn A",
                              duration: "12 tuần",
                              level: "Trung cấp",
                              students: "28.5K",
                              rating: 4.6,
                              price: "$49",
                              language: "Tiếng Việt"
                            },
                            {
                              title: "Kinh Tế Chính Trị Học Marx",
                              platform: "Udemy",
                              instructor: "Prof. Richard Wolff",
                              duration: "15 giờ",
                              level: "Nâng cao",
                              students: "12.8K",
                              rating: 4.8,
                              price: "$79",
                              language: "Tiếng Anh"
                            }
                          ].map((course, idx) => (
                            <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold">{course.title}</h3>
                                    <Badge variant="outline">{course.platform}</Badge>
                                    <Badge variant={course.price === "Miễn phí" ? "secondary" : "default"}>
                                      {course.price}
                                    </Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-2">
                                      <Users className="h-4 w-4" />
                                      {course.instructor}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4" />
                                      {course.duration}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Target className="h-4 w-4" />
                                      {course.level}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Globe className="h-4 w-4" />
                                      {course.language}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      {course.rating}/5.0
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="h-4 w-4" />
                                      {course.students} học viên
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col gap-2 ml-4">
                                  <Button size="sm" onClick={() => window.open(`https://${course.platform.toLowerCase()}.com`, '_blank')}>
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Đăng ký
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => alert('Đã thêm vào danh sách yêu thích!')}>
                                    <Heart className="h-4 w-4 mr-1" />
                                    Yêu thích
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="online" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            {
                              name: "Marxists Internet Archive",
                              desc: "Bộ sưu tập tác phẩm Marx-Engels đầy đủ nhất",
                              url: "https://marxists.org",
                              icon: ExternalLink,
                              type: "Thư viện",
                              rating: 4.9,
                              users: "2.5M"
                            },
                            {
                              name: "Stanford Encyclopedia",
                              desc: "Bài viết học thuật chính thống về triết học Marx",
                              url: "https://plato.stanford.edu",
                              icon: BookOpen,
                              type: "Bách khoa",
                              rating: 4.8,
                              users: "1.8M"
                            },
                            {
                              name: "Reddit r/philosophy",
                              desc: "Cộng đồng thảo luận triết học lớn nhất",
                              url: "https://reddit.com/r/philosophy",
                              icon: MessageCircle,
                              type: "Cộng đồng",
                              rating: 4.3,
                              users: "17.8M"
                            },
                            {
                              name: "Philosophy Compass",
                              desc: "Tạp chí triết học trực tuyến uy tín",
                              url: "https://philosophycompass.com",
                              icon: Target,
                              type: "Tạp chí",
                              rating: 4.7,
                              users: "850K"
                            },
                            {
                              name: "Marx & Philosophy Review",
                              desc: "Tạp chí chuyên về triết học Marx hiện đại",
                              url: "https://marxandphilosophy.org.uk",
                              icon: Brain,
                              type: "Tạp chí",
                              rating: 4.6,
                              users: "320K"
                            },
                            {
                              name: "Critical Theory Podcast",
                              desc: "Podcast về lý thuyết phê bình và Marx",
                              url: "https://criticaltheory.podcast",
                              icon: Volume2,
                              type: "Podcast",
                              rating: 4.5,
                              users: "180K"
                            }
                          ].map((resource, idx) => (
                            <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => window.open(resource.url, '_blank')}>
                              <div className="flex items-start gap-4">
                                <div className="p-3 bg-accent/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                  <resource.icon className="h-6 w-6 text-accent" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{resource.name}</h3>
                                    <Badge variant="outline">{resource.type}</Badge>
                                  </div>
                                  <p className="text-muted-foreground mb-3 text-sm">{resource.desc}</p>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      {resource.rating}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="h-3 w-3" />
                                      {resource.users}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <ExternalLink className="h-3 w-3" />
                                      Truy cập
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tools" className="space-y-6">
                        <div className="grid gap-6">
                          <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                              <Settings className="h-5 w-5 text-primary" />
                              Công Cụ Nghiên Cứu
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {[
                                {
                                  name: "Citation Generator",
                                  desc: "Tạo trích dẫn tự động cho tác phẩm Marx",
                                  action: () => alert('Đang khởi động Citation Generator...'),
                                  icon: Copy
                                },
                                {
                                  name: "PDF Merger",
                                  desc: "Gộp nhiều tài liệu PDF thành một",
                                  action: () => alert('Đang mở PDF Merger...'),
                                  icon: Layers
                                },
                                {
                                  name: "Text Translator",
                                  desc: "Dịch tác phẩm Marx từ tiếng Đức",
                                  action: () => window.open('https://translate.google.com', '_blank'),
                                  icon: Globe
                                },
                                {
                                  name: "Note Organizer",
                                  desc: "Sắp xếp ghi chú nghiên cứu của bạn",
                                  action: () => alert('Đang khởi động Note Organizer...'),
                                  icon: BookOpen
                                }
                              ].map((tool, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  className="h-auto p-4 justify-start text-left hover:bg-primary/5"
                                  onClick={tool.action}
                                >
                                  <div className="flex items-start gap-3">
                                    <tool.icon className="h-5 w-5 text-primary mt-1" />
                                    <div>
                                      <h4 className="font-semibold">{tool.name}</h4>
                                      <p className="text-sm text-muted-foreground">{tool.desc}</p>
                                    </div>
                                  </div>
                                </Button>
                              ))}
                            </div>
                          </Card>
                          
                          <Card className="p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                              <Download className="h-5 w-5 text-secondary" />
                              Tải Xuống Nhanh
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {[
                                "Bộ sưu tập Marx-Engels (ZIP)",
                                "Bảng thuật ngữ triết học",
                                "Timeline lịch sử Marx",
                                "Sơ đồ tư duy biện chứng"
                              ].map((item, idx) => (
                                <Button
                                  key={idx}
                                  size="sm"
                                  variant="outline"
                                  onClick={() => alert(`Đang tải ${item}...`)}
                                  className="hover:bg-secondary/10"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  {item}
                                </Button>
                              ))}
                            </div>
                          </Card>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-12 py-6 bg-background/50 hover:scale-105 transition-all duration-300 hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 group"
                  >
                    <Users className="mr-2 h-5 w-5 group-hover:text-secondary transition-colors duration-300" />
                    Tham Gia Thảo Luận
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-hidden w-[95vw] min-w-[900px]" style={{width: '95vw', maxWidth: '95vw'}}>
                  <DialogHeader className="pb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg">
                        <Users className="h-6 w-6 text-secondary-foreground" />
                      </div>
                      <div>
                        <DialogTitle className="text-2xl font-bold text-secondary">Cộng Đồng Thảo Luận</DialogTitle>
                        <p className="text-muted-foreground">Kết nối với những người yêu triết học</p>
                      </div>
                    </div>
                  </DialogHeader>
                  
                  <Tabs defaultValue="platforms" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-muted p-1 h-auto">
                      <TabsTrigger value="platforms" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <MessageCircle className="h-4 w-4" />
                        Nền Tảng
                      </TabsTrigger>
                      <TabsTrigger value="topics" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <Zap className="h-4 w-4" />
                        Chủ Đề Hot
                      </TabsTrigger>
                      <TabsTrigger value="events" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <Calendar className="h-4 w-4" />
                        Sự Kiện
                      </TabsTrigger>
                      <TabsTrigger value="connect" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm font-medium py-3">
                        <Network className="h-4 w-4" />
                        Kết Nối
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="mt-6 max-h-[60vh] overflow-y-auto">
                      <TabsContent value="platforms" className="space-y-6">
                        <div className="grid gap-4">
                          {[
                            {
                              name: "Facebook - Triết Học Việt Nam",
                              desc: "Nhóm thảo luận triết học lớn nhất VN",
                              members: "45.2K",
                              activity: "Rất cao",
                              icon: Facebook,
                              color: "blue",
                              badge: "Phổ biến"
                            },
                            {
                              name: "Reddit - r/philosophy",
                              desc: "Cộng đồng triết học quốc tế",
                              members: "17.8M",
                              activity: "Cao",
                              icon: MessageCircle,
                              color: "orange",
                              badge: "Toàn cầu"
                            },
                            {
                              name: "Discord - Philosophy Hub",
                              desc: "Thảo luận realtime với học giả",
                              members: "125K",
                              activity: "Trung bình",
                              icon: MessageCircle,
                              color: "purple",
                              badge: "Tương tác"
                            },
                            {
                              name: "LinkedIn - Marxist Studies",
                              desc: "Mạng lưới chuyên gia và nhà nghiên cứu",
                              members: "28.5K",
                              activity: "Cao",
                              icon: Linkedin,
                              color: "blue",
                              badge: "Chuyên nghiệp"
                            }
                          ].map((platform, idx) => (
                            <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4 flex-1">
                                  <div className={`p-3 bg-${platform.color}-100 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <platform.icon className={`h-6 w-6 text-${platform.color}-600`} />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="font-bold text-lg">{platform.name}</h3>
                                      <Badge variant="secondary">{platform.badge}</Badge>
                                    </div>
                                    <p className="text-muted-foreground mb-3">{platform.desc}</p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {platform.members} thành viên
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Activity className="h-4 w-4" />
                                        Hoạt động: {platform.activity}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <Button size="sm" variant="outline">
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Truy cập
                                  </Button>
                                  <Button size="sm">
                                    Tham gia
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="topics" className="space-y-6">
                        <div className="grid gap-4">
                          {[
                            {
                              title: "Marxism trong Thời Đại AI",
                              description: "Thảo luận về tác động của trí tuệ nhân tạo lên lý thuyết Marx",
                              participants: 1247,
                              replies: 856,
                              trending: true,
                              tags: ["AI", "Công nghệ", "Tương lai"]
                            },
                            {
                              title: "Platform Economy vs Cơ sở Hạ tầng",
                              description: "Uber, Facebook có phải là cơ sở hạ tầng mới?",
                              participants: 892,
                              replies: 423,
                              trending: true,
                              tags: ["Kinh tế", "Công nghệ", "Platform"]
                            },
                            {
                              title: "Marx và Biến Đổi Khí Hậu",
                              description: "Áp dụng lý thuyết Marx vào khủng hoảng môi trường",
                              participants: 654,
                              replies: 378,
                              trending: false,
                              tags: ["Môi trường", "Khí hậu", "Xã hội"]
                            },
                            {
                              title: "Giai Cấp trong Xã Hội Số",
                              description: "Sự phân tầng xã hội mới trong kỷ nguyên digital",
                              participants: 1089,
                              replies: 667,
                              trending: true,
                              tags: ["Giai cấp", "Digital", "Xã hội"]
                            }
                          ].map((topic, idx) => (
                            <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-lg">{topic.title}</h3>
                                    {topic.trending && (
                                      <Badge className="bg-red-100 text-red-700">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        Hot
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-muted-foreground mb-3">{topic.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <div className="flex items-center gap-1">
                                      <Users className="h-4 w-4" />
                                      {topic.participants} người tham gia
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MessageCircle className="h-4 w-4" />
                                      {topic.replies} phản hồi
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {topic.tags.map((tag, tagIdx) => (
                                      <Badge key={tagIdx} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <Button size="sm" className="ml-4">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="events" className="space-y-6">
                        <div className="grid gap-4">
                          {[
                            {
                              title: "Webinar: Marx trong Thế Kỷ 21",
                              date: "15/10/2024",
                              time: "19:00 - 21:00",
                              host: "TS. Nguyễn Văn A",
                              attendees: 245,
                              type: "Online",
                              status: "Sắp diễn ra"
                            },
                            {
                              title: "Hội thảo: Triết học Phương Đông vs Phương Tây",
                              date: "22/10/2024",
                              time: "14:00 - 17:00",
                              host: "Viện Triết học",
                              attendees: 120,
                              type: "Offline - Hà Nội",
                              status: "Đang đăng ký"
                            },
                            {
                              title: "Cuộc thi Luận văn Marx Studies",
                              date: "01/11/2024",
                              time: "Deadline nộp bài",
                              host: "Đại học Triết học",
                              attendees: 89,
                              type: "Competition",
                              status: "Mở đăng ký"
                            }
                          ].map((event, idx) => (
                            <Card key={idx} className="p-6 hover:shadow-lg transition-all duration-300">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-lg">{event.title}</h3>
                                    <Badge variant={event.status === "Sắp diễn ra" ? "default" : "secondary"}>
                                      {event.status}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4" />
                                      {event.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4" />
                                      {event.time}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Users className="h-4 w-4" />
                                      {event.host}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4" />
                                      {event.type}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    {event.attendees} người tham gia
                                  </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <Button size="sm" variant="outline">
                                    <Bookmark className="h-4 w-4 mr-1" />
                                    Lưu
                                  </Button>
                                  <Button size="sm">
                                    Đăng ký
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="connect" className="space-y-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold mb-2">Kết Nối Ngay Hôm Nay!</h3>
                          <p className="text-muted-foreground">Chọn cách thức kết nối phù hợp với bạn</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                            <div className="mb-4">
                              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Mail className="h-8 w-8 text-primary" />
                              </div>
                              <h4 className="font-bold mb-2">Đăng Ký Newsletter</h4>
                              <p className="text-sm text-muted-foreground mb-4">
                                Nhận tin tức mới nhất về triết học và các cuộc thảo luận hot
                              </p>
                            </div>
                            <Button className="w-full">
                              <Mail className="h-4 w-4 mr-2" />
                              Đăng Ký Ngay
                            </Button>
                          </Card>
                          
                          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                            <div className="mb-4">
                              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <MessageCircle className="h-8 w-8 text-secondary" />
                              </div>
                              <h4 className="font-bold mb-2">Chat Trực Tiếp</h4>
                              <p className="text-sm text-muted-foreground mb-4">
                                Tham gia phòng chat để thảo luận realtime với cộng đồng
                              </p>
                            </div>
                            <Button variant="secondary" className="w-full">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Vào Chat
                            </Button>
                          </Card>
                        </div>
                        
                        <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Award className="h-6 w-6 text-accent" />
                            <h4 className="font-bold">Mẹo Tham Gia Hiệu Quả</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Đọc quy tắc nhóm trước khi tham gia</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Bắt đầu với câu hỏi đơn giản</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Tôn trọng ý kiến khác biệt</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Chia sẻ nguồn tài liệu đáng tin cậy</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Tham gia thường xuyên để xây dựng mối quan hệ</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Đặt câu hỏi thông minh và cụ thể</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <Button className="flex-1">
                            <Users className="h-4 w-4 mr-2" />
                            Tham Gia Ngay
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2">
                            <Share2 className="h-4 w-4" />
                            Mời Bạn Bè
                          </Button>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>

            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "150+", label: "Năm Ảnh Hưởng", icon: Star },
                { number: "50+", label: "Quốc Gia Áp Dụng", icon: Globe },
                { number: "1000+", label: "Nghiên Cứu", icon: BookOpen },
                { number: "∞", label: "Tác Động", icon: Sparkles },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group hover:scale-110 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center group-hover:text-foreground transition-colors duration-300">
                    <stat.icon className="mr-1 h-4 w-4" />
                    {stat.label}
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </footer>

      <section className="py-32 px-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary to-accent rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full text-primary text-sm font-medium mb-8 border border-primary/20">
              <Brain className="mr-2 h-5 w-5" />
              Triết Học Sâu Sắc
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance vietnamese-text">Tư Duy Biện Chứng</h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed vietnamese-text">
              Khám phá những khía cạnh sâu sắc của mối quan hệ biện chứng trong xã hội hiện đại
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔄",
                title: "Tính Động",
                description: "Mối quan hệ không tĩnh tại mà luôn biến đổi theo thời gian và hoàn cảnh lịch sử cụ thể.",
                color: "primary",
                delay: "0s",
              },
              {
                icon: "⚖️",
                title: "Tính Tương Đối",
                description: "Vai trò quyết định của cơ sở hạ tầng có thể thay đổi tùy thuộc vào giai đoạn phát triển.",
                color: "secondary",
                delay: "0.2s",
              },
              {
                icon: "🌐",
                title: "Tính Toàn Cầu",
                description:
                  "Trong thời đại toàn cầu hóa, mối quan hệ này trở nên phức tạp hơn với các yếu tố xuyên quốc gia.",
                color: "accent",
                delay: "0.4s",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out"
                style={{ transitionDelay: item.delay }}
              >
                <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      item.color === "primary" ? "from-primary/5" : item.color === "secondary" ? "from-secondary/5" : "from-accent/5"
                    } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <CardContent className="p-0 relative z-10">
                    <div
                      className={`w-20 h-20 ${item.color === "primary" ? "bg-primary/10" : item.color === "secondary" ? "bg-secondary/10" : "bg-accent/10"} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-4xl">{item.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 vietnamese-text">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed vietnamese-text">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`space-y-3 transition-all duration-300 ${showFloatingMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80"
                onClick={() => scrollToSection('hero')}
              >
                <ArrowUp className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Về đầu trang</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                variant="secondary"
                className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open('https://t.me/dialectical_philosophy', '_blank')}
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Chat trực tiếp</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-background"
                onClick={() => navigator.share ? navigator.share({
                  title: 'Mối Quan Hệ Biện Chứng',
                  text: 'Khám phá triết học Marxist về mối quan hệ giữa cơ sở hạ tầng và kiến trúc thượng tầng',
                  url: window.location.href
                }) : navigator.clipboard.writeText(window.location.href)}
              >
                <Share2 className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Chia sẻ trang</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-background"
                onClick={() => {
                  const bookmarkData = {
                    title: 'Mối Quan Hệ Biện Chứng - Triết Học Marxist',
                    url: window.location.href
                  };
                  localStorage.setItem('dialectical_bookmark', JSON.stringify(bookmarkData));
                  alert('Đã lưu trang vào bookmark!');
                }}
              >
                <Bookmark className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Lưu bookmark</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <Button
          size="lg"
          className={`w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-3 bg-gradient-to-r from-accent to-accent/80 ${showFloatingMenu ? 'rotate-45' : ''}`}
          onClick={() => setShowFloatingMenu(!showFloatingMenu)}
        >
          <Settings className="h-8 w-8" />
        </Button>
      </div>

      {/* Interactive Easter Egg - Click particles */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        onClick={(e) => {
          const particles = [];
          for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-2 h-2 bg-primary rounded-full animate-ping pointer-events-none';
            particle.style.left = e.clientX - 4 + Math.random() * 8 + 'px';
            particle.style.top = e.clientY - 4 + Math.random() * 8 + 'px';
            particle.style.animationDuration = Math.random() * 1000 + 500 + 'ms';
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
          }
        }}
        />
        </div>
        
        <Chatbox />
      </TooltipProvider>
    )
}
