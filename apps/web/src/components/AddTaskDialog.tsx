'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AddTaskDialogProps {
  addTaskAction: (formData: FormData) => Promise<void>;
}

export function AddTaskDialog({ addTaskAction }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await addTaskAction(formData);
    setOpen(false);
  }

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="ghost" className="flex gap-2 hover:bg-accent cursor-pointer">
                <span className="text-xl">+</span>
                <span className="font-medium">Add Task</span>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <form action={handleSubmit}>
                <DialogHeader>
                    <DialogTitle className="select-none">New Task</DialogTitle>
                </DialogHeader>
                <Field className="my-4">
                    <Textarea 
                        name="description"
                        id="add-task-textarea" 
                        placeholder="Task details..."
                        className="resize-none border-none focus-visible:ring-0 text-lg"
                        required
                    />
                </Field>
                <div className="flex justify-end gap-2">
                    <Button type="submit" className="px-6 cursor-pointer">Done</Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  );
}