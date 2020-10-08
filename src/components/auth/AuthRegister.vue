<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-card class="pa-8" width="500">
            <v-row justify="center">
              <div
                class="mb-16 text-h3 font-weight-light blue--text text--lighten-2"
              >
                Register
              </div>
            </v-row>
            <v-form ref="registerForm" v-model="isFormValid">
              <v-text-field
                label="Username"
                type="text"
                v-model="user.username"
                :rules="this.usernameRules"
                required
              ></v-text-field>
              <v-text-field
                label="Email"
                type="email"
                v-model="user.email"
                :rules="this.emailRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="Password"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShown ? 'text' : 'password'"
                required
                :rules="passwordRules"
                @click:append="isPasswordShown = !isPasswordShown"
              ></v-text-field>
              <v-text-field
                v-model="passwordConfirmation"
                label="Konfirmasi Password"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShown ? 'text' : 'password'"
                required
                :rules="passwordConfirmationRules"
                @click:append="isPasswordShown = !isPasswordShown"
              ></v-text-field>
              <div class="text-center mb-8">
                <v-btn
                  type="submit"
                  class="primary"
                  width="100%"
                  :disabled="!isFormValid || isFormLoading"
                  :loading="isFormLoading"
                  @click.prevent="register"
                  >Register</v-btn
                >
              </div>
              <div class="text-center">
                <router-link :to="{ name: 'AuthLogin' }"
                  >Kembali ke login</router-link
                >
              </div>
              <div class="h6 red--text" :hidden="errorMessage.length === 0">
                {{ errorMessage }}
              </div>
            </v-form>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import UserModel from "@/models/UserModel";
import formInputMixin from "@/mixins/formInputMixin";
import loggerMixin from "@/mixins/loggerMixin";

export default {
  name: "AuthRegister",
  computed: {
    passwordConfirmationRules() {
      return [
        (v) =>
          (!!v && v) === this.user.password || "Masukkan password yang sama.",
      ];
    },
  },
  data: () => ({
    user: new UserModel(),
    errorMessage: "",
    passwordConfirmation: "",
    isPasswordShown: false,
  }),
  methods: {
    async register() {
      this.isFormLoading = true;
      try {
        let response = await this.$store.dispatch("auth/register", this.user);
        if (response.status === 200) {
          this.isFormLoading = false;
          this.errorMessage = "";
          this.$router.push({ name: "MainView" });
        }
      } catch (error) {
        this.errorMessage = this.decryptError(error);
        this.isFormLoading = false;
      }
    },
  },
  mixins: [formInputMixin, loggerMixin],
};
</script>