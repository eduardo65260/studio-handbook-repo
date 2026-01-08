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
    // It's better to return a generic error message to the client
    // and log the detailed error on the server.
    return { error: 'Could not fetch users. Check server logs for details. This might be due to missing service account credentials.' };
  }
}
