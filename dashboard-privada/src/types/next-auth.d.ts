import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      hasAccess?: boolean
    }
  }

  interface User {
    role?: string
    hasAccess?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    hasAccess?: boolean
  }
}