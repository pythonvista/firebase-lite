import { initializeApp } from 'firebase/app';
import {
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    verifyPasswordResetCode,
    signInWithPhoneNumber,
    signInWithPopup
} from 'firebase/auth';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    orderBy,
    getDocs,
    limit,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    getFirestore,
    where,
    serverTimestamp
} from 'firebase/firestore';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    deleteObject
} from 'firebase/storage';

 function initializeFirebaseLite(config) {
    const app = initializeApp(config);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);

    return {
        Auth: {
            signup: (email, password) => createUserWithEmailAndPassword(auth, email, password),
            Phone: (phone, appVerifier) => signInWithPhoneNumber(auth, phone, appVerifier),
            GoogleLogin: (provider) => signInWithPopup(auth, provider),
            login: (email, password) => signInWithEmailAndPassword(auth, email, password),
            signout: () => signOut(auth),
            reset: (email) => sendPasswordResetEmail(auth, email),
            verifyemail: (user) => sendEmailVerification(user),
            verifycode: (code) => verifyPasswordResetCode(auth, code),
            confirmreset: (code, newPassword) => confirmPasswordReset(auth, code, newPassword),
            changeEmail: (user, email) => updateEmail(user, email),
            changePassword: (user, password) => updatePassword(user, password),
            UserState: () => auth
        },

        Firestore: {
            addDocWithId: (dbname, userId, arrayInfo) => setDoc(doc(db, dbname, userId), { ...arrayInfo, CreatedAt: serverTimestamp() }),
            addDocWithoutId: (dbname, arrayInfo) => addDoc(collection(db, dbname), { ...arrayInfo, CreatedAt: serverTimestamp() }),
            getSingleDoc: (dbname, userId) => getDoc(doc(db, dbname, userId)),
            getAllDoc: async (dbname, sort = '') => {
                const docs = [];
                const coll = collection(db, dbname);
                const q = sort ? query(coll, orderBy('CreatedAt', sort)) : query(coll);
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => docs.push({ ...doc.data(), docid: doc.id }));
                return docs;
            },
            getAllQueryDoc: async (dbname, where1, where2, sort = '') => {
                const docs = [];
                const q = sort
                    ? query(collection(db, dbname), where(where1, '==', where2), orderBy('CreatedAt', sort))
                    : query(collection(db, dbname), where(where1, '==', where2));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => docs.push({ ...doc.data(), docid: doc.id }));
                return docs;
            },
            collectionSnapDocs: (dbname, where1, where2, where3, where4) =>
                query(
                    collection(db, dbname),
                    where(where1, '==', where2),
                    where(where3, '==', where4),
                    orderBy('CreatedAt', 'asc'),
                    limit(100)
                ),
            SnapDoc: (dbname, userId) => doc(db, dbname, userId),
            updateDocument: (dbname, userId, arrayInfo) => updateDoc(doc(db, dbname, userId), arrayInfo),
            queryDoc: (dbname, where1, where2) => query(collection(db, dbname), where(where1, '==', where2)),
            removeDoc: (dbname, dbId) => deleteDoc(doc(db, dbname, dbId))
        },

        Storage: {
            UploadImg: async (file) => {
                const metadata = { contentType: 'image/jpeg' };
                const uploadRef = ref(storage, file.name);
                const res = await uploadBytes(uploadRef, file);
                const url = await getDownloadURL(ref(storage, res.metadata.fullPath));
                const path = res.metadata.fullPath;
                return { url, path };
            },
            DeleteImg: async (path) => deleteObject(ref(storage, path))
        }
    };
}


export { initializeFirebaseLite };