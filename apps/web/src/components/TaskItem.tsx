'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { Task } from "@/types/task";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

export function TaskItem({ task }: { task: Task }) {
    const router = useRouter();

    const updateTaskCompletion = async (completed: boolean) => {
        try {
            await api.patch(`/tasks/${task.id}`, {
                completed: completed
            })
            router.refresh();
        } catch (error) {
            console.error(`Error while updating task with id ${task.id}:`, error);
        }
    }

    const deleteTask = async () => {
        try {
            await api.delete(`/tasks/${task.id}`);
            router.refresh();
        } catch (error) {
            console.error(`Error while deleting task with id ${task.id}:`, error);
        }
    }

    return (
        <Card className="group rounded-sm border-none shadow-none hover:bg-accent/50 transition-colors border-b border-border/40 last:border-none">
            <CardContent className="flex items-start gap-4 px-6 py-3">
                <div>
                    <Checkbox 
                        id={`checkbox-${task.id}`} 
                        checked={task.completed}
                        onCheckedChange={(checked: boolean) => updateTaskCompletion(checked)}
                        className="h-5 w-5 border-2 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all cursor-pointer"
                    />
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                    <label 
                        htmlFor={`checkbox-${task.id}`}
                        className={`text-sm font-medium leading-none cursor-pointer select-none transition-all ${
                            task.completed ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                    >
                        Task {task.id}
                    </label>
                    
                    {task.description && (
                        <p className={`text-xs mt-1.5 line-clamp-2 ${
                            task.completed ? "text-muted-foreground/60" : "text-muted-foreground"
                        }`}>
                            {task.description}
                        </p>
                    )}

                    <div className="flex items-center gap-3 mt-2">
                        <Badge variant="secondary" className="text-[10px] font-normal py-0 px-2 bg-secondary/50 select-none">
                            {new Date(task.startDate).toLocaleDateString()}
                        </Badge>
                        {task.completed ? (
                            <Badge variant="destructive" className="text-[10px] font-normal py-0 px-2 bg-secondary/50 select-none">{new Date(task.endDate!).toLocaleDateString()}</Badge>
                        ) : ""}
                    </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer rounded-full"
                        title="Delete task"
                        onClick={deleteTask}
                    >
                        <Trash />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}