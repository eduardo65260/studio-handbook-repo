// src/app/admin-test/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { listUsers, createAndVerifyToken } from './actions';

export default function AdminTestPage() {
  // State for listing users
  const [users, setUsers] = useState<any[]>([]);
  const [listUsersError, setListUsersError] = useState<string | null>(null);
  const [listUsersLoading, setListUsersLoading] = useState(false);

  // State for token verification
  const [uid, setUid] = useState('');
  const [tokenResult, setTokenResult] = useState<{ customToken?: string; decodedToken?: any } | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  const handleListUsers = async () => {
    setListUsersLoading(true);
    setListUsersError(null);
    setUsers([]);
    try {
      const result = await listUsers();
      if (result.error) {
        setListUsersError(result.error);
      } else {
        setUsers(result.users || []);
      }
    } catch (e: any) {
      setListUsersError(e.message);
    }
    setListUsersLoading(false);
  };

  const handleTokenTest = async () => {
    setTokenLoading(true);
    setTokenError(null);
    setTokenResult(null);
    try {
      const result = await createAndVerifyToken(uid);
      if (result.error) {
        setTokenError(result.error);
      } else {
        setTokenResult(result);
      }
    } catch (e: any) {
      setTokenError(e.message);
    }
    setTokenLoading(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Firebase Admin SDK Test: List Users</CardTitle>
          <CardDescription>
            Click the button to fetch users from Firebase Auth using the Admin SDK.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Note: This requires service account credentials to be set up in your workspace.
          </p>
          <Button onClick={handleListUsers} disabled={listUsersLoading}>
            {listUsersLoading ? 'Loading...' : 'List Firebase Users'}
          </Button>

          {listUsersError && (
            <div className="mt-4 rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
              <h3 className="font-bold">Error:</h3>
              <pre className="whitespace-pre-wrap text-sm">{listUsersError}</pre>
            </div>
          )}

          {users.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Users:</h3>
              <ul className="list-disc pl-5">
                {users.map((user) => (
                  <li key={user.uid}>
                    {user.email || user.uid}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Firebase Admin SDK Test: Token Verification</CardTitle>
          <CardDescription>
            Enter a UID to create a custom token and then verify it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="uid">User ID (UID)</Label>
            <Input
              id="uid"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="Enter a UID, e.g., 'someUser123'"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleTokenTest} disabled={tokenLoading || !uid}>
            {tokenLoading ? 'Testing...' : 'Create & Verify Token'}
          </Button>
        </CardFooter>
        
        {tokenError && (
          <CardContent>
            <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
              <h3 className="font-bold">Error:</h3>
              <pre className="whitespace-pre-wrap text-sm">{tokenError}</pre>
            </div>
          </CardContent>
        )}

        {tokenResult && (
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-bold text-lg">Custom Token Created:</h3>
              <pre className="mt-2 text-sm text-muted-foreground bg-secondary p-2 rounded-md overflow-x-auto">
                <code>{tokenResult.customToken}</code>
              </pre>
            </div>
             <div>
              <h3 className="font-bold text-lg">Decoded Token:</h3>
              <p className="text-sm text-muted-foreground">
                Normally you would verify an ID token from a client. Here we show the decoded custom token for demonstration.
              </p>
              <pre className="mt-2 text-sm text-muted-foreground bg-secondary p-2 rounded-md overflow-x-auto">
                <code>{JSON.stringify(tokenResult.decodedToken, null, 2)}</code>
              </pre>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
