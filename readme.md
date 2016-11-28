# Features
**Gulp: Sass, Uglify, Browser-sync, Cssnano, Sourcemaps css, Plumber, Imagemin**
Pre-install Bootstrap 3: 13 material themes pre-configurados + organización de carpetas de sass
y listo para empezar a codear.

![Gulp-Dev](https://raw.githubusercontent.com/kenyk7/Gulp-Dev/master/src/Gulpdev.png "Gulp-Dev")
## Gulp-Dev

Pasos a seguir para utilizar el automatizador de tareas **Gulp**

### Requisitos:
  - Tener instalado **nodejs** y **npm**
  - Instalar **yarn**, **gulp**, **bower** y **browser-sync**:opcional de forma **global**

```sh
$ npm install -g yarn gulp bower browser-sync
```
  - Una vez instalados los paquetes globales iniciamos la instalación de los paquetes locales de desarrollo 

```sh
$ yarn install
$ bower install
```

  - Lo siguiente es abrir el archivo **gulpfile.js** y hacer la siguientes ajustes(solo si estas usando un proxy):
    - Cambiar la variable **useproxy** a true y **proxyUrl** por la url de tu entorno de desarrollo local del proyecto si estas usando un proxy
    - También puedes configurar el puerto(**localPort**) en el que desees que se ejecute browserSync
  - Una vez hecho lo anterior abrir una terminal en esta carpeta y ejecutar:

```sh
$ gulp
```
```sh
$ gulp serve
```
```sh
$ gulp dist
```

**NOTA:**
  - Con **gulp serve** solo se activa el modo de desarrollo en vivo(**.php|.html**).
  - Con **gulp** se activa también el desarrollo en vivo con escucha de **todos** los archivos de desarrollo de la carpeta **src/(js,sass,img)**  + **.php**
  - y con **gulp dist** generas los archivos para producción y ya puedes enviar los cambios al git
  - la carpeta assets es  la carpeta de dist por default.

**Recomendación**

En caso de errores prueba instalar de nuevo los paquetes de node y bower
```sh
$ yarn install
$ bower install
```

## Customize gulpfile.js

Primero configurar si va usar usar un proxy (para desarrollo en php u otro) en **true** y configura tu proxy(local.app.com)
o desarrollo estático html proxy = **false** y agrega a las **variables scripts y plugins**  los scripts que necesitas que
compile y vuelve a ejecutar gulp.

## Sass utils core
Use sass mixin responsive helpers file in `sass/mixin/_media_queries.scss`

Example use `@include maxw(xs){};` for  `@media (max-width: 767px){};`

Or use `@include minw(xs){};` for  `@media (min-width: 768px){};`

#### Input sass example use mixin mq and style code sass for component
```scss
.my-component{
    // use example props test
    font-size: 18px;
    margin-bottom: 20px;
    & &-head{
        background: blue;
    }
    & &-title{
        color: white;
    }
    & &-body{
        background: #eee;
    }
    & &-footer{
        background: #ccc;
    }
    // use max-width
    @include maxw(sm){
        font-size: 16px;
    }
    @include maxw(xs){
        font-size: 15px;
    }
    @include maxw(xxs){
        font-size: 14px;
        & &-head{
            background: darkblue;
        }
    }
    // use max-width mq custom
    @include maxw(360px){
        margin-bottom: 20px;
    }
    // use min-width
    @include minw(xs){
        margin-bottom: 30px;
    }
    // use min-width mq custom
    @include minw(360px){
        margin-bottom: 30px;
    }
}
```

#### Output css
```css
.my-component {
    font-size: 18px;
    margin-bottom: 20px;
}
.my-component .my-component-head {
    background: blue;
}
.my-component .my-component-title {
    color: white;
}
.my-component .my-component-body {
    background: #eee;
}
.my-component .my-component-footer {
    background: #ccc;
}

@media (min-width: 360px) {
  .my-component {
    margin-bottom: 30px;
  }
}

@media (max-width: 991px) {
    .my-component{
        font-size: 16px;
    }
}

// More props define media queries ...

```

#### Existing mixin media queries:
Mixin `maxw($breakpoint)` with parameters **md** = 1199px , **sm** = 991px , **xs** = 767px , **xxs** = 479px.

Example `@include maxw(md){...};`  output  `@media (max-width: 1199px){...};`

Mixin `minw($breakpoint)` with parameters **md** = 1200px , **sm** = 992px , **xs** = 768px , **xxs** = 480px.

Example `@include minw(xs){...};`  output  `@media (max-width: 768px){...};`


License
----
MIT
