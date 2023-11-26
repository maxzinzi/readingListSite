<script lang="ts">
    import BookCardDisplay from "$lib/components/bookItems/BookCardDisplay.svelte";
	import { onMount } from "svelte";
	import { firestoreDB } from "$lib/firebase/firebase.client";
	import { collection, query, limit, getDocs, startAfter, where } from "firebase/firestore";
	import { writable } from 'svelte/store';
	

	const currentPage = writable(1);
  	let items = []; 
  	let lastVisibleDoc = null;
  	let postsPerPage = 20;

	$: {
		if ($currentPage > 0) {
			getData();
		}
	};

	async function getData() {
		let queryBooks;
		if (lastVisibleDoc) {
            queryBooks = query(collection(firestoreDB, "books"), where("favorite", "==", true), startAfter(lastVisibleDoc), limit(postsPerPage));
			// original queryBooks = query(collection(firestoreDB, "books"), startAfter(lastVisibleDoc), limit(postsPerPage));
		} 
		else {
            queryBooks = query(collection(firestoreDB, "books"), where("favorite", "==", true), limit(postsPerPage));
			// original queryBooks = query(collection(firestoreDB, "books"), limit(postsPerPage));
		}

		const querySnapshot = await getDocs(queryBooks);
		let tempItems = [];
			querySnapshot.forEach(async (doc) => {
			let docData = doc.data();
			tempItems.push(docData);
		});
		items = tempItems;
		lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
	}

	function loadNextPage() {
    	currentPage.update(n => n + 1);
 	}

	function resetPagination() {
		lastVisibleDoc = null;
		currentPage.set(1);
	}

	onMount(() => {
    	getData();
  	});
</script>

<div class="overflow:none">
	<div class="flex justify-center items-center">
		<h1 class="text-5xl py-6">Favorites</h1>
	</div>
	<div class="p-6">
		<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-4 ">
			{#each items as item}
				<BookCardDisplay title={item.title} image={item.storageURL} authorFirstName={item.authorFirstName} authorLastName={item.authorLastName}/>
			{/each}
		</div>
	</div>
	<div class="flex justify-center m-4">
		<button class="m-2 btn variant-filled-primary" on:click={loadNextPage} disabled={!lastVisibleDoc}>Next</button>
		<button class="m-2 btn variant-filled-primary" on:click={resetPagination}>Reset</button>
	</div>
</div>

