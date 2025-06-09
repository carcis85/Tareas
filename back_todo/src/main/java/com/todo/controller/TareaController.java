package com.todo.controller;


import com.todo.model.Estado;
import com.todo.model.Tarea;
import com.todo.services.TareaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
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
    public ResponseEntity<String> deleteTarea(@PathVariable Long id){
        try {
         tareaService.deleteTarea(id);
         return ResponseEntity.ok("Tarea borrada");
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea no encontrada");
        }
    }








}
