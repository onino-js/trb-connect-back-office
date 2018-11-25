const DEV_URL = "http://192.168.1.9:3000/";
const PROD_URL = "https://onino-conect.herokuapp.com/";

let token;

const getRoutePrefix = () => {
  // eslint-disable-next-line no-undef
  const routePrefix =
    process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;
  return routePrefix;
};

export const setToken = newToken => {
  token = newToken;
};

export const getData = route => {
  const formatRoute = getRoutePrefix().concat(route);
  return fetch(formatRoute, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      return response.json().then(data => {
        return data;
      });
    })
    .catch(function() {
      return new Error("connexion problem");
    });
};

export const postData = (route, body) => {
  const formatRoute = getRoutePrefix().concat(route);
  return fetch(formatRoute, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      return response.json().then(data => {
        return data;
      });
    })
    .catch(function() {
      return new Error("connexion problem");
    });
};
