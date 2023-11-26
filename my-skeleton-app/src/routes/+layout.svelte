<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { firestoreDB } from '$lib/firebase/firebase.client';
	import { Toast } from '@skeletonlabs/skeleton';

	//Imports from Skeleton UI
	import { 
		Avatar, 
		AppBar, 
		AppShell, 
		storePopup,
		initializeStores,
		Drawer,
		getDrawerStore
	 } from '@skeletonlabs/skeleton';

	//SVG imports
	import HamburgerIcon from '$lib/components/componentSVG/HamburgerIcon.svelte';

	//Component imports
	import Navigation from '$lib/components/navigation/navigation.svelte';

	//Svelte Imports
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	//firebase imports
	import { getApp } from 'firebase/app';
	import { getAuth, signOut } from 'firebase/auth';


	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	//initialzing stores
	initializeStores();
	const drawerStore = getDrawerStore();
	
	
	function drawerOpen(): void {
		drawerStore.open({});
		//have {} for store settings, can change later
	}

	function logout() {
		const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.removeItem("uid");
            goto('/');
        }).catch((err) => {
            console.error(err);
        })
    }

	let isSpecialPage: boolean = false
	const specialPage = '/adminLogin';
	$: isSpecialPage = $page.url.pathname.includes(specialPage);

	let canLogout: boolean = false;
	const logoutPageOption = '/adminDashboard';
	$: canLogout = $page.url.pathname.includes(logoutPageOption);
</script>

<!-- Have to Initialize drawer above appshell and not inside because it is an overlay -->
<Drawer width="w-96">
	<h2 class="text-2xl font-light p-4">Navigation</h2>
	<hr>
	<Navigation />
</Drawer>

<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<main class="grid grid-rows-[auto_1fr]">
			<AppBar>
				<svelte:fragment slot="lead">
					<button on:click={drawerOpen}>
						<HamburgerIcon/>
					</button>
				</svelte:fragment>
					Professor Ruckh's Reading List
				<svelte:fragment slot="trail">
					{#if isSpecialPage === false}
						<button class="btn variant-filled" on:click={() => {goto('/adminLogin')}}>Admin Login</button>
					{/if}
					{#if canLogout}
						<button class="btn variant-filled" on:click={logout}>Logout</button>
					{/if}
				</svelte:fragment>
			</AppBar>
		</main>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<AppBar></AppBar>
	</svelte:fragment>
</AppShell>
