export default class ArticleApi {
  url = "http://localhost:3000/articles";

  static _instance;

  static getInstance() {
    if (_instance === null) {
      ArticleApi._instance = new getArticleApi();
    }
    return ArticleApi._instance;
  }

  async getAll() {
    try {
      const reponse = await fetch(this.url);
      const data = await reponse.json();
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }

  async getOne(id) {
    // debugger;
    try {
      const reponse = await fetch(`${this.url}/${id}`);
      const data = await reponse.json();
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }

  async create(detailsArticle) {
    // debugger;
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ ...detailsArticle }),
        headers: {
          "content-type": "application/json",
        },
      };
      const reponse = await fetch(this.url, options);
      const data = await reponse.json();
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }

  async update(id, detailsArticle) {
    // debugger;
    try {
      const options = {
        method: "PUT",
        body: JSON.stringify({ ...detailsArticle }),
        headers: {
          "content-type": "application/json",
        },
      };
      const reponse = await fetch(`${this.url}/${id}`, options);
      const data = await reponse.json();
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }
}
