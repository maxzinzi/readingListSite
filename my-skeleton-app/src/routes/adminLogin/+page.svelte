<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

    let email: string = "";
    let password: string = "";

    let auth = getAuth();

    const goSomeWhereBack = () => {
        goto('/');
    }

    function login() {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('uid', user.uid);
            goto(`${$page.url.pathname}/adminDashboard`);
        }).catch((error) => {
            console.log(error);
        });
    }
</script>

<div>
    <div>
        <button on:click={goSomeWhereBack} class="btn variant-filled m-6">Back</button>
    </div>
    <div class="flex justify-center items-center mt-10">
        <div class="card w-96 h-[18rem] flex flex-col items-center justify-center">
            <h2 class="text-5xl p-2">Login</h2>
            <form class="flex flex-col items-center justify-center" on:submit|preventDefault={login}>
                <label class="label p-3">
                    <input bind:value={email} id="emailInput" class="input" type="email" placeholder="Email" />
                </label>
                <label class="label p-3">
                    <input bind:value={password} id="passwordInput" class="input" type="password" placeholder="Password" />
                </label>
                <button class="btn variant-filled" type="submit">Submit</button>
            </form>
        </div>
    </div>
</div>
