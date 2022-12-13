FROM node:16 AS build-step

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.15
COPY --from=build-step /build /usr/share/nginx/html
COPY --from=build-step /build/nginx.conf /etc/nginx/conf.d/default.conf