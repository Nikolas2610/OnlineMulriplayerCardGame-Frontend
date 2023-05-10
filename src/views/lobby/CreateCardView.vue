<template>
    <div class="container w-4/6 border rounded-lg shadow-xl lg:mt-4">
        <MyTitle>Create Card</MyTitle>

        <!-- Menu to choose type of upload -->
        <Flex justify="center" items="center" :gap="4" class="px-2">
            <div class="py-2 border-b-2 px-4 hover:border-secondary transition duration-300 cursor-pointer"
                @click="multipleFilesOption = false" :class="!multipleFilesOption ? 'border-primary' : 'border-white'">
                Single Card</div>
            <div class="py-2 border-b-2 hover:border-secondary transition duration-300 cursor-pointer"
                @click="multipleFilesOption = true" :class="multipleFilesOption ? 'border-primary' : 'border-white'">
                Multiple Cards</div>
        </Flex>

        <!-- Single Card Upload -->
        <CardForm @sendData="saveCard" :successResponse="successResponse" :cardData="undefined" :imageFile="undefined"
            v-if="!multipleFilesOption" />

        <!-- Multiple Cards Upload  -->
        <div class="py-8" v-else>
            <Flex justify="between" items="center">
                <input id="imageFile" type="file" class="rounded-md border border-gray-300" multiple
                    accept=".png,.jpeg,.jpg" max="2097152" @change="onImagesChoose" />

                <Flex :gap="4">
                    <RemoveButton @click="images = []" v-if="images.length > 0" />
                    <PrimaryButton title="Upload Cards" :disable="images.length === 0 || uploadMultipleCardsLoading"
                        @click="uploadMultipleCards()" :loading="uploadMultipleCardsLoading" />
                </Flex>
            </Flex>

            <!-- Titles -->
            <GridCol :all="12" :gap="4" v-if="images.length > 0" class="py-4 border rounded mt-8">
                <GridColItem :all="3">
                    <Flex justify="center" items="center" class="h-full">
                        Card Name
                    </Flex>
                </GridColItem>
                <GridColItem :all="3">
                    <Flex justify="center" items="center" class="h-full">
                        Image
                    </Flex>
                </GridColItem>
                <GridColItem :all="2">
                    <Flex justify="center" items="center" class="h-full">
                        Private
                    </Flex>
                </GridColItem>
                <GridColItem :all="2">
                    <Flex justify="center" items="center" class="h-full">
                        Image Status
                    </Flex>
                </GridColItem>
                <GridColItem :all="2">
                    <Flex justify="center" items="center" class="h-full">
                        Action
                    </Flex>
                </GridColItem>
            </GridCol>

            <!-- Images load -->
            <div class="max-h-[500px] overflow-y-auto">
                <GridCol :all="12" :gap="4" class="py-1 border rounded" v-for="(image, index) in images" :key="index">
                    <GridColItem :all="3">
                        <Flex justify="center" items="center" class="h-full">
                            <InputField :input="image.imageName" @change="(value) => image.imageName = value" />
                        </Flex>
                    </GridColItem>
                    <GridColItem :all="3">
                        <Flex class="h-full" justify="center" items="center">
                            <img :src="image.imageScreen" v-if="image.imageScreen" class="w-28 h-28" />
                        </Flex>
                    </GridColItem>
                    <GridColItem :all="2">
                        <Flex justify="center" items="center" class="h-full">
                            <CheckBoxField :input="image.private" @change="(value) => image.private = value" />
                        </Flex>
                    </GridColItem>
                    <GridColItem :all="2">
                        <Flex justify="center" items="center" class="h-full" :class="[
                            image.status === CardStatus.ERROR ? 'text-red-500' : 'text-orange-500'
                        ]">
                            {{ image.status }}
                        </Flex>
                    </GridColItem>
                    <GridColItem :all="2">
                        <Flex justify="center" items="center" class="h-full">
                            <RemoveButton @click="deleteImage(index)" />
                        </Flex>
                    </GridColItem>
                </GridCol>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import CardForm from '@/components/forms/CardForm.vue';
import { ref } from 'vue';
import type CreateCard from '@/types/cards/CreateCard'
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { useToast } from "vue-toastification";
import Flex from '@/components/wrappers/Flex.vue';
import InputField from '@/components/ui/InputField.vue';
import { CardStatus } from '@/types/cards/CardStatus.enum'
import CheckBoxField from '@/components/ui/CheckBoxField.vue';
import GridCol from '@/components/wrappers/GridCol.vue';
import GridColItem from '@/components/wrappers/GridColItem.vue';
import RemoveButton from '@/components/buttons/RemoveButton.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';
import type { Image } from '@/types/cards/Image';

