FROM node:lts
WORKDIR /app
COPY ./package.json .
RUN npm i -g bun \
	&& bun install
COPY . . 
EXPOSE 3000
ENTRYPOINT ["bun", "run"]
CMD ["dev -H 0.0.0.0]
	
