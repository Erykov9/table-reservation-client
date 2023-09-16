import { useEffect, useState } from "react";
import { fetchSetting } from "./fetchConfig";

export const useQuery = ({ endpoint, isLazy }) => {
  const [state, setState] = useState({
    loading: isLazy ? false : true,
    payload: null,
  });

  const fetchPayload = async () => {
    await fetch(endpoint, {
      ...fetchSetting,
      method: "GET",
      headers: {
        ...fetchSetting.headers,
        ["Access-Token"]: `${sessionStorage.getItem("A_T")}`,
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res && res.status && res.message) {
          document.showAlert(res.message, res.status);
        }

        setState({
          ...state,
          payload: res,
          loading: false,
        });
      });
  };

  const refetch = payload => {
    setState({ ...state, loading: true });
    fetchPayload(payload);
  };

  useEffect(() => {
    if (!isLazy) {
      fetchPayload();
    }
  }, []);

  return {
    ...state,
    refetch,
  };
};
