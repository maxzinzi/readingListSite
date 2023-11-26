<script lang='ts'>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from "svelte";
	import { firestoreDB, storageDB } from "$lib/firebase/firebase.client";
	import { collection, query, limit, getDocs, startAfter, doc, deleteDoc } from "firebase/firestore";
    import { deleteObject, ref } from 'firebase/storage';
	import { writable } from 'svelte/store';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings } from '@skeletonlabs/skeleton';

	const currentPage = writable(1);
  	let items = [];
  	let lastVisibleDoc = null;
  	let postsPerPage = 20;
    const toastStoreInstance = getToastStore();

    const success: ToastSettings = {
        message: 'Book deleted successfully!',
        background: 'variant-filled-primary'
    };

    const error: ToastSettings = {
        message: 'Error uploading book!',
        background: 'variant-filled-warning'
    };

	$: {
		if ($currentPage > 0) {
		    getData();
		}
	};

	async function getData() {
		let queryBooks;
		if (lastVisibleDoc) {
			queryBooks = query(collection(firestoreDB, "books"), startAfter(lastVisibleDoc), limit(postsPerPage));
		} 
		else {
			queryBooks = query(collection(firestoreDB, "books"), limit(postsPerPage));
		}

		const querySnapshot = await getDocs(queryBooks);
		let tempItems = [];
        querySnapshot.forEach(doc => {
            const docData = doc.data();
            tempItems.push({...docData, id: doc.id});
        });
		items = tempItems;
		lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
	}

    async function deleteBook(id: string, storageURL: string) {
        try{
            await deleteDoc(doc(firestoreDB, "books", id));
            await deleteObject(ref(storageDB,storageURL));
            toastStoreInstance.trigger(success);
            items = items.filter(item => item.id !== id);
        }
        catch {
            toastStoreInstance.trigger(error);
        }
    }

	function loadNextPage() {
    	currentPage.update(n => n + 1);
 	}

	function resetPagination() {
		lastVisibleDoc = null;
		currentPage.set(1);
	}

    const goSomeWhereBack = () => {
        goto($page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/')));
    }

	onMount(() => {
    	getData();
  	});
</script>

<div>
    <div>
        <button on:click={goSomeWhereBack} class="btn variant-filled m-6">Back</button>
    </div>
    <div class="m-8">
        <table class="table">
            <thead>
                <tr class="">
                    <th class="width: 33% text-center align-middle text-xl">Author</th>
                    <th class="width: 33% text-center align-middle text-xl">Title</th>
                    <th class="width: 33% text-center align-middle text-xl">Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each items as item}
                    <tr>
                        <td class="text-center align-middle">{item.authorFirstName + ' ' + item.authorLastName}</td>
                        <td class="text-center align-middle">{item.title}</td>
                        <td class="text-center align-middle">
                            <button class="btn variant-filled-warning" on:click={() => { deleteBook(item.id, item.storageURL) }}>Delete</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class="flex justify-center m-4">
		<button class="m-2 btn variant-filled-primary" on:click={loadNextPage} disabled={!lastVisibleDoc}>Next</button>
		<button class="m-2 btn variant-filled-primary" on:click={resetPagination}>Reset</button>
	</div>
</div>
