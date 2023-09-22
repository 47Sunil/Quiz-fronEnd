import { useQuery } from "@tanstack/react-query";
import { requestInstance } from "../axios";
import { BASE_url } from "../axios";

const resulturl = `${BASE_url}/api/v1/exam/report/${localStorage.getItem(
  "roomId"
)}`;

export const getResult = () => {
  return useQuery({
    queryKey: ["result"],
    queryFn: async () => {
      try {
        const res = await requestInstance.get(resulturl);
        console.log(res, "result");
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
