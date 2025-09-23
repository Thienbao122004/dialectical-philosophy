"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowDown,
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
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-all duration-300 bg-transparent hover:bg-primary/10 hover:border-primary/50 magnetic-hover"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Khám Phá
              </Button>
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
              <Button
                size="lg"
                className="text-xl px-12 py-8 hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-3xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent group magnetic-hover"
              >
                <BookOpen className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Khám Phá Ngay
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-12 py-8 bg-background/50 hover:scale-110 transition-all duration-500 hover:bg-gradient-to-r hover:from-accent/20 hover:to-primary/20 group magnetic-hover border-2"
              >
                <Lightbulb className="mr-3 h-6 w-6 group-hover:text-accent transition-colors duration-300" />
                Tương Tác Trực Quan
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto">
              {[
                { counter: heroCounter1, number: 1818, label: "Năm Sinh Marx", icon: Star, suffix: "" },
                { counter: heroCounter2, number: 150, label: "Năm Ảnh Hưởng", icon: TrendingUp, suffix: "+" },
                { counter: heroCounter3, number: 2, label: "Tầng Cấu Trúc", icon: Target, suffix: "+" },
              ].map((stat, index) => (
                <div
                  key={index}
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
            <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-6 border border-secondary/20">
              <Target className="mr-2 h-4 w-4" />
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
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6 border border-accent/20">
              <Globe className="mr-2 h-4 w-4" />
              Mối Quan Hệ Biện Chứng
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Tương Tác Động Và Phức Tạp</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Không phải là mối quan hệ một chiều, mà là sự tương tác động và phức tạp qua thời gian
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                    <div className="w-full max-w-2xl bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-8 hover:scale-105 transition-all duration-500 group/infra cursor-pointer magnetic-hover">
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover/infra:scale-110 transition-transform duration-300">
                          <Layers className="h-8 w-8 text-primary-foreground" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-center text-primary mb-4">Cơ Sở Hạ Tầng</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {[
                          { icon: Cpu, label: "Công Nghệ" },
                          { icon: Users, label: "Lao Động" },
                          { icon: Network, label: "Quan Hệ" },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-300"
                          >
                            <item.icon className="h-6 w-6 text-primary mb-2" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
                    <div className="w-full max-w-2xl bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-2xl p-8 hover:scale-105 transition-all duration-500 group/super cursor-pointer magnetic-hover">
                      <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center shadow-lg group-hover/super:scale-110 transition-transform duration-300">
                      <Globe className="h-8 w-8 text-secondary-foreground" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-center text-secondary-foreground mb-4">Kiến Trúc Thượng Tầng</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {[
                          { icon: Eye, label: "Chính Trị" },
                          { icon: Heart, label: "Văn Hóa" },
                          { icon: Brain, label: "Ý Thức" },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center p-3 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-all duration-300"
                          >
                            <item.icon className="h-6 w-6 text-secondary-foreground mb-2" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6 border border-accent/20">
              <TrendingUp className="mr-2 h-4 w-4" />
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
            <div className="inline-flex items-center px-6 py-3 bg-accent/10 rounded-full text-accent text-sm font-medium mb-8 border border-accent/20">
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
              },
              {
                counter: statsCounter2,
                number: 50,
                label: "Quốc Gia Áp Dụng",
                icon: Globe,
                color: "secondary",
                suffix: "+",
              },
              {
                counter: statsCounter3,
                number: 1000,
                label: "Nghiên Cứu",
                icon: BookOpen,
                color: "accent",
                suffix: "+",
              },
              {
                counter: statsCounter4,
                number: 100,
                label: "Tác Động (%)",
                icon: Infinity,
                color: "primary",
                suffix: "",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="scroll-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out stagger-child"
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 hover:scale-110 group relative overflow-hidden h-full magnetic-hover">
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
              <Button
                size="lg"
                className="text-lg px-12 py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent group"
              >
                <BookOpen className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Tìm Hiểu Thêm
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-12 py-6 bg-background/50 hover:scale-105 transition-all duration-300 hover:bg-gradient-to-r hover:from-accent/10 hover:to-primary/10 group"
              >
                <Users className="mr-2 h-5 w-5 group-hover:text-secondary transition-colors duration-300" />
                Tham Gia Thảo Luận
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
            </div>
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
    </div>
  )
}
