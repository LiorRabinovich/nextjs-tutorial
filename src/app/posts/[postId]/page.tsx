// domain.co.il/posts/:postId
import { getPost } from '@/services/posts.server';
import PostActions from '@/components/PostActions';

interface PostView {
    params: {
        postId: string
    }
}

export const dynamic = 'force-static';

export async function generateMetadata(props: PostView) {
    const { postId } = props.params;
    const { title, body } = await getPost(postId);

    return {
        title: `${title} | Next.js Tutorial`,
        description: body.slice(0, 100)
    }
}

export default async function PostViewPage(props: PostView) {
    const { postId } = props.params;
    const { title, body, updatedBy, updatedAt } = await getPost(postId);
    const updatedAtString = updatedAt?.toDate().toLocaleString('en-GB') || '';

    return (
        <>
            <header className="flex items-center mb-6">
                <div>
                    <h1>{title}</h1>
                    <div className="text-sm">{updatedBy?.name} {updatedAtString}</div>
                </div>
                <PostActions postId={postId} />
            </header>
            <p>{body}</p>
        </>
    )
}