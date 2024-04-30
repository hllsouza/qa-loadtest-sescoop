import { group } from "k6";
import { SharedArray } from "k6/data";
import Auth from "../requests/authenticate.js";

const userData = new SharedArray("userCredentials", function () {
  return JSON.parse(open("../utils/users.json"));
});

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '2m', target: 2000 }, 
    { duration: '5m', target: 2000 },
    { duration: '2m', target: 3000 }, 
    { duration: '5m', target: 3000 },
    { duration: '2m', target: 4000 }, 
    { duration: '5m', target: 4000 },
    { duration: '5m', target: 0 },     
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], //95% das reqs devem responder em até 2s
    http_req_failed: ["rate<0.01"], //1% das reqs podem ocorrer erro
  },
  ext: {
    loadimpact: {
      projectID: "3693554",
      name: "sescoop-load-authentication",
    },
  },
};

export default function () {
  let user = userData[__VU % userData.length];

  const payload = JSON.stringify({
    username: user.username.toString(),
    password: user.password.toString(),
  });

  let auth = new Auth();

  group("user authentication", () => {
    auth.access(payload);
  });
}
