import { useState } from "react";

function ChatInput({ onSend }) {

    const [message, setMessage] = useState("");

    const handleSend = () => {

        if (!message.trim()) return;

        onSend(message);

        setMessage("");
    };

    return (

        <div
            style={{
                display: "flex",
                padding: "20px",
                borderTop: "1px solid #ddd",
                background: "white"
            }}
        >

            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                    }
                }}
                style={{
                    flex: 1,
                    padding: "12px",
                    fontSize: "16px"
                }}
            />

            <button
                onClick={handleSend}
                style={{
                    marginLeft: "10px",
                    padding: "12px 25px",
                    cursor: "pointer"
                }}
            >
                Send
            </button>

        </div>

    );
}

export default ChatInput;