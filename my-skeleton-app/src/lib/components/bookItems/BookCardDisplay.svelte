<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";

    export let title: string | null | undefined;
    export let authorFirstName: string | null | undefined;
    export let authorLastName: string | null | undefined;
    export let image: string | null | undefined;
</script>

 <div class="card card-hover overflow-hidden">
    <header>
        <h6 class="h6 p-3" data-toc-ignore>{title}</h6>
    </header>
    <div class="space-y-4">
        <img src={image} class="bg-black/50 w-full" alt="Post" />
    </div>
    <hr class="opacity-50" />
    <footer class="p-4 flex justify-start items-center space-x-4">
        <Avatar initials={authorFirstName[0] + authorLastName[0]} width="w-8" />
        <div class="flex-auto flex justify-between items-center">
            <h6 class="font-bold" data-toc-ignore>By {authorFirstName + ' ' + authorLastName}</h6>
            <!-- <small>On {dateAdded}</small> -->
        </div>
    </footer>
</div>