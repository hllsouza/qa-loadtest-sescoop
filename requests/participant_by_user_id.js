import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class ParticipantUserId {
  constructor() {
    this.user_id = "";
  }

  async getParticipantByUserId(token, id) {
    const url = `${Utils.getBaseUrl()}/eventos/participantes-by-user-id/${id}`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await http.asyncRequest('GET', url, null, params);
    const responseData = response.json();
    this.user_id = responseData.id;
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }

  getUserId() {
    return this.user_id;
  }
}
