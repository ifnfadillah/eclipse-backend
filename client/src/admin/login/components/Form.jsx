import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "../../components/Button";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");

    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
    }
  };


  return (
    <div className="w-full rounded-2xl shadow-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-50">
      <div className="p-6 space-y-4 md:space-y-8 sm:p-8">
        <h1 className="text-xl font-primary font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl">Selamat Datang Admin!</h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <Input text="Username" name="username" type="text" placeholder="Masukkan Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input text="Kata Sandi" name="password" type="password" placeholder="Masukkan Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="mt-4">
            <Button classname="w-full text-white bg-sky-500 hover:bg-sky-700 font-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-md text-sm px-5 py-3 text-center" type="submit" name="login">
              Masuk
            </Button>
          </div>
          <p className="text-sm font-light font-secondary text-gray-900">
            <span className="text-sm sm:text-center">
              © 2024{" "}
              <a href="/" className="hover:underline">
                Parentify
              </a>{" "}
              Website
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;