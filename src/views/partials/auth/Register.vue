<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-card class="pa-10 rounded-lg" width="500" color="#4F4F68">
            <v-row justify="center">
              <div class="mb-15 text-h3 white--text">Daftar</div>
            </v-row>
            <v-form ref="registerForm" v-model="isFormValid">
              <v-text-field
                label="Username"
                type="text"
                v-model="user.username"
                :rules="this.usernameRules"
                required
                dark
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="Password"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShown ? 'text' : 'password'"
                required
                dark
                :rules="passwordRules"
                @click:append="isPasswordShown = !isPasswordShown"
              ></v-text-field>
              <v-text-field
                v-model="passwordConfirmation"
                label="Konfirmasi Password"
                :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isPasswordShown ? 'text' : 'password'"
                required
                dark
                :rules="passwordConfirmationRules"
                @click:append="isPasswordShown = !isPasswordShown"
              ></v-text-field>
              <div class="text-center mb-8">
                <v-btn
                  type="submit"
                  class="white--text red accent-2 rounded-xl"
                  width="70%"
                  :disabled="!isFormValid || isFormLoading"
                  :loading="isFormLoading"
                  @click.prevent="register"
                  >Register</v-btn
                >
              </div>
              <div class="text-center">
                <router-link :to="{ name: 'Login' }" style="color: white"
                  >Kembali ke login</router-link
                >
              </div>
              <div class="text-center white--text">atau</div>
              <div
                class="text-center white--text"
                :hidden="oauthUrl.length === 0"
              >
                <a :href="oauthUrl" style="color: white"
                  >Masuk dengan Google Classroom</a
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
  name: "RegisterView",

  computed: {
    passwordConfirmationRules() {
      return [
        (v) =>
          (!!v && v) === this.user.password || "Masukkan password yang sama.",
      ];
    },

    oauthUrl() {
      return this.$store.getters["auth/oauthUrl"];
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
          this.$router.push({ name: "Dashboard" });
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