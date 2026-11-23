import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="container mt-5 text-center">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist :(</p>
      <Image className="not"src="/notfound.png" alt="notfound" width={300} height={700} />
      <Link href="/" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </main>
  );
}