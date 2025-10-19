<h1 align="center">🚀Приложение-конструктор для молодёжных сообществ и клубов предприятий
</h1>

<p align="center">
  <b>Модульная экосистема для создания и управления молодёжными сообществами, клубами и проектами предприятий</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Go-1.24-00ADD8?logo=go&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/MinIO-cloud%20storage-D52B1E?logo=minio&logoColor=white" />
  <img src="https://img.shields.io/badge/Elasticsearch-search%20engine-005571?logo=elasticsearch&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## ✨ Основные возможности

### 🔐 Авторизация и профиль пользователя
- Безопасная авторизация и хранение сессий.
- Личный кабинет с персональной статистикой.
- Просмотр достижений (ачивок) и текущего уровня.
- Отображение информации по активным сообществам.

### 🏢 Воркфлоу предприятий и сообществ
- Конструктор организаций и внутренних клубов.
- Управление мероприятиями, проектами и образовательными материалами.
- Добавление вакансий, стажировок и производственных кейсов.
- Просмотр участников, ролей и их активности.

### 🧭 Личный кабинет предприятия
- Разделы: контент, участники, аналитика, настройки.
- Гибкая система карточек и таблиц в стиле Bento Grid.
- Возможность создания статей, постов и событий.
- Современный, адаптивный интерфейс.

---

## 🧩 Технологический стек

- ⚡ **Next.js** 
- 🐹 **Go (Golang)** 
- ☁️ **MinIO**
- 🔍 **Elasticsearch** 
- 🎨 **Tailwind CSS** 

---

## 🛠️ Установка и запуск локально

### 📦 Клонирование репозитория
```bash
git clone https://github.com/yourusername/enterprise-platform.git
cd enterprise-platform
```
⚙️ Запуск бэкенда
```bash
cd backend
docker-compose up
```

После запуска будут доступны:

🧩 API (Go) → http://localhost:3000

💻 Запуск фронтенда
```bash
cd frontend
yarn install
yarn dev
```
Интерфейс будет доступен по адресу:
👉 http://localhost:3000

# Страницы

http://localhost/login
http://localhost/reg
http://localhost/lc
http://localhost/lc/company

# 📱 Особенности интерфейса
Современный минималистичный дизайн.

Полностью адаптивная верстка (Desktop / Tablet / Mobile).

Удобная навигация и интуитивный UX.

Разделение логики, API и компонентов.

Легкая интеграция новых модулей.


<p align="center"> 💡 <i>Создано в рамках проведения хакатона ОТКРОЙ#МОСПРОМ
</i> </p> ```