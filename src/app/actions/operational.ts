'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

export async function getTasks() {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const tasks = await prisma.task.findMany({
      orderBy: { dueDate: 'asc' },
      include: {
        property: true
      }
    })
    return { success: true, data: tasks }
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error)
    return { success: false, error: "Falha ao buscar tarefas" }
  }
}

export async function createTask(data: {
  title: string;
  dueDate: Date;
  priority: string;
  description?: string;
}) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    await prisma.task.create({
      data: {
        title: data.title,
        dueDate: data.dueDate,
        priority: data.priority,
        description: data.description,
        status: 'pending'
      }
    })
    revalidatePath('/operacional')
    return { success: true }
  } catch (error) {
    console.error("Erro ao criar tarefa:", error)
    return { success: false, error: "Falha ao criar tarefa" }
  }
}

export async function toggleTaskStatus(id: string, currentStatus: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    await prisma.task.update({
      where: { id },
      data: { status: newStatus }
    })
    revalidatePath('/operacional')
    return { success: true, newStatus }
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error)
    return { success: false, error: "Falha ao atualizar tarefa" }
  }
}

export async function deleteTask(id: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    await prisma.task.delete({
      where: { id }
    })
    revalidatePath('/operacional')
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error)
    return { success: false, error: "Falha ao excluir tarefa" }
  }
}

export async function seedTasks() {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const count = await prisma.task.count();
    if (count > 0) return { success: false, message: "Banco já possui tarefas" };
    
    // Buscar propriedades existentes para associar
    const properties = await prisma.property.findMany({ take: 1 });
    const propertyId = properties[0]?.id;

    await prisma.task.createMany({
      data: [
        { 
          title: "Check-in: Família Oliveira", 
          dueDate: new Date("2026-01-29T14:00:00"), 
          propertyId: propertyId, 
          status: "pending",
          priority: "high",
          description: "checkin" 
        },
        { 
          title: "Vistoria & Limpeza", 
          dueDate: new Date("2026-01-29T10:00:00"), 
          propertyId: propertyId, 
          status: "completed",
          priority: "medium",
          description: "cleaning"
        },
      ]
    })
    revalidatePath('/operacional')
    return { success: true, message: "Tarefas de exemplo criadas" }
  } catch (error) {
    console.error("Erro ao seedar tarefas:", error)
    return { success: false, error: "Falha ao criar tarefas iniciais" }
  }
}
