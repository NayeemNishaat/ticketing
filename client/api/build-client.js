import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // Key: We are on the server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      // baseURL:
      //   "http://www.live.domain/", // Note: For solving DGO ingress-nginx issue
      headers: req.headers
    });
  } else {
    // Key: We are on the browser
    return axios.create({ baseURL: "/" }); // Note: Can be ignore
  }
};
