"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { X, Minus, Square } from "lucide-react"
import { cn } from "@/lib/utils"

type WindowProps = {
  id: string
  title: string
  icon?: string
  isActive: boolean
  isMaximized: boolean
  children: React.ReactNode
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
}

export function Window({
  id,
  title,
  icon,
  isActive,
  isMaximized,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: WindowProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const constraintsRef = useRef(null)

  return (
    <motion.div
      className="absolute bg-win95-gray border-win95 shadow-win95 overflow-hidden"
      style={{
        width: isMaximized ? "100%" : 600,
        height: isMaximized ? "calc(100% - 28px)" : 400,
        zIndex: isActive ? 10 : 1,
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 0 : position.y,
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onFocus}
      drag={!isMaximized}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        setPosition({
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        })
      }}
    >
      {/* Barra de título */}
      <div
        className={cn(
          "h-6 px-1 flex items-center justify-between",
          isActive ? "bg-win95-blue text-white" : "bg-win95-gray-dark text-win95-gray-light",
        )}
      >
        <div className="font-bold text-sm truncate flex items-center">
          {icon && <span className="mr-1">{icon}</span>}
          <span>{title}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            className="w-4 h-4 flex items-center justify-center bg-win95-gray border-win95 active:border-win95-inset"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            className="w-4 h-4 flex items-center justify-center bg-win95-gray border-win95 active:border-win95-inset"
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            className="w-4 h-4 flex items-center justify-center bg-win95-gray border-win95 active:border-win95-inset"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
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
      <div className="p-4 h-[calc(100%-2.75rem)] overflow-auto bg-white">{children}</div>
    </motion.div>
  )
}
