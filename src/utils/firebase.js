const admin = require('firebase-admin');
const serviceAccount = require("../../firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
exports.createFirebaseUser = async user => {
    try {
        let firebaseUser = await admin.auth()
            .createUser({
                email: user.email,
                emailVerified: true,
                displayName: `${user.first_name} ${user.last_name}`,
            });
        let data = {
            user_id: firebaseUser.uid,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
            img_url: null,
            last_message: null,
            timestamp: 0,
            created_at: 0
        }
        saveUserInFirestore(db, data);
        return firebaseUser.uid;
    } catch (error) {
        console.log('Error creating new user:', error);
    }
}

exports.createFirebaseAccesstoken = async firebaseId => {
    try {
        let accesstoken = await admin.auth().createCustomToken(firebaseId);
        return accesstoken;
    } catch (error) {
        return null;
    }
}

const saveUserInFirestore = async (db, data) => {
    try {
        const res = await db.collection('users').add(data);
        console.log('Added document with ID: ', res.id);
    } catch (error) {
        console.log(error)
    }
}

exports.updateUserInFirestore = async (firebase_id, img_url) => {
    try {
        // [START firestore_data_set_field]
        const db = admin.firestore();
        let userRef = db.collection('users');

        const userDetails = await userRef.where('user_id', '==', firebase_id).get();
        userDetails.forEach(async doc => {
            userRef = userRef.doc(doc.id)
            await userRef.update({
                img_url: img_url
            });
        });
        return 'Image Updated in Firestore'
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.updateUsernameInFirestore = async (firebase_id, first_name,last_name) => {
    try {
        // [START firestore_data_set_field]
        const db = admin.firestore();
        let userRef = db.collection('users');

        const userDetails = await userRef.where('user_id', '==', firebase_id).get();
        userDetails.forEach(async doc => {
            userRef = userRef.doc(doc.id)
            await userRef.update({
                name: `${first_name} ${last_name}`,
            });
        });
        return 'Username Updated in Firestore'
    } catch (error) {
        console.log(error);
        return null;
    }
}