import Post from "@/types/Post";

export async function savePost(post: Post) {
    const method = post?.id ? 'PUT' : 'POST';
    const response = await fetch(`/api/posts/${post?.id || ''}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Network response was not ok')
    }

    return response.json();
}

export async function deletePost(postId: string) {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Network response was not ok')
    }

    return response.json();
}