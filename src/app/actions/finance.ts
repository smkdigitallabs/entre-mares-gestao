'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"

export async function getTransactions(type?: string, search?: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const where: any = {
      deletedAt: null // Apenas itens não excluídos (Soft Delete)
    };

    if (type && type !== 'all') {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const transactions = await prisma.transaction.findMany({
      where,
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
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

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
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    // Soft Delete em vez de delete físico
    await prisma.transaction.update({
      where: { id },
      data: { deletedAt: new Date() }
    })
    revalidatePath('/financeiro')
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir transação:", error)
    return { success: false, error: "Falha ao excluir transação" }
  }
}

export async function exportTransactionsToCSV() {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const transactions = await prisma.transaction.findMany({
      where: { deletedAt: null },
      orderBy: { date: 'desc' }
    });

    // Cabeçalho CSV
    const csvHeader = 'Data,Descrição,Categoria,Valor,Tipo\n';
    
    // Dados CSV
    const csvData = transactions.map(t => {
      const date = new Date(t.date).toLocaleDateString('pt-BR');
      const description = (t.description || '').replace(/,/g, ';'); // Substituir vírgulas para não quebrar CSV
      const category = (t.category || '').replace(/,/g, ';');
      const amount = t.amount.toFixed(2);
      const type = t.type === 'gain' ? 'Ganho' : 'Despesa';
      
      return `${date},${description},${category},${amount},${type}`;
    }).join('\n');

    const csvContent = csvHeader + csvData;
    
    return { 
      success: true, 
      data: csvContent,
      filename: `transacoes-entre-mares-${new Date().toISOString().split('T')[0]}.csv`
    };
  } catch (error) {
    console.error("Erro ao exportar transações:", error);
    return { success: false, error: "Falha ao exportar transações" };
  }
}
