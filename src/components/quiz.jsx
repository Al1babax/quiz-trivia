import Question from "./question"
import { useEffect, useState } from "react"

export default function Quiz() {
    const [questions, setQuestions] = useState([])
    const [isOver, setIsOver] = useState(false)
    const [score, setScore] = useState(0)

    function getData() {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                data = data.results
                data = data.map(arr => {
                    // Making options array here and shuffling it also adding current color to it which I will change
                    // based on state changes
                    let options = arr.incorrect_answers.concat(arr.correct_answer)
                    options = options.map(option => {
                        return {
                            option: option,
                            color: "default"
                        }
                    }).sort(() => Math.random() - 0.5)
                    return (
                        {
                            ...arr,
                            guess: "",
                            options: options
                        }
                    )
                })
                setQuestions(data)
            }).catch(err => console.log(err))
    }

    useEffect(() => { getData() }, [])


    // map over all the questions and make an array of question components
    const questionComponents = questions.map(item => {
        return <Question key={item.question} question={item.question} options={item.options} type={item.type} changeColor={changeColor} />
    })

    function changeColor(question2, option2) {
        let newQuestions = [...questions]
        newQuestions = newQuestions.map(item => {
            if (item.question === question2) {
                item.guess = option2
                item.options = item.options.map(option => {
                    option.color = "default"
                    if (option.option === option2) {
                        option.color = "blue"
                    }
                    return option
                })
            }
            return item
        }
        )
        setQuestions(newQuestions)
    }

    function checkAnswers() {
        let correct = 0
        let newQuestions = [...questions]
        newQuestions = newQuestions.map(item => {
            console.log(item)
            item.options = item.options.map(option => {
                if (option.option === item.guess && item.guess === item.correct_answer) {
                    option.color = "green"
                    correct++
                } else if (option.option === item.guess && item.guess !== item.correct_answer) {
                    option.color = "red"
                }
                if (option.option === item.correct_answer) {
                    option.color = "green"
                }
                return option
            })
            return item
        })
        setQuestions(newQuestions)
        setScore(correct)
        setIsOver(true)

    }

    function resetGame() {
        setIsOver(false)
        setScore(0)
        getData()
    }


    return (
        <div className="py-8 px-10">
            <div className="kysymys">
                {questionComponents}
            </div>
            {!isOver && <div className="sumbit w-full py-10 flex justify-center">
                <button className="button bg-blue-800 hover:bg-blue-900 hover:border-2 text-white py-[10px] px-10 rounded-2xl shadow-md mx-3 my-[5px] text-lg" onClick={checkAnswers}>Check answers</button>
            </div>}
            {isOver && <div className="playAgain flex justify-end py-10 mr-4">
                <p className="text-[18px] text-blue-900 font-bold py-4 mx-6">You scored {score}/5 correct answers</p>
                <button className="button bg-blue-800 hover:bg-blue-900 text-white py-[10px] px-10 rounded-2xl shadow-md mx-3 my-[5px] text-lg" onClick={resetGame}>Play again</button>
            </div>}
        </div>

    )
}