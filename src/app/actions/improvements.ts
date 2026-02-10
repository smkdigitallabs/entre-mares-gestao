'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import packageJson from "../../../package.json";

const DEV_EMAIL = (process.env.DEV_EMAIL || "smkdigitallabs@gmail.com").toLowerCase();

export async function getImprovements() {
  const { userId } = await auth();
  if (!userId) return { error: "Não autorizado" };

  try {
    const improvements = await prisma.improvement.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return { data: improvements };
  } catch (error) {
    console.error("Erro ao buscar melhorias:", error);
    return { error: "Falha ao carregar melhorias" };
  }
}

export async function createImprovement(formData: FormData) {
  const { userId } = await auth();
  if (!userId) return { error: "Não autorizado" };

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;

  const rawTitle = formData.get("title");
  const rawDescription = formData.get("description");

  const title = typeof rawTitle === "string" ? rawTitle.trim() : "";
  const description =
    typeof rawDescription === "string" && rawDescription.trim().length > 0
      ? rawDescription.trim()
      : null;

  if (!title) {
    return { error: "Título é obrigatório" };
  }

  try {
    await prisma.improvement.create({
      data: {
        title,
        description,
        status: "pending",
        createdById: userId,
        createdByEmail: email,
      },
    });

    revalidatePath("/melhorias");
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar melhoria:", error);
    return { error: "Falha ao criar melhoria" };
  }
}

export async function completeImprovement(formData: FormData): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Não autorizado");

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "";

  if (email !== DEV_EMAIL) {
    throw new Error("Apenas o desenvolvedor pode concluir melhorias");
  }

  const rawId = formData.get("id");
  const id = typeof rawId === "string" ? rawId : "";

  if (!id) {
    throw new Error("ID da melhoria inválido");
  }

  try {
    await prisma.improvement.update({
      where: { id },
      data: {
        status: "completed",
        completedAt: new Date(),
        completedById: userId,
        completedVersion: packageJson.version,
      },
    });

    revalidatePath("/melhorias");
  } catch (error) {
    console.error("Erro ao concluir melhoria:", error);
    throw new Error("Falha ao concluir melhoria");
  }
}
