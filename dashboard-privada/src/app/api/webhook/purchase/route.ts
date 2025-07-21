import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar webhook secret (em produção, use uma validação mais robusta)
    const webhookSecret = request.headers.get("x-webhook-secret")
    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email, paymentId, amount, status } = body

    if (status === "completed" || status === "approved") {
      // Encontrar ou criar usuário
      let user = await db.user.findUnique({
        where: { email }
      })

      if (!user) {
        user = await db.user.create({
          data: {
            email,
            hasAccess: true,
          }
        })
      } else {
        // Atualizar usuário para ter acesso
        user = await db.user.update({
          where: { email },
          data: { hasAccess: true }
        })
      }

      // Criar registro de compra
      await db.purchase.create({
        data: {
          userId: user.id,
          amount: amount || 0,
          status: "COMPLETED",
          paymentId,
          webhookData: JSON.stringify(body)
        }
      })

      return NextResponse.json({ success: true, message: "Access granted" })
    }

    return NextResponse.json({ success: false, message: "Payment not completed" })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}