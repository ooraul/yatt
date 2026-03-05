package com.ooraul.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ooraul.api.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
