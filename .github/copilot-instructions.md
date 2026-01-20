# Instrucciones de Integración del Proyecto Angular Rick and Morty

## 📌 Resumen del Proyecto Creado

Se ha creado una aplicación Angular completa y lista para usar que consume la API de Rick and Morty. A continuación encontrarás explicación detallada de cómo integrarlo.

## 🎯 Características Implementadas

✅ **Aplicación Angular 18** con arquitectura modular
✅ **Servicio HTTP** para consumir la API de Rick and Morty
✅ **Bootstrap 5** integrado para diseño responsive
✅ **Navbar personalizado** con Bootstrap
✅ **Cards de personajes** mostrando: imagen, nombre, estado y especie
✅ **Sistema de búsqueda** para filtrar personajes por nombre
✅ **Paginación completa** para navegar entre 42 páginas
✅ **Diseño responsive** para todos los dispositivos
✅ **Tema oscuro** profesional y atractivo

## 📂 Estructura de Carpetas Explicada

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/                    → Barra de navegación Bootstrap
│   │   │   ├── navbar.component.ts    → Lógica del navbar
│   │   │   └── navbar.component.css   → Estilos del navbar
│   │   │
│   │   └── character-list/            → Componente principal
│   │       ├── character-list.component.ts   → Lógica: búsqueda, paginación, carga
│   │       └── character-list.component.css  → Estilos específicos
│   │
│   ├── services/
│   │   └── character.service.ts       → Servicio para peticiones HTTP
│   │
│   ├── app.component.ts               → Componente raíz
│   ├── app.component.css              → Estilos globales
│   └── app.routes.ts                  → Configuración de rutas
│
├── main.ts                            → Punto de entrada de la app
├── index.html                         → HTML principal
└── styles.css                         → Estilos globales (variables CSS, Bootstrap)
```

## 🔍 Componentes Principales Explicados

### 1. **CharacterService** (character.service.ts)

Servicio que maneja todas las peticiones HTTP:

```typescript
// Obtener personajes paginados
getCharacters(page: number): Observable<CharacterResponse>

// Buscar personajes por nombre
searchCharacters(name: string, page: number): Observable<CharacterResponse>
```

**Interfaces TypeScript:**
- `Character`: Define la estructura de un personaje
- `CharacterResponse`: Define la respuesta de la API

### 2. **NavbarComponent** (navbar.component.ts)

Barra de navegación Bootstrap con:
- Logo "Rick & Morty"
- Menú con opciones: Inicio, Personajes, Información
- Responsive en dispositivos móviles
- Estilos personalizados con gradiente

### 3. **CharacterListComponent** (character-list.component.ts)

Componente principal con:

**Funcionalidades:**
1. **Carga inicial** de personajes (página 1)
2. **Búsqueda** - Filtra personajes por nombre en tiempo real
3. **Paginación** - Navega entre 42 páginas (20 personajes por página)
4. **Grid responsive** - 4 columnas (desktop), 2 (tablet), 1 (móvil)
5. **Manejo de errores** - Muestra mensajes si no encuentra personajes
6. **Loading state** - Spinner mientras carga

## 🚀 Pasos para Instalar y Ejecutar

### Paso 1: Instalar Dependencias

```bash
cd rick-morty-app
npm install
```

**¿Qué instala?**
- Angular 18 y todas sus librerías
- Bootstrap 5
- RxJS (programación reactiva)
- TypeScript
- Angular CLI

### Paso 2: Iniciar la Aplicación

```bash
npm start
# O equivalente a:
ng serve
```

**Resultado:**
```
✔ Compiled successfully.
✔ Application bundle generated successfully in 12.34 seconds.

Initial Chunk Files   | Names         |      Size
main.js              | main          |  250.23 kB
polyfills.js         | polyfills     |   89.42 kB
styles.css           | styles        |   12.56 kB

