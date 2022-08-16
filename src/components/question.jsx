import React from "react"

export default function Question(props) {
    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    // Making options button array here
    const options = props.options.map(option => {
        const rOption = renderHTML(option.option)
        let buttonColor = option.color
        if (buttonColor === "default") {
            buttonColor = "bg-white"
        }else if(buttonColor === "blue"){
            buttonColor = "bg-blue-200"
        }else if(buttonColor === "red"){
            buttonColor = "bg-red-200"
        }else if(buttonColor === "green"){
            buttonColor = "bg-green-200"
        }
        return (
            <button className={`${buttonColor} px-5 py-1 mx-3 my-1 rounded-lg border-[1px] border-blue-200 hover:bg-blue-200`} onClick={() => props.changeColor(props.question, option.option)}>{rOption}</button>
        )
    })
    return (
        <div className="px-[50px] border-b-[2px] border-slate-400">
            <h1 className="font-bold text-[18px] text-blue-900 pb-1 pt-3">{renderHTML(props.question)}</h1>
            <div className="mb-3">
                {options}
            </div>

        </div>
    )
}