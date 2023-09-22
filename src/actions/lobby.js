import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { requestInstance } from "../axios";
import { useNavigate } from "react-router-dom";
import { BASE_url } from "../axios";

const getRoomsUrl = `${BASE_url}/api/v1/rooms/lobby`;
const joinRoomUrl = `${BASE_url}/api/v1/rooms/join/`;

export const useLobbyData = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      try {
        const res = await requestInstance.get(getRoomsUrl);
        queryClient.invalidateQueries("rooms");
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useRoomMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (id) => {
      try {
        console.log(id);
        const res = await requestInstance.patch(joinRoomUrl + id);
        navigate(`/lobby/room/${id}`);
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
