"use client";

import { CheckSquare, Clock, MapPin, Trash2, User } from "lucide-react";
import { toggleTaskStatus, deleteTask } from "@/app/actions/operational";
import { useState } from "react";
import { toast } from "sonner";

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    status: string;
    dueDate: Date;
    description: string | null;
    property: { name: string } | null;
  }
}

export function TaskItem({ task }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      const result = await toggleTaskStatus(task.id, task.status);
      if (!result.success) {
        toast.error("Erro ao atualizar tarefa");
      }
    } catch (e) {
      toast.error("Erro de conexão");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Excluir tarefa?")) return;
    setIsDeleting(true);
    try {
      const result = await deleteTask(task.id);
      if (result.success) {
        toast.success("Tarefa excluída");
      } else {
        toast.error("Erro ao excluir");
      }
    } catch (e) {
      toast.error("Erro desconhecido");
    } finally {
      setIsDeleting(false);
    }
  };

  const time = new Date(task.dueDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const isCompleted = task.status === 'completed';

  return (
    <div className={`bg-white rounded-xl border p-4 flex items-center gap-4 transition-all hover:border-slate-300 group ${
      isCompleted ? 'opacity-60' : ''
    }`}>
      <button 
        onClick={handleToggle}
        disabled={isToggling}
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
        isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 group-hover:border-sky-500'
      }`}>
        {isCompleted && <CheckSquare size={14} />}
      </button>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className={`font-bold text-slate-900 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
            {task.title}
          </h3>
          {task.description === 'personal' && (
            <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider">
              Pessoal
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock size={14} />
            {time}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={14} />
            {task.property?.name || "Geral"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-500">
          <User size={14} />
        </div>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
          title="Excluir tarefa"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
