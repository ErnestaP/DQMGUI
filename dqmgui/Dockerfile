# Stage 1 - the build process
FROM node:12.14.0-alpine

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 8084
CMD ["npm", "run", "serve"]

# Stage 2 - the production environment
# FROM nginx:1.12-alpine
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]