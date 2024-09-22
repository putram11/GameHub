import axios from "axios";

export const localRequest = axios.create({
  baseURL: "https://news.putram.site",
});
