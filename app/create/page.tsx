'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    router.push('/');
  };

  return (
    <main className="container mt-4">
      <h1>Create A Post About Jakarta Public Transport</h1>
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
        <button className="btn btn-success me-2">Save</button>
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={() => router.push(`/`)}
        >
          Cancel
        </button>
      </form>
    </main>
  );
}