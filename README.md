
## 🚀 Tecnologías usadas

- ⚛️ React
- 🧠 Redux + React-Redux
- 📦 JSON como mock de base de datos
- 💅 CSS 

---

## 📁 Estructura del proyecto

```
📦 src
 ┣ 📂 api
 ┃ ┗ 📄 products.js
 ┣ 📂 Components
 ┃ ┣ 📂 common
 ┃ ┃ ┣ 📄 Button.js
 ┃ ┃ ┣ 📄 CardProduct.js
 ┃ ┃ ┣ 📄 Field.js
 ┃ ┃ ┣ 📄 Footer.js
 ┃ ┃ ┣ 📄 Header.js
 ┃ ┃ ┣ 📄 Loader.js
 ┃ ┃ ┣ 📄 Message.js
 ┃ ┃ ┗ 📄 Nadvar.js
 ┃ ┣ 📂 modals
 ┃ ┃ ┗ 📄 Modal.js
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📄 ProductDetail.js
 ┃ ┃ ┣ 📄 ProductForm.js
 ┃ ┃ ┗ 📄 ProductList.js
 ┃ ┣ 📂 styles
 ┃ ┃ ┣ 📄 CardProduct.css
 ┃ ┃ ┣ 📄 Footer.css
 ┃ ┃ ┣ 📄 Header.css
 ┃ ┃ ┣ 📄 Message.css
 ┃ ┃ ┣ 📄 Modal.css
 ┃ ┃ ┣ 📄 ProductDetail.css
 ┃ ┃ ┗ 📄 ProductList.css
 ┃ ┗ 📄 App.js
 ┣ 📂 img
 ┃ ┗ 📄 noImage.png
 ┣ 📂 store
 ┃ ┣ 📂 actions
 ┃ ┃ ┗ 📄 index.js
 ┃ ┣ 📂 reducers
 ┃ ┃ ┣ 📄 index.js
 ┃ ┃ ┗ 📄 productsReducer.js
 ┃ ┣ 📂 types
 ┃ ┃ ┗ 📄 actionsType.js
 ┃ ┗ 📄 index.js
 ┣ 📂 utils
 ┃ ┣ 📄 categories.js
 ┃ ┗ 📄 formHelpers.js
┣ 📄 index.html
┣ 📄 db.json
┣ 📄 package.json
┣ 📄 README.md

```

---

## 🧠 Estado global

Se usa Redux para manejar el estado de la aplicación. El `store` está configurado en el archivo:

```
src/store/store.js
```

Se incluye el `<Provider>` en el punto de entrada (`main.jsx`) para inyectar el estado global a toda la aplicación.

---

## 🖼️ Ejemplo de productos

Los productos se manejan como un JSON que podría venir desde un backend o API externa en el futuro. Por ahora, es una simulación de productos reales con esta estructura:

```json
{
  "name": "Samsung Galaxy S23 Ultra",
  "price": 1,
  "category": "celular",
  "stock": 20,
  "description": "Celular Samsung con cámara de 200MP",
  "image_url": "https://...",
  "id": "3"
}
```

## ▶️ Cómo correr el proyecto

1. Cloná este repositorio:

```bash
git clone https://github.com/AylenRominaPattuzzi/frontend-akademi-AylenPattuzzi.git
cd frontend-akademi-AylenPattuzzi
```

2. Instalá las dependencias:

```bash
npm install
```

3. Ejecutá el proyecto:

```bash
npm run dev
```

## 📄 Licencia

MIT © [AylenPattuzzi](https://github.com/AylenRominaPattuzzi
