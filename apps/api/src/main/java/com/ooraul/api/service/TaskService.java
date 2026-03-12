package com.ooraul.api.service;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ooraul.api.entity.Task;
import com.ooraul.api.exceptions.TaskNotFound;
import com.ooraul.api.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFound("No task found with ID: " + id));
    }

    public Task updateTask(Long id, Task task) {
        Task updatedTask = getTaskById(id);

        if (task.getDescription() != null) {
            updatedTask.setDescription(task.getDescription());
        }

        updatedTask.setCompleted(task.isCompleted());

        if (task.isCompleted()) {
            updatedTask.setEndDate(Instant.now());
        } else {
            updatedTask.setEndDate(null);
        }

        return taskRepository.save(updatedTask);
    }

    public void deleteTask(Long id) {
        Task task = getTaskById(id);

        taskRepository.delete(task);
    }

}
