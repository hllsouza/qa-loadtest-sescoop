import { group, sleep } from "k6";
import { SharedArray } from "k6/data";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import Auth from "../requests/authenticate.js";
import Me from "../requests/me.js";
import ParticipantById from "../requests/participant_by_user_id.js";
import Plenary from "../requests/plenary_vote.js";

const userData = new SharedArray("userCredentials", function () {
  return JSON.parse(open("../utils/users.json"));
});

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: "2m", target: 2000 },
    { duration: "5m", target: 2000 },
    { duration: "2m", target: 3000 },
    { duration: "5m", target: 3000 },
    { duration: "2m", target: 4000 },
    { duration: "5m", target: 4000 },
    { duration: "5m", target: 0 },
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
  const atividadeIds = [26];
  const atividadeId = randomItem(atividadeIds);

  const payload = JSON.stringify({
    username: user.username.toString(),
    password: user.password.toString(),
  });

  let auth = new Auth();
  sleep(2)
  let me = new Me();
  sleep(2)
  let participant_by_user_id = new ParticipantById();
  sleep(2)
  let vote_plenary = new Plenary();
  sleep(2)

  // Authentication
  auth.access(payload);
  sleep(1);

  // Get user details
  me.getByMe(auth.getToken());
  sleep(1);

  // Get participant ID
  participant_by_user_id.getParticipantByUserId(auth.getToken(), me.getId());

  // Perform voting
  vote_plenary.plenaryVote(auth.getToken(), atividadeId, participant_by_user_id.getUserId());
  sleep(1);
}
