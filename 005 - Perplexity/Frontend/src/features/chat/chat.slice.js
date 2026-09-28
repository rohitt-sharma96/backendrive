import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: {},
    currentChatId: null,
    loading: false,
    error: null
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        createNewChats: (state, action) => {
            const { chatId, title } = action.payload
            state.chats[chatId] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toISOString(),
            }
        },

        addNewMessage: (state, action) => {
            const { chatId, content, role } = action.payload
            state.chats[chatId].messages.push({ content, role })
        },

        addMessages: (state, action) => {
            const { chatId, messages } = action.payload
            state.chats[chatId].messages.push(...messages)
        },


        /*IMP AI this one feels easy
        // addChats: (state, action) => {
        //     const { chat, userMessage, aiMessage } = action.payload

        //     state.chats[chat._id] = {
        //         id: chat._id,
        //         title: chat.title,
        //         messages: [
        //             userMessage,
        //             aiMessage
        //         ]
        //     }
        // },
        */
        
        setChats: (state, action) => {
            state.chats = action.payload;
        },

        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },

    }
})

export const { setChat, setError, setLoading, setCurrentChatId, createNewChats, addNewMessage, addMessages, addChats } = chatSlice.actions
export default chatSlice.reducer;


// chats = {
//     "docker and AWS": {
//         messages: [
//             {
//                 role: "user",
//                 content: "What is docker?"
//             },
//             {
//                 role: "ai",
//                 content: "Docker is a platform that allows developers to easily create, deploy. and run application"
//             }
//         ],
//         id: "docker and AWS",
//         lastUpdated: "2024-6-20T12:34"
//     }
// }