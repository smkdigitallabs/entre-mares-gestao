'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

// --- Knowledge Base (Problems & Solutions) ---

export async function getKnowledgeBase(search?: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    let where: any = { deletedAt: null };
    
    if (search) {
      where = {
        AND: [
          { deletedAt: null },
          {
            OR: [
              { problem: { contains: search, mode: 'insensitive' } },
              { solution: { contains: search, mode: 'insensitive' } },
              { category: { contains: search, mode: 'insensitive' } }
            ]
          }
        ]
      };
    }

    const data = await prisma.knowledgeBase.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data }
  } catch (error) {
    console.error("Erro ao buscar base de conhecimento:", error)
    return { success: false, error: "Falha ao buscar base de conhecimento" }
  }
}

export async function createKnowledgeEntry(data: { problem: string; solution: string; category?: string }) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    await prisma.knowledgeBase.create({
      data: {
        problem: data.problem,
        solution: data.solution,
        category: data.category,
      }
    })
    revalidatePath('/base-conhecimento')
    return { success: true }
  } catch (error) {
    console.error("Erro ao criar entrada na base de conhecimento:", error)
    return { success: false, error: "Falha ao criar entrada" }
  }
}

export async function deleteKnowledgeEntry(id: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    await prisma.knowledgeBase.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
    revalidatePath('/base-conhecimento')
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir entrada na base de conhecimento:", error)
    return { success: false, error: "Falha ao excluir entrada" }
  }
}

// --- Strategic Contacts ---

export async function getStrategicContacts(search?: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    let where: any = { deletedAt: null };
    
    if (search) {
      where = {
        AND: [
          { deletedAt: null },
          {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { role: { contains: search, mode: 'insensitive' } },
              { notes: { contains: search, mode: 'insensitive' } }
            ]
          }
        ]
      };
    }

    const data = await prisma.strategicContact.findMany({
      where,
      orderBy: { name: 'asc' }
    })
    return { success: true, data }
  } catch (error) {
    console.error("Erro ao buscar contatos estratégicos:", error)
    return { success: false, error: "Falha ao buscar contatos" }
  }
}

export async function createStrategicContact(data: { name: string; role: string; phone?: string; email?: string; notes?: string }) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    await prisma.strategicContact.create({
      data: {
        name: data.name,
        role: data.role,
        phone: data.phone,
        email: data.email,
        notes: data.notes,
      }
    })
    revalidatePath('/contatos')
    return { success: true }
  } catch (error) {
    console.error("Erro ao criar contato estratégico:", error)
    return { success: false, error: "Falha ao criar contato" }
  }
}

export async function deleteStrategicContact(id: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    await prisma.strategicContact.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
    revalidatePath('/contatos')
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir contato estratégico:", error)
    return { success: false, error: "Falha ao excluir contato" }
  }
}

// --- Property Checklists ---

export async function getPropertyChecklists(propertyId: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const data = await prisma.propertyChecklist.findMany({
      where: { 
        propertyId,
        deletedAt: null 
      },
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data }
  } catch (error) {
    console.error("Erro ao buscar checklists da propriedade:", error)
    return { success: false, error: "Falha ao buscar checklists" }
  }
}

export async function createPropertyChecklist(data: { propertyId: string; title: string; items: any; type?: string }) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    await prisma.propertyChecklist.create({
      data: {
        propertyId: data.propertyId,
        title: data.title,
        items: data.items,
        type: data.type || "manual",
      }
    })
    revalidatePath(`/propriedades/${data.propertyId}`)
    return { success: true }
  } catch (error) {
    console.error("Erro ao criar checklist da propriedade:", error)
    return { success: false, error: "Falha ao criar checklist" }
  }
}

export async function deletePropertyChecklist(id: string, propertyId: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    await prisma.propertyChecklist.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
    revalidatePath(`/propriedades/${propertyId}`)
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir checklist da propriedade:", error)
    return { success: false, error: "Falha ao excluir checklist" }
  }
}
