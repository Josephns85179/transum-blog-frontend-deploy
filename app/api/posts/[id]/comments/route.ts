import { db } from '@/db';
import { comments } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  if (!body.content) {
    return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });
  }

  const newComment = await db.insert(comments).values({
    postId: Number(id),
    content: body.content,
  }).returning(); // Use .returning() if your ORM supports it, or fetch after insert

  return NextResponse.json(newComment, { status: 201 });
}