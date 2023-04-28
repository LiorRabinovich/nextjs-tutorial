// domain.co.il/posts/:postId
import { getPost } from '@/services/posts.server';
import PostActions from '@/components/PostActions';

interface PostView {
    params: {
        postId: string
    }
}

export const dynamic = 'force-static';

export function generateMetadata(props: PostView) {
    return {
        title: `Post ${props.params.postId}`,
        description: `Post description ${props.params.postId}`
    }
}

export default async function PostViewPage(props: PostView) {
    const { postId } = props.params;
    const { title, body, updatedBy, updatedAt } = await getPost(postId);
    const updatedAtString = updatedAt.toDate().toLocaleString('en-GB')

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