import { db } from '@/db';
import { posts, comments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = Number(id);

  const post = await db.select().from(posts).where(eq(posts.id, postId)).get();
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const postComments = await db.select().from(comments).where(eq(comments.postId, postId));

  return NextResponse.json({
    ...post,
    comments: postComments,
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  await db.update(posts)
    .set({
      title: body.title,
      content: body.content,
    })
    .where(eq(posts.id, Number(id)));

  return NextResponse.json({ message: "Updated successfully" });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const postId = Number(id);

  await db.delete(comments).where(eq(comments.postId, postId));
  await db.delete(posts).where(eq(posts.id, postId));

  return NextResponse.json({ message: "Deleted" }, { status: 204 });
}