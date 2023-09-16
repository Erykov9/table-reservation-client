import { fetchSetting } from "./fetchConfig";

export const returnFetch = async ({ endpoint, body }) => {
  const output = await fetch(`${process.env.REACT_APP_API_PATH}/${endpoint}`, {
    ...fetchSetting,
    headers: {
      ...fetchSetting.headers,
      ["Access-Token"]: `${sessionStorage.getItem("A_T")}`,
    },
    body: body ? JSON.stringify(body) : "",
  })
    .then(response => response.json())

  return output;
};

export const returnAskFetch = async ({ endpoint, body }) => {
  const output = await fetch(`${process.env.REACT_APP_API_PATH}/${endpoint}`, {
    ...fetchSetting,
    headers: {
      ...fetchSetting.headers,
      ["Access-Token"]: `${sessionStorage.getItem("A_T")}`,
    },
    body: body ? JSON.stringify(body) : "",
  })
    .then(response => response.json())
    .then(res => {
      if (res && res.status && res.message && !res.message.includes("ERROR-LOGS: ")) {
        document.showInfo(body, res.status);
      }

      return res;
    });

  const { data, status, message } = await output;
  if (status && status === "error" && message) {
    document.showInfo(data, status);
  }

  return data;
};
