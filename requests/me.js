import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class Me {
  constructor() {
    this.id = "";
  }

  async getByMe(token) {
    const url = `${Utils.getBaseUrl()}/autenticador/user/me`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await http.asyncRequest('GET', url, null, params);
    const responseData = response.json();
    this.id = responseData.id;
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }

  getId() {
    return this.id;
  }
}
