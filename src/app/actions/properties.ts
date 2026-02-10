'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

export async function getProperties(search?: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    let where = {};
    
    if (search) {
      where = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { ownerName: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: properties }
  } catch (error) {
    console.error("Erro ao buscar propriedades:", error)
    return { success: false, error: "Falha ao buscar propriedades" }
  }
}

export async function createProperty(data: { name: string; address: string; ownerId?: string }) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    await prisma.property.create({
      data: {
        name: data.name,
        address: data.address,
        ownerId: data.ownerId,
      }
    })
    revalidatePath('/propriedades')
    return { success: true }
  } catch (error) {
    console.error("Erro ao criar propriedade:", error)
    return { success: false, error: "Falha ao criar propriedade" }
  }
}

export async function deleteProperty(id: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    await prisma.property.delete({
      where: { id }
    })
    revalidatePath('/propriedades')
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir propriedade:", error)
    return { success: false, error: "Falha ao excluir propriedade" }
  }
}

export async function seedProperties() {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const count = await prisma.property.count();
    if (count > 0) return { success: false, message: "Banco já possui dados" };
    
    await prisma.property.createMany({
      data: [
        {
          name: "Casa Maré Alta",
          address: "Praia da Enseada, São Francisco do Sul",
        },
        {
          name: "Loft Central",
          address: "Centro Histórico, São Francisco do Sul",
        },
        {
          name: "Refúgio do Pescador",
          address: "Praia do Forte, São Francisco do Sul",
        }
      ]
    })
    revalidatePath('/propriedades')
    return { success: true, message: "Dados de exemplo criados" }
  } catch (error) {
    console.error("Erro ao popular banco:", error)
    return { success: false, error: "Falha ao popular banco" }
  }
}
