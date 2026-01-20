# Bewerbungstracker

### Übersicht

##### Beschreibung
Dieses Projekt stellt eine Bewerbungsverwaltung für bewerbende zur Verfügung. \
Zusätzlich können Termine verwaltet werden. \
Hierfür werden Funktionen zum Anzeigen, Anlegen, Bearbeitung und Löschen von Bewerbungen und Terminen bereitgestellt.

##### Technologien
- Backend: Springboot (Java), Maven
- Frontend: React (Typescript), Material UI, Axios
- Datenbank: PostgreSQL
- Keycloak zur Authentifizierung
- Docker

### Startanleitung für den Prototypen


**Loopback Domain mit authentication erweitern** \
Auf Linux:\
In /etc/hosts bei der Loopback-Adresse
hinter "localhost" noch "authentication" anhängen. Bsp:
"127.0.0.1	localhost authentication"

**Starten von Datenbank Keycloak und Backend Containern**
1. Backend bauen mit Maven:\
Im Backend Verzeichnis:
```bash
SPRING_DATASOURCE_PASSWORD=pass SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5433/testdb SPRING_JPA_HIBERNATE_DDL_AUTO=update SPRING_DATASOURCE_USERNAME=testU mvn clean install -DskipTests -f pom.xml
```
2. Docker Container Starten\
Im Projekt verzeichnis:
```bash 
docker compose up
```

**Starten vom Frontend**
Im Frontend Verzeichnis:
1. Packages installieren:
```bash
npm install
```
2. Frontend starten:
```bash
npm run dev
```





