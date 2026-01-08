// src/app/admin-test/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { listUsers } from './actions';

export default function AdminTestPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleListUsers = async () => {
    setLoading(true);
    setError(null);
    setUsers([]);
    try {
      const result = await listUsers();
      if (result.error) {
        setError(result.error);
      } else {
        setUsers(result.users || []);
      }
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Firebase Admin SDK Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Click the button below to fetch a list of users from Firebase
            Authentication using the Firebase Admin SDK on the server.
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            Note: This requires your service account environment variables to be set up correctly in your workspace.
          </p>
          <Button onClick={handleListUsers} disabled={loading}>
            {loading ? 'Loading...' : 'List Firebase Users'}
          </Button>

          {error && (
            <div className="mt-4 rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
              <h3 className="font-bold">Error:</h3>
              <pre className="whitespace-pre-wrap text-sm">{error}</pre>
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
           {users.length === 0 && !error && !loading && (
            <div className="mt-4">
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
