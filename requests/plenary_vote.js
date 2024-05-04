import { check } from "k6";
import http from "k6/http";
import httpx from "https://jslib.k6.io/httpx/0.0.6/index.js";
import Utils from "../utils/utils.js";

export default class Plenary {
  constructor() {
    this.client = new httpx.Client();
  }

  async plenaryVote(token, pauta, participant) {
    const url = `${Utils.getBaseUrl()}/atividades/atividades/votar`;
    const payload = JSON.stringify({
      tipo: "plenaria",
      pauta_id: pauta,
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

    const response = await this.client.post(url, payload, params);
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }
}
