'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { TaskPriority } from "@prisma/client"

export async function getTasks(period?: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);

    let where: any = {
      deletedAt: null // Soft Delete
    };
    
    if (period === 'today') {
      where = {
        dueDate: {
          gte: today,
          lt: tomorrow
        }
      };
    } else if (period === 'tomorrow') {
      where = {
        dueDate: {
          gte: tomorrow,
          lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
        }
      };
    } else if (period === 'week') {
      where = {
        dueDate: {
          gte: today,
          lt: weekEnd
        }
      };
    }

    const tasks = await prisma.task.findMany({
      where,
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
  priority: TaskPriority;
  description?: string;
}) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const allowedPriorities = new Set(["low", "medium", "high"]);
    const allowedCategories = new Set(["general", "checkin", "cleaning", "maintenance", "personal"]);

    if (!data.title || typeof data.title !== 'string') {
      return { success: false, error: "Título inválido" };
    }
    if (!(data.dueDate instanceof Date) || isNaN(data.dueDate.getTime())) {
      return { success: false, error: "Data/hora inválidas" };
    }
    if (!allowedPriorities.has(String(data.priority))) {
      return { success: false, error: "Prioridade inválida" };
    }
    if (data.description && !allowedCategories.has(String(data.description))) {
      return { success: false, error: "Categoria inválida" };
    }

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
    // Soft Delete
    await prisma.task.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
    revalidatePath('/operacional')
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error)
    return { success: false, error: "Falha ao excluir tarefa" }
  }
}
