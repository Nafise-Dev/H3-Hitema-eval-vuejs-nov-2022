import { defineStore } from "pinia";
import ArticleApi from "../services/article";

export const useArticleStore = defineStore("articleStore", {
  state: () => {
    return {
      posts: {},
    };
  },
  actions: {
    add: async function (detailsArticle) {
      // debugger;
      const articleApi = new ArticleApi();
      await articleApi.create(detailsArticle);
      return { message: "ok" };
    },

    incrementLike: async function (articleId) {
      // debugger;
      const articleApi = new ArticleApi();
      const rep = await articleApi.getOne(articleId);
      // console.log("rep avant like : " + rep);
      this.posts = {
        id: rep.id,
        pseudo: rep.pseudo,
        contenu: rep.contenu,
        urlImgArticle: rep.urlImgArticle,
        like: rep.like + 1,
        urlImgProfil: rep.urlImgProfil,
        date: rep.date,
        commentaires: rep.commentaires,
      };
      await articleApi.update(articleId, this.posts);
      return { message: "ok" };
      // return rep;
    },

    addComment: async function (articleId, commentDetails) {
      // debugger;
      const articleApi = new ArticleApi();
      const rep = await articleApi.getOne(articleId);
      this.posts = {
        id: rep.id,
        pseudo: rep.pseudo,
        contenu: rep.contenu,
        urlImgArticle: rep.urlImgArticle,
        like: rep.like,
        urlImgProfil: rep.urlImgProfil,
        date: rep.date,
        commentaires: rep.commentaires,
      };

      this.posts.commentaires.push(commentDetails);
      await articleApi.update(articleId, this.posts);
      return { message: "ok" };
    },

    getSelectedArticle: async function (articleId) {
      // debugger;
      const articleApi = new ArticleApi();
      const data = await articleApi.getOne(articleId);
      return data;
    },
  },
});
