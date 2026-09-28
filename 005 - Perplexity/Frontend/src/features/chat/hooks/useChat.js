import { initializeSocketConnection } from "../services/chat.socket";
import { useDispatch } from "react-redux";

import { sendMessage, getChats, getMessages, deleteChat } from "../services/chat.api";
import { setChat, setLoading, setError, setCurrentChatId, createNewChats, addNewMessage, addMessages, addChats } from "../chat.slice";



export const useChat = () => {

    const dispatch = useDispatch();

    const handleSendMessage = async ({ message, chatId }) => {
        dispatch(setLoading(true))
        try {
            const data = await sendMessage({ message, chatId });
            const { chat, aiMessage } = data
            dispatch(addChats(data))
            // dispatch(createNewChats({
            //     chatId: chat._id,
            //     title: chat.title,
            // }))
            // dispatch(addNewMessage({
            //     chatId: chat._id,
            //     content: message,
            //     role: "user"
            // }))
            // dispatch(addNewMessage({
            //     chatId: chat._id,
            //     content: aiMessage.content,
            //     role: 'aiMessage.role'
            // }))
            dispatch(setCurrentChatId(chat._id))
        }
        catch (err) {
            console.log("Error at useChat handleMessage", err)
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    const handleGetChats = async () => {
        dispatch(setLoading(true))
        try {
            const data = await getChats()
            const { chats } = data;
            dispatch(setChat(chats.reduce((acc, chat) => {
                acc[chat._id] = {
                    id: chat._id,
                    title: chat.title,
                    messages: [],
                    lastUpdated: chat.updatedAt,
                }
                return acc
            }, {})))
        }
        catch (err) {
            console.log('err at handleGetChats')
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    const handleOpenChat = async (chatId) =>{
        const data = await getMessages(chatId)
        const {messages} = data

        const formattedMessages = messages.map(msg =>({
            content: msg.content,
            role: msg.role,
        }))

        dispatch(addMessages({
            chatId,
            messages: formattedMessages
        }))
        dispatch(setCurrentChatId(chatId))
    }

    return ({
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    })
}