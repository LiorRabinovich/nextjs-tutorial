import admin from 'firebase-admin';

export default interface Post {
    id?: string;
    title: string;
    body: string;
    updatedBy?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    },
    updatedAt?: admin.firestore.Timestamp;
    updateCount?: number;
    deletedAt?: admin.firestore.Timestamp;
}
