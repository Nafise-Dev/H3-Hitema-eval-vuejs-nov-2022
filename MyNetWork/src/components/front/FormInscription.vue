<template>
  <div class="card" style="width: 66rem">
    <div class="card-body">
      <h2 class="card-title">
        Créer un nouveau profil
        <i class="fa fa-user-plus" style="font-size: 30px"></i>
      </h2>
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label for="pseudo">pseudo</label>
          <input
            type="pseudo"
            @focus="show = false"
            class="form-control"
            id="pseudo"
            v-model="pseudo"
            placeholder="pseudo"
          />
        </div>
        <div class="mb-3">
          <label for="email">email</label>
          <input
            type="email"
            @focus="show = false"
            class="form-control"
            id="email"
            v-model="email"
            placeholder="votre@email.fr"
          />
        </div>
        <div class="mb-3">
          <label for="password">password</label>
          <input
            type="password"
            @focus="show = false"
            class="form-control"
            id="password"
            v-model="password"
            placeholder="password"
          />
        </div>
        <div class="mb-3">
          <label for="urlImgProfil">profile photo</label>
          <input
            type="urlImgProfil"
            @focus="show = false"
            class="form-control"
            id="urlImgProfil"
            v-model="urlImgProfil"
            placeholder="url de votre image - taille conseillé 1080x720px"
          />
        </div>

        <div class="mb-3">
          <input type="submit" :class="classBtn" />
        </div>
        <div class="alert alert-danger" v-if="show">
          <div v-for="message in messages">{{ message }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { useUserStore } from "../../stores/userStore";
import Joi from "joi";
import { useRouter } from "vue-router";
const pseudo = ref("");
const email = ref("");
const password = ref("");
const urlImgProfil = ref("");
let show = ref(false);
let messages = ref({});
let router = useRouter();

const props = defineProps({ btn: String, action: String });

const classBtn = computed(() => {
  return `btn btn-${props.btn}`;
});

async function submit() {
  const validationIdentifiant = Joi.object({
    pseudo: Joi.string().trim().min(3).max(255).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().trim().min(6).max(255).required(),
    urlImgProfil: Joi.string().required(),
  });

  const identifiants = {
    pseudo: pseudo.value,
    email: email.value,
    password: password.value,
    urlImgProfil: urlImgProfil.value,
  };
  const { error } = validationIdentifiant.validate(identifiants, {
    abortEarly: false,
  });

  if (error) {
    show.value = true;
    const details = [];
    for (let er of error.details) {
      details.push(er.message);
    }
    messages.value = details;
    return;
  }
  let userStore = useUserStore();
  if (props.action === "creer") {
    const reponse = await userStore.add(identifiants);
    if (reponse.message && reponse.message === "ok") {
      router.push("/connexion");
      alert(
        "Votre compte à été crée, vous allez être redirigé vers la page de connexion"
      );
    } else {
      alert(reponse.message);
    }
    console.log(reponse);
  }
  //   else if (props.action === "connecter") {
  //     userStore.login(identifiants);
  //   }
  else {
    return { message: "Erreur ! Votre compte n'a pas pu être crée" };
  }
}
</script>
