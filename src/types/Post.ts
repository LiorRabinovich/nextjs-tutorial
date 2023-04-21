export default interface Post {
    id?: string;
    title: string;
    body: string;
    userId?: number;
    tags?: string[];
    reactions?: number
}
