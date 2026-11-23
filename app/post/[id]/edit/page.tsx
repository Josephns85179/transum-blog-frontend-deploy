'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(async (res) => {
        if (res.status === 404) {
          router.push('/not-found');
          return;
        }
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      });
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    router.push(`/post/${id}`);
  };

  if (loading) return <p className="container mt-4">Loading...</p>;

  return (
    <main className="container mt-4">
      <h1>Edit Your Post About Jakarta Public Transit</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Wow LRT so amazing...'
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='They just opened the new line to Manggarai, cannot wait for the skybridge to open as well...'
            required
          />
        </div>
        <button type="submit" className="btn btn-success me-2">Update</button>
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={() => router.push(`/post/${id}`)}
        >
          Cancel
        </button>
      </form>
    </main>
  );
}