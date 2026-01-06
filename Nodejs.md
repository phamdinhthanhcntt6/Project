# Node.js & Express Learning Plan - E-learning Platform

## 🎯 Mục tiêu

Xây dựng Backend Robust RESTful API xử lý logic nghiệp vụ, authentication, streaming video và real-time features.

---

## 📚 Kiến thức Backend sẽ học

### 1. **Node.js Core & Express**

- ✅ Event Loop & Asynchronous Programming
- ✅ Buffer & Streams (cho xử lý video)
- ✅ File System (fs module)
- ✅ Middleware Design Pattern
- ✅ Error Handling centralized
- ✅ Validation (Joi/Zod)

### 2. **Database (MongoDB + Mongoose)**

- ✅ Schema Design & Modeling
- ✅ Indexing & Performance
- ✅ Populating References (Relationships)
- ✅ Aggregation Pipeline (Thống kê phức tạp)
- ✅ Transactions (ACID)

### 3. **Security & Performance**

- ✅ JWT Authentication & Refesh Token
- ✅ Password Hashing (Bcrypt)
- ✅ Rate Limiting
- ✅ Caching (Redis - Optional)
- ✅ Security Best Practices (Helmet, CORS)

---

## 🏗️ Project Structure

```
english-learning-backend/
├── src/
│   ├── config/              # Environment & DB config
│   │   ├── db.ts
│   │   └── env.ts
│   ├── controllers/         # Request handling logic
│   │   ├── auth.controller.ts
│   │   ├── course.controller.ts
│   │   └── ...
│   ├── middlewares/         # Express middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── upload.middleware.ts
│   ├── models/             # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Course.ts
│   │   └── ...
│   ├── routes/             # API routes definition
│   │   ├── v1/
│   │   └── index.ts
│   ├── services/           # Business logic layer
│   │   ├── auth.service.ts
│   │   └── ...
│   ├── utils/              # Helper functions
│   │   ├── AppError.ts
│   │   └── jwt.ts
│   └── app.ts              # Express app setup
├── uploads/                # Local storage for dev
└── package.json
```

---

## 🚀 Implementation Plan

### **Phase 1: Setup & Auth Core (Tuần 1-2)**

#### 1.1 Server Setup

- Setup TypeScript + Express + Nodemon
- Connect MongoDB
- Logging setup (Winston/Morgan)

#### 1.2 Authentication Module

```typescript
// POST /api/v1/auth/register
// POST /api/v1/auth/login
// POST /api/v1/auth/refresh-token
```

**Key Concepts**:

- JWT Access/Refresh Token rotation strategy
- Password hashing hooks in Mongoose
- Typescript Generic Interfaces for Request/Response

---

### **Phase 2: Course & Content Management (Tuần 3-4)**

#### 2.1 Course CRUD

```typescript
// GET /api/v1/courses (Pagination, Filter, Sort)
// POST /api/v1/courses (Teacher only)
// PATCH /api/v1/courses/:id
```

**Key Concepts**:

- Advanced Mongoose Querying
- Factory Pattern cho Controller

#### 2.2 Lesson & Nested Structure

- Handling relationship 1-n (Course -> Sections -> Lessons)
- Virtual populations

---

### **Phase 3: Media Streaming & Uploads (Tuần 5-6)**

#### 3.1 Video Streaming Endpoint

```typescript
// GET /api/v1/lessons/:id/stream
```

**Implementation**:

- Sử dụng Node.js Streams để pipe video chunks
- Handle Range Headers (206 Partial Content) để cho phép tua video

#### 3.2 File Uploads

- Config Multer cho image/video upload
- Xử lý file validation (size, type)
- (Advanced) Upload lên AWS S3/Cloudinary

---

### **Phase 4: Learning Progress & Gamification (Tuần 7-8)**

#### 4.1 Tracking Progress

- API mark lesson as completed
- Calculate course percentage
- Logic unlock bài học tiếp theo

#### 4.2 Leaderboard & Stats

- Sử dụng MongoDB Aggregation để tính toán top học viên
- Thống kê thời gian học trong tuần

---

### **Phase 5: Real-time Features (Tuần 9)**

#### 5.1 Socket.io Integration

- Setup Socket.io server
- Chat room cho mỗi Course
- Notification realtime khi có bài học mới hoặc được giáo viên phản hồi

---

## 🛠️ Code Snippets Samples

### **1. Streaming Video Controller**

```typescript
export const streamVideo = (req: Request, res: Response) => {
  const range = req.headers.range;
  if (!range) return res.status(400).send("Requires Range header");

  const videoPath = "uploads/videos/lesson1.mp4";
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
};
```

---

## 🎯 Learning Outcomes

- ✅ Hiểu sâu về Node.js Runtime & Streams
- ✅ Design RESTful API chuẩn production
- ✅ Database Modeling phức tạp với MongoDB
- ✅ Security & Authentication flows
- ✅ Real-time communication
