# Gestion Stock

Application servant à gérer des articles.

## Prerequistes

OS : Windows/MacOS/Linux

The following software must be installed on your machine:

- nodejs 18.18.0
- git
- mongodb (if mongodb service is used)

## Install

```
git clone https://github.com/jlg-formation/njscv1-oct-2023.git gestion-stock
cd gestion-stock

cd front
npm i
npm run build

cd ..

cd back
npm i
```

## Start the back end server in production

```
cd gestion-stock
cd back
npm run prod
```

Open your browser on `http://localhost:3000`

## Configuration

The Gestion Stock app can be configured only with environment variable:

- GESTION_STOCK_PORT
- GESTION_STOCK_APITYPE
- GESTION_STOCK_MONGODB
- GESTION_STOCK_MONGODB_DB

## End of Documentation
