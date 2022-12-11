export class UserApi {
  url = "http://localhost:3000/utilisateurs";

  async create(identifiants) {
    // debugger;
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ ...identifiants }),
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

  async existe(email) {
    // debugger;
    try {
      // debugger;
      const reponse = await fetch(
        `http://localhost:3000/utilisateurs?email=${email}`
      );
      const data = await reponse.json();
      return data.length === 0 ? true : false;
    } catch (ex) {
      console.log(ex);
    }
  }

  async get(email) {
    // debugger;
    try {
      const options = {
        method: "GET",
      };
      const reponse = await fetch(
        `http://localhost:3000/utilisateurs?email=${email}`,
        options
      );
      const data = await reponse.json();
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }
}
