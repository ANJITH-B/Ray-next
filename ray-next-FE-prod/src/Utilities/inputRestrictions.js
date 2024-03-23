export const onlyNumbers = (event) => {
  event.target.value = event.target.value.replace(/[^0-9.]/g, "");
};

export const onlyAlphabets = (event) => {
  event.target.value = event.target.value.replace(/[^A-Za-z\s]/g, "");
};

export const onlyPhoneNo = (event) => {
  event.target.value = event.target.value.replace(/[^0-9+]/g, "");
};

export const onlyDecimal = (event) => {
  event.target.value = event.target.value.replace(/[^0-9.]/g, "");
};
