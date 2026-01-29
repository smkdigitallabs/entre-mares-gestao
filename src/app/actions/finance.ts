'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      include: {
        reservation: true
      }
    })
    return { success: true, data: transactions }
  } catch (error) {
    console.error("Erro ao buscar transações:", error)
    return { success: false, error: "Falha ao buscar transações" }
  }
}

export async function createTransaction(data: {
  description: string;
  category: string;
  amount: number;
  type: string;
  date?: Date;
}) {
  try {
    await prisma.transaction.create({
      data: {
        description: data.description,
        category: data.category,
        amount: data.amount,
        type: data.type,
        date: data.date || new Date(),
      }
    })
    revalidatePath('/financeiro')
    return { success: true }
  } catch (error) {
    console.error("Erro ao criar transação:", error)
    return { success: false, error: "Falha ao criar transação" }
  }
}

export async function deleteTransaction(id: string) {
  try {
    await prisma.transaction.delete({
      where: { id }
    })
    revalidatePath('/financeiro')
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir transação:", error)
    return { success: false, error: "Falha ao excluir transação" }
  }
}

export async function seedTransactions() {
  try {
    const count = await prisma.transaction.count();
    if (count > 0) return { success: false, message: "Banco já possui dados" };
    
    await prisma.transaction.createMany({
      data: [
        { 
          date: new Date("2026-01-25"), 
          description: "Reserva Casa Maré Alta - Silva", 
          category: "Aluguel", 
          amount: 2500.00, 
          type: "gain" 
        },
        { 
          date: new Date("2026-01-24"), 
          description: "Limpeza Loft Central", 
          category: "Limpeza", 
          amount: 150.00, 
          type: "expense" 
        },
        { 
          date: new Date("2026-01-23"), 
          description: "Venda Kit Conveniência (Vinho)", 
          category: "Conveniência", 
          amount: 85.00, 
          type: "gain" 
        },
        { 
          date: new Date("2026-01-22"), 
          description: "Manutenção Ar Condicionado", 
          category: "Manutenção", 
          amount: 320.00, 
          type: "expense" 
        },
        { 
          date: new Date("2026-01-21"), 
          description: "Comissão Gestão - Reserva #452", 
          category: "Taxa", 
          amount: 375.00, 
          type: "gain" 
        },
      ]
    })
    revalidatePath('/financeiro')
    return { success: true, message: "Transações de exemplo criadas" }
  } catch (error) {
    console.error("Erro ao popular transações:", error)
    return { success: false, error: "Falha ao popular transações" }
  }
}
