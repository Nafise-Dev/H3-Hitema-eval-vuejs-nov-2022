import { defineStore } from "pinia";
import { UserApi } from "../services/user";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    add: async function (identifiant) {
      // debugger;
      const userApi = new UserApi();

      const verif = await userApi.existe(identifiant.email);

      console.log(verif, identifiant.email);

      if (!verif) return { message: "l'email est déjà utilisé" };

      const user = await userApi.create(identifiant);

      this.user = {
        pseudo: user.pseudo,
        email: user.email,
        password: user.password,
        urlImgProfil: user.urlImgProfil,
        isLogged: false,
      };

      return { message: "ok" };
    },
    login: async function (identifiant) {
      // debugger;
      const userApi = new UserApi();

      //on vérifie que l'email existe dans la bdd
      const verif = await userApi.existe(identifiant.email);

      console.log(verif, identifiant.email);
      //si l'email existe dans la bdd, alors "verif" est égal à false et on récupère les autres informations de ce compte
      if (verif) {
        return { message: "Ce compte n'existe pas ! Veuillez vous inscrire" };
      }

      const user = await userApi.get(identifiant.email);

      if (user[0].password === identifiant.password) {
        this.user = {
          pseudo: user[0].pseudo,
          email: user[0].email,
          password: user[0].password,
          urlImgProfil: user[0].urlImgProfil,
          isLogged: true,
        };

        return { message: "ok" };
        // return user;
      } else {
        this.user = {
          pseudo: "",
          email: "",
          password: "",
          urlImgProfil: "",
          isLogged: false,
        };

        return { message: "no" };
        // return user;
      }
    },

    logout: async function () {
      // debugger;
      this.user = {
        pseudo: "",
        email: "",
        password: "",
        urlImgProfil: "",
        isLogged: false,
      };

      return this.user;
    },
  },
});
