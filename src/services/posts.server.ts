import Post from "@/types/Post";
import { firestore } from '@/firebase'
import { redirect } from "next/navigation";

export async function getPosts() {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firestore.collection('posts')
        .where('deletedAt', '==', null)
        .orderBy('updatedAt', 'desc')
        .get();

    const posts: Post[] = snapshot.docs.map((doc) => {
        const { title, body } = doc.data();
        return {
            id: doc.id,
            title,
            body
        }
    })
    return posts
}

export async function findPost(postId: string): Promise<Post | null> {
    const document: FirebaseFirestore.DocumentSnapshot = await firestore.collection('posts').doc(postId).get();

    if (!document.exists || document.get('deletedAt')) {
        return null;
    }

    return { id: document.id, ...document.data() } as Post;
}

export async function getPost(postId: string) {
    const post: Post | null = await findPost(postId);

    if (!post) {
        redirect('/posts');
    }

    return post;
}

export function getPostValidationError(post: Post) {
    if (!post.title) return 'Please enter title';
    if (!post.body) return 'Please enter body';

    if (post.title.length < 4) return 'Title too short';
    if (post.body.length < 4) return 'Body too short';

    if (post.title.length > 20) return 'Title too long';
    if (post.body.length > 400) return 'Body too long';

    return null;
}
