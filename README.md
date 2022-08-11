# token-supply

REST API for CoinGecko and CoinMarketCap

## Setup

Install the dependencies:
```
yarn add --global vercel
yarn install
```

Create the project:
```
vercel
```

Add variables to your environment:
```
cp .env.sample .env
```

## Deploy the serverless functions locally

Local deployment:
```
vercel dev
```

Then open http://localhost:3000/api/total-supply or http://localhost:3000/api/circulating-supply in a browser.

## Deploy the serverless functions to Vercel

Preview deployment:
```
vercel
```

Then visit the preview link.

Production deployment:
```
vercel --prod
```

Then visit the production link.
