import { useState } from "react";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

import api from "../services/api";

function ChatBox() {

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    async function handleSend(text) {

        const userMessage = {
            role: "user",
            content: text
        };

        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await api.post(
                "/chat",
                {
                    message: text
                }
            );

            const aiMessage = {
                role: "assistant",
                content: response.data.response
            };

            setMessages(prev => [...prev, aiMessage]);

        }
        catch (error) {

            const aiMessage = {

                role: "assistant",

                content: "❌ Unable to connect to backend."

            };

            setMessages(prev => [...prev, aiMessage]);

            console.error(error);

        }

        setLoading(false);
    }

    return (

        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                background: "#f5f5f5"
            }}
        >

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "25px"
                }}
            >

                {messages.map((message, index) => (

                    <ChatMessage
                        key={index}
                        message={message}
                    />

                ))}

                {loading && (

                    <ChatMessage
                        message={{
                            role: "assistant",
                            content: "Thinking..."
                        }}
                    />

                )}

            </div>

            <ChatInput
                onSend={handleSend}
            />

        </div>

    );
}

export default ChatBox;