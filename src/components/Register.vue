<template>
    <div class="container">
        <div class="progress-bar">
            <div
                class="progress"
                :style="{ width: progressPercentage + '%' }"
            ></div>
        </div>

        <form @submit.prevent="submitForm" class="account-form">
            <h2>Create an account</h2>

            <!-- First Page: Common for Seller and Buyer -->
            <div v-if="step === 1">
                <p class="register-message">
                    Register as:
                    <i
                        class="material-icons tooltip-icon"
                        @mouseenter="showTooltip('registerAs')"
                        @mouseleave="hideTooltip"
                        >info</i
                    >
                </p>

                <div
                    :class="[
                        'tooltip-box',
                        tooltip === 'registerAs' ? 'visible' : '',
                    ]"
                    class="register-tooltip"
                >
                    <p>
                        <strong>Seller:</strong> if you want to sell products on
                        our platform.
                    </p>
                    <p>
                        <strong>Buyer:</strong> if you want to purchase
                        products.
                    </p>
                </div>

                <div class="register-options">
                    <button
                        type="button"
                        :class="{ active: userType === 'seller' }"
                        @click="userType = 'seller'"
                        class="register-btn"
                    >
                        Seller
                    </button>
                    <button
                        type="button"
                        :class="{ active: userType === 'buyer' }"
                        @click="userType = 'buyer'"
                        class="register-btn"
                    >
                        Buyer
                    </button>
                </div>

                <!-- First Name and Last Name -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="first-name">First name*</label>
                        <input
                            type="text"
                            id="first-name"
                            v-model="firstName"
                            placeholder="First name"
                            minlength="3"
                            maxlength="10"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="last-name">Last name*</label>
                        <input
                            type="text"
                            id="last-name"
                            v-model="lastName"
                            placeholder="Last name"
                            minlength="3"
                            maxlength="10"
                            required
                        />
                    </div>
                </div>

                <!-- Email Field -->
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

                <!-- Phone Number -->
                <div class="form-group">
                    <label for="phone-number">Phone number*</label>
                    <div class="phone-group">
                        <img
                            :src="selectedFlag"
                            alt="Country Flag"
                            class="flag-icon"
                        />
                        <select v-model="countryCode" id="country-code">
                            <option
                                v-for="country in countries"
                                :key="country.code"
                                :value="country.code"
                            >
                                {{ country.name }} ({{ country.code }})
                            </option>
                        </select>
                        <input
                            type="tel"
                            v-model="phoneNumber"
                            id="phone-number"
                            placeholder="Phone number"
                            maxlength="12"
                            @input="validatePhoneNumber"
                            required
                        />
                    </div>
                    <p v-if="phoneNumberError" class="error-message">
                        {{ phoneNumberError }}
                    </p>
                </div>

                <button
                    type="button"
                    class="next-btn"
                    @click="nextStep"
                    :disabled="!isNextStepEnabled"
                >
                    Next
                </button>
                <p v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                </p>

                <p style="font-size: 12px; text-align: center">
                    Already have an account?
                    <router-link to="/sign-in">Sign in</router-link>
                </p>
            </div>

            <!-- Second Page: Only for Sellers -->
            <div v-if="step === 2 && userType === 'seller'">
                <div class="form-group">
                    <label for="store-name">Store Name*</label>
                    <input
                        type="text"
                        id="store-name"
                        v-model="storeName"
                        placeholder="Store Name"
                        maxlength="20"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="company-name">Company Name*</label>
                    <input
                        type="text"
                        id="company-name"
                        v-model="companyName"
                        placeholder="Company Name"
                        maxlength="20"
                        required
                    />
                </div>

                <button type="button" class="prev-btn" @click="prevStep">
                    Previous
                </button>
                <button
                    type="button"
                    class="next-btn"
                    @click="nextStep"
                    :disabled="!isNextStepEnabled"
                >
                    Next
                </button>
                <p v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                </p>
            </div>

            <!-- Second Page for Buyer or Third Page for Seller: Password and Terms -->
            <div
                v-if="
                    (step === 2 && userType === 'buyer') ||
                    (step === 3 && userType === 'seller')
                "
            >
                <div class="form-group password-group">
                    <label for="password">Password*</label>
                    <div class="password-wrapper">
                        <input
                            :type="showPassword ? 'text' : 'password'"
                            id="password"
                            v-model="password"
                            placeholder="Password"
                            maxlength="15"
                            required
                        />
                        <i
                            class="material-icons toggle-password"
                            @click="showPassword = !showPassword"
                            >{{
                                showPassword ? "visibility_off" : "visibility"
                            }}</i
                        >
                    </div>
                </div>

                <div class="form-group password-group">
                    <label for="confirm-password">Confirm Password*</label>
                    <div class="password-wrapper">
                        <input
                            :type="showConfirmPassword ? 'text' : 'password'"
                            id="confirm-password"
                            v-model="confirmPassword"
                            placeholder="Confirm Password"
                            maxlength="15"
                            required
                        />
                        <i
                            class="material-icons toggle-password"
                            @click="showConfirmPassword = !showConfirmPassword"
                            >{{
                                showConfirmPassword
                                    ? "visibility_off"
                                    : "visibility"
                            }}</i
                        >
                    </div>
                    <p v-if="confirmPasswordError" style="color: red">
                        Passwords do not match
                    </p>
                </div>

                <div class="form-group terms">
                    <input
                        type="checkbox"
                        id="terms"
                        v-model="termsAccepted"
                        required
                        class="terms-checkbox"
                    />
                    <label for="terms"
                        >Agree to the <a href="#">Terms & Services</a></label
                    >
                </div>

                <button type="button" class="prev-btn" @click="prevStep">
                    Previous
                </button>
                <button
                    type="submit"
                    class="submit-btn"
                    :disabled="!isFormValid"
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import '../App.css';
export default {
    data() {
        return {
            userType: "seller",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            confirmPasswordError: false,
            countryCode: "+971",
            phoneNumber: "",
            termsAccepted: false,
            showPassword: false,
            showConfirmPassword: false,
            storeName: "",
            companyName: "",
            step: 1,
            tooltip: "",
            errorMessage: "",
            phoneNumberError: "",
            countries: [
                {
                    name: "UAE",
                    code: "+971",
                    flag: "https://flagcdn.com/w320/ae.png",
                },
                {
                    name: "US",
                    code: "+1",
                    flag: "https://flagcdn.com/w320/us.png",
                },
                {
                    name: "UK",
                    code: "+44",
                    flag: "https://flagcdn.com/w320/gb.png",
                },
            ],
        };
    },
    computed: {
        progressPercentage() {
            if (this.userType === "seller") {
                return (this.step / 3) * 100;
            } else {
                return (this.step / 2) * 100;
            }
        },
        isNextStepEnabled() {
            if (this.step === 1) {
                return (
                    this.firstName &&
                    this.lastName &&
                    this.email &&
                    this.phoneNumber &&
                    !this.phoneNumberError
                );
            } else if (this.step === 2 && this.userType === "seller") {
                return this.storeName && this.companyName;
            }
            return true;
        },
        selectedFlag() {
            const selectedCountry = this.countries.find(
                (country) => country.code === this.countryCode
            );
            return selectedCountry ? selectedCountry.flag : "";
        },
        isFormValid() {
            if (this.userType === "seller") {
                return (
                    this.firstName &&
                    this.lastName &&
                    this.email &&
                    this.password &&
                    this.confirmPassword &&
                    !this.passwordMismatch &&
                    this.phoneNumber &&
                    this.termsAccepted &&
                    this.storeName &&
                    this.companyName
                );
            } else {
                return (
                    this.firstName &&
                    this.lastName &&
                    this.email &&
                    this.password &&
                    this.confirmPassword &&
                    !this.passwordMismatch &&
                    this.phoneNumber &&
                    this.termsAccepted
                );
            }
        },
        passwordMismatch() {
            return (
                this.password &&
                this.confirmPassword &&
                this.password !== this.confirmPassword
            );
        },
    },
    methods: {
        nextStep() {
            this.errorMessage = "";
            this.phoneNumberError = "";

            // Validation for step 1
            if (this.step === 1) {
                if (
                    !this.firstName ||
                    !this.lastName ||
                    !this.email ||
                    !this.phoneNumber
                ) {
                    this.errorMessage =
                        "Please fill out all required fields to continue.";
                    return;
                }
                if (this.phoneNumberError) {
                    return; // Prevent moving to the next step if the phone number is invalid
                }
            }

            // Validation for sellers on step 2
            if (this.userType === "seller" && this.step === 2) {
                if (!this.storeName || !this.companyName) {
                    this.errorMessage =
                        "Please fill out all fields to continue.";
                    return;
                }
            }

            if (this.userType === "seller" && this.step < 3) {
                this.step++;
            } else if (this.userType === "buyer" && this.step < 2) {
                this.step++;
            }
        },
        prevStep() {
            if (this.step > 1) {
                this.step--;
            }
        },
        validatePhoneNumber() {
            const digitsOnly = this.phoneNumber.replace(/\D/g, ""); // Remove non-digit characters

            if (digitsOnly.length > 12) {
                this.phoneNumber = digitsOnly.slice(0, 12); // Limit to 12 digits
            } else if (digitsOnly.length < 1 && digitsOnly.length < 12) {
                this.phoneNumberError = "Enter a valid phone number.";
            } else {
                this.phoneNumberError = ""; // Clear error if valid
                this.phoneNumber = digitsOnly; // Update input with only digits
            }
        },
        showTooltip(field) {
            this.tooltip = field;
        },
        hideTooltip() {
            this.tooltip = "";
        },
        submitForm() {
            if (this.termsAccepted) {
                alert("Form submitted successfully!");
            } else {
                alert("Please agree to the terms and conditions.");
            }
        },
    },
};
</script>
