// skills-service.js
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getDoc
} from 'firebase/firestore';
import { db } from './firebase-config';

export const skillsService = {
  // Get all skills for skill cards page
  async getAllSkills(limitCount = 20) {
    try {
      const q = query(
        collection(db, 'skills'), 
        where('isActive', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const skills = [];
      
      for (const docSnap of querySnapshot.docs) {
        const skillData = docSnap.data();
        
        // Get user info for each skill
        const userDoc = await getDoc(doc(db, 'users', skillData.userId));
        const userData = userDoc.exists() ? userDoc.data() : {};
        
        skills.push({
          id: docSnap.id,
          ...skillData,
          user: {
            displayName: userData.displayName || 'Anonymous',
            photoURL: userData.photoURL || '',
            location: userData.location || ''
          }
        });
      }
      
      return skills;
    } catch (error) {
      throw error;
    }
  },

  // Add new skill
  async addSkill(skillData) {
    try {
      const docRef = await addDoc(collection(db, 'skills'), {
        ...skillData,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        rating: 0,
        reviewCount: 0,
        totalSessions: 0
      });
      
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Search skills
  async searchSkills(searchTerm, category = null) {
    try {
      let q = query(
        collection(db, 'skills'),
        where('isActive', '==', true)
      );
      
      if (category) {
        q = query(q, where('category', '==', category));
      }
      
      const querySnapshot = await getDocs(q);
      const skills = [];
      
      querySnapshot.forEach((doc) => {
        const skillData = doc.data();
        // Simple text search (you might want to implement full-text search)
        if (
          skillData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skillData.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skillData.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          skills.push({
            id: doc.id,
            ...skillData
          });
        }
      });
      
      return skills;
    } catch (error) {
      throw error;
    }
  }
};

export const connectionService = {
  // Send connection request
  async sendConnectionRequest(requesterUserId, skillProviderUserId, skillId, message = '') {
    try {
      const connectionData = {
        requesterUserId,
        skillProviderUserId,
        skillId,
        status: 'pending',
        message,
        requestedAt: new Date()
      };
      
      const docRef = await addDoc(collection(db, 'connections'), connectionData);
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Get user's connections
  async getUserConnections(userId, status = null) {
    try {
      let q1 = query(
        collection(db, 'connections'),
        where('requesterUserId', '==', userId)
      );
      
      let q2 = query(
        collection(db, 'connections'),
        where('skillProviderUserId', '==', userId)
      );
      
      if (status) {
        q1 = query(q1, where('status', '==', status));
        q2 = query(q2, where('status', '==', status));
      }
      
      const [sentRequests, receivedRequests] = await Promise.all([
        getDocs(q1),
        getDocs(q2)
      ]);
      
      const connections = [];
      
      sentRequests.forEach((doc) => {
        connections.push({
          id: doc.id,
          ...doc.data(),
          type: 'sent'
        });
      });
      
      receivedRequests.forEach((doc) => {
        connections.push({
          id: doc.id,
          ...doc.data(),
          type: 'received'
        });
      });
      
      return connections;
    } catch (error) {
      throw error;
    }
  },

  // Update connection status
  async updateConnectionStatus(connectionId, status) {
    try {
      const connectionRef = doc(db, 'connections', connectionId);
      await updateDoc(connectionRef, {
        status,
        respondedAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  }
};