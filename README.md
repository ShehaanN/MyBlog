# 📝 Blog Platform — Next.js + NestJS + MySQL + Prisma

A **full-stack blog application** where:

* All posts are **publicly readable**
* Users can **register & log in**
* Each user can **create, edit, and delete only their own posts**
* Ownership-based access

---

## 🧱 Tech Stack

### Frontend

* **Next.js** (App Router)
* React
* TypeScript
* TailwindCSS
* Shadcn/ui


### Backend

* **NestJS**
* Prisma ORM
* MySQL
* JWT Authentication
* bcrypt

---


## 🗄️ Database Design (Prisma Models)

The database is designed using **Prisma ORM** with clear ownership and relational integrity between users, posts, and categories.

### User

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime

  Post      Post[]
  Category  Category[]
}
```

---

### Category

Each category is created and owned by a user, while posts can be associated with shared categories.

```prisma
model Category {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  slug      String   @unique
  userId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime

  User      User     @relation(fields: [userId], references: [id])
  Post      Post[]
}
```

---

### Post

Each post belongs to exactly one user (author) and one category. Ownership is enforced using the `authorId` field.

```prisma
model Post {
  id          Int      @id @default(autoincrement())
  title       String
  slug        String   @unique
  excerpt     String   @db.Text
  content     String   @db.LongText
  authorId    Int
  categoryId  Int
  status      String
  readingTime String
  viewCount   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime

  User        User     @relation(fields: [authorId], references: [id])
  Category    Category @relation(fields: [categoryId], references: [id])

  @@index([authorId], map: "Post_authorId_fkey")
  @@index([categoryId], map: "Post_categoryId_fkey")
}
```


---

## 🌐 API Overview

This section documents the **actual implemented API endpoints** based on the current NestJS controllers.

---

###  Public APIs

#### Posts

* `GET /posts`
  Get all **published** posts (public access)

* `GET /posts/slug/:slug`
  Get a single post by slug (**view count increments**)

* `GET /posts/:id`
  Get a post by ID

---

###  Auth APIs

* `POST /auth/register`
  Register a new user

* `POST /auth/login`
  Authenticate user and issue JWT

* `GET /auth/profile` 
  Get currently authenticated user profile
  
* `GET /auth/logout` 

---

###  Post APIs (JWT Required)

* `GET /posts/admin/:userId` 
  Get **all posts** created by a specific user (admin/dashboard view)

* `POST /posts/:userId` 
  Create a new post for the authenticated user

* `PUT /posts/:id/:userId` 
  Update an existing post (ownership enforced)

* `DELETE /posts/:id/:userId` 
  Delete a post (ownership enforced)

---

###  Category APIs (JWT Required)

* `GET /categories/:userId` 
  Get all categories created by the authenticated user

* `GET /categories/:id/:userId` 
  Get a single category by ID

* `POST /categories/:userId` 
  Create a new category

* `PUT /categories/:id/:userId` 
  Update a category (ownership enforced)

* `DELETE /categories/:id/:userId` 
  Delete a category (ownership enforced)


---

## 🛠️ Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/MyBlog.git
cd MyBlog
```

---

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your database credentials
nano .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start development server
npm run start:dev
```

The backend will be running at **[http://localhost:4000](http://localhost:4000)**

---

### Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

The frontend will be running at **[http://localhost:3000](http://localhost:3000)**

---

