import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import aiBackend from "../api/aiBackend";
import Button from "./Button";
import "./ChatbotWindow.scss";

export type ChatMessage = {
    type: "User" | "Chatbot";
    message: string;
};

interface MessageProps {
    children: React.ReactNode;
}

async function requestAIResponse(message: string): Promise<string> {
    const res = await aiBackend.post("/predict", { message });
    return res.data.response;
}

function ChatbotMessage({ children }: MessageProps) {
    return <div className="chatbot-message">{children}</div>;
}

function UserMessage({ children }: MessageProps) {
    return <div className="user-message">{children}</div>;
}

export default function ChatbotWindow() {
    const [displayWindow, setDisplayWindow] = useState(false);
    const [noAnimation, setNoAnimation] = useState(true);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            type: "Chatbot",
            message:
                "Hi, I'm the chatbot. If you have any questions regarding to using our website, please feel free to ask me!",
        },
        {
            type: "Chatbot",
            message:
                'Try asking me questions such as "How to log in" or "How to apply for a job posting"',
        },
    ]);
    const [inputValue, setInputValue] = useState("");

    const chatbotWindowChatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setNoAnimation(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (!chatbotWindowChatRef.current) {
            return;
        }

        // Scroll to the bottom
        chatbotWindowChatRef.current.scrollTop =
            chatbotWindowChatRef.current.scrollHeight;
    }, [messages]);

    function renderMessages(): React.ReactNode[] {
        return messages.map((message, index) => {
            if (message.type === "Chatbot") {
                return (
                    <ChatbotMessage key={index}>
                        {message.message}
                    </ChatbotMessage>
                );
            } else {
                return <UserMessage key={index}>{message.message}</UserMessage>;
            }
        });
    }

    async function onInputFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const message = inputValue;
        setInputValue("");

        setMessages(messages => [
            ...messages,
            {
                type: "User",
                message,
            },
        ]);

        // TODO: Handle request error
        const response = await requestAIResponse(message);

        setMessages(messages => [
            ...messages,
            { type: "Chatbot", message: response },
        ]);
    }

    return (
        <div className="chatbot-window">
            <div
                className={classNames(
                    "chatbot-window__window",
                    {
                        "chatbot-window__window--active": displayWindow,
                        "chatbot-window__window--inactive": !displayWindow,
                    },
                    {
                        "u-no-animation": noAnimation,
                    }
                )}
            >
                <div className="chatbot-window__title-bar">
                    <span className="chatbot-window__empty-square" />
                    <span className="chatbot-window__title">Chatbot</span>
                    <Button
                        className="chatbot-window__close-window"
                        onClick={() => setDisplayWindow(false)}
                    >
                        <i className="bi bi-x-lg chatbot-window__close-window-icon" />
                    </Button>
                </div>
                <div
                    className="chatbot-window__chat"
                    ref={chatbotWindowChatRef}
                >
                    {renderMessages()}
                </div>
                <div className="chatbot-window__input-box">
                    <form
                        className="chatbot-window__input-form"
                        onSubmit={onInputFormSubmit}
                    >
                        <input
                            className="chatbot-window__input"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <Button type="submit" className="chatbot-window__send">
                            Send
                        </Button>
                    </form>
                </div>
            </div>
            <Button
                className={classNames("chatbot-window__button", {
                    "chatbot-window__button--active": !displayWindow,
                    "chatbot-window__button--inactive": displayWindow,
                })}
                variation="secondary"
                onClick={() => setDisplayWindow(true)}
            >
                <i className="bi bi-chat" />
            </Button>
        </div>
    );
}
