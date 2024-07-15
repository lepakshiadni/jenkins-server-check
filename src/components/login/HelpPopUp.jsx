

const HelpPopUp = (props) => {


    return (props.trigger) ? (
        <div className="Helpopup fixed z-[5000] top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
            <div className="HelpContainer w-[80%] h-[80%] border-2 border-gray-200 rounded-lg overflow-hidden bg-white mx-auto my-auto">
                <div>
                    <span className="flex justify-end m-2">
                        <svg className="p-1 rounded-full cursor-pointer  hover:bg-[rgba(38,118,194,0.1)]" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 34 34" fill="none" onClick={() => props.setTrigger(false)}>
                            <path d="M8.48542 8.48528L16.9707 16.9706M16.9707 16.9706L25.456 25.4558M16.9707 16.9706L8.48542 25.4558M16.9707 16.9706L25.456 8.48528" stroke="#2676C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </div>

            </div>
        </div>
    ) : ""

}

export default HelpPopUp;
