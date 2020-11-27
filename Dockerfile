FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json .
RUN npm i
COPY . .
EXPOSE 8000
RUN npm run build
CMD [ "npm", "serve" ]