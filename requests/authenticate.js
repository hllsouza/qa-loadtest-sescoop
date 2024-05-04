import { check } from "k6";
import http from "k6/http";
import httpx from 'https://jslib.k6.io/httpx/0.0.6/index.js';
import Utils from "../utils/utils.js";

export default class Auth {
  constructor() {
    this.params = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    this.token = "";
    this.client = new httpx.Client();
  }

  async access(payload) {
    const url = `${Utils.getBaseUrl()}/autenticador/user/login`;

    const response = await this.client.post(url, payload, this.params);
    this.token = response.json("access_token");
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }

  getToken() {
    return this.token;
  }
}
