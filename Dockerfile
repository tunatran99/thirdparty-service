FROM node:18.13.0-slim
WORKDIR /usr/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm -g add pnpm
RUN pnpm install --shamefully-hoist
COPY . .
RUN pnpm build
CMD [ "pnpm", "start:prod" ]