const makeGet = (url: string) => {
  return fetch(url).then((res) => res.json());
};

export { makeGet };
