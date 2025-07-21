"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { MessageCircle, Star, Calendar, User } from "lucide-react"
import Link from "next/link"

interface News {
  id: string
  title: string
  content: string
  image?: string
  isHighlight: boolean
  createdAt: string
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news")
      if (response.ok) {
        const data = await response.json()
        setNews(data)
      }
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bem-vindo, {session?.user?.name || session?.user?.email}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {session?.user?.hasAccess 
            ? "Você tem acesso premium à plataforma" 
            : "Acesso limitado - Adquira o acesso completo para desbloquear todas as funcionalidades"
          }
        </p>
      </div>

      {/* Status do acesso */}
      <div className={`rounded-lg p-4 ${
        session?.user?.hasAccess 
          ? "bg-green-50 border border-green-200" 
          : "bg-yellow-50 border border-yellow-200"
      }`}>
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${
            session?.user?.hasAccess ? "text-green-400" : "text-yellow-400"
          }`}>
            <Star className="h-5 w-5" />
          </div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium ${
              session?.user?.hasAccess ? "text-green-800" : "text-yellow-800"
            }`}>
              {session?.user?.hasAccess ? "Acesso Premium Ativo" : "Acesso Limitado"}
            </h3>
            <div className={`mt-2 text-sm ${
              session?.user?.hasAccess ? "text-green-700" : "text-yellow-700"
            }`}>
              <p>
                {session?.user?.hasAccess 
                  ? "Você tem acesso completo a todas as ferramentas e funcionalidades do chat."
                  : "No chat, você pode ler e enviar apenas mensagens de texto. Conteúdos com imagens, links e outros formatos estão bloqueados."
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botão para o chat */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Bate-papo da Comunidade</h2>
            <p className="mt-1 text-sm text-gray-600">
              Converse com outros membros da comunidade
            </p>
          </div>
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Abrir Chat
          </Link>
        </div>
      </div>

      {/* Novidades em Destaque */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Novidades em Destaque</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white shadow rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma novidade</h3>
            <p className="mt-1 text-sm text-gray-500">
              Não há novidades para exibir no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
                {item.image && (
                  <div className="h-48 bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    {item.isHighlight && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Destaque
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {item.content}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(item.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}