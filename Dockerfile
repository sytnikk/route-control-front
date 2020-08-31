# Build stage
FROM node:12.10-alpine AS builder

WORKDIR /builder
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:1.19.2-alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /builder/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]