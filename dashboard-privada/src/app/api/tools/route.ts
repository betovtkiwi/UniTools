import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const tools = await db.tool.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(tools)
  } catch (error) {
    console.error("Error fetching tools:", error)
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

    const { title, description, image } = await request.json()

    const tool = await db.tool.create({
      data: {
        title: title || null,
        description: description || null,
        image: image || null,
        isActive: true
      }
    })

    return NextResponse.json(tool)
  } catch (error) {
    console.error("Error creating tool:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}