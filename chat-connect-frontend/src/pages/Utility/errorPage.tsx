import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-lg text-gray-600 mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
        onClick={() => {
          navigate("/")
        }}
      >
        Go to Home
      </button>
    </div>
  );
}
