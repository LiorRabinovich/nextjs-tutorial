import { NextRequest, NextResponse } from "next/server";

// GET /api/posts/:postId
export async function GET(request: NextRequest, context: { params: { postId: string } }) {
    return NextResponse.json({
        id: context.params.postId,
        title: `Post ${context.params.postId}`,
        body: `Post ${context.params.postId}`,
    })
}