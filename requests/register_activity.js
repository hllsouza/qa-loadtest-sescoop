import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/utils.js";

export default class RegisterActivity {
  registerActivity(token, id, activityId) {
    const url = `${Utils.getBaseUrl()}/atividades/atividades/${activityId}/participar?user_id=${id}`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = http.post(url, null, params);
    check(response, {
      "is status 200": () => response.status === 200,
    });
  }
}
