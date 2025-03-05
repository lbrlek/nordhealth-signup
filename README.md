# **Nuxt 3 Signup Form with Provet Cloud Design System**

## **Overview**
This project is a **client-side only Nuxt 3 application** that provides a **user signup form** using Vue 3 and the **Provet Cloud Design System**.

### **Features**
✅ **Signup form** with email & password fields  
✅ **Client-side validation** for missing or invalid input  
✅ **Password visibility toggle**  
✅ **Opt-in checkbox for product updates**  
✅ **Mock API to simulate email existence check**  
✅ **Success page after signup**  
✅ **Theme switcher (Light/Dark mode)**  
✅ **Localization (English, German, Finnish)**  
✅ **Unit & end-to-end tests**  

---

## **Tech Stack**
- **Framework:** Nuxt 3 (Client-side rendering)
- **Language:** TypeScript
- **UI Library:** [Provet Cloud Design System](https://provetcloud.design/)
- **State Management:** Composition API
- **i18n:** Vue I18n
- **Testing:** Playwright (E2E) & Vitest (Unit)
- **Styling:** SCSS

---

## **Mock API for Signup**
Since this is a client-side application, a **mock API** is used to simulate an email existence check before allowing a user to sign up. The mock API ensures:
- Emails that already exist in the system return an error.
- New emails proceed to the success page.

This is implemented in the `useMockApi.ts` composable.

---

## **Theme Switcher**
The app includes a **light/dark mode toggle** using a theme switcher component. This is achieved by storing the theme in local storage and applying the appropriate styles dynamically.

---

## **Setup & Installation**
### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-repo/nuxt3-signup.git
cd nuxt3-signup
```

### **2️⃣ Install dependencies**
```sh
npm install
```

### **3️⃣ Run the development server**
```sh
npm run dev
```

### **4️⃣ Run tests**
#### **End-to-end tests with Playwright**
```sh
npx playwright test
```

#### **Unit tests with Vitest**
```sh
npx vitest test
```

---

## **Usage**
1. **Fill out the signup form** with an email and password.
2. **Toggle password visibility** if needed.
3. **Check the box** to opt in for product updates.
4. **Submit the form** to see validation errors (if any) and process the signup.
5. **If the email exists**, an error message will be displayed.
6. **If signup is successful**, the user is redirected to a **success page**.
7. **The success page** displays a confirmation message and whether the user opted in for updates.