const toast = useToast();
const successResponse = ref(-1);
const multipleFilesOption = ref(false);
const images = ref<Image[]>([]);
const uploadMultipleCardsLoading = ref(false);

// On multiple images choose load the data to the screen
const onImagesChoose = (ev: any) => {
    const files = ev.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check if the file type is valid (PNG, JPEG, or JPG)
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {

            // Check if the file size is within the limit (2MB)
            if (file.size <= 2097152) {

                // Create an 'Image' object with the file details and initial values
                const image: Image = {
                    imageName: file.name,
                    name: file.name,
                    file: file,
                    imageScreen: '',
                    private: false,
                    status: CardStatus.PENDING
                };

                // Create a FileReader object to read the file contents
                const reader = new FileReader();

                // When the file is loaded, set the 'imageScreen' property of the 'Image' object
                // to the base64-encoded image data and add the 'Image' object to the 'images' array
                reader.onload = () => {
                    image.imageScreen = reader.result as string;
                    images.value.push(image);
                };

                // Read the file as a data URL (base64-encoded string)
                reader.readAsDataURL(file);

            } else {
                // Display an error message if the file size exceeds the limit
                toast.error('File size exceeds the maximum limit of 2MB.');
            }

        } else {
            // Display an error message if the file type is not valid
            toast.error('Invalid file type. Only PNG, JPEG, and JPG files are allowed.');
        }
    }
};

// Delete single image
const deleteImage = (index: number) => {
    images.value = images.value.filter((image, i) => index !== i);
}

// Upload Multiple Cards
const uploadMultipleCards = async () => {
    // Set the loading state to true
    uploadMultipleCardsLoading.value = true;

    // Initialize variables to track upload status and failed images
    let failedImages = [];

    // Use for-await-of loop to handle async operations in sequence
    for (const image of images.value) {
        // Create a new FormData object to store the image data
        const formData = new FormData();
        formData.append('image', image.file, image.name);
        formData.append('name', image.imageName);
        formData.append('private', image.private.toString());

        try {
            // Send a POST request to upload the image using axios
            const response: AxiosResponse = await axiosUser.post('card', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Check the response status to determine if the upload was successful
            if (response.status !== 201) {
                // If the upload was not successful, update the image status and track failed images
                image.status = CardStatus.ERROR;
                failedImages.push(image);
            }
        } catch (error) {
            // Handle errors that occurred during the upload process
            toast.error('Error uploading image');
            image.status = CardStatus.ERROR;
            failedImages.push(image);
        }
    }

    // Count the number of successful uploads
    let successfulUploads = images.value.length - failedImages.length;

    if (successfulUploads === images.value.length) {
        // Display success message if all cards were uploaded successfully
        toast.success('All cards uploaded successfully!');
    } else if (successfulUploads > 0) {
        // Display a warning message if some images failed to upload
        toast.warning(`${successfulUploads} of ${images.value.length} cards uploaded successfully. Some images failed to upload.`);
    } else {
        // Display an error message if no cards were uploaded
        toast.error('No cards were uploaded. Please check your images and try again.');
    }

    // Update the 'images' array with the failed images
    images.value = failedImages;

    // Set the loading state to false
    uploadMultipleCardsLoading.value = false;
};

// Upload single card
const saveCard = async (card: CreateCard, image: any) => {
    // Validate the form 
    if (card.name.length < 3) {
        toast.error('The card name must have at least 4 characters');
        return;
    }

    if (!image.file) {
        toast.error('You have to choose an image to upload');
        return;
    }

    // Create a new FormData object to store the image data and card details
    const formData = new FormData();
    formData.append('image', image.file, image.name);
    formData.append('name', card.name);
    formData.append('private', card.private.toString());

    try {
        // Send a POST request to save the card using axios
        const response: AxiosResponse = await axiosUser.post('card', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            // Display success message if the card was saved successfully
            toast.success('Card saved successfully');

            // Set the successResponse value to 1 to trigger a success response
            successResponse.value = 1;

            // Reset the successResponse value after 1 second
            setTimeout(() => {
                successResponse.value = -1;
            }, 1000);

            return;
        }

        // Display an error message if something went wrong during the card save process
        toast.error('Something went wrong. Please try again later');
    } catch (error: any) {
        // Handle specific error cases
        if (error.response.data.message === 'Validation failed (expected type is .(png|jpeg|jpg|svg))') {
            // Display an error message if the file type is not valid
            toast.error('Valid types images are png, jpeg, and jpg');
        }
    }
};
</script>
