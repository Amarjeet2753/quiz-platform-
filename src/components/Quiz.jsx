import React, { useState, useEffect } from "react";
import ScoreBoard from "./ScoreBoard";
import { useNavigate } from "react-router-dom";

const Quiz = ({ quizData }) => {

  const navigate = useNavigate();


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [inputAnswer, setInputAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  // Timer logic for each question
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft]);

  // Handles both MCQ and Integer-type questions and updates the score
  const handleAnswerSelection = (answer = null) => {
    if (isAnswerSelected) return; // Prevent multiple selections

    const question = quizData[currentQuestion];
    const isIntegerQuestion = question.type === "integer";
    let isCorrect = false;

    if (isIntegerQuestion) {
      const userAnswer = parseInt(inputAnswer);
      isCorrect = userAnswer === question.answer;
    } else {
      isCorrect = answer === question.answer;
      setSelectedAnswer(answer);
    }

    // Update feedback and lock the answer selection
    setShowFeedback(true);
    setIsAnswerSelected(true);

    // Update Score
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Store attempt in history for ScoreBoard
    setAttemptHistory((prevHistory) => [
      ...prevHistory,
      {
        question: question.question,
        answer: isIntegerQuestion ? inputAnswer : answer,
        isCorrect,
      },
    ]);
  };

  // Move to the next question and reset state for the next question
  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setInputAnswer(""); // Reset integer input
    setShowFeedback(false);
    setTimeLeft(30);
    setIsAnswerSelected(false);
  };

  //Handling Restart Quiz from the beginning
  const handleReattempt = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setInputAnswer("");
    setTimeLeft(30);
    setShowFeedback(false);
    setAttemptHistory([]);
    setIsAnswerSelected(false);
    navigate("/");
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="p-4 max-w-4xl mx-auto ">
        {currentQuestion < quizData.length ? (
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <div className="flex flex-wrap items-start gap-4 mb-4">
              {/* Question */}
              <div className="flex-1 text-xl md:text-2xl font-bold">
                {quizData[currentQuestion].question}
              </div>

              {/* Timer */}
              <div className="text-red-500 font-semibold whitespace-nowrap">
                ⏳ Time {timeLeft}s
              </div>
            </div>


            {/* MCQ Questions */}
            {quizData[currentQuestion].type === "mcq" ? (
              <div className="space-y-3">
                {quizData[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    disabled={isAnswerSelected}
                    onClick={() => handleAnswerSelection(option)}
                    className={`w-full p-3 text-left border rounded-lg transition-all duration-200 ${selectedAnswer === option
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-100"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              // Integer Questions
              <div>
                <input
                  type="number"
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                  disabled={isAnswerSelected}
                  className="border p-2 rounded w-full text-lg"
                  placeholder="Enter your answer"
                />
                <button
                  onClick={() => handleAnswerSelection()}
                  disabled={isAnswerSelected}
                  className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <p className="mt-4 text-lg font-semibold">
                {showFeedback &&
                  (quizData[currentQuestion].type === "mcq"
                    ? selectedAnswer === quizData[currentQuestion].answer
                    : parseInt(inputAnswer) === quizData[currentQuestion].answer)
                  ? "Correct! 🎉"
                  : "Incorrect! ❌"}
              </p>
            )}
            {/* Handling next button  */}
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          </div>
        ) : (
          <ScoreBoard {...{ attemptHistory, score, quizData, handleReattempt }} />
        )}
      </div>
    </div>
  );
};

export default Quiz;
