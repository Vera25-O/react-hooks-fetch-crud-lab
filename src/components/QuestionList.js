


import React, {useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() =>{
    fetch('http://localhost:4000/questions')
    .then((response) => response.json())

    .then((questions) =>{
      setQuestions(questions)
    })
  },[])


  function handleAnswerChange(id, correctIndex){
    fetch('http://localhost:4000/questions/${id}',{
      method:'PATCH',
      headers: {
        "content-Type":"applications/json",
      },
      body: JSON.stringify({correctIndex})
    })
    .then((response) => response.json())
    .then((upDatedQuestion) =>{
      const upDatedQuestions = questions.map((question) =>{
        if (questions.id === upDatedQuestion.id){
          return upDatedQuestions
        } else{
          return question
        }
      })

      setQuestions(upDatedQuestions)
      
    })
  }


  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = questions.map((question) => (
    <QuestionItem
       key={question.id}
       question={question}
       onDeleteClick={handleDeleteClick}
       onAnswerChange={handleAnswerChange}
       />
  ))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
