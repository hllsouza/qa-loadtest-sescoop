import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class EventsUserById {
  getEventsUserById(token, user_id) {
    const url = `${Utils.getBaseUrl()}/eventos/eventos_usuarios_by_ids/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const query = {
      id_evento: "1",
      id_user: user_id,
    };

    const fullUrl = `${url}?${Object.entries(query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")}`;
    const response = http.get(fullUrl, params);
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }
}
