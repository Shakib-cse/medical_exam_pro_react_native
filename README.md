# React Native (Expo) Template

A modern, scalable React Native (Expo) application template following **Feature-Based Clean Architecture** with state management.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Features](#project-features)

---

## 🎯 Overview

This is a production-ready React Native (Expo) template that demonstrates best practices in app architecture, state management, and code organization, mirroring our Flutter template structure.

### Key Features:
- ✅ **Feature-based organization** - Modular and scalable structure
- ✅ **State Management** - Zustand for fast, scalable state
- ✅ **Clean Architecture** - Clear separation of concerns
- ✅ **Navigation** - Expo Router (file-based routing)
- ✅ **Styling** - Tailwind CSS via NativeWind v4
- ✅ **Type-safe** - Strong typing with TypeScript
- ✅ **API Integration** - Axios instance with interceptors

---

## 📂 Project Structure

```
react_native_template/
│
├── app/                             # Expo Router Pages
│   ├── _layout.tsx                  # Root Layout
│   ├── index.tsx                    # Entry redirect
│   ├── (auth)/                      # Auth Layout
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── signup.tsx
│   └── (app)/                       # App Layout (Tabs)
│       ├── _layout.tsx
│       ├── home.tsx
│       ├── profile.tsx
│       └── product/
│           ├── index.tsx
│           └── [id].tsx
│
├── src/                             # Source Code
│   ├── common/                      # Reusable components & constants
│   │   ├── components/
│   │   │   ├── CustomButton.tsx
│   │   │   └── CustomTextField.tsx
│   │   └── constants/
│   │
│   ├── features/                    # Feature modules
│   │   ├── auth/
│   │   │   ├── data/authStore.ts
│   │   │   └── presentation/Login.tsx, Signup.tsx
│   │   ├── product/
│   │   ├── home/
│   │   └── user_profile/
│   │
│   ├── helpers/                     # Helper services
│   │   ├── NotificationService.ts   # (Commented out boilerplate)
│   │   └── SocialAuthHelper.ts      # (Commented out boilerplate)
│   │
│   └── networks/                    # Network layer
│       └── axios.ts                 # Axios configuration
│
├── assets/                          # Static assets
├── tailwind.config.js               # Tailwind settings
├── babel.config.js                  # Babel settings
├── metro.config.js                  # Metro bundler config
├── package.json
└── README.md
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React Native (Expo)** | UI Framework |
| **TypeScript** | Programming Language |
| **Zustand** | State Management |
| **Axios** | HTTP Client |
| **Expo Router** | File-based Navigation |
| **NativeWind v4** | Tailwind CSS Styling |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Expo CLI
- iOS Simulator / Android Emulator or Expo Go app

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run the app:**
```bash
npx expo start
```
Press `i` to open in iOS simulator, or `a` to open in Android emulator.

---

## ✨ Project Features

### 1. Authentication (`src/features/auth`)
- Login and Signup architecture
- Zustand authentication state tracking
- *Boilerplate included for Expo Auth Session (Google/Facebook)*

### 2. Product Management (`src/features/product`)
- Product listing with mocked API delay
- Product details screen via dynamic routing (`[id].tsx`)

### 3. User Profile (`src/features/user_profile`)
- View user details
- Mocked fetching profile data via Zustand state

### 4. Home Screen (`src/features/home`)
- Dashboard view with highlights
- Quick navigation shortcuts

### 5. Common Utilities
- **Custom Components** - `CustomButton`, `CustomTextField` using Tailwind CSS classes.
- **Networking** - Configured Axios instance with request and response interceptors.
- **Boilerplate Services** - Local/Push notifications template setup.

---

**Version:** 1.0.0
