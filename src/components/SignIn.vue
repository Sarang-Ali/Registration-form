<template>
    <div class="sign-in-container">
        <h2>Let's Fly!</h2>
        <form @submit.prevent="signIn">
            <div class="form-group">
                <label for="email">Email*</label>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="Email"
                    required
                />
            </div>

            <div class="form-group password-group">
                <label for="password">Password*</label>
                <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    placeholder="Password"
                    required
                />
                <i
                    class="material-icons toggle-password"
                    @click="togglePasswordVisibility"
                >
                    {{ showPassword ? "visibility_off" : "visibility" }}
                </i>
            </div>

            <button type="submit" class="submit-btn">Sign In</button>

            <p style="font-size: 12px; text-align: center">
                Don't have an account?
                <router-link to="/register">Sign Up</router-link>
            </p>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            showPassword: false,
        };
    },
    methods: {
        signIn() {
            alert("Email:", this.email, "Password:", this.password);
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>

<style scoped>
.sign-in-container {
    background-color: white;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 400px;
    margin: auto;
    text-align: center;
}

h2 {
    color: #505d68;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-size: 14px;
    color: #333;
    text-align: start;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

.sign-in-btn {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #424b5a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
}

.sign-in-btn:hover {
    background-color: #405d72;
}

.password-wrapper {
    position: relative;
}

.toggle-password {
    position: absolute;
    right:37%;
    top: 55%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 18px;
    color: #666;
}

.toggle-password:hover {
    color: #333;
}

p a {
    color: #007bff;
    text-decoration: none;
}
</style>
