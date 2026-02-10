import { getImprovements, completeImprovement } from "@/app/actions/improvements";
import { currentUser } from "@clerk/nextjs/server";
import { CheckCircle2, Lightbulb } from "lucide-react";
import { ImprovementForm } from "@/components/admin/improvement-form";
import { SubmitButton } from "@/components/admin/submit-button";

const DEV_EMAIL = (process.env.DEV_EMAIL || "smkdigitallabs@gmail.com").toLowerCase();

export default async function MelhoriasPage() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "";
  const isDeveloper = email === DEV_EMAIL;

  const { data: improvements, error } = await getImprovements();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Melhorias</h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Sugestões de evolução da aplicação Entre Marés. O cliente cadastra ideias, e
            o desenvolvedor marca como concluídas com data e versão.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {error && (
            <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-sm text-destructive">
              {error}
            </div>
          )}

          {!improvements || improvements.length === 0 ? (
            <div className="p-8 rounded-2xl border border-dashed border-border bg-secondary/10 text-center">
              <p className="text-sm text-muted-foreground">
                Ainda não há melhorias cadastradas. Use o formulário ao lado para sugerir
                a primeira melhoria.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {improvements.map((improvement) => {
                const isCompleted = improvement.status === "completed";
                const createdAt = new Date(improvement.createdAt);
                const completedAt = improvement.completedAt
                  ? new Date(improvement.completedAt)
                  : null;

                return (
                  <div
                    key={improvement.id}
                    className="bg-card rounded-xl border border-border p-4 flex flex-col md:flex-row md:items-start gap-4 shadow-sm"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-semibold text-sm md:text-base text-foreground ${
                            isCompleted ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {improvement.title}
                        </h3>
                      </div>

                      {improvement.description && (
                        <p
                          className={`text-sm text-muted-foreground ${
                            isCompleted ? "line-through" : ""
                          }`}
                        >
                          {improvement.description}
                        </p>
                      )}

                      <p className="text-xs text-muted-foreground">
                        Cadastrado por {improvement.createdByEmail || "cliente"} em
                        {" "}
                        {createdAt.toLocaleDateString("pt-BR")}
                      </p>

                      {isCompleted && completedAt && (
                        <p className="text-xs text-emerald-700 mt-1 flex items-center gap-1">
                          <CheckCircle2 size={14} />
                          Concluída em {completedAt.toLocaleDateString("pt-BR")} • versão
                          {" "}
                          {improvement.completedVersion || "-"}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 min-w-[140px]">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase border ${
                          isCompleted
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {isCompleted ? "Concluída" : "Em avaliação"}
                      </span>

                      {!isCompleted && isDeveloper && (
                        <form action={completeImprovement}>
                          <input type="hidden" name="id" value={improvement.id} />
                          <SubmitButton className="mt-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                            <span className="inline-flex items-center gap-2">
                              <CheckCircle2 size={14} />
                              Concluir melhoria
                            </span>
                          </SubmitButton>
                        </form>
                      )}

                      {!isCompleted && !isDeveloper && (
                        <p className="text-[11px] text-muted-foreground text-right max-w-[180px]">
                          Apenas o desenvolvedor pode marcar melhorias como concluídas.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Lightbulb size={20} />
            </div>
            <div className="space-y-1">
              <h2 className="font-semibold text-sm text-foreground">
                Como funciona a sessão de melhorias
              </h2>
              <p className="text-xs text-muted-foreground">
                O cliente sugere melhorias livremente. Apenas o e-mail
                smkdigitallabs@gmail.com pode marcar uma melhoria como concluída.
                Ao concluir, registramos a data e a versão da aplicação.
              </p>
            </div>
          </div>

          <ImprovementForm />
        </div>
      </div>
    </div>
  );
}
