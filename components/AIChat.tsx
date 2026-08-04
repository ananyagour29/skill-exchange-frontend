
"use client";

import { useState } from "react";
import { askAI } from "../services/aiService";
import { LuSparkles, LuSend, LuBot, LuUser, LuRefreshCw } from "react-icons/lu";

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
                    answer: response,
                },
            ]);
        } catch (error) {
            console.log(error);

            setChat((prev) => [
                ...prev,
                {
                    question: userQuestion,
                    answer: "Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto rounded-3xl border border-teal-100/90 dark:border-teal-900/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-xl overflow-hidden flex flex-col h-[580px]">
            
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                        <LuSparkles className="text-lg" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">SkillExchange AI Assistant</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Ask about users, matching skills, or project recommendations</p>
                    </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                </span>
            </div>

            {/* Chat History Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {chat.length === 0 && !loading && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-3 px-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl border border-teal-100 dark:border-teal-900/50 shadow-sm">
                            <LuBot />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">How can I help you today?</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                                Type a query below to search for profiles, compatible skills, or expert advice instantly.
                            </p>
                        </div>
                    </div>
                )}

                {chat.map((item, index) => (
                    <div key={index} className="space-y-4 text-sm">
                        
                        {/* User Question Bubble */}
                        <div className="flex items-start justify-end gap-2.5">
                            <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-4 py-3 shadow-md shadow-teal-500/10">
                                <p className="text-xs sm:text-sm font-medium leading-relaxed">{item.question}</p>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                                <LuUser />
                            </div>
                        </div>

                        {/* AI Answer Bubble */}
                        <div className="flex items-start gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm border border-slate-200/60 dark:border-slate-700">
                                <LuBot />
                            </div>
                            <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 shadow-sm space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                                    AI Assistant
                                </span>
                                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        </div>

                    </div>
                ))}

                {loading && (
                    <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm border border-slate-200/60 dark:border-slate-700">
                            <LuBot />
                        </div>
                        <div className="rounded-2xl rounded-tl-sm border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 shadow-sm flex items-center gap-2">
                            <LuRefreshCw className="animate-spin text-teal-600 dark:text-teal-400 text-sm" />
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                Thinking...
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                <div className="flex items-center gap-2">
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
                        className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-teal-500/50 transition-all shadow-sm"
                    />

                    <button
                        onClick={handleAsk}
                        disabled={loading || !message.trim()}
                        className="rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 disabled:opacity-50 px-5 py-3 text-white font-semibold shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center cursor-pointer shrink-0"
                    >
                        <LuSend className="text-base" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AIChat;