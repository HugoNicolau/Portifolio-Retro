"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Square, Monitor, FileText, User, Mail, Github } from "lucide-react"
import { cn } from "@/lib/utils"

// Tipos para os projetos e janelas
type Project = {
  id: string
  title: string
  icon: string
  description: string
  technologies: string[]
  imageUrl: string
  link?: string
}

type Window = {
  id: string
  project: Project
  position: { x: number; y: number }
  size: { width: number; height: number }
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

export default function PortfolioPage() {
  // Dados dos projetos
  const projects: Project[] = [
    {
      id: "project1",
      title: "E-commerce App",
      icon: "🛒",
      description:
        "Uma plataforma de e-commerce completa com carrinho de compras, pagamentos e painel de administração.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      imageUrl: "/placeholder.svg?height=300&width=500",
      link: "https://github.com/username/ecommerce",
    },
    {
      id: "project2",
      title: "App de Finanças",
      icon: "💰",
      description: "Aplicativo para controle de finanças pessoais com gráficos e relatórios detalhados.",
      technologies: ["Vue.js", "Firebase", "Chart.js"],
      imageUrl: "/placeholder.svg?height=300&width=500",
      link: "https://github.com/username/finance-app",
    },
    {
      id: "project3",
      title: "Blog Tech",
      icon: "📝",
      description: "Blog sobre tecnologia com sistema de comentários e painel administrativo.",
      technologies: ["Next.js", "Prisma", "PostgreSQL"],
      imageUrl: "/placeholder.svg?height=300&width=500",
      link: "https://github.com/username/tech-blog",
    },
    {
      id: "project4",
      title: "App de Clima",
      icon: "🌤️",
      description: "Aplicativo de previsão do tempo com dados em tempo real.",
      technologies: ["React Native", "OpenWeather API"],
      imageUrl: "/placeholder.svg?height=300&width=500",
      link: "https://github.com/username/weather-app",
    },
    {
      id: "project5",
      title: "Jogo 2D",
      icon: "🎮",
      description: "Um jogo 2D de plataforma desenvolvido com JavaScript puro.",
      technologies: ["JavaScript", "Canvas API", "Howler.js"],
      imageUrl: "/placeholder.svg?height=300&width=500",
      link: "https://github.com/username/platform-game",
    },
    {
      id: "about",
      title: "Sobre Mim",
      icon: "👤",
      description:
        "Olá! Sou um desenvolvedor web apaixonado por criar experiências digitais únicas e funcionais. Tenho experiência em desenvolvimento front-end e back-end, e adoro aprender novas tecnologias.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      imageUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "recycle-bin",
      title: "Lixeira",
      icon: "🗑️",
      description: "Projetos arquivados e experimentos que não deram certo.",
      technologies: [],
      imageUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "my-computer",
      title: "Meu Computador",
      icon: "💻",
      description: "Informações sobre minhas habilidades e tecnologias que domino.",
      technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "MongoDB"],
      imageUrl: "/placeholder.svg?height=300&width=500",
    },
  ]

  // Estado para as janelas abertas
  const [windows, setWindows] = useState<Window[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [highestZIndex, setHighestZIndex] = useState(1)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showStartup, setShowStartup] = useState(true)

  // Atualizar o relógio
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Simular inicialização do Windows 95
    const startupTimer = setTimeout(() => {
      setShowStartup(false)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearTimeout(startupTimer)
    }
  }, [])

  // Função para abrir uma nova janela
  const openWindow = (project: Project) => {
    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)

    // Verificar se a janela já está aberta
    const existingWindow = windows.find((w) => w.project.id === project.id)

    if (existingWindow) {
      // Se estiver minimizada, restaurar
      if (existingWindow.isMinimized) {
        setWindows(
          windows.map((w) => (w.id === existingWindow.id ? { ...w, isMinimized: false, zIndex: newZIndex } : w)),
        )
      }
      // Trazer para frente
      setActiveWindowId(existingWindow.id)
      setWindows(windows.map((w) => (w.id === existingWindow.id ? { ...w, zIndex: newZIndex } : w)))
      return
    }

    // Criar nova janela com posição aleatória
    const randomOffset = windows.length * 20
    const newWindow: Window = {
      id: `window-${Date.now()}`,
      project,
      position: { x: 50 + randomOffset, y: 50 + randomOffset },
      size: { width: 600, height: 400 },
      isMinimized: false,
      isMaximized: false,
      zIndex: newZIndex,
    }

    setWindows([...windows, newWindow])
    setActiveWindowId(newWindow.id)
  }

  // Função para fechar uma janela
  const closeWindow = (windowId: string) => {
    setWindows(windows.filter((w) => w.id !== windowId))
    if (activeWindowId === windowId) {
      setActiveWindowId(null)
    }
  }

  // Função para minimizar uma janela
  const minimizeWindow = (windowId: string) => {
    setWindows(windows.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w)))
  }

  // Função para maximizar/restaurar uma janela
  const toggleMaximize = (windowId: string) => {
    setWindows(windows.map((w) => (w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w)))
  }

  // Função para trazer uma janela para frente
  const bringToFront = (windowId: string) => {
    if (windowId === activeWindowId) return

    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)
    setActiveWindowId(windowId)

    setWindows(windows.map((w) => (w.id === windowId ? { ...w, zIndex: newZIndex } : w)))
  }

  // Função para iniciar o arrasto da janela
  const startDrag = (e: React.MouseEvent, windowId: string) => {
    e.preventDefault()
    bringToFront(windowId)

    const window = windows.find((w) => w.id === windowId)
    if (!window || window.isMaximized) return

    const startX = e.clientX
    const startY = e.clientY
    const startLeft = window.position.x
    const startTop = window.position.y

    const onMouseMove = (e: MouseEvent) => {
      setWindows(
        windows.map((w) =>
          w.id === windowId
            ? {
                ...w,
                position: {
                  x: startLeft + e.clientX - startX,
                  y: startTop + e.clientY - startY,
                },
              }
            : w,
        ),
      )
    }

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  if (showStartup) {
    return (
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center"
        >
          <div className="w-16 h-16 mr-4 grid grid-cols-2 gap-1">
            <div className="bg-win95-red"></div>
            <div className="bg-win95-green"></div>
            <div className="bg-win95-blue"></div>
            <div className="bg-win95-yellow"></div>
          </div>
          <div className="text-white text-4xl font-bold">Windows 95</div>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "50%" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="h-2 bg-white mt-8"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-win95-teal font-win95 text-black">
      {/* Desktop */}
      <div className="absolute inset-0 pt-2 pb-10 px-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 content-start">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-blue-800 hover:text-white rounded"
            onClick={() => openWindow(project)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-1">{project.icon}</div>
            <div className="text-center text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {project.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Janelas */}
      <AnimatePresence>
        {windows.map(
          (window) =>
            !window.isMinimized && (
              <motion.div
                key={window.id}
                className="absolute bg-win95-gray border-win95 shadow-win95 overflow-hidden"
                style={{
                  left: window.isMaximized ? 0 : `${window.position.x}px`,
                  top: window.isMaximized ? 0 : `${window.position.y}px`,
                  width: window.isMaximized ? "100%" : `${window.size.width}px`,
                  height: window.isMaximized ? "calc(100% - 28px)" : `${window.size.height}px`,
                  zIndex: window.zIndex,
                }}
                onClick={() => bringToFront(window.id)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Barra de título */}
                <div
                  className={cn(
                    "h-6 px-1 flex items-center justify-between",
                    activeWindowId === window.id
                      ? "bg-win95-blue text-white"
                      : "bg-win95-gray-dark text-win95-gray-light",
                  )}
                  onMouseDown={(e) => startDrag(e, window.id)}
                >
                  <div className="font-bold text-sm truncate flex items-center">
                    <span className="mr-1">{window.project.icon}</span>
                    <span>{window.project.title}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      className="w-4 h-4 flex items-center justify-center bg-win95-gray border-win95 active:border-win95-inset"
                      onClick={(e) => {
                        e.stopPropagation()
                        minimizeWindow(window.id)
                      }}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      className="w-4 h-4 flex items-center justify-center bg-win95-gray border-win95 active:border-win95-inset"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMaximize(window.id)
                      }}
                    >
                      <Square className="w-3 h-3" />
                    </button>
                    <button
                      className="w-4 h-4 flex items-center justify-center bg-win95-gray border-win95 active:border-win95-inset"
                      onClick={(e) => {
                        e.stopPropagation()
                        closeWindow(window.id)
                      }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Menu da janela */}
                <div className="h-5 bg-win95-gray border-b border-win95-gray-dark flex items-center px-1 text-xs">
                  <button className="px-2 hover:bg-win95-blue hover:text-white">Arquivo</button>
                  <button className="px-2 hover:bg-win95-blue hover:text-white">Editar</button>
                  <button className="px-2 hover:bg-win95-blue hover:text-white">Exibir</button>
                  <button className="px-2 hover:bg-win95-blue hover:text-white">Ajuda</button>
                </div>

                {/* Conteúdo da janela */}
                <div className="p-4 h-[calc(100%-2.75rem)] overflow-auto bg-white">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/2">
                      <img
                        src={window.project.imageUrl || "/placeholder.svg"}
                        alt={window.project.title}
                        className="w-full h-auto border-win95"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h2 className="text-xl font-bold mb-2">{window.project.title}</h2>
                      <p className="mb-4">{window.project.description}</p>

                      {window.project.technologies.length > 0 && (
                        <>
                          <h3 className="font-bold mb-1">Tecnologias:</h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {window.project.technologies.map((tech, index) => (
                              <span key={index} className="bg-win95-gray px-2 py-1 border-win95 text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      {window.project.link && (
                        <motion.a
                          href={window.project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-win95-gray px-4 py-2 border-win95 hover:bg-win95-gray-light active:border-win95-inset"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Ver Projeto
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ),
        )}
      </AnimatePresence>

      {/* Barra de tarefas */}
      <div className="absolute bottom-0 left-0 right-0 h-7 bg-win95-gray border-t border-white flex items-center px-1 z-50">
        <motion.button
          className={cn(
            "h-6 flex items-center gap-1 border-win95 bg-win95-gray px-2",
            startMenuOpen ? "active:border-win95-inset" : "",
          )}
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          whileHover={{ backgroundColor: "#d0d0d0" }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center w-4 h-4 mr-1">
            <div className="w-4 h-4 grid grid-cols-2 gap-px">
              <div className="bg-win95-red"></div>
              <div className="bg-win95-green"></div>
              <div className="bg-win95-blue"></div>
              <div className="bg-win95-yellow"></div>
            </div>
          </div>
          <span className="font-bold text-sm">Iniciar</span>
        </motion.button>

        <div className="h-full w-px bg-win95-gray-dark mx-1"></div>

        {/* Janelas minimizadas */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto">
          {windows.map((window) => (
            <motion.button
              key={window.id}
              className={cn(
                "px-2 h-6 flex items-center text-sm truncate max-w-[150px] border-win95",
                activeWindowId === window.id && !window.isMinimized
                  ? "active:border-win95-inset bg-win95-gray-light"
                  : "bg-win95-gray",
              )}
              onClick={() => {
                if (window.isMinimized) {
                  setWindows(windows.map((w) => (w.id === window.id ? { ...w, isMinimized: false } : w)))
                }
                bringToFront(window.id)
              }}
              whileHover={{ backgroundColor: "#d0d0d0" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-1">{window.project.icon}</span>
              <span className="truncate">{window.project.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Relógio */}
        <div className="px-2 text-xs border-win95-inset bg-win95-gray-light">
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* Menu Iniciar */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div
            className="absolute bottom-7 left-0 w-64 bg-win95-gray border-win95 shadow-win95 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-8 bg-win95-gray-dark flex items-center">
              <div className="w-full h-full bg-win95-blue transform -rotate-90 flex items-center justify-center">
                <span className="text-white font-bold transform rotate-90">Windows 95</span>
              </div>
            </div>

            <div className="p-1">
              <motion.button
                className="w-full text-left px-2 py-1 flex items-center gap-2 hover:bg-win95-blue hover:text-white"
                onClick={() => {
                  const project = projects.find((p) => p.id === "my-computer")
                  if (project) {
                    openWindow(project)
                    setStartMenuOpen(false)
                  }
                }}
                whileHover={{ backgroundColor: "#000080", color: "#ffffff" }}
              >
                <Monitor className="w-4 h-4" />
                <span>Meu Computador</span>
              </motion.button>

              <motion.button
                className="w-full text-left px-2 py-1 flex items-center gap-2 hover:bg-win95-blue hover:text-white"
                onClick={() => {
                  const project = projects.find((p) => p.id === "about")
                  if (project) {
                    openWindow(project)
                    setStartMenuOpen(false)
                  }
                }}
                whileHover={{ backgroundColor: "#000080", color: "#ffffff" }}
              >
                <User className="w-4 h-4" />
                <span>Sobre Mim</span>
              </motion.button>

              <div className="border-t border-win95-gray-dark my-1"></div>

              <div className="text-sm font-bold px-2 py-1">Projetos</div>

              {projects.slice(0, 5).map((project) => (
                <motion.button
                  key={project.id}
                  className="w-full text-left px-2 py-1 flex items-center gap-2 hover:bg-win95-blue hover:text-white"
                  onClick={() => {
                    openWindow(project)
                    setStartMenuOpen(false)
                  }}
                  whileHover={{ backgroundColor: "#000080", color: "#ffffff" }}
                >
                  <span className="text-lg">{project.icon}</span>
                  <span>{project.title}</span>
                </motion.button>
              ))}

              <div className="border-t border-win95-gray-dark my-1"></div>

              <motion.button
                className="w-full text-left px-2 py-1 flex items-center gap-2 hover:bg-win95-blue hover:text-white"
                whileHover={{ backgroundColor: "#000080", color: "#ffffff" }}
              >
                <Mail className="w-4 h-4" />
                <span>Contato</span>
              </motion.button>

              <motion.button
                className="w-full text-left px-2 py-1 flex items-center gap-2 hover:bg-win95-blue hover:text-white"
                whileHover={{ backgroundColor: "#000080", color: "#ffffff" }}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </motion.button>

              <div className="border-t border-win95-gray-dark my-1"></div>

              <motion.button
                className="w-full text-left px-2 py-1 flex items-center gap-2 hover:bg-win95-blue hover:text-white"
                whileHover={{ backgroundColor: "#000080", color: "#ffffff" }}
              >
                <FileText className="w-4 h-4" />
                <span>Documentos</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para fechar o menu iniciar quando clicar fora */}
      {startMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setStartMenuOpen(false)}></div>}
    </div>
  )
}
