import { useMutation, useQuery } from "@tanstack/react-query";
import { requestInstance } from "../axios";
import { useNavigate } from "react-router-dom";
import { BASE_url } from "../axios";

const getQuesUrl = `${BASE_url}/api/v1/questions/`;
const getSingleQuesUrl = `${BASE_url}/api/v1/questions?`;
const createRoom = `${BASE_url}/api/v1/rooms`;
export const useGetQuestions = (id) => {
  console.log(id);
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      try {
        console.log(id);
        const res = await requestInstance.get(getQuesUrl + id);
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
export const useGetSingleQuestions = (id, quesNo) => {
  console.log(id);
  return useQuery({
    queryKey: ["single_questions", quesNo],
    queryFn: async () => {
      try {
        console.log(id, quesNo);
        const res = await requestInstance.get(
          getSingleQuesUrl + "examId=" + id + "&questionIndex=" + quesNo
        );
        console.log(res, "signleeeeeeeee");
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useCreateRoom = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (roomName) => {
      console.log(roomName);
      try {
        const res = await requestInstance.post(createRoom, roomName);
        console.log(res);
        navigate(`/lobby/room/${res.data.data._id}`);
        return res;
      } catch (error) {
        console.log(error, "room create error");
      }
    },
  });
};
