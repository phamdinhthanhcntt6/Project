# React.js Learning Plan - E-learning Platform

## 🎯 Mục tiêu

Học React.js thông qua việc xây dựng các components và features cho phần web admin/student dashboard.

---

## 📚 Kiến thức React.js sẽ học

### 1. **React Fundamentals**

- ✅ JSX syntax
- ✅ Components (Functional Components)
- ✅ Props & State
- ✅ Event Handling
- ✅ Conditional Rendering
- ✅ Lists & Keys

### 2. **React Hooks**

- ✅ `useState` - Quản lý state
- ✅ `useEffect` - Side effects, API calls
- ✅ `useContext` - Global state management
- ✅ `useRef` - DOM references, video player control
- ✅ `useMemo` - Performance optimization
- ✅ `useCallback` - Memoize functions
- ✅ Custom Hooks - Tái sử dụng logic

### 3. **Advanced Concepts**

- ✅ Context API - Authentication, Theme
- ✅ React Router - Navigation
- ✅ Form Handling - Controlled components
- ✅ Error Boundaries
- ✅ Code Splitting & Lazy Loading
- ✅ Performance Optimization

---

## 🏗️ Components sẽ xây dựng

### **Phase 1: Authentication & Layout (Tuần 1-2)**

#### 1.1 Authentication Components

```
src/components/auth/
├── LoginForm.tsx          // Form đăng nhập
├── RegisterForm.tsx       // Form đăng ký
├── ForgotPassword.tsx     // Quên mật khẩu
└── ProtectedRoute.tsx     // Route bảo vệ
```

**Học được:**

- Form handling với controlled components
- Form validation
- API integration với fetch/axios
- Error handling & loading states
- Redirect sau khi login

#### 1.2 Layout Components

```
src/components/layout/
├── Header.tsx             // Navigation bar
├── Sidebar.tsx            // Menu bên trái
├── Footer.tsx             // Footer
└── MainLayout.tsx         // Layout wrapper
```

**Học được:**

- Component composition
- Props drilling
- Responsive design
- CSS-in-JS hoặc CSS Modules

---

### **Phase 2: Student Dashboard (Tuần 3-4)**

#### 2.1 Dashboard Components

```
src/components/dashboard/
├── ProgressCard.tsx       // Thẻ hiển thị tiến độ
├── StreakCounter.tsx      // Đếm ngày học liên tục
├── RecentCourses.tsx      // Khóa học gần đây
├── StatsChart.tsx         // Biểu đồ thống kê
└── UpcomingLessons.tsx    // Bài học sắp tới
```

**Học được:**

- Data visualization với Chart.js/Recharts
- useEffect để fetch data
- Loading skeletons
- Error boundaries

#### 2.2 Course Components

```
src/components/courses/
├── CourseCard.tsx         // Thẻ khóa học
├── CourseList.tsx         // Danh sách khóa học
├── CourseFilter.tsx       // Lọc & tìm kiếm
├── CourseDetail.tsx       // Chi tiết khóa học
└── EnrollButton.tsx       // Nút đăng ký khóa học
```

**Học được:**

- Props & component reusability
- Filtering & searching logic
- Pagination
- Conditional rendering

---

### **Phase 3: Video Player & Lessons (Tuần 5-6)**

#### 3.1 Video Player Components

```
src/components/player/
├── VideoPlayer.tsx        // Video player chính
├── PlaybackControls.tsx   // Play, pause, volume
├── ProgressBar.tsx        // Thanh tiến độ
├── SubtitleToggle.tsx     // Bật/tắt subtitle
├── SpeedControl.tsx       // Điều chỉnh tốc độ
└── FullscreenButton.tsx   // Toàn màn hình
```

**Học được:**

- useRef để control video element
- Custom hooks (useVideoPlayer)
- Event listeners
- Local storage (lưu vị trí xem)

#### 3.2 Lesson Components

```
src/components/lessons/
├── LessonList.tsx         // Danh sách bài học
├── LessonItem.tsx         // Item bài học
├── LessonProgress.tsx     // Tiến độ bài học
└── NextLessonButton.tsx   // Nút bài tiếp theo
```

**Học được:**

- State management giữa components
- Progress tracking
- Auto-play next lesson

---

### **Phase 4: Exercises & Quiz (Tuần 7-8)**

#### 4.1 Exercise Components

