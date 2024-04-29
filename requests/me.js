import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class Me {
  constructor() {
    this.id = "";
    this.email = "";
    this.cpf = "";
    this.name = "";
  }

  getByMe(token) {
    const url = `${Utils.getBaseUrl()}/autenticador/user/me`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = http.get(url, params);
    this.id = response.json("id");
    this.email = response.json("email");
    this.cpf = response.json("cpf");
    this.name = response.json("name");
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getCpf() {
    return this.cpf;
  }

  getName() {
    return this.name;
  }
}
