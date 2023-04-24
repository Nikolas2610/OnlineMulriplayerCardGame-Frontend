// These function is to load the image and from the upload images and from the fake data images
export const loadImage = (image: string) => {
    if (image.substring(0, 4) === 'http') {
        return image;
    } else if (image.substring(0, 4) === 'data') {
        return image;
    } else {
        return import.meta.env.VITE_BACKEND_IMAGE_URL + image;
    }
}