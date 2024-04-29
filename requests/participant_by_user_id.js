import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class ParticipantUserId {
  constructor() {
    this.user_id = "";
  }

  getParticipantByUserId(token, id) {
    const url = `${Utils.getBaseUrl()}/eventos/participantes-by-user-id/${id}`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = http.get(url, params);
    this.user_id = response.json("id");
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }

  getUserId() {
    return this.user_id;
  }
}
