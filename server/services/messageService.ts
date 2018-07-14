import Message from '../models/Message';

export function getMessages() {
    return new Promise((resolve, reject) => {
        const messagesList = Message.getMessages();
        resolve(messagesList);
    })
}

