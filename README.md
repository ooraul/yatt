# yatt (Yet Another Task Tracker)

A simple and minimalist task tracker. Made with Spring Boot and Next.js.

## API endpoints

| Method   | URL                                      | Code | Description                       |
| -------- | ---------------------------------------- | ---- | --------------------------------- |
| `GET`    | `/tasks`                                 | 200  | Retrieve all tasks.                      |
| `POST`   | `/tasks`                                 | 201  | Create a new task.                       |
| `GET`    | `/tasks/{id}`                            | 200  | Return task details using its id.        |
| `PATCH`  | `/tasks/{id}`                            | 200  | Update a task with the specified id.     |
| `DELETE` | `/tasks/{id}`                            | 204  | Delete a task with the specified id.     |
