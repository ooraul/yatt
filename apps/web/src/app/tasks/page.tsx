import { ModeToggle } from "@/components/ui/modetoggle";

import { api } from "@/service/api";
import { Task } from "@/types/task";

import { revalidatePath } from "next/cache";

import { TaskItem } from "@/components/TaskItem";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { Separator } from "@/components/ui/separator";

async function getAllTasks(): Promise<Task[]> {
    try {
        const res = await api.get<Task[]>('/tasks');
        return res.data;
    } catch (error) {
        console.error("Error while fetching tasks:", error);
        return [];
    }
}

async function addTask(formData: FormData) {
    'use server';
    const description = formData.get('description') as string;

    try {
        await api.post(`/tasks`, {
            description: description
        })
    
        revalidatePath('/tasks');
    } catch (error) {
        console.error(`Error while adding a new task:`, error);
    }
}

export default async function TasksPage() {
    const tasks = await getAllTasks();

    return (
        <main className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
            <header className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-medium tracking-tight select-none text-primary">yatt</h1>
                    <AddTaskDialog addTaskAction={addTask} />
                </div>
                <ModeToggle />
            </header>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-3xl mx-auto py-4">
                    {tasks.filter(x => x.completed).length == tasks.length && (
                        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                            <p className="text-sm select-none">All tasks completed.</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        {tasks.filter(x => !x.completed).length > 0 && (
                            <div className="flex flex-col gap-1">
                                {tasks.filter(x => !x.completed).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map((task) => (
                                    <TaskItem key={task.id} task={task} />
                                ))}
                            </div>
                        )}
                        
                        <Separator />

                        {tasks.filter(x => x.completed).length > 0 && (
                            <div className="flex flex-col gap-1">
                                {tasks.filter(x => x.completed).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map((task) => (
                                    <TaskItem key={task.id} task={task} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </main>
    );
}