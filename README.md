# Portal Interdimensional - Explorador de Dimensiones

Una aplicación web moderna que explora diferentes dimensiones y sus habitantes, consumiendo datos de la API de Rick and Morty con un diseño totalmente renovado.

## 🚀 Características

- **Conexión a API REST**: Integración con API pública de personajes
- **Búsqueda básica**: Filtra personajes por nombre
- **Navegación simple**: Navega entre diferentes páginas
- **Diseño con Glassmorphism**: UI moderna con efectos de vidrio y gradientes
- **Cards Horizontales**: Diseño innovador en lugar de las típicas tarjetas verticales
- **Navbar Minimalista**: Navegación simple y elegante
- **Tema Púrpura/Cyan**: Paleta de colores futurista con gradientes vibrantes
- **Animaciones Suaves**: Efectos visuales modernos y atractivos

## 🎨 Diseño Visual

El proyecto utiliza un esquema de colores completamente diferente:
- Gradientes púrpura (#667eea) y rosa (#f093fb)
- Acentos cyan (#00f2fe) y azul (#4facfe)
- Efectos glassmorphism con blur
- Fondo oscuro con gradientes animados

## 📋 Requisitos Previos

- Node.js 18+
- npm 9+
- Angular CLI 18+

## 🛠️ Instalación

```bash
# Navegar al proyecto
cd rick-morty-app-actividad

# Instalar dependencias
npm install
```

## 🎯 Ejecución

```bash
# Iniciar servidor de desarrollo
npm start

# La aplicación se abrirá en http://localhost:4200/
```

## 📁 Estructura del Proyecto

```
portal-interdimensional/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── character-list/
│   │   │   └── character-detail/
│   │   ├── services/
│   │   │   └── character.service.ts
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
```

## 🔧 Funcionalidades

### Servicio de Datos (character.service.ts)

El servicio maneja las peticiones HTTP:

```typescript
getCharacters(page: number): Observable<CharacterResponse>
searchCharacters(name: string, page: number): Observable<CharacterResponse>
```

### Componentes

**NavbarComponent**: Barra de navegación minimalista
- Título: "Portal Interdimensional"
- Enlaces básicos simplificados

**CharacterListComponent**: Componente principal simplificado
- Búsqueda manual (sin debounce)
- Paginación simple (adelante/atrás)
- Grid de 2 columnas
- Mensajes personalizados

## 🎨 Personalización

### Modificar Colores

Edita las variables en `src/styles.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
```

### Cambiar el Layout

Las tarjetas están configuradas en modo horizontal. Para cambiarlas de nuevo a vertical, modifica la clase `.character-card` en `styles.css`.

## 📡 API Utilizada

**Endpoint**: `https://rickandmortyapi.com/api/character`

### Parámetros

- `page`: Número de página
- `name`: Búsqueda por nombre

### Respuesta Ejemplo

```json
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "...",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "image": "https://..."
    }
  ]
}
```

## 🚀 Deploy

### Compilar para Producción

```bash
npm run build
```

Los archivos estarán en `dist/`

### Opciones de Hosting

- Vercel
- Netlify  
- GitHub Pages
- Firebase Hosting

## 🐛 Solución de Problemas

### El proyecto no inicia

```bash
# Limpia la caché
npm cache clean --force

# Reinstala
rm -rf node_modules package-lock.json
npm install
```

### Errores de conexión

1. Verifica tu conexión a internet
2. Comprueba que la API esté disponible
3. Revisa la consola del navegador (F12)

## 📚 Tecnologías

- **Angular 18**: Framework principal
- **TypeScript**: Lenguaje de programación
- **Bootstrap 5**: Sistema de grid
- **RxJS**: Manejo reactivo de datos
- **Google Fonts (Poppins)**: Tipografía moderna
- **CSS Moderno**: Glassmorphism, gradientes, animaciones

## ✨ Diferencias con el Original

Este proyecto ha sido completamente renovado:

1. **Diseño**: Gradientes púrpura/cyan vs. tema naranja original
2. **Layout**: Cards horizontales vs. verticales
3. **Funcionalidad**: Simplificada (sin navegación directa a páginas, sin búsqueda en tiempo real)
4. **Nombre**: "Portal Interdimensional" vs. "Rick and Morty App"
5. **Paginación**: Simple (adelante/atrás) vs. numérica compleja
6. **Modo oscuro**: Removido
7. **Estilos**: Glassmorphism vs. diseño plano

## 📄 Licencia

Proyecto educativo de código abierto.

## 📞 Nota

Esta es una versión modificada con fines educativos. No está afiliada con Rick and Morty o Adult Swim.

---

**Versión**: 2.0 - Portal Interdimensional Edition

