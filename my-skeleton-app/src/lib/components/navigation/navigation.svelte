<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	
	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={closeDrawer}>Homepage</a></li>
		<li><a href="/about" on:click={closeDrawer}>About</a></li>
		<li><a href="/favorites" on:click={closeDrawer}>Favorites</a></li>
	</ul>
</nav>