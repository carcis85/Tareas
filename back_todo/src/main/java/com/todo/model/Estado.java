package com.todo.model;

import com.fasterxml.jackson.annotation.JsonCreator;


public enum Estado {

    ACTIVO, PENDIENTE, BLOQUEADO, COMPLETADO;

    @JsonCreator
    public static Estado fromString(String estado) {
        return Estado.valueOf(estado.toUpperCase());
    }

}
