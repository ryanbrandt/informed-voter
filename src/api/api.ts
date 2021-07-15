import { create } from "apisauce";

import { FEC_API_KEY, FEC_BASE_URL } from "../utils/secrets";

const api = create({
  baseURL: FEC_BASE_URL,
  headers: {
    accept: "application/json",
  },
});

api.addRequestTransform((request) => {
  request.params.api_key = FEC_API_KEY;
});

export default api;