```
src/components/exercises/
├── QuizContainer.tsx      // Container quiz
├── MultipleChoice.tsx     // Câu hỏi trắc nghiệm
├── FillInBlank.tsx        // Điền từ vào chỗ trống
├── ListeningExercise.tsx  // Bài tập nghe
├── SpeakingExercise.tsx   // Bài tập nói
├── QuestionNavigation.tsx // Điều hướng câu hỏi
└── ResultSummary.tsx      // Tổng kết kết quả
```

**Học được:**

- Complex form handling
- State management cho quiz
- Timer với useEffect
- Audio recording (Web Audio API)
- Validation & scoring logic

#### 4.2 Flashcard Components

```
src/components/flashcards/
├── FlashcardDeck.tsx      // Bộ thẻ
├── FlashcardItem.tsx      // Thẻ đơn
├── FlipAnimation.tsx      // Animation lật thẻ
└── SpacedRepetition.tsx   // Logic lặp lại ngắt quãng
```

**Học được:**

- CSS animations
- Swipe gestures
- Algorithm implementation (spaced repetition)

---

### **Phase 5: Community & Social (Tuần 9-10)**

#### 5.1 Forum Components

```
src/components/forum/
├── PostList.tsx           // Danh sách bài viết
├── PostItem.tsx           // Bài viết đơn
├── CreatePost.tsx         // Tạo bài viết mới
├── CommentSection.tsx     // Phần bình luận
├── CommentItem.tsx        // Bình luận đơn
└── VoteButtons.tsx        // Upvote/Downvote
```

**Học được:**

- Real-time updates với WebSocket
- Optimistic UI updates
- Infinite scroll
- Rich text editor integration

#### 5.2 Profile Components

```
src/components/profile/
├── ProfileHeader.tsx      // Header profile
├── AchievementBadges.tsx  // Huy hiệu thành tích
├── LearningStats.tsx      // Thống kê học tập
├── EditProfile.tsx        // Chỉnh sửa profile
└── SettingsPanel.tsx      // Cài đặt
```

**Học được:**

- Image upload & preview
- Form với multiple fields
- Validation schema (Yup/Zod)

---

## 🎨 State Management Strategy

### **Option 1: Context API (Recommended cho MVP)**

```typescript
// AuthContext.tsx
const AuthContext = createContext();

// ThemeContext.tsx
const ThemeContext = createContext();

// CourseContext.tsx
const CourseContext = createContext();
```

### **Option 2: Redux Toolkit (Nếu scale lớn)**

```typescript
// store/slices/
├── authSlice.ts
├── courseSlice.ts
├── progressSlice.ts
└── uiSlice.ts
```

---

## 🛠️ Custom Hooks sẽ tạo

```typescript
// hooks/
├── useAuth.ts             // Authentication logic
├── useLocalStorage.ts     // Local storage wrapper
├── useDebounce.ts         // Debounce input
├── useFetch.ts            // Data fetching
├── useVideoPlayer.ts      // Video player control
├── useInfiniteScroll.ts   // Infinite scroll
├── useTimer.ts            // Countdown timer
└── useMediaQuery.ts       // Responsive breakpoints
```

---

## 📝 Exercises thực hành

### **Week 1-2: Basics**

- [ ] Tạo LoginForm với validation
- [ ] Implement protected routes
- [ ] Build responsive Header với menu

### **Week 3-4: Data Fetching**

- [ ] Fetch courses từ API
- [ ] Implement search & filter
- [ ] Add pagination
- [ ] Show loading states

### **Week 5-6: Video Player**

- [ ] Build custom video player
- [ ] Add subtitle support
- [ ] Implement progress tracking
- [ ] Save playback position

### **Week 7-8: Interactive Exercises**

- [ ] Create quiz component
- [ ] Add timer functionality
- [ ] Implement scoring system
- [ ] Build flashcard with flip animation

### **Week 9-10: Advanced**

- [ ] Real-time comments với Socket.io
- [ ] Infinite scroll for posts
- [ ] Image upload & preview
- [ ] Performance optimization

---

## 🎯 Learning Outcomes

Sau khi hoàn thành, bạn sẽ:

- ✅ Thành thạo React Hooks
- ✅ Biết cách quản lý state phức tạp
- ✅ Xây dựng components tái sử dụng
- ✅ Tích hợp API
- ✅ Xử lý forms & validation
- ✅ Optimize performance
- ✅ Implement real-time features
- ✅ Build responsive UI

---

## 📚 Resources

- **React Docs**: https://react.dev
- **React Patterns**: https://reactpatterns.com
- **React TypeScript Cheatsheet**: https://react-typescript-cheatsheet.netlify.app
