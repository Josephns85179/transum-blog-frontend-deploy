import Link from 'next/link';
import Image from 'next/image';
async function getPosts() {
  "use cache"
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  });
  return res.json();
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
          {posts.map((post: unknown) => (
            <li key={(post as { id: string }).id} className="list-group-item">
              <Link href={`/post/${(post as { id: string }).id}`}>
                {(post as { title: string }).title}
              </Link>
              <span className="text-muted float-end">
                {new Date((post as { createdAt: string }).createdAt).toLocaleDateString('id-ID')}
              </span>
            </li>
          ))}
        </ul>
      )}
      <br></br>
      <Image className="not"src="/plushie.jpeg" alt="hello" width={300} height={700} />
      <p>Hello</p>
    </main>
  );
}