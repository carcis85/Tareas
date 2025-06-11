package com.todo.controller;


import com.todo.model.Estado;
import com.todo.model.Tarea;
import com.todo.services.TareaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


// @CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tareas")
public class TareaController {

    public final TareaService tareaService;
    public TareaController(TareaService tareaService) {
        this.tareaService = tareaService;
    }

    @GetMapping
    public List<Tarea>  getAllTareas(){
        return tareaService.getAllTareas();
    }

    @PostMapping
    public Tarea newTarea(@RequestBody Tarea tarea){
         tarea.setId(null); 
        return tareaService.newTarea(
                tarea.getTitulo(),
                tarea.getFecha(),
                (Estado) tarea.getEstado(),
                tarea.getDescripcion()

        );
    }


    @PutMapping("/{id}")
    public Tarea updateTarea(@PathVariable Long id, @RequestBody Tarea tarea){
        return tareaService.updateTarea(id, tarea.getTitulo(), (Estado) tarea.getEstado(), tarea.getDescripcion());
    }


    @DeleteMapping("/{id}")
public ResponseEntity<Void> deleteTarea(@PathVariable Long id) {
    try {
        tareaService.deleteTarea(id);
        return ResponseEntity.noContent().build(); // 204 No Content, sin cuerpo
    } catch (RuntimeException e) {
        return ResponseEntity.notFound().build();
    }
}












}
