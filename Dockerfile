FROM node:lts
WORKDIR /app
COPY . .
RUN npm i -g bun \
	&& bun install 
EXPOSE 3000
ENTRYPOINT ["bun", "run"]
CMD ["dev, "-H 0.0.0.0", "-p 3000"]
	
