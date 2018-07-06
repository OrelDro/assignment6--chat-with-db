import Message from '../models/Message';

export function getMessages() {
    return new Promise( async (resolve, reject) => {
        const messagesList = await Message.getMessages();
        resolve(messagesList);
    })
}

