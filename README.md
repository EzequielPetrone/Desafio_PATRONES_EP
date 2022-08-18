# DESAFIO: PATRONES
## EZEQUIEL PETRONE

## Comentarios entregable actual:

- Patrón Factory implementado.

En la capa de negocio, más precisamente en /src/services/productServices.js, instancio un contenedor de Productos según el TIPO de Persistencia elegido (por el parámetro -t por línea de comandos)

Pueden ser: "MONGO" (default) o "FILE"

Es decir, inicio mi app así por ejemplo: 
node server.js -t FILE

El código de la clase Factory se encuentra en /src/model/daos/FactoryProductos.js

- Entiendo que el concepto de DTO se puede apreciar ya que independientemente del DAO que se utilice (es decir, de la fuente de datos seleccionada) el objeto que maneja la capa de negocio para comunicarse bidireccionalmente con la capa superior está definido y es siempre el mismo.

- Patrón Singleton implementado (para las conexiones Mongo! sólo se hace un único mongoose.connect() lo largo de toda la app, independientemente de los diferentes models que se utilicen)

Definido en /src/model/models/SingletonMongo.js

Utilizado al instanciar el model de productos (que luego utiliza el DAO de productos) en /src/model/models/productos.js y al configurar el model de Usuarios (que luego utiliza passport) en /src/model/models/usuarios.js

- Cuando se trata de persistencia por File no le encuentro mucho sentido a utilizar Singleton dado que al instanciar un ContenedorFile naturalmente el .json en cuestión va a ser único...

- Repito comentario del entregable interior: En la configuración de passport local me pareció muy complejo separar la capa de persistencia... Ya que el código que vimos en clase hace callbacks de callbacks dentro de los métodos mongoose... Es por eso que al menos por ahora lo dejé así (y por ejemplo no permito que la persistencia de usuarios sea por File)

- Patrón Repository: análisis de implementación en curso...

## Comentarios entregable anterior:

- Los Routers utilizan middlewares y controllers seteados en las respectivas carpetas homonimas

- En el caso de los controllers asociados a las rutas main, login, signup, logout, etc. no hizo falta setear Services dado que lo único que hacen es renderizar o redirigir...

- En el caso de los controllers asociados al API router sí se setearon los Services correspondientes (pero lo que no hizo falta es comunicación con la capa de persistencia)

- En server.js tuve que dejar todo lo relaionado con los seteos del socket.io (dado que es un esquema diferente al de manejo de routes) pero al menos pude hacer que se utilicen funciones de la capa de servicio y no de la capa de persistencia directamente!

- En la configuración de passport local me pareció muy complejo separar la capa de persistencia... Ya que el código que vimos en clase hace callbacks de callbacks dentro de los métodos mongoose...

- Más allá de separar todo según las capas vistas en clase, también aproveché para modularizar otros aspectos del código como pueden ser la configuración de la session, las estrategias de passport local o el seteo de mi winston logger, por ejemplo.
