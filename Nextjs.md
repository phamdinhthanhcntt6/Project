# Next.js Learning Plan - E-learning Platform

## 🎯 Mục tiêu

Học Next.js thông qua việc xây dựng full-stack web application với SSR, API routes, và optimization.

---

## 📚 Kiến thức Next.js sẽ học

### 1. **Next.js Fundamentals**

- ✅ File-based routing
- ✅ App Router (Next.js 13+)
- ✅ Server Components vs Client Components
- ✅ Layouts & Templates
- ✅ Metadata & SEO

### 2. **Data Fetching**

- ✅ Server-side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ Incremental Static Regeneration (ISR)
- ✅ Streaming & Suspense

### 3. **Advanced Features**

- ✅ API Routes
- ✅ Middleware
- ✅ Image & Font Optimization
- ✅ Server Actions

---

## 🏗️ Project Structure

```
english-learning-platform/
├── app/                          # App Router
│   ├── (auth)/                   # Auth routes
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── (dashboard)/              # Dashboard routes
│   │   ├── dashboard/page.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx
│   │   │   └── [courseId]/page.tsx
│   │   ├── exercises/page.tsx
│   │   └── profile/page.tsx
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── courses/
│   │   ├── lessons/
│   │   └── progress/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
├── lib/
└── types/
```

---

## 🚀 Implementation Plan

### **Phase 1: Setup & Authentication (Tuần 1-2)**

#### 1.1 Project Setup

```bash
npx create-next-app@latest english-learning --typescript --tailwind --app
npm install next-auth mongodb mongoose bcryptjs
```

#### 1.2 Authentication với NextAuth.js

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // Login logic
    }),
  ],
};
```

**Học được:**

- NextAuth.js setup
- JWT & Session management
- Protected routes với middleware

---

### **Phase 2: Course Pages (Tuần 3-4)**

#### 2.1 Course List Page (SSR)

```typescript
// app/(dashboard)/courses/page.tsx
export default async function CoursesPage({ searchParams }) {
  const courses = await getCourses(searchParams);
  return <CourseList courses={courses} />;
}
```

#### 2.2 Course Detail Page (SSG + ISR)

```typescript
// app/(dashboard)/courses/[courseId]/page.tsx
export async function generateStaticParams() {
  const courses = await getAllCourseIds();
  return courses.map((course) => ({ courseId: course.id }));
}

export const revalidate = 3600; // ISR

export default async function CoursePage({ params }) {
  const course = await getCourse(params.courseId);
  return <CourseDetail course={course} />;
}
```

**Học được:**

- SSR vs SSG
- Dynamic routes
- ISR (Incremental Static Regeneration)
- SEO optimization

---

### **Phase 3: API Routes (Tuần 5-6)**

#### 3.1 Course API

```typescript
// app/api/courses/route.ts
export async function GET(request: NextRequest) {
  const courses = await Course.find();
  return NextResponse.json(courses);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const course = await Course.create(body);
  return NextResponse.json(course, { status: 201 });
}
```

**Học được:**

- Route Handlers
- Authentication trong API
- Database operations
- Error handling

---

### **Phase 4: File Upload & Streaming (Tuần 7-8)**

#### 4.1 Video Upload

```typescript
// app/api/upload/video/route.ts
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("video") as File;

  // Save file logic
  return NextResponse.json({ url: path });
}
```

#### 4.2 Video Streaming

```typescript
// app/api/stream/[videoId]/route.ts
export async function GET(request: NextRequest, { params }) {
  // Streaming với range support
  const stream = createReadStream(videoPath, { start, end });
  return new NextResponse(stream, {
    status: 206,
    headers: { "Content-Range": `bytes ${start}-${end}/${fileSize}` },
  });
}
```

**Học được:**

- File upload handling
- Video streaming
- Range requests

---

### **Phase 5: Optimization (Tuần 9-10)**

#### 5.1 Image Optimization

```typescript
import Image from "next/image";

<Image
  src={course.thumbnail}
  alt={course.title}
  width={400}
  height={225}
  placeholder="blur"
/>;
```

#### 5.2 Server Actions

```typescript
"use server";

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  await User.updateOne(
    { _id: session.user.id },
    { name: formData.get("name") }
  );
  revalidatePath("/profile");
}
```

**Học được:**

- Image optimization
- Server Actions
- Cache revalidation
- Performance tuning

---

## 🎯 Learning Outcomes

- ✅ Thành thạo Next.js App Router
- ✅ Hiểu SSR, SSG, ISR
- ✅ Xây dựng API Routes
- ✅ Implement authentication
- ✅ Optimize performance
- ✅ SEO best practices

---

## 📚 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **NextAuth.js**: https://next-auth.js.org
