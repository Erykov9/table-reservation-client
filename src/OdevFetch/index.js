import { useQuery } from "./useQuery";
import {returnFetch} from "./returnFetch";

const getQuery = (query) => {
  const values = [];
  if (query) {
    Object.keys(query).forEach((key) => {
      values.push(`${key}=${query[key]}`);
    });
  }
  const preparedQuery = values.join("&");

  return values.length ? `?${preparedQuery}` : "";
};

const endpointGenerator = (endpoint, props, rest) => {
  const securePrefix = props?.isSecure ? "/secure" : "";
  let preparedEndpoint = `${process.env.REACT_APP_API_PATH}${securePrefix}/${endpoint}/`;
  if (props?.id) {
    preparedEndpoint += props.id + "/";
  }
  if (rest) {
    preparedEndpoint += `/${rest}`;
  }
  if (props?.query) {
    preparedEndpoint += getQuery(props.query);
  }

  return preparedEndpoint;
};

export const useUsers = (props) => {
  const { loading, payload, refetch } = useQuery({
    endpoint: endpointGenerator("users", props),
    isLazy: props?.isLazy,
  });

  const register = async ({ body }) => {
    const data = await returnFetch({
      endpoint: "register",
      body,
    });
    return data;
  };

  const login = async ({body}) => {
    const data = await returnFetch({endpoint: "login", body});
    return data;
  }

  const save = async ({body}) => {
    console.log(body)
    const data = await returnFetch({endpoint: "edit-user", body});
    return data;
  };

  return {
    loading,
    payload,
    refetch,
    register,
    login,
    save,
  };
};
