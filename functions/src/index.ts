import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.addAdminClaim = functions.firestore.document('admin_users/{docID}').onCreate((snap) => {
    const newAdminUser = snap.data();
  if (newAdminUser === undefined) return;
  modifyAdmin(newAdminUser.uid, true);
});

exports.removeAdminClaim = functions.firestore.document('admin_users/{docID}').onDelete((snap) => {
  const deletedAdminUser = snap.data();
  if (deletedAdminUser === undefined) return;
  modifyAdmin(deletedAdminUser.uid, false);
});

function modifyAdmin (uid: string, isAdmin: boolean) {
  admin.auth().setCustomUserClaims(uid, {admin: isAdmin}).then(() => {
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
});
}

// https://lnly.hatenablog.com/entry/2019/01/25/012744
// admin アカウント作成用