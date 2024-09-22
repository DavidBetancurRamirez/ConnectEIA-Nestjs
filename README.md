# Plantilla Nest.js
Plantilla usada para proyectos de nest.js


## Ejecutar
**Levantar BD con docker:**
```
  docker compose up -d
```

**Descargar dependencias:**
```
  npm i
```

**Ejecutar:**
```
  npm run dev
```


## Contenido
- *Documentación con swagger*
- *Tipos de usuarios*
  1. **user**, por defecto
  2. **admin**, permisos para hacer todo


## Modulos
Unicamente explicación de que hace cada ruta, se ve mejor con swagger: *(/docs)*
### Auth
**Opciones:**
- (*/auth/login*) *Login*: Devuelve el token para autenticación
- (*/auth/register*) *Register*: Crear nuevo usuario
- (*/auth/profile*) *Profile*: Devuelve la info propia

---
### User
**Opciones solo para usuario con rol admin:**
- (*/user*) *FindAll*: Devuelve todos los usuarios
- (*/user/:id*) *FindOne*: Devuelve el usuario con el id proporcionado
- (*/user*) *CreateUser*: Crear un usuario
- (*/user/:id*) *UpdateUser*: Actualizar un usuario
- (*/user/:id*) *DeleteUser*: Eliminar un usuario


## Comandos Utiles
**Generar un modulo por comandos:**
```
  nest g res name --no-spec
```
