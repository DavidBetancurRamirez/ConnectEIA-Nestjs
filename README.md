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

**Variables necesarias en el .env para modo dev:**
```
  DB_HOST=
  DB_PORT=
  DB_USERNAME=
  DB_PASSWORD=
  DB_NAME=
  DB_SSL=
  JWT_SECRET=
  JWT_REFRESH_SECRET=
```

**Ejecutar modo dev:**
```
  npm run dev
```


## Contenido
- *Documentación con swagger*
- *Tipos de usuarios*
  1. **user:** por defecto
  2. **admin:** permiso para hacer todo


## Modulos
### Auth
**Rutas:**
- **Post** *(/auth/register) Register:* Crear nuevo usuario y devuelver sus credenciales
- **Post** *(/auth/login) Login:* Devuelver las credenciales; por autenticación email-password
- **Post** *(/auth/refresh-token) Refresh Token:* Devuelver las credenciales; con refreshToken

---
### User
**Rutas:**
*Requieren Rol user o admin*
- **Get** *(/user) Profile:* Devuelve la informacion del usuario que hace la petición
- **Patch** *(/user) Update:* Actualizar al usuario que hace la petición
- **Delete** *(/user/:id) Remove:* Eliminar al usuario que hace la petición

*Requieren Rol admin*
- **Get** *(/user/users) FindAll:* Devuelve todos los usuarios; ordenados por id
- **Get** *(/user/:id) FindOne:* Devuelve el usuario con el id proporcionado
- **Post** *(/user) CreateUser:* Crear un usuario
- **Patch** *(/user/:id) UpdateUser:* Actualizar un usuario
- **Delete** *(/user/:id) RemoveUser:* Eliminar un usuario


## Info util
**Generar un modulo por comandos:**
```
  nest g res name --no-spec
```

**Para implementar la autenticación en otro modulo:**
*example.module.ts*
```
  @Module({
    imports: [AuthModule],
  })
  export class ExampleModule {}
```
