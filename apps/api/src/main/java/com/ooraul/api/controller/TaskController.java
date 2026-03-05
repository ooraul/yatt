package com.ooraul.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ooraul.api.entity.Task;
import com.ooraul.api.service.TaskService;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        Task newTask = taskService.addTask(task);

        return ResponseEntity.status(HttpStatus.CREATED).body(newTask);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> allTasks = taskService.getAllTasks();
        
        return ResponseEntity.status(HttpStatus.OK).body(allTasks);
    }
}
