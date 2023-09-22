import { useEffect, useState } from "react";
import { getResult } from "../actions/result";
import { BASE_url } from "../axios";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const url = `${BASE_url}/api/v1/exam/report/`;
const deleteDom = `${BASE_url}/api/v1/rooms/`;
const token = localStorage.getItem("Token") || null;
const Result = () => {
  const { id } = useParams();
  const { data, isLoading } = getResult();
  const [result, setResult] = useState(null);
  const navgate = useNavigate();
  useEffect(() => {
    const fetchResult = async () => {
      const { data } = await axios.get(url + id, {
        headers: { "x-api-key": token },
      });
      console.log({ kk: data?.userScores[0]?.score });
      setResult(data?.userScores[0]?.score);
      console.log({ gdf: data?.userScores[0]?.score });
    };
    fetchResult();
  }, []);

  const deleteRoom = async () => {
    const { data } = await axios.delete(deleteDom + id, {
      headers: { "x-api-key": token },
    });
    console.log({ data });
    navgate("/lobby");
  };
  // deleteRoom();
  !isLoading && console.log(data);
  return (
    <main className="w-screen h-screen bg-green-800 flex flex-col justify-center items-center">
      <h1 className="text-[50px] text-white mb-8">Your score is {result}</h1>
      {result ? <button onClick={deleteRoom}>Exit room</button> : ""}
    </main>
  );
};
export default Result;
