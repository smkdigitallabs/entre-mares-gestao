'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

export async function getMarketingPosts() {
  const { userId } = await auth();
  if (!userId) return { error: "Não autorizado" };

  try {
    const posts = await prisma.marketingPost.findMany({
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
    await prisma.marketingPost.delete({
      where: { id }
    })
    revalidatePath('/marketing')
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir post:", error)
    return { success: false, error: "Falha ao excluir post" }
  }
}

export async function seedMarketingPosts() {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const count = await prisma.marketingPost.count()
    if (count > 0) return { success: true, message: "Já existem posts" }

    const posts = [
      {
        title: "O Cuidado Silencioso",
        platform: "Instagram",
        contentPlan: "Mostrar detalhes da limpeza e organização antes do check-in. Foco no pilar 'Cuidado Constante'.",
        tone: "Calmo e Profissional",
        status: "draft"
      },
      {
        title: "Dica de Praia: Prainha",
        platform: "Instagram/Status",
        contentPlan: "Sugerir a Prainha para famílias. Mencionar a tranquilidade e a segurança local.",
        tone: "Acolhedor e Informativo",
        status: "draft"
      },
      {
        title: "Abertura de Datas: Carnaval",
        platform: "WhatsApp/Instagram",
        contentPlan: "Anunciar disponibilidade para o Carnaval com foco em 'Tranquilidade' (fugir do agito).",
        tone: "Presente e Claro",
        status: "scheduled"
      }
    ]

    for (const post of posts) {
      await prisma.marketingPost.create({ data: post })
    }

    revalidatePath('/marketing')
    return { success: true }
  } catch (error) {
    console.error("Erro ao seedar posts:", error)
    return { success: false, error: "Falha ao criar posts iniciais" }
  }
}
