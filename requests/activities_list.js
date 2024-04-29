import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class ActivitiesList {
  getActivitiesList(token, id) {
    const url = `${Utils.getBaseUrl()}/atividades/atividades/todas-atividades-bool-participante/${id}`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const paramsQuery = {
      evento_id: "1",
      page: "1",
      limit: "10",
    };
    const queryString = Object.keys(paramsQuery)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(paramsQuery[key])}`
      )
      .join("&");

    const fullUrl = `${url}?${queryString}`;
    const response = http.get(fullUrl, params);
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }
}
