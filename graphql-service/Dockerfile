ARG NODE_VERSION=14-alpine
FROM node:${NODE_VERSION}
ENV PORT=2000
COPY src ./
COPY *.json .
COPY . .
RUN npm install
EXPOSE ${PORT}
ENTRYPOINT ["npm", "start"]
