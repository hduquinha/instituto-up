# Estágio 1: O "Builder" - Constrói o projeto React
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o resto do código-fonte do projeto
COPY . .

# Executa o comando de build para gerar os arquivos estáticos
RUN npm run build

# ---

# Estágio 2: O "Server" - Serve os arquivos estáticos com Nginx
FROM nginx:stable-alpine

# Copia os arquivos da pasta 'dist' do estágio 'builder' para a pasta pública do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia nosso arquivo de configuração customizado do Nginx (que criaremos a seguir)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o Nginx quando o container for executado
CMD ["nginx", "-g", "daemon off;"]