Application running on http://localhost:4200/
```

### Paso 3: Abrir en el Navegador

Ve a: **http://localhost:4200/**

¡La aplicación debe cargar con todos los personajes!

## 📋 Flujo de la Aplicación

1. **Inicio (ngOnInit)**
   - Se carga el componente `CharacterListComponent`
   - Se llama a `loadCharacters()` 
   - Se realiza petición HTTP a la API

2. **Búsqueda**
   - Usuario escribe en el input de búsqueda
   - Presiona Enter o hace clic en "Buscar"
   - Se llamada a `searchCharacters()`
   - API retorna solo personajes que coinciden

3. **Paginación**
   - Usuario hace clic en "Siguiente" o "Anterior"
   - Se incrementa/decrementa `currentPage`
   - Se carga de nuevo: `searchCharacters()` o `loadCharacters()`

## 🎨 Personalización

### Cambiar Colores del Tema

En `src/styles.css`, busca las variables CSS:

```css
:root {
  --primary-color: #00bfff;      /* Azul cian */
  --dark-bg: #1a1a1a;            /* Fondo principal */
  --card-bg: #2d2d2d;            /* Fondo de cards */
  --text-light: #e0e0e0;         /* Texto principal */
  --text-dark: #333333;          /* Texto alternativo */
}
```

Ejemplos de cambios:
```css
/* Cambiar a tema verde */
--primary-color: #00ff00;
--card-bg: #1a1a1a;

/* Cambiar a tema rojo */
--primary-color: #ff0000;
```

### Agregar Más Secciones al Navbar

En `navbar.component.ts`, en el template, agrega más `<li class="nav-item">`:

```html
<li class="nav-item">
  <a class="nav-link" href="/episodes">Episodios</a>
</li>
```

### Modificar Información Mostrada de Personajes

En `character-list.component.ts`, modifica el template para agregar más datos:

```html
<div>
  <span class="character-detail-label">Origen:</span>
  <span class="character-detail-value">{{ character.origin }}</span>
</div>
```

Nota: Debes actualizar la interfaz `Character` en `character.service.ts`

## 🔌 Integración con tu Proyecto

Si tienes un proyecto Angular existente, puedes copiar:

1. **Servicio** → Copia `src/app/services/character.service.ts` a tu proyecto
2. **Componentes** → Copia carpetas en `src/app/components/`
3. **Estilos** → Fusiona estilos de `src/styles.css`
4. **Rutas** → Importa en tu `app.routes.ts`:
   ```typescript
   import { CharacterListComponent } from './components/character-list/character-list.component';
   
   export const routes: Routes = [
     { path: 'characters', component: CharacterListComponent },
     // ... otras rutas
   ];
   ```
5. **HTML** → Importa el NavbarComponent en tu app principal

## 🧪 Testing

Para compilar el proyecto sin errores:

```bash
npm run build
```

Los archivos compilados estarán en `dist/rick-morty-app/`

## 📱 Características Responsive

El diseño se adapta a:
- **Desktop** (1200px+): 4 columnas de personajes
- **Tablet** (768px-1199px): 2 columnas de personajes
- **Móvil** (menos de 768px): 1 columna de personajes

## 🐛 Solución de Problemas

### Problema: Error de CORS
**Solución**: La API de Rick and Morty permite CORS. Si persiste:
1. Verifica conexión a internet
2. Abre DevTools (F12) → Network
3. Comprueba la URL exacta de la petición

### Problema: Módulo no encontrado
**Solución**: 
```bash
npm install
npm cache clean --force
```

### Problema: Puerto 4200 en uso
**Solución**:
```bash
ng serve --port 4300
```

## 📚 Recursos Adicionales

- **Documentación Angular**: https://angular.io/
- **Bootstrap 5**: https://getbootstrap.com/
- **API Rick and Morty**: https://rickandmortyapi.com/
- **RxJS**: https://rxjs.dev/

## ✨ Próximas Mejoras Sugeridas

1. ✨ Agregar filtros por estado (Vivo/Muerto)
2. ✨ Página de detalles individual de personaje
3. ✨ Favoritos (localStorage)
4. ✨ Historial de búsquedas
5. ✨ Filtro por especie
6. ✨ Ordenamiento (A-Z, etc.)

---

**¡La aplicación está lista para usar!** 🎉

Cualquier duda sobre la integración, consulta los archivos del proyecto o la documentación de Angular oficial.
