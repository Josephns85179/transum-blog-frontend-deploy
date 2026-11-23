import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/db';
import { posts as postsTable } from '@/db/schema';

async function getPosts() {
  try {
    return await db.select().from(postsTable);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mt-4">
      <h1>Transum Jakarta Blog</h1>
      <Link href="/create" className="btn btn-primary my-2">
        Create Post
      </Link>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post.id} className="list-group-item">
              <Link href={`/post/${post.id}`}>
                {post.title}
              </Link>
              <span className="text-muted float-end">
                {new Date(post.createdAt).toLocaleDateString('id-ID')}
              </span>
            </li>
          ))}
        </ul>
      )}
      <br />
      <Image className="not" src="/plushie.jpeg" alt="hello" width={300} height={700} />
      <p>Hello</p>
    </main>
  );
}