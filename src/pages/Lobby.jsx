import { Form, Navigate, useActionData, useNavigate } from "react-router-dom";

import { BASE_url } from "../axios";
import { useEffect, useState } from "react";
import axios from "axios";

const createRoom = `${BASE_url}/api/v1/rooms`;

const getRoomsUrl = `${BASE_url}/api/v1/rooms/lobby`;
const joinRoomUrl = `${BASE_url}/api/v1/rooms/join`;
const getQuesUrl = `${BASE_url}/api/v1/questions/`;
const createRoomUrl = `${BASE_url}/api/v1/rooms`;
const token = localStorage.getItem("Token") || null;
const Lobby = () => {
  const [room, setRoom] = useState([]);
  const [dname, setDName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await axios.get(getRoomsUrl, {
        headers: { "x-api-key": token },
      });
      console.log(data);
      setRoom(data.data);
    };
    fetchRoom();
  }, []);
  const enterRoom = async (id) => {
    console.log(joinRoomUrl + "/" + id);
    try {
      const { data } = await axios.get(joinRoomUrl + "/" + id, {
        headers: { "x-api-key": token },
      });
      console.log({ data });
    } catch (error) {
      console.log(error);
    }

    navigate(`/lobby/room/${id}`);
  };
  const createRoom = async (e) => {
    e.preventDefault();
    const fetchRoom = async () => {
      axios
        .post(
          createRoomUrl,
          { roomName: dname },
          {
            headers: { "x-api-key": token },
          }
        )
        .then((data) => {
          console.log({ data: data.data._id });
          if (data?._id) {
            navigate(`/lobby/room/${data.data._id}`);
          }
        });
    };
    fetchRoom();
    const fetchRoom2 = async () => {
      const { data } = await axios.get(getRoomsUrl, {
        headers: { "x-api-key": token },
      });
      console.log(data);
      setRoom(data.data);
    };
    fetchRoom2();
  };
  const isError = null;
  const isLoading = null;
  return (
    <>
      <h1 className="text-[50px] text-white mb-8">Lobby</h1>
      <div className="rounded-lg bg-zinc-300 w-[80%] grid grid-cols-4 p-4 gap-3 h-[60%] overflow-scroll justify-center items-center">
        {isError ? (
          <h1 className="text-center text-[30px] col-span-4 font-bold">
            No Rooms
          </h1>
        ) : isLoading ? (
          <div className="text-center text-[30px] col-span-4 font-bold">
            Loading Rooms ...
          </div>
        ) : (
          room.map((room, idx) => {
            return (
              <div
                className="rounded-md bg-black p-3 flex flex-col gap-3 cursor-pointer hover:bg-gray-800 transition duration-500 h-fit"
                key={idx}
                onClick={() => enterRoom(room._id)}
              >
                <p className="text-white capitalize">{room.roomName}</p>
                <p className="text-white capitalize">
                  Number of users {room.user.length}/2
                </p>
              </div>
            );
          })
        )}
      </div>
      <Form>
        <input
          type="text"
          value={dname}
          onChange={(e) => setDName(e.target.value)}
          placeholder="Enter a room name"
          name="roomName"
        />
        <button
          onClick={createRoom}
          className="mt-12 rounded-md text-white bg-black p-3 cursor-pointer hover:bg-gray-800 transition duration-500"
        >
          Create a room
        </button>
      </Form>
    </>
  );
};
export default Lobby;
