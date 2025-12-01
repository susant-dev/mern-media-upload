/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer } from "react";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

function apiReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return { loading: false, data: action.payload, error: null };
    case "NETWORK_ERROR":
    case "HTTP_ERROR":
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case "FORM_ERROR":
      return {
        loading: false,
        data: null,
        error: "Please fix the errors before submitting.",
        formError: action.payload.map(({ path, msg }) => ({
          name: path,
          message: msg,
        })),
      };
    default:
      return state;
  }
}

function useApi(url, options = {}, { auto = true } = {}) {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  const fetchApi = useCallback(
    async (overrideBody) => {
      dispatch({ type: "LOADING" });
      let body = undefined;
      if (options.body) body = options.body;
      if (overrideBody) body = overrideBody;
      if (!(body instanceof FormData)) body = JSON.stringify(body);
      try {
        const res = await fetch(url, {
          ...options,
          body,
        });
        const parsedBody = await res.json();
        if (res.ok) {
          dispatch({ type: "SUCCESS", payload: parsedBody });
          return;
        }
        if (res.status === 400) {
          dispatch({ type: "FORM_ERROR", payload: parsedBody.errors });
          return;
        }
        dispatch({ type: "HTTP_ERROR", payload: parsedBody.errorMessage });
      } catch (err) {
        dispatch({ type: "NETWORK_ERROR", payload: err.message });
      }
    },
    [url, options]
  );

  useEffect(() => {
    if (auto) fetchApi();
  }, [auto]);

  return {
    ...state,
    refetch: fetchApi,
  };
}

export default useApi;
