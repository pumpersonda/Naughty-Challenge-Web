export interface Challenge {
  name: string;
  challenge: string;
  level: number;
  victim: boolean;
}

export interface DefaultData {
  lucky_people: string[];
  challenges: Challenge[];
}

const DEFAULT_DATA: DefaultData = {
  lucky_people: [
    "La persona con los calcetines más coloridos",
    "Quien tenga menos batería",
    "La persona más alta",
    "Alguien que tenga lentes",
    "El dueño de la casa"
  ],
  challenges: [
    { name: "Baile Prohibido", challenge: "Baila 30 segundos pegado a la pared.", level: 2, victim: false },
    { name: "Verdad Incómoda", challenge: "Confiesa tu peor cita.", level: 3, victim: false },
    { name: "Cosquillas", challenge: "Hazle cosquillas por 10 segundos a...", level: 1, victim: true },
    { name: "Intercambio", challenge: "Cambia una prenda con...", level: 4, victim: true },
  ]
};

export default DEFAULT_DATA;

