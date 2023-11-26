<script lang='ts'>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    const goSomeWhereBack = () => {
        goto($page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/')));
    }
</script>

<div>
    <button on:click={goSomeWhereBack} class="btn variant-filled m-6">Back</button>
</div>
<div class="min-h-screen flex justify-center items-center">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click={() => {goto(`${$page.url.pathname}/addBooks`)}} class="card card-hover flex w-96 h-96 justify-center items-center p-4 m-4">
        <h1 class="text-5xl">Add Books</h1>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click={() => {goto(`${$page.url.pathname}/viewBooks`)}} class="card card-hover flex w-96 h-96 justify-center items-center p-4 m-4">
        <h1 class="text-5xl text-center">View and Edit Added Books</h1>
    </div>
</div>