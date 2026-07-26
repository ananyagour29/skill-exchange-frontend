"use client";

import { useState } from "react";
import { askAI } from "../services/aiService";


interface ChatMessage {
    question: string;
    answer: string;
}


const AIChat = () => {

    const [message, setMessage] = useState<string>("");

    const [chat, setChat] = useState<ChatMessage[]>([]);

    const [loading, setLoading] = useState<boolean>(false);



    const handleAsk = async () => {

        if (!message.trim()) return;


        const userQuestion = message;


        try {

            setLoading(true);
            setMessage("");


            const response = await askAI(userQuestion);



            setChat((prev) => [
                ...prev,
                {
                    question: userQuestion,
                    answer: response
                }
            ]);



        } catch (error) {

            console.log(error);


            setChat((prev) => [
                ...prev,
                {
                    question: userQuestion,
                    answer: "Something went wrong."
                }
            ]);


        } finally {

            setLoading(false);

        }

    };



    return (

        <div className="space-y-5">


            {/* Chat History */}

            <div className="max-h-[400px] overflow-y-auto space-y-5">


                {
                    chat.map((item, index) => (

                        <div key={index} className="space-y-3">


                            {/* User Question */}

                            <div className="flex justify-end">

                                <div
                                    className="
                                    max-w-[85%] sm:max-w-[70%]
                                    rounded-2xl
                                    bg-[#A67C52]
                                    px-5 py-3
                                    text-white
                                    "
                                >

                                    <p className="text-sm">
                                        {item.question}
                                    </p>

                                </div>

                            </div>



                            {/* AI Answer */}

                            <div className="flex justify-start">

                                <div
                                    className="
                                    max-w-[85%] sm:max-w-[70%]
                                    rounded-2xl
                                    border border-[#E5DDD4]
                                    bg-[#F8F4EF]
                                    px-5 py-3
                                    text-[#2D2D2D]
                                    "
                                >

                                    <p
                                        className="
                                        mb-1
                                        text-xs
                                        font-semibold
                                        text-[#A67C52]
                                        "
                                    >
                                        AI
                                    </p>


                                    <p className="text-sm">
                                        {item.answer}
                                    </p>


                                </div>

                            </div>


                        </div>

                    ))
                }



                {
                    loading && (

                        <div
                            className="
                            w-fit
                            rounded-2xl
                            border border-[#E5DDD4]
                            bg-[#F8F4EF]
                            px-5 py-3
                            "
                        >

                            <p className="text-sm text-gray-500">
                                Thinking...
                            </p>


                        </div>

                    )
                }


            </div>



            {/* Input Section */}

            <div
                className="
                flex
                flex-col
                gap-3
                sm:flex-row
                "
            >


                <input

                    type="text"

                    value={message}

                    onChange={(e) => setMessage(e.target.value)}

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {
                            handleAsk();
                        }

                    }}

                    placeholder="Ask about users, skills..."

                    className="
                    flex-1
                    rounded-2xl
                    border border-[#E5DDD4]
                    bg-[#F8F4EF]
                    px-5 py-3
                    text-[#2D2D2D]
                    outline-none
                    focus:border-[#A67C52]
                    "

                />



                <button

                    onClick={handleAsk}

                    className="
                    rounded-2xl
                    bg-[#A67C52]
                    px-6 py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#8F6844]
                    "

                >

                    Ask

                </button>


            </div>


        </div>

    );

};


export default AIChat;