import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class Auth {
  constructor() {
    this.params = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    this.token = "";
  }

  async access(payload) {
    const url = `${Utils.getBaseUrl()}/autenticador/user/login`;

    const response = await http.asyncRequest('POST', url, payload, this.params);
    this.token = response.json("access_token");
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }

  getToken() {
    return this.token;
  }
}
