export const userRules = {
  firstName: [
    {
      required: true,
      message: "Renseigner un prénom",
      trigger: "blur",
    },
    {
      min: 3,
      max: 15,
      message: "Entre 3 et 15 lettres",
      trigger: "blur",
    },
  ],
  lastName: [
    {
      required: true,
      message: "Renseigner un nom de famille",
      trigger: "blur",
    },
    {
      min: 3,
      max: 15,
      message: "Entre 3 et 15 lettres",
      trigger: "blur",
    },
  ],
  email: [
    {
      type: "email",
      required: true,
      message: "Renseignez un email",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "Renseignez un password",
      trigger: "blur",
    },
    {
      min: 3,
      max: 15,
      message: "Entre 3 et 15 lettres",
      trigger: "blur",
    },
  ],
};
export const loginRules = {
  email: [
    {
      type: "email",
      required: true,
      message: "Renseignez un email",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "Renseignez un password",
      trigger: "blur",
    },
    {
      min: 3,
      max: 15,
      message: "Entre 3 et 15 lettres",
      trigger: "blur",
    },
  ],
};
