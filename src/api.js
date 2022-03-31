import axios from "axios";

const API_ENDPOINT = "https://icanhazdadjoke.com";

const config = {
  headers: {
    Accept: "application/json",
  },
};
export const fetchData = async ({ search, page }) => {
  const { data } = await axios.get(
    `${API_ENDPOINT}/search?limit=10&page=${page}&term=${search}`,
    config
  );
  return data;
};
