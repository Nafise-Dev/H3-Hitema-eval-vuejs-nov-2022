<template>
  <div v-if="!show">
    <div class="card" style="width: 66rem">
      <div class="card-body">
        <h2 class="card-title">Quoi de neuf {{ userStore.user.pseudo }} ?</h2>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <!-- <label for="email">email</label> -->
            <textarea
              type="contenu"
              @focus="show = false"
              class="form-control"
              id="contenu"
              v-model="contenu"
              placeholder="laisser un nouveau post"
            />
          </div>
          <div class="mb-3">
            <!-- <label for="urlImgArticle">profile photo</label> -->
            <input
              type="urlImgArticle"
              @focus="show = false"
              class="form-control"
              id="urlImgArticle"
              v-model="urlImgArticle"
              placeholder="url de votre image - taille conseillé 1080x720px"
            />
          </div>
          <div class="mb-3">
            <input type="submit" class="btn btn-success btn-lg btn-block" />
          </div>
          <div class="alert alert-danger" v-if="showFormError">
            <div v-for="message in messages">{{ message }}</div>
          </div>
        </form>
      </div>
    </div>
    <br />
  </div>
  <article v-for="(posts, index) in articles" :key="index" class="col-4">
    <div class="card" style="width: 66rem">
      <div class="card-header">
        <header
          class="d-flex justify-content-between align-items-baseline mt-0"
        >
          <h2 class="card-title mb-0">
            {{ posts.pseudo }}
            <img
              :src="posts.urlImgProfil"
              alt="profile photo"
              style="width: 40px; border-radius: 50%"
            />
          </h2>
          <p>
            posté le {{ new Date(posts.date).getDate() }}/{{
              new Date(posts.date).getMonth()
            }}/{{ new Date(posts.date).getFullYear() }} à
            {{ new Date(posts.date).getHours() }}h{{
              new Date(posts.date).getMinutes()
            }}
          </p>
        </header>
      </div>
      <img class="card-img" :src="posts.urlImgArticle" alt="article photo" />
      <div class="card-body">
        <p class="card-text">{{ posts.contenu }}</p>
      </div>
      <div class="card-header card-footer border-primary">
        <button
          class="btn btn-primary"
          @click.stop.prevent="likeArticle($event, posts.id)"
        >
          <i class="fa fa-thumbs-up"></i>{{ posts.like }}
        </button>
        <button class="btn btn-success">
          <i class="fa fa-comment"></i> {{ posts.commentaires.length }}
        </button>
      </div>
      <div class="card-body" v-if="posts.commentaires.length !== 0">
        <h3 class="card-title">Commentaires:</h3>
      </div>
      <div
        v-if="posts.commentaires.length !== 0"
        v-for="(comments, index2) in posts.commentaires"
        :key="index2"
        class="card-body"
      >
        <header
          class="d-flex justify-content-between align-items-baseline mt-0"
        >
          <h5 class="card-title mb-0">
            {{ comments.pseudo }}
          </h5>
          <h5>
            posté le {{ new Date(comments.dt).getDate() }}/{{
              new Date(comments.dt).getMonth()
            }}/{{ new Date(comments.dt).getFullYear() }} à
            {{ new Date(comments.dt).getHours() }}h{{
              new Date(comments.dt).getMinutes()
            }}
          </h5>
        </header>
        <!-- <div class="card-body"> -->
        <p>{{ comments.contenu }}</p>
        <!-- </div> -->
      </div>
      <div class="card-body" v-if="!show">
        <h3 class="card-title">Ajouter un Commentaire:</h3>
        <form @submit.prevent="submitComment(posts.id)">
          <div class="mb-3">
            <!-- <label for="email">email</label> -->
            <textarea
              type="comment"
              @focus="show = false"
              class="form-control"
              id="comment"
              v-model="comment"
              placeholder="laisser un commentaire"
            />
          </div>
          <div class="mb-3">
            <input
              type="submit"
              class="btn btn-success btn-lg btn-block"
              value="Laisser un commentaire"
            />
          </div>
          <div class="alert alert-danger" v-if="showFormCommentError">
            <div v-for="message in messages">{{ message }}</div>
          </div>
        </form>
      </div>
    </div>
    <br />
    <!-- <div class="card" style="width: 66rem"></div> -->
  </article>
</template>

