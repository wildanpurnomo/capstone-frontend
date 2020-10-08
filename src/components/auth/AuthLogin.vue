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
                Login
              </div>
            </v-row>
            <v-form ref="loginForm" v-model="isFormValid">
              <v-text-field
                v-model="user.username"
                label="Username"
                type="text"
                append-icon="mdi-account"
                required
                :rules="usernameRules"
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
              <div class="text-center mb-8">
                <v-btn
                  width="100%"
                  type="submit"
                  class="primary"
                  :disabled="!isFormValid || isFormLoading"
                  :loading="isFormLoading"
                  @click.prevent="login"
                  >Login</v-btn
                >
              </div>
              <div class="text-center">
                <router-link :to="{ name: 'AuthRegister' }"
                  >Register</router-link
                >
              </div>
              <div class="red--text mt-8" :hidden="errorMessage.length === 0">
                {{ errorMessage }}
              </div>
            </v-form>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <Snackbar :duration="3000" />
  </v-container>
</template>
<script>
import formInputMixin from "@/mixins/formInputMixin";
import loggerMixin from "@/mixins/loggerMixin";
import UserModel from "@/models/UserModel";
import Snackbar from "@/components/basic/Snackbar";
import { EventBus } from "@/bus";

export default {
  name: "AuthLogin",
  components: { Snackbar },
  data: () => ({
    user: new UserModel(),
    isPasswordShown: false,
    errorMessage: "",
  }),
  methods: {
    async login() {
      this.isFormLoading = true;
      try {
        let response = await this.$store.dispatch("auth/login", this.user);
        if (response.status === 200) {
          this.errorMessage = "";
          this.$router.push({ name: "MainView" });
        }
      } catch (error) {
        this.errorMessage = this.decryptError(error);
        this.isFormLoading = false;
      }
    },
  },
  mounted() {
    let params = this.$route.params;
    if (params.snackbarMessage) {
      EventBus.$emit("onShowSnackbar", params.snackbarMessage);
    }
  },
  mixins: [formInputMixin, loggerMixin],
};
</script>