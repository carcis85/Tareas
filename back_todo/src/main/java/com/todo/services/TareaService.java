package com.todo.services;


import com.todo.model.Estado;
import com.todo.model.Tarea;
import com.todo.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TareaService {

    @Autowired
    public TareaRepository tareaRepository;

    public List<Tarea> getAllTareas() {
        return tareaRepository.findAll();
    }

    public Tarea newTarea(String titulo, LocalDate fecha, Estado estado, String descripcion){
        Tarea tarea = new Tarea();
        tarea.setTitulo(titulo);
        tarea.setFecha(fecha);
        tarea.setEstado(estado);
        tarea.setDescripcion(descripcion);
        tareaRepository.save(tarea);
        return tarea;
    }

    //Spring Data JPA devuelve un Optional<T> cuando haces findById(id) porque no sabe si la entidad existe.
    // Usar Optional te obliga a manejar el caso en que no se encuentra, en vez de que la app crashee.

    public Tarea updateTarea(Long id, String nuevoTitulo, Estado nuevoEstado, String nuevaDescripcion) {
        Optional<Tarea> tareaOpt = tareaRepository.findById(id);
        if (tareaOpt.isEmpty()) {
            throw new RuntimeException("Tarea no encontrada con id " + id);
        }

        Tarea tarea = tareaOpt.get();
        tarea.setTitulo(nuevoTitulo);
        tarea.setEstado(nuevoEstado);
        tarea.setDescripcion(nuevaDescripcion);

        return tareaRepository.save(tarea);
    }


    public String deleteTarea(Long id){
        if (!tareaRepository.existsById(id)){
            throw new RuntimeException("No se puede eliminar la tarea con id  " + id);
        }
         tareaRepository.deleteById(id);
        return "Tarea con ID " + id + " eliminada correctamente.";
    }


}
