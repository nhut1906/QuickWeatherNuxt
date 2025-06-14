<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Đăng nhập</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Nhập email của bạn"
            required
          />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Nhập mật khẩu của bạn"
            required
          />
          <span v-if="passwordError" class="error-message">{{
            passwordError
          }}</span>
        </div>

        <button type="submit" class="login-button" :disabled="isLoading">
          {{ isLoading ? "Đang xử lí..." : "Đăng nhập" }}
        </button>
<!-- 
        <div class="form-footer">
          <a href="#" class="forgot-password">Quên mật khẩu?</a>
        </div> -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@auth/stores/auth.store";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
// Reactive state
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const emailError = ref("");
const passwordError = ref("");

// Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Login handler
const handleLogin = async () => {
  // Reset errors
  emailError.value = "";
  passwordError.value = "";

  // Validate inputs
  let isValid = true;

  if (!email.value) {
    emailError.value = "Email là bắt buộc";
    isValid = false;
  } else if (!validateEmail(email.value)) {
    emailError.value = "Vui lòng nhập email đúng định dạng";
    isValid = false;
  }

  if (!password.value) {
    passwordError.value = "Mật khẩu là bắt buộc";
    isValid = false;
  } else if (password.value.length < 8) {
    passwordError.value = "Mật khẩu ít nhất 8 kí tự";
    isValid = false;
  }

  if (!isValid) return;

  isLoading.value = true;

  await authStore
    .login({
      email: email.value,
      password: password.value,
    })
    .then((isLogged) => {
      if (isLogged)
        router.push({
          name: "admin",
        });
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<style>
/* Reset some default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Variables */
:root {
  --primary-color: #4a6cf7;
  --primary-hover: #3a5ce4;
  --error-color: #e74c3c;
  --text-color: #333;
  --light-text: #666;
  --border-color: #ddd;
  --bg-color: #f5f8ff;
  --card-bg: #fff;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Main container */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--bg-color);
  font-family: "Arial", sans-serif;
  padding: 20px;
}

/* Login card */
.login-card {
  width: 100%;
  max-width: 420px;
  background-color: var(--card-bg);
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 40px 30px;
}

/* Title */
.login-title {
  color: var(--text-color);
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
}

.form-group input[type="email"],
.form-group input[type="password"] {
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.error-message {
  color: var(--error-color);
  font-size: 12px;
}

/* Remember me checkbox */
.remember-me {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.remember-me label {
  cursor: pointer;
}

/* Login button */
.login-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: var(--primary-hover);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Form footer */
.form-footer {
  text-align: center;
  margin-top: 10px;
}

.forgot-password {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }

  .login-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .form-group input[type="email"],
  .form-group input[type="password"] {
    padding: 10px 14px;
  }

  .login-button {
    padding: 12px;
  }
}
</style>
