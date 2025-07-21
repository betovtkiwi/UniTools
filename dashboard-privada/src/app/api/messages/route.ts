import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const messages = await db.message.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            hasAccess: true
          }
        }
      },
      orderBy: {
        createdAt: "asc"
      },
      take: 100
    })

    // Se o usuário não tem acesso, filtrar mensagens não-texto
    const user = await db.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user?.hasAccess) {
              const filteredMessages = messages.map(message => {
          if (message.type !== "TEXT") {
            return {
              ...message,
              content: "🔒 Conteúdo bloqueado - Requer acesso premium",
              type: "BLOCKED" as const
            }
          }
          return message
        })
      return NextResponse.json(filteredMessages)
    }

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, type = "TEXT" } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    // Verificar se o usuário tem acesso para enviar mensagens não-texto
    const user = await db.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user?.hasAccess && type !== "TEXT") {
      return NextResponse.json({ 
        error: "Premium access required for non-text messages" 
      }, { status: 403 })
    }

    const message = await db.message.create({
      data: {
        content,
        type,
        userId: session.user.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            hasAccess: true
          }
        }
      }
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}