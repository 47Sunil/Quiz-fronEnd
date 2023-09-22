import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetQuestions } from "../actions/room";
import { BASE_url } from "../axios";
import axios from "axios";
const getQuesUrl = `${BASE_url}/api/v1/questions/`;
const token = localStorage.getItem("Token") || null;
const RoomReady = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { data, isLoading } = useGetQuestions(id);
  const forwardToExam = async () => {
    const { data } = await axios.get(getQuesUrl + "/" + id, {
      headers: { "x-api-key": token },
    });
    console.log({ k: data._id });
    navigate(`/quiz/${data?.data?._id}`);
  };
  return (
    <>
      <h1 className="text-[50px] text-white mb-8">Are you Ready</h1>
      <div className="rounded-lg bg-zinc-300 w-[80%] flex justify-center items-center h-[60%] ">
        <Link
          className="mt-12 rounded-md text-white bg-black pt-3 pb-3 pr-6 pl-6 cursor-pointer hover:bg-gray-800 transition duration-500"
          onClick={forwardToExam}
        >
          Start
        </Link>
      </div>
    </>
  );
};
export default RoomReady;
