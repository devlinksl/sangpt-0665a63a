// IndexedDB-based offline cache for conversations and messages

const DB_NAME = 'sangpt-cache';
const DB_VERSION = 1;
const CONV_STORE = 'conversations';
const MSG_STORE = 'messages';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(CONV_STORE)) {
        db.createObjectStore(CONV_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(MSG_STORE)) {
        const msgStore = db.createObjectStore(MSG_STORE, { keyPath: 'id' });
        msgStore.createIndex('conversation_id', 'conversation_id', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export interface CachedConversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CachedMessage {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  created_at: string;
  rating: number;
  metadata?: any;
}

export async function cacheConversations(conversations: CachedConversation[]): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(CONV_STORE, 'readwrite');
  const store = tx.objectStore(CONV_STORE);
  for (const conv of conversations) {
    store.put(conv);
  }
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getCachedConversations(userId: string): Promise<CachedConversation[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(CONV_STORE, 'readonly');
    const store = tx.objectStore(CONV_STORE);
    const req = store.getAll();
    req.onsuccess = () => {
      const all = (req.result as CachedConversation[]).filter(c => c.user_id === userId);
      all.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      resolve(all);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function removeCachedConversation(id: string): Promise<void> {
  const db = await openDB();
  const tx = db.transaction([CONV_STORE, MSG_STORE], 'readwrite');
  tx.objectStore(CONV_STORE).delete(id);
  // Also delete messages for this conversation
  const msgStore = tx.objectStore(MSG_STORE);
  const index = msgStore.index('conversation_id');
  const req = index.openCursor(IDBKeyRange.only(id));
  req.onsuccess = () => {
    const cursor = req.result;
    if (cursor) {
      cursor.delete();
      cursor.continue();
    }
  };
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function cacheMessages(messages: CachedMessage[]): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(MSG_STORE, 'readwrite');
  const store = tx.objectStore(MSG_STORE);
  for (const msg of messages) {
    store.put(msg);
  }
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getCachedMessages(conversationId: string): Promise<CachedMessage[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MSG_STORE, 'readonly');
    const store = tx.objectStore(MSG_STORE);
    const index = store.index('conversation_id');
    const req = index.getAll(IDBKeyRange.only(conversationId));
    req.onsuccess = () => {
      const msgs = (req.result as CachedMessage[]);
      msgs.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      resolve(msgs);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function updateCachedConversationTitle(id: string, title: string): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(CONV_STORE, 'readwrite');
  const store = tx.objectStore(CONV_STORE);
  const req = store.get(id);
  req.onsuccess = () => {
    if (req.result) {
      store.put({ ...req.result, title });
    }
  };
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
