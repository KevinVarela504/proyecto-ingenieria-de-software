<!-- Encabezado -->
## IS802 - 1000 - Ingeniería del software
## III PAC - 2021
### Proyecto - Grupo #4
### Integrantes 

| Nombre                          | Núnero de cuenta |
|:-------------------------------:|:----------------:|
| Edgar Josué Benedetto Godoy     | 20171033802      |

_______
_______
### Comandos utiles ```npm```

* Resolver problemas de dependencias

```js
npm install --legacy-peer-deps
npm install
npm run start:dev
```

### Comandos utiles ```nest```

_____
* Generador de CRUD completo

```js
nest g resource <nombreEntidad>
```

_____
_____
### Resolución de errores Postman

* Evitar el error al crear evento --> "message": "Invalid param id. Number expected"

```js
@Crud({
    model: {
        type: Event 
  }, 
  params: {
      id: {
          field: 'id',
        type: 'number',
        primary: true,
        disabled: true, // <= DESHABILITAR EL ID
    }
  }
})
```
_____
### Peticiones Postman

* Crear Evento (POST)

```json
{
    "name": "Convención Otaku",
    "description_": "Evento de exposición de becas",
    "startDate": "2021-01-01 00:00:00",
    "endDate": "2022-01-01 00:00:00",
    "places": 10,
    "openEvent": true,
    "modality":"virtual",
    "photo":"http://evento3.jpg",
    "institutionId":3
}
```
_______
_______
### Bibliografía
#### NEST JS

[Documentation](https://docs.nestjs.com/)

[Class-Validator](https://github.com/typestack/class-validator#passing-options)

[Controllers Documentation](https://github.com/nestjsx/crud/wiki/Controllers#params)

[Ejemplo Práctico](https://github.com/lujakob/nestjs-realworld-example-app)

[Controllers Documentation]()

#### Type ORM

[Entities Documentation](https://typeorm.io/#/entities)