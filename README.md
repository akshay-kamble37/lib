# Shri Guru Gobind Singhji Institute of Engineering & Technology — Central Library

A React + Vite digital library portal with a lightweight Node content/media API and no database.

## Run locally

Terminal 1:
```bash
npm install
npm run api
```

Terminal 2:
```bash
npm run dev
```

Open the Vite URL shown in the terminal.

## Admin media upload

1. Open `/login` and sign in as the library administrator.
2. Open **Admin → Homepage**.
3. Use **Select image** or **Select video** to open the operating system file picker.
4. Uploaded media is stored under `public/uploads/` by the Node API.
5. Save the homepage to make the selected media live on the public site.

The Vite development server proxies `/api` requests to `http://localhost:8787`.

## Main public sections

Home · Catalogue · E-Resources · Question Papers · Departments · Publications · What's New · About · Contact

There is no Student Portal, Services tab, or Research tab in the public navigation.
