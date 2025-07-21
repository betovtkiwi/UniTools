"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Wrench, Package, Search } from "lucide-react"

interface Tool {
  id: string
  title?: string
  description?: string
  image?: string
  createdAt: string
}

export default function ToolsPage() {
  const { data: session } = useSession()
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchTools()
  }, [])

  const fetchTools = async () => {
    try {
      const response = await fetch("/api/tools")
      if (response.ok) {
        const data = await response.json()
        setTools(data)
      }
    } catch (error) {
      console.error("Error fetching tools:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTools = tools.filter(tool => 
    (tool.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (tool.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ferramentas</h1>
        <p className="mt-1 text-sm text-gray-600">
          Marketplace interno de ferramentas e recursos
        </p>
      </div>

      {/* Verificação de acesso */}
      {!session?.user?.hasAccess && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Package className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Acesso Premium Necessário
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Você tem acesso de visualização às ferramentas. Para usar todas as funcionalidades,
                  adquira o acesso premium.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar ferramentas..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tools Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="w-full h-32 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filteredTools.length === 0 ? (
        <div className="text-center py-12">
          {searchTerm ? (
            <>
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Nenhuma ferramenta encontrada
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Tente buscar com outros termos.
              </p>
            </>
          ) : (
            <>
              <Wrench className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Nenhuma ferramenta disponível
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Não há ferramentas cadastradas no momento.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                {tool.image ? (
                  <img
                    src={tool.image}
                    alt={tool.title || "Ferramenta"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Wrench className="h-12 w-12 mb-2" />
                    <span className="text-sm">Sem imagem</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {tool.title || "Ferramenta sem título"}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {tool.description || "Sem descrição disponível."}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(tool.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                  
                  {session?.user?.hasAccess ? (
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Acessar
                    </button>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-500 bg-gray-100 cursor-not-allowed">
                      Premium
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Package className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Sobre o Marketplace
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Este é um marketplace interno onde você encontra ferramentas e recursos exclusivos.
                Todas as ferramentas são gratuitas para membros com acesso premium.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}