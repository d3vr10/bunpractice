FROM node:latest AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run dev

# FROM node:latest
# COPY --from=builder /app/. .
# EXPOSE 3000
# CMD ["npm", "run", "start"]