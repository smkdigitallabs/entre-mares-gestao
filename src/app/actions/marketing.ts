'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

export async function getMarketingPosts() {
  const { userId } = await auth();
  if (!userId) return { error: "Não autorizado" };

  try {
    const posts = await prisma.marketingPost.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' }
    })
    return { data: posts }
  } catch (error) {
    console.error("Erro ao buscar posts de marketing:", error)
    return { error: "Falha ao carregar posts" }
  }
}

export async function createMarketingPost(data: {
  title: string
  platform: string
  contentPlan: string
  tone: string
}) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const post = await prisma.marketingPost.create({
      data: {
        ...data,
        status: 'draft'
      }
    })
    revalidatePath('/marketing')
    return { success: true, data: post }
  } catch (error) {
    console.error("Erro ao criar post de marketing:", error)
    return { success: false, error: "Falha ao criar post" }
  }
}

export async function deleteMarketingPost(id: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    // Soft Delete
    await prisma.marketingPost.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
    revalidatePath('/marketing')
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir post:", error)
    return { success: false, error: "Falha ao excluir post" }
  }
}