<script setup>
import ArticleApi from "../../services/article";
import { RouterLink } from "vue-router";
import { useUserStore } from "../../stores/userStore";
import { useArticleStore } from "../../stores/articleStore";
import { onMounted, ref, watch, defineProps } from "vue";
import Joi from "joi";
let articles = ref([]);
let show = ref(true);
const userStore = useUserStore();
let showFormError = ref(false);
let showFormCommentError = ref(false);
let messages = ref({});
const pseudo = ref("");
const id = ref("");
const urlImgProfil = ref("");
const urlImgArticle = ref("");
const contenu = ref("");
const like = ref("");
const date = ref("");
const comment = ref("");
const commentaires = ref("");

async function getArticles() {
  // debugger;
  let tailleData = 0;
  const api = new ArticleApi();
  const data = await api.getAll();
  articles.value = data.sort((a, b) => b.id - a.id);
}
await getArticles();

watch(() => {
  // debugger;
  //   getArticles();
  if (userStore.user && userStore.user.isLogged) {
    show.value = false;
  } else {
    show.value = true;
  }
});

onMounted(() => {
  // debugger;
  getArticles();
});

async function submit() {
  // debugger;
  const validationArticle = Joi.object({
    contenu: Joi.string().trim().min(3).max(255).required(),
    urlImgArticle: Joi.string().required(),
  });

  const formArticles = {
    contenu: contenu.value,
    urlImgArticle: urlImgArticle.value,
  };

  const detailsArticle = {
    id: articles.value.length + 1,
    pseudo: userStore.user.pseudo,
    contenu: contenu.value,
    urlImgArticle: urlImgArticle.value,
    like: 0,
    urlImgProfil: userStore.user.urlImgProfil,
    date: new Date().getTime(),
    commentaires: [],
  };
  const { error } = validationArticle.validate(formArticles, {
    abortEarly: false,
  });

  if (error) {
    showFormError.value = true;
    const details = [];
    for (let er of error.details) {
      details.push(er.message);
    }
    messages.value = details;
    return;
  }

  let articleStore = useArticleStore();
  const reponse = await articleStore.add(detailsArticle);
  if (reponse.message && reponse.message === "ok") {
    alert("Vous avez publié un article !");
    //on récupère les articles mis à jours sans rafraichir la page,
    // si la page se rafraichit, les datas de l'user sont perdues
    getArticles();
    contenu.value = "";
    urlImgArticle.value = "";
  } else {
    alert("Votre article n'a pas pu être publié");
  }
}

async function likeArticle(event, articleId) {
  // debugger;
  if (userStore.user && userStore.user.isLogged) {
    let articleStore = useArticleStore();
    const reponse = await articleStore.incrementLike(articleId);
    if (reponse.message && reponse.message === "ok") {
      console.log("article id : " + articleId + "liké");
      getArticles();
    } else {
      alert("Une erreur est survenue");
      console.log(reponse);
    }
  } else {
    alert("Authentifiez-vous pour interagir avec les articles");
  }
}

async function submitComment(articleId) {
  // debugger;
  const validationComment = Joi.object({
    comment: Joi.string().trim().min(3).max(255).required(),
  });

  const formComment = {
    comment: comment.value,
  };

  const { error } = validationComment.validate(formComment, {
    abortEarly: false,
  });

  if (error) {
    showFormCommentError.value = true;
    const details = [];
    for (let er of error.details) {
      details.push(er.message);
    }
    messages.value = details;
    return;
  }

  let articleStore = useArticleStore();
  const data = await articleStore.getSelectedArticle(articleId);

  let commentaireId = "";
  if (data.commentaires.length > 0) {
    commentaireId = data.commentaires.length + 1;
  } else {
    commentaireId = 1;
  }

  // console.log(data);

  const detailsComment = {
    id: commentaireId,
    contenu: comment.value,
    pseudo: userStore.user.pseudo,
    dt: new Date().getTime(),
  };

  const reponse = await articleStore.addComment(articleId, detailsComment);
  if (reponse.message && reponse.message === "ok") {
    console.log("commentaire ajouté");
    getArticles();
    if (data.pseudo !== userStore.user.pseudo) {
      alert("Vous avez laissé un commentaire à l'article de " + data.pseudo);
    } else {
      alert(
        "Vous avez laissé un commentaire à votre article du " +
          new Date(data.date).getDate() +
          "/" +
          new Date(data.date).getMonth() +
          "/" +
          new Date(data.date).getFullYear()
      );
    }

    comment.value = "";
  } else {
    alert("Une erreur est survenue");
    console.log(reponse);
  }
}
</script>
