// domain.co.il/posts/:postId/edit
import PostForm from '@/components/PostForm';

export const metadata = {
    title: 'Edit Post | Next.js Tutorial',
    description: 'Edit Post Description | Next.js Tutorial'
}

interface PostEdit {
    params: {
        postId: string,
    }
}

export default function PostEditPage(props: PostEdit) {
    return (
        <>
            <header>
                <h1>PostEdit {props.params.postId} Page</h1>
            </header>

            <PostForm />
        </>
    )
}