function ChatMessage({ message }) {

    const isUser = message.role === "user";

    return (

        <div
            style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                marginBottom: "15px"
            }}
        >

            <div
                style={{
                    maxWidth: "70%",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    backgroundColor: isUser ? "#2563eb" : "#ffffff",
                    color: isUser ? "white" : "black",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                }}
            >

                {message.content}

            </div>

        </div>

    );
}

export default ChatMessage;