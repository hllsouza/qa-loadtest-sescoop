import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class Terms {
  aceept_terms(token, id, name, email, phone, username) {
    const payload = JSON.stringify({
      nome: name,
      email: email,
      phone: phone,
      username: username,
    });
    const url = `${Utils.getBaseUrl()}/autenticador/user/${id}`;
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
