# React Native Learning Plan - E-learning Platform

## 🎯 Mục tiêu

Xây dựng Mobile App (iOS/Android) cho học viên, cho phép học offline, nhận thông báo và tương tác mượt mà.

---

## 📚 Kiến thức React Native sẽ học

### 1. **React Native Fundamentals**

- ✅ Core Components: View, Text, Image, ScrollView, FlatList
- ✅ Styling: Flexbox layout, StyleSheet
- ✅ Navigation (React Navigation v6)
- ✅ Platform Specific Code (iOS vs Android)

### 2. **Mobile Specific Features**

- ✅ Gesture Handling
- ✅ Animation (Reanimated)
- ✅ Deep Linking
- ✅ Push Notifications (Firebase/Expo)
- ✅ Offline Storage (AsyncStorage/MMKV)

### 3. **Media & Hardware**

- ✅ Video Playback (react-native-video / expo-av)
- ✅ Audio Recording (cho bài tập nói)
- ✅ Camera/Library (update avatar)

---

## 🏗️ Project Structure

```
english-learning-mobile/
├── src/
│   ├── api/                 # Axios setup
│   ├── components/          # Reusable UI
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── navigation/          # React Navigation setup
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── TabNavigator.tsx
│   ├── screens/
│   │   ├── Auth/
│   │   ├── Home/
│   │   ├── Course/
│   │   │   ├── CourseDetail.tsx
│   │   │   └── VideoPlayer.tsx
│   │   └── Profile/
│   ├── store/              # Zustand/Redux
│   ├── hooks/
│   └── utils/
├── assets/
└── App.tsx
```

---

## 🚀 Implementation Plan

### **Phase 1: Setup & UI Foundation (Tuần 1-2)**

#### 1.1 Initialize

- Sử dụng **Expo** (Recommended for learning) hoặc **React Native CLI**.
- Setup TypeScript.
- Define Design System (Colors, Typography) hoặc dùng UI lib (Tamagui/NativeBase).

#### 1.2 Navigation Architecture

- **Auth Stack**: Login, RegisterScreens
- **Main Tab**: Home, My Learning, Profile
- **Course Stack**: Detail, VideoPlayer (Ẩn Tabbar)

**Học được:**

- Stack vs Tab vs Drawer Navigation
- Passing params giữa các màn hình
- Header customization

---

### **Phase 2: Course & Video Player (Tuần 3-4)**

#### 2.1 Video Learning Experience

- Implement Video Player với controls custom (Play/Pause, Slider)
- Orientation (Xoay ngang màn hình khi xem full screen)

#### 2.2 Course Listing & Tabs

- Sử dụng `FlashList` (tối ưu hơn FlatList) để render danh sách khóa học
- Implement TabView bên trong màn hình chi tiết (Chapters, Q&A, Reviews)

---

### **Phase 3: Interactive Exercises (Tuần 5-6)**

#### 3.1 Quiz UI

- Tạo Animation chuyển câu hỏi mượt mà
- Xử lý touch events cho việc chọn đáp án
- Sound effects khi chọn đúng/sai

#### 3.2 Speaking Practice

- Interface ghi âm:
  - Permission handling (Microphone)
  - Visualizer sóng âm thanh (Animation)
  - Upload file ghi âm lên server

---

### **Phase 4: Offline & Optimization (Tuần 7-8)**

#### 4.1 Offline Support

- Cache API responses với React Query
- Download video để học offline (Học về FileSystem)
- Sync progress khi có mạng trở lại

#### 4.2 Performance

- Memoization components
- Tối ưu images
- Tránh re-renders không cần thiết

---

## 🛠️ Key Libraries Selection

| Feature        | Library Recommendation                                 |
| -------------- | ------------------------------------------------------ |
| **Navigation** | React Navigation v6                                    |
| **Video**      | expo-av (Dễ) hoặc react-native-video (Mạnh)            |
| **State Mngt** | Zustand (Nhẹ) hoặc Redux Toolkit                       |
| **Storage**    | react-native-mmkv (Siêu nhanh)                         |
| **Animation**  | react-native-reanimated + react-native-gesture-handler |
| **Network**    | TanStack Query (React Query) + Axios                   |
| **Icons**      | Lucide React Native / Expo Vector Icons                |

---

## 🌟 Code Snippets Samples

### **1. Video Player with Orientation**

```typescript
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

const VideoScreen = () => {
  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    } else if (
      fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS
    ) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
  };

  return (
    <Video
      source={{
        uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      }}
      style={{ width: "100%", height: 200 }}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      onFullscreenUpdate={onFullscreenUpdate}
    />
  );
};
```

---

## 🎯 Learning Outcomes

- ✅ Build được app Mobile hoàn chỉnh chạy trên cả iOS & Android
- ✅ Hiểu sâu về Lifecycle mobile application
- ✅ Xử lý Native Modules & Permissions
- ✅ Build UI phức tạp và Animation mượt mà
- ✅ Deployment lên Store (TestFlight/Google Play Console)
