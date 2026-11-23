'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
}

function PostDetailContent() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [commentContent, setCommentContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = useCallback(() => {
    fetch(`/api/posts/${id}`).then(async (res) => {
      if (res.status === 404) router.push('/not-found');
      else setPost(await res.json());
    });
  }, [id, router]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    router.push('/');
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    setSubmitting(true);
    await fetch(`/api/posts/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: commentContent }),
    });

    setCommentContent('');
    setSubmitting(false);
    fetchPost();
  };

  if (!post) return <p className="container mt-4">Loading...</p>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{post.title}</h3>
        <div>
          <Link href={`/post/${id}/edit`} className="btn btn-secondary me-2">
            Edit Post
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Post
          </button>
          <Link href={`/`} className="btn btn-primary m-2">
            Back to Home
          </Link>
        </div>
      </div>

      <p className="text-muted">
        {new Date(post.createdAt).toLocaleDateString('id-ID')}
      </p>
      <hr />
      <p>{post.content}</p>

      <hr className="my-4" />

      <h2>Comments</h2>
      
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <div className="mb-3">
          <textarea
            className="form-control"
            rows={3}
            placeholder="I like the LRT too..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Posting...' : 'Add Comment'}
        </button>
      </form>

      {!post.comments || post.comments.length === 0 ? (
        <p className="text-muted">No comments yet.</p>
      ) : (
        <ul className="list-group mb-4">
          {post.comments.map((comment) => (
            <li key={comment.id} className="list-group-item">
              <p className="mb-1">{comment.content}</p>
              <small className="text-muted">
                {new Date(comment.createdAt).toLocaleDateString('id-ID')}
              </small>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function PostDetail() {
  return (
    <main className="container mt-4">
      <Suspense fallback={<p className="container mt-4">Loading post...</p>}>
        <PostDetailContent />
      </Suspense>
    </main>
  );
}