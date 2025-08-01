export interface Testimonial {
    id: string;
    comment: string;
    contactNumber: string;
    createdAt: any; // O podrías usar `admin.firestore.Timestamp` si lo defines
    email: string;
    name: string;
    rating: number;
    selectedClinic: string;
}
