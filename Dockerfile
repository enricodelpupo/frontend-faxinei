# /Dockerfile (na raiz do Next.js)
FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para rodar o modo de visualização "ao vivo" (Fast Refresh)
CMD ["npm", "run dev"]