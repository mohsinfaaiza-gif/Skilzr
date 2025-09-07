// chat-service.js
import { 
  collection, 
  addDoc, 
  doc, 
  setDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase-config';

export const chatService = {
  // Create or get existing chat
  async createOrGetChat(userId1, userId2) {
    try {
      // Create consistent chat ID
      const chatId = [userId1, userId2].sort().join('_');
      const chatRef = doc(db, 'chats', chatId);
      
      // Check if chat exists, if not create it
      await setDoc(chatRef, {
        chatId,
        participants: [userId1, userId2],
        createdAt: new Date(),
        updatedAt: new Date(),
        lastMessage: null
      }, { merge: true });
      
      return chatId;
    } catch (error) {
      throw error;
    }
  },

  // Send message
  async sendMessage(chatId, senderId, text, type = 'text') {
    try {
      // Add message to subcollection
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      const messageData = {
        senderId,
        text,
        type,
        timestamp: serverTimestamp(),
        readBy: [senderId]
      };
      
      await addDoc(messagesRef, messageData);
      
      // Update last message in chat document
      const chatRef = doc(db, 'chats', chatId);
      await updateDoc(chatRef, {
        lastMessage: {
          text,
          senderId,
          timestamp: new Date()
        },
        updatedAt: new Date()
      });
      
    } catch (error) {
      throw error;
    }
  },

  // Listen to messages in real-time
  subscribeToMessages(chatId, callback) {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        });
      });
      callback(messages);
    });
  },

  // Get user's chats
  async getUserChats(userId) {
    try {
      const q = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', userId),
        orderBy('updatedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const chats = [];
      
      for (const docSnap of querySnapshot.docs) {
        const chatData = docSnap.data();
        
        // Get other participant's info
        const otherUserId = chatData.participants.find(id => id !== userId);
        const userDoc = await getDoc(doc(db, 'users', otherUserId));
        const userData = userDoc.exists() ? userDoc.data() : {};
        
        chats.push({
          id: docSnap.id,
          ...chatData,
          otherUser: {
            id: otherUserId,
            displayName: userData.displayName || 'Unknown User',
            photoURL: userData.photoURL || ''
          }
        });
      }
      
      return chats;
    } catch (error) {
      throw error;
    }
  },

  // Mark messages as read
  async markMessagesAsRead(chatId, userId) {
    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      const q = query(messagesRef, where('readBy', 'not-in', [[userId]]));
      
      const querySnapshot = await getDocs(q);
      
      const updatePromises = [];
      querySnapshot.forEach((doc) => {
        updatePromises.push(
          updateDoc(doc.ref, {
            readBy: arrayUnion(userId)
          })
        );
      });
      
      await Promise.all(updatePromises);
    } catch (error) {
      throw error;
    }
  }
};