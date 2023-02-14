FROM node:18-alpine as frontend-build

WORKDIR /usr/src/app

COPY ./frontend/package*.json .

RUN npm install

COPY ./frontend .

RUN npm run build

FROM node:18-alpine as backend-build

WORKDIR /usr/src/app

COPY ./backend/package*.json .

RUN npm install

COPY ./backend .

RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./backend/package*.json .
COPY ./backend/prisma ./prisma

RUN npm install --omit=dev

COPY --from=backend-build /usr/src/app/dist ./dist
COPY --from=frontend-build /usr/src/app/dist ./dist/public

CMD ["npm", "start"]
