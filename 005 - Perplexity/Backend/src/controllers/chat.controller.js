import chatModel from '../models/chat.model.js'
import messageModel from '../models/message.model.js'

import { generateResponse, generateChatTitle } from "../services/ai.service.js"

export const sendMessage = async (req, res) => {

    const { message, chat: chatId } = req.body

    let title = null, chat = null;

    //Ye naya chat create krne se rokega 
    if (!chatId) {

        title = await generateChatTitle(message);//AI call
        chat = await chatModel.create({
            title,
            user: req.user.id
        })
    }


    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({ chat: chatId || chat._id})

    const result = await generateResponse(messages)//AI call


    //title saved to DB
    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: "ai"
    })


    res.status(201).json({
        title,
        chat,
        userMessage,
        aiMessage
    })



}


export const getChats = async (req, res) => {
    const user = req.user

    const chats = await chatModel.find({ user: user.id })


    res.status(200).json({
        message: "chats retrieved successfully",
        chats
    })
}


export const getMessages = async (req, res) => {

    const { chatId } = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "chat not found"
        })
    }

    const messages = await messageModel.find({ chat: chatId });

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })

}

export const deleteChat = async (req, res) => {
    const { chatId } = req.params

    const chat = await chatModel.findOneAndDelete({
        chat: chatId,
        user: req.user.id
    })



    await messageModel.deleteMany({ chat: chatId });
    res.status(200).json({
        message: 'chat deleted'
    })
    if (!chat) {
        return res.status(400).json({
            message: 'chat not found'
        })
    }

    res.status(200).json({
        messages: 'chat deleted successfully'
    })
}