import Post from "@/types/Post";
import { firestore } from '@/firebase'
import { redirect } from "next/navigation";

export async function getPosts() {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firestore.collection('posts').orderBy('updatedAt', 'desc').get();
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

export async function getPost(postId: string) {
    const document: FirebaseFirestore.DocumentSnapshot = await firestore.collection('posts').doc(postId).get();
    const data = document.data();

    if (!(document.exists && data)) {
        redirect('/posts');
    }

    return {
        id: document.id,
        title: data.title,
        body: data.body,
        updatedBy: data.updatedBy,
        updatedAt: data.updatedAt,
    }
}

export function isPostValid(post: Post) {
    return (post.title && post.body && post.title.length > 3 && post.body.length > 3);
}
