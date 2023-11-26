<script lang="ts">
    import { FileDropzone } from "@skeletonlabs/skeleton";
    import UploadCloudSvg from "$lib/components/componentSVG/UploadCloudSVG.svelte";
    import { page } from '$app/stores';
    import { goto } from '$app/navigation'
    import { firestoreDB } from '$lib/firebase/firebase.client';
    import { storageDB } from '$lib/firebase/firebase.client';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { addDoc, collection } from 'firebase/firestore';
	import { v4 as uuidv4 } from 'uuid';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings } from '@skeletonlabs/skeleton';
    import Compressor from 'compressorjs';

    const toastStoreInstance = getToastStore();

    const success: ToastSettings = {
        message: 'Book uploaded successfully!',
        background: 'variant-filled-primary'
    };

    const error: ToastSettings = {
        message: 'Error uploading book!',
        background: 'variant-filled-warning'
    };

    function compressAndConvertBook(book: File) {
       new Compressor(book, {
            quality: 0.6,
            success(result) {
                uploadBook(result);
            },
            error(err) {
                console.error(err);
            }
       });
    }

    async function uploadBook(blob: Blob): Promise<void> {
        const myUUID = uuidv4();
        const uid = localStorage.getItem("uid");
        const storageRef = ref(storageDB, `${uid}/images/${myUUID}`);
        await uploadBytes(storageRef, blob).catch((err) => {
            console.error(err);
            toastStoreInstance.trigger(error);
        });
        await getDownloadURL(storageRef).then((url) => {
            const docRef = addDoc(collection(firestoreDB, "books"), {
                authorFirstName: authorFirstName,
                authorLastName: authorLastName,
                favorite: favorite,
                title: title,
                storageURL: url
            });
        }).catch(() => {
            toastStoreInstance.trigger(error);
        });
        toastStoreInstance.trigger(success);
        files = undefined;
        authorFirstName = "";
        authorLastName = "";
        title = "";
        favorite = false;
    }         

    let files: FileList | undefined;
    let authorFirstName = "";
    let authorLastName = "";
    let title = "";
    let favorite = false;

    const goSomeWhereBack = () => {
        goto($page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/')));
    }
</script>

<div>
    <button on:click={goSomeWhereBack} class="btn variant-filled m-6">Back</button>
</div>

<div class="min-h-screen flex justify-center items-center">
    <form on:submit|preventDefault={compressAndConvertBook(files[0])} class="card flex flex-col items-center justify-center p-4">
        <h1 class="text-5xl">Add a Book!</h1>
        <label class="label p-2" for="">
            <input bind:value={authorFirstName} class="input" type="text" placeholder="Author First Name">
        </label>
        <label class="label p-2" for="">
            <input bind:value={authorLastName} class="input" type="text" placeholder="Author Last Name">
        </label>
        <label class="label p-2" for="">
            <input bind:value={title} class="input" type="text" placeholder="Title">
        </label>
        <label class="flex items-center space-x-2" for="">
            <p>One of your favorites?</p>
            <input bind:checked={favorite} class="radio" type="checkbox">
        </label>
        <div class="py-2">
            {#if !files}
                <FileDropzone bind:files={files} name="files" slotLead="flex justify-center">
                        <svelte:fragment slot="lead"><UploadCloudSvg/></svelte:fragment>
                        <svelte:fragment slot="message">Drag and drop your book cover here!</svelte:fragment>
                        <svelte:fragment slot="meta">PNG, JPEG, or SVG allowed.</svelte:fragment>
                </FileDropzone>
            {:else}
                <div>
                    <p class="text-bold">{files[0].name}</p>
                    <hr>
                </div>
            {/if}
        </div>
        <button class="btn variant-filled mt-2" type="submit">Submit</button>
    </form>
</div>
