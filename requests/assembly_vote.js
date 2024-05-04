import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class Plenary {
  plenaryVote(token, pauta, participant) {
    const url = `${Utils.getBaseUrl()}/atividades/atividades/votar`;
    const payload = JSON.stringify({
      tipo: "plenaria", //corrigir o tipo de evento
      pauta_id: pauta,
      participante_id: participant,
      propostas: [293, 303, 304, 302, 305, 294, 295, 296, 297, 298],
      urgencia: 0,
      impacto: 0,
    });

    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = http.post(url, payload, params);
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }
}
