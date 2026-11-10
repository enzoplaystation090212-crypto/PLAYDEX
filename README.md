# PLAYDEX con GameBrain (sin RAWG ni IGDB)

## Incluye
- Buscador de GameBrain, fichas, imágenes, capturas, géneros, plataformas, descripción corta y puntuaciones.
- Enlaces a tiendas/ofertas cuando el proveedor los devuelve.
- Gameplay incrustado si está disponible en los datos.
- YouTube API opcional configurada en el servidor.

## Configuración
1. Instala Node.js LTS: https://nodejs.org/
2. Abre Terminal dentro de esta carpeta y ejecuta `npm install`.
3. Copia `.env.example` a `.env`.
4. Crea una API key en https://gamebrain.com/api y pégala en `GAMEBRAIN_API_KEY`.
5. (Opcional) añade una clave YouTube Data API v3 en `YOUTUBE_API_KEY`.
6. Ejecuta `npm start` y abre http://localhost:3000

## Límites y condiciones
GameBrain Free es para proyectos personales/no comerciales, dispone de 50 tokens al día y requiere backlink a GameBrain. Revisa su plan y condiciones antes de publicar. La API no garantiza jugadores esports ni controles profesionales para todos los títulos.
Nunca publiques `.env` ni compartas las claves.
