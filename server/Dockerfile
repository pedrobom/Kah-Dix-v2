FROM node:latest
WORKDIR  /app
COPY package.json ./
COPY . .
RUN npm install
RUN chmod +x /app/scripts_server/entrypoint.sh

CMD ["/app/scripts_server/entrypoint.sh"]