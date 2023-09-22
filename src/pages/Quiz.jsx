import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useGetQuestions, useGetSingleQuestions } from "../actions/room";
import { Form, Navigate, useNavigate, useParams } from "react-router-dom";
import { requestInstance } from "../axios";
import { BASE_url } from "../axios";
import axios from "axios";

const url = `${BASE_url}/api/v1/exam`;
const getSingleQuesUrl = `${BASE_url}/api/v1/questions?`;
const answerUrl = `${BASE_url}/api/v1/exam`;
const token = localStorage.getItem("Token") || null;
export const quesAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const response = await requestInstance.post(url, data);
    console.log(response);
    // toast.success(response.data.message);
    // localStorage.setItem('Token', response.data.data.token);
    return response;
  } catch (error) {
    console.log(error, "quiz error ques");
    // toast.error(error.response.data.message);
    return error;
  }
  return null;
};
const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const [quesNo, setQuesNo] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const { data, isLoading } = useGetSingleQuestions(id, quesNo);
  console.log(quesNo);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchQuestion = async (id, quesNo) => {
      try {
        const { data } = await requestInstance.get(
          getSingleQuesUrl + "examId=" + id + "&questionIndex=" + quesNo
        );
        console.log(data, "signleeeeeeeee");
        return data;
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  const ansQuestion = async (examId, questionId, selectedOption) => {
    const fetchRoom = async () => {
      const { data } = await axios.post(
        answerUrl,
        { examId, questionId, selectedOption },
        {
          headers: { "x-api-key": token },
        }
      );
      console.log(data);
      return data;
    };
    fetchRoom();
  };
  !isLoading && console.log(data?.data?.data);
  const handleQuesNo = async () => {
    const questionId = data?.data?.data?._id;
    const examId = id;
    const x = await ansQuestion(examId, questionId, selectedOption);
    console.log({ x });
    if (quesNo < 4) {
      setQuesNo((prev) => prev + 1);
    }
    if (quesNo === 4) {
      navigate(`/result/${id}`);
    }
  };

  return (
    <main className="w-screen h-screen bg-blue-800 flex flex-col justify-center items-center">
      <h1 className="text-[50px] text-white mb-8">Quiz</h1>
      <div className="bg-zinc-300 rounded-lg p-4 w-1/2 flex flex-col justify-center items-center">
        {isLoading ? (
          <h3>Loading Question</h3>
        ) : (
          <div>
            <h3>{data?.data?.data?.question}</h3>
            <Form method="POST">
              {data?.data?.data?.options?.map((option, idx) => (
                <div className="flex gap-3" key={idx}>
                  <input
                    type="radio"
                    name="selectedOption"
                    value={option}
                    onChange={() => setSelectedOption(option)} // Update selectedOption on change
                  />
                  <input
                    type="hidden"
                    name="questionId"
                    value={data?.data?.data?._id}
                  />
                  <input type="hidden" name="roomId" value={id} />
                  <p key={option}>{option}</p>
                </div>
              ))}

              <button type="submit" onClick={handleQuesNo}>
                {quesNo === 4 ? "Finish" : "Next"}
              </button>
            </Form>
          </div>
        )}
      </div>
    </main>
  );
};
export default Quiz;
