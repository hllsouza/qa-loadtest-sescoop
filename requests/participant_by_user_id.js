import { check } from "k6";
import http from "k6/http";
import httpx from 'https://jslib.k6.io/httpx/0.0.6/index.js';
import Utils from "../utils/utils.js";

export default class ParticipantUserId {
  constructor() {
    this.user_id = "";
    this.client = new httpx.Client();
  }

  async getParticipantByUserId(token, id) {
    const url = `${Utils.getBaseUrl()}/eventos/participantes-by-user-id/${id}`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.client.get(url, params);
    this.user_id = response.json("id");
    console.log(response.body);
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }

  getUserId() {
    return this.user_id;
  }
}
