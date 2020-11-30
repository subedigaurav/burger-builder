import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

  // clear error on every request from the burger builder
  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.request.eject(resInterceptor);
    };
  }, [httpClient.interceptors, reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
