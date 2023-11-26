<script lang="ts">
    import { onMount } from "svelte";
    import { onAuthStateChanged, getAuth } from "firebase/auth";
    import { goto } from "$app/navigation";
    import { isLoggedIn } from "$lib/stores/stores";

    onMount(() => {
        const auth = getAuth();
        onAuthStateChanged(auth , (user) => {
            if(user) {
                isLoggedIn.update(() => true);
            }
            else {
                $isLoggedIn = false;
                goto('/adminLogin');
                isLoggedIn.update(() => false);
            }
        })
    })

</script>

<slot />