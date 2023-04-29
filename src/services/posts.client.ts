import Post from "@/types/Post";

export async function savePost(post: Post) {
    try {
        const method = post?.id ? 'PUT' : 'POST';
        const response = await fetch(`/api/posts/${post?.id || ''}`, {
            method,
            headers: {
                'Context-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })

        if (!response.ok) {
            alert('Network response was not ok');
            return;
        }

        return response.json();
    } catch (e) {
        console.error(e);
        alert('Error!');
    }
}

export async function deletePost(postId: string) {
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            alert('Network response was not ok');
            return;
        }

        return response.json();
    } catch (error) {
        console.error(error);
        alert('Error!');
    }
}