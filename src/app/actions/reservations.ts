'use server'

import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export async function getReservations() {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const reservations = await prisma.reservation.findMany({
      where: { deletedAt: null },
      orderBy: { checkIn: 'asc' },
      include: {
        property: true
      }
    })
    return { success: true, data: reservations }
  } catch (error) {
    console.error("Erro ao buscar reservas:", error)
    return { success: false, error: "Falha ao buscar reservas" }
  }
}

export async function getOccupancyStats() {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Não autorizado" };

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const totalReservations = await prisma.reservation.count({
      where: {
        deletedAt: null,
        OR: [
          { checkIn: { gte: startOfMonth, lte: endOfMonth } },
          { checkOut: { gte: startOfMonth, lte: endOfMonth } }
        ]
      }
    });

    const totalProperties = await prisma.property.count({
      where: { deletedAt: null }
    });
    
    // Simplificação: Taxa baseada em número de propriedades vs reservas no mês
    // Em um cenário real, calcularíamos noites ocupadas / noites totais
    const occupancyRate = totalProperties > 0 ? Math.min(Math.round((totalReservations / totalProperties) * 100), 100) : 0;

    return { 
      success: true, 
      data: {
        totalReservations,
        occupancyRate
      } 
    };
  } catch (error) {
    console.error("Erro ao calcular ocupação:", error);
    return { success: false, error: "Falha ao calcular ocupação" };
  }
}
