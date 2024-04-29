import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class RemoveParticipant {
  removeParticipant(token, id_atividade, id_user) {
    const url = `${Utils.getBaseUrl()}/atividades/atividades/${id_atividade}/participantes/${id_user}`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = http.del(url, null, params);
    console.log(response.body)
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }
}
