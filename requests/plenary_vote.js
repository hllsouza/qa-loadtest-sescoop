import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class Plenary {
  async plenaryVote(token, participant) {
    const url = `${Utils.getBaseUrl()}/atividades/atividades/votar`;
    const payload = JSON.stringify({
      tipo: "plenaria",
      pauta_id: 97,
      participante_id: participant,
      propostas: [284],
      urgencia: 4,
      impacto: 5,
    });

    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await http.asyncRequest('POST', url, payload, params);
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }
}
