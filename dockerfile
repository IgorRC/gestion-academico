# Usar la imagen base oficial de MongoDB
FROM mongo:latest

# Copiar scripts de inicialización, configuraciones u otros archivos necesarios
# COPY ./init-scripts /docker-entrypoint-initdb.d/

# Exponer el puerto
EXPOSE 27017

# Definir comandos de inicio (puede omitirse si se usa la imagen estándar sin modificaciones)
CMD ["mongod"]