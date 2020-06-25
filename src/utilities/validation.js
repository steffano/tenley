export const emailRegex = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
export const phoneRegex = new RegExp(
  /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
);

export const passRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/,
);

export const maskPhone = value => {
  let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  return value;
};

export const unmaskPhone = value => {
  value = value.replace(/\D/g, '');
  return value;
};
