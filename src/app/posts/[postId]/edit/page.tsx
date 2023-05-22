// domain.co.il/posts/:postId/edit
import PostForm from '@/components/PostForm';
import { getPost } from '@/services/posts.server'

export const dynamic = 'force-static';

interface PostEdit {
    params: {
        postId: string,
    }
}

export async function generateMetadata(props: PostEdit) {
    const { postId } = props.params;
    const { title, body } = await getPost(postId);

    return {
        title: `Edit "${title}" | Next.js Tutorial`,
        description: body.slice(0, 100)
    }
}

export default async function PostEditPage(props: PostEdit) {
    const { postId } = props.params;
    const { title, body } = await getPost(postId);
    return (
        <>
            <header>
                <h1>Edit "{title}"</h1>
            </header>

            <PostForm postId={postId} title={title} body={body} />
        </>
    )
}