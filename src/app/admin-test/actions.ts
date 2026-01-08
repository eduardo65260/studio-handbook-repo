// src/app/admin-test/actions.ts
'use server';

import admin from '@/lib/firebase-admin';

export async function listUsers() {
  try {
    const userRecords = await admin.auth().listUsers(10);
    const users = userRecords.users.map((user) => ({
      uid: user.uid,
      email: user.email,
    }));
    return { users };
  } catch (error: any) {
    console.error('Error listing users:', error);
    return { error: 'Could not fetch users. Check server logs for details. This might be due to missing service account credentials.' };
  }
}

export async function createAndVerifyToken(uid: string) {
  if (!uid) {
    return { error: 'UID is required.' };
  }
  try {
    // 1. Create a custom token for the given UID
    const customToken = await admin.auth().createCustomToken(uid);

    // 2. Verify the custom token
    // In a real-world scenario, you would receive an ID Token from a client
    // that has signed in using the custom token. For this test, we'll
    // decode the custom token itself to demonstrate verification logic.
    const decodedToken = await admin.auth().verifyIdToken(customToken, true); // `true` checks for revoked tokens

    return { customToken, decodedToken };
  } catch (error: any) {
    console.error('Error in token creation/verification:', error);
    return { error: error.message };
  }
}
