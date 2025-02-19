import React from 'react'

const ScoreBoard = ({score,quizData,attemptHistory,handleReattempt}) => {
  return (
    <div>
         <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl">
            Your Score: {score}/{quizData.length}
          </p>
          <h3 className="mt-6 text-xl font-bold">Attempt History</h3>
          <ul className="mt-4 space-y-4">
            {attemptHistory.map((attempt, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg bg-gray-50"
              >
                <p className="text-lg font-semibold">Question: {attempt.question}</p>
                <p>Your Answer: {attempt.answer}</p>
              
                <p
                  className={`font-semibold ${
                    attempt.isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Status: {attempt.isCorrect ? "Correct" : "Incorrect"}
                </p>
              </li>
            ))}
          </ul>

          <button 
        onClick={handleReattempt} 
        className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-md"
      >
        Reattempt Quiz
      </button>
        </div>
    </div>
  )
}

export default ScoreBoard