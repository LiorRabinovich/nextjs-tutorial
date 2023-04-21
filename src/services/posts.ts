import Post from "@/types/Post";

export async function getPosts() {
    const response = await fetch('http://localhost:3000/api/posts', {
        next: { revalidate: 3 }
    })
    const data = await response.json();
    return data.posts;
}

export async function getPost(postId: string) {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        next: { revalidate: 3 }
    })
    const data = await response.json();
    return data;
}

export function isPostValid(post: Post) {
    return (post.title && post.body && post.title.length > 3 && post.body.length > 3);
}

export async function savePost(post: Post) {
    try {
        const method = post?.id ? 'PUT' : 'POST';
        const response = await fetch(`http://localhost:3000/api/posts/${post?.id || ''}`, {
            method,
            headers: {
                'Context-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })

        if (!response.ok) {
            alert('Network response was not ok');
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
        }

        return response.json();
    } catch (error) {
        console.error(error);
        alert('Error!');
    }
}