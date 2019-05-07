import axios from "axios";

export function getAPOD(date = "") {
  return axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=PkRKX8T9HkMGSjyfoFhhJgviZIl6co4sQczor6KH&date=${date}`
  );
}
