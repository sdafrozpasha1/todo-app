
package com.example.todo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin
public class TodoController {

    private final TodoRepository repo;

    public TodoController(TodoRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo){
        return repo.save(todo);
    }

    @GetMapping
    public List<Todo> getAll(@RequestParam(required = false) Boolean completed){
        if(completed != null)
            return repo.findByCompleted(completed);
        return repo.findAll();
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo updated){
        Todo todo = repo.findById(id).orElseThrow();
        todo.setTitle(updated.getTitle());
        todo.setDescription(updated.getDescription());
        todo.setCompleted(updated.isCompleted());
        return repo.save(todo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        repo.deleteById(id);
    }
}
