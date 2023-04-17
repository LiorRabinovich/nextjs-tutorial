export async function getPosts() {
    const response = await fetch('https://dummyjson.com/posts', {
        next: { revalidate: 3 }
    })
    const data = await response.json();
    return data.posts;
}

export async function getPost(postId: string) {
    const response = await fetch(`https://dummyjson.com/posts/${postId}`, {
        next: { revalidate: 3 }
    })
    const data = await response.json();
    return data;
}
