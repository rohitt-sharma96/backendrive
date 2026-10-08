/* SETUP COMMAND */

npm init -y
npm i -D typescript
npx tsc --init -> tsconfig.json -> mein jake uncomment karo

/* ACTION COMMAND */
npx tsc                =>  "start": "node dist/index.js",
node dist/index.ts     =>  "dev": "npx tsc"