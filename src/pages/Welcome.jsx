import axios from "axios";
import toast from "react-hot-toast";
import { Form, redirect, useNavigation } from "react-router-dom";
import { BASE_url } from "../axios";

const url = `${BASE_url}/api/v1/users`;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const response = await axios.post(url, data);
    console.log(response);
    toast.success(response.data.message);
    localStorage.setItem("Token", response.data.data.token);
    return redirect("/lobby");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    return error;
  }
};
const Welcome = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <main className="w-screen h-screen flex justify-center items-center flex-col bg-slate-500 gap-8">
      <h1 className="text-[50px]">Welcome</h1>
      <Form
        method="POST"
        className="bg-green-300 rounded-md p-8 flex flex-col justify-center  gap-6"
      >
        <div className="flex justify-between  items-center">
          <label htmlFor="userName" className="text-[20px] mr-3">
            Name
          </label>
          <input
            type="text"
            name="userName"
            id="name"
            className="rounded-md p-2 outline-none"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="text-[20px] mr-3">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="rounded-md p-2 outline-none"
          />
        </div>
        <button
          type="submit"
          className="border border-black bg-zinc-300 rounded-md pr-2 pl-2 pt-3 pb-3"
        >
          {isSubmitting ? "Submitting..." : "Register or Sign In"}
        </button>
      </Form>
    </main>
  );
};
export default Welcome;
