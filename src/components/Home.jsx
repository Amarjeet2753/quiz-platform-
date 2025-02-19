import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-2xl p-8 text-center transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to the Quiz App
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Test your knowledge with our interactive quiz!
        </p>
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="text-xl font-semibold text-gray-700 mb-4">Instructions:</p>
          <ul className="list-disc text-left text-gray-600 space-y-2 pl-6">
            <li>For MCQs, select the correct answer .</li>
            <li>For integer-type questions, enter the numerical answer and click on Submit button.</li>
            <li>No calculators unless specified.</li>
            <li>You have 30 seconds to complete each question.</li>
          </ul>
        </div>
        <button
          onClick={() => navigate("/quiz")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all hover:shadow-lg transform hover:scale-105"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;