FROM node:alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY . .

CMD ["npm", "run", "dev"]
# Note: Don't forget to build the image before running skaffold.