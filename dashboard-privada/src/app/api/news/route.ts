import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const news = await db.news.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verificar se é admin
    const user = await db.user.findUnique({
      where: { id: session.user.id }
    })

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { title, content, image, isHighlight } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ 
        error: "Title and content are required" 
      }, { status: 400 })
    }

    const newsItem = await db.news.create({
      data: {
        title,
        content,
        image,
        isHighlight: isHighlight || false
      }
    })

    return NextResponse.json(newsItem)
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}