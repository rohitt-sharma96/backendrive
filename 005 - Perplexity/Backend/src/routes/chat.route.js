import { Router } from 'express'
import { sendMessage, getChats, getMessages, deleteChat } from '../controllers/chat.controller.js';
import identifyUser from '../middlewares/auth.middleware.js';


const chatRouter = Router();


/**
 * @route POST /api/chats/message
 */
chatRouter.post('/message', identifyUser, sendMessage)

/**
 * @route GET /api/chats/
 * @desc fetch all the chats(title) that are created by loggedIn user
 * @access Private
 * 
 */
chatRouter.get('/', identifyUser, getChats);




/**
 * @route GET /api/chats/:chatId/messages
 * @desc fetch all the chats on the basis of chatId (title Id)
 * @access Private
 */
chatRouter.get('/:chatId/messages', identifyUser, getMessages)


chatRouter.delete('/delete/:chatId', identifyUser, deleteChat)


//create an API to delete single message

export default chatRouter;