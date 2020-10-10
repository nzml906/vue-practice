export const getToken = () => {
  return window.localStorage.getItem('id_token');
};

export const saveToken = token => {
  window.localStorage.setItem('id_token', token);
};

export const destroyToken = () => {
  window.localStorage.removeItem('id_token');
};

export default { getToken, saveToken, destroyToken };
