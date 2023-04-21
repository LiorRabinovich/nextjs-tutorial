// domain.co.il/posts/:postId/edit
import PostForm from '@/components/PostForm';
import { getPost } from '@/services/posts'

export const metadata = {
    title: 'Edit Post | Next.js Tutorial',
    description: 'Edit Post Description | Next.js Tutorial'
}

interface PostEdit {
    params: {
        postId: string,
    }
}

export default async function PostEditPage(props: PostEdit) {
    const { postId } = props.params;
    const post = await getPost(postId);
    return (
        <>
            <header>
                <h1>PostEdit {postId} Page</h1>
            </header>

            <PostForm postId={postId} title={post.title} body={post.body} />
        </>
    )
}