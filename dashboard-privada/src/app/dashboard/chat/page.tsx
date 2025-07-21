"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { Send, Lock, Image, Link as LinkIcon, AlertCircle } from "lucide-react"

interface Message {
  id: string
  content: string
  type: "TEXT" | "IMAGE" | "LINK" | "OTHER" | "BLOCKED"
  createdAt: string
  user: {
    id: string
    name?: string
    email: string
    hasAccess: boolean
  }
}

export default function ChatPage() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          type: "TEXT"
        }),
      })

      if (response.ok) {
        const message = await response.json()
        setMessages(prev => [...prev, message])
        setNewMessage("")
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "IMAGE":
        return <Image className="h-4 w-4" />
      case "LINK":
        return <LinkIcon className="h-4 w-4" />
      case "BLOCKED":
        return <Lock className="h-4 w-4" />
      default:
        return null
    }
  }

  const isBlocked = (message: Message) => {
    return message.type === "BLOCKED" || (!session?.user?.hasAccess && message.type !== "TEXT")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold text-gray-900">Bate-papo da Comunidade</h1>
        <p className="text-sm text-gray-600 mt-1">
          {session?.user?.hasAccess 
            ? "Você tem acesso completo ao chat"
            : "Acesso limitado: apenas mensagens de texto"
          }
        </p>
      </div>

      {/* Aviso para usuários sem acesso */}
      {!session?.user?.hasAccess && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Acesso Limitado:</strong> Você pode ler e enviar apenas mensagens de texto. 
                Conteúdos com imagens, links e outros formatos aparecem bloqueados.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma mensagem ainda. Seja o primeiro a conversar!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {message.user.name?.[0] || message.user.email[0]}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {message.user.name || message.user.email}
                  </span>
                  {message.user.hasAccess && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Premium
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
                <div className={`mt-1 ${
                  isBlocked(message) 
                    ? "bg-gray-100 border border-gray-200 rounded-md p-3" 
                    : ""
                }`}>
                  {isBlocked(message) ? (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Lock className="h-4 w-4" />
                      <span className="text-sm">
                        🔒 Conteúdo bloqueado - Requer acesso premium
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-2">
                      {getMessageIcon(message.type)}
                      <p className="text-sm text-gray-700">{message.content}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={sendMessage} className="flex space-x-3">
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        
        {!session?.user?.hasAccess && (
          <p className="mt-2 text-xs text-gray-500">
            Você pode enviar apenas mensagens de texto. Para enviar imagens e links, adquira o acesso premium.
          </p>
        )}
      </div>
    </div>
  )
}