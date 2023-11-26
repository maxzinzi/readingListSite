<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";

    export let id: number;
    export let title: string | null;
    export let dateAdded: Date | null;
    export let author: string | null;
    export let image: string | null;
</script>

 <a class="card card-hover overflow-hidden" href="/books/{id}">
    <header>
        <h6 class="h6 p-3" data-toc-ignore>{title}</h6>
    </header>
    <div class="space-y-4">
        <img src={image} class="bg-black/50 w-full" alt="Post" />
    </div>
    <hr class="opacity-50" />
    <footer class="p-4 flex justify-start items-center space-x-4">
        <Avatar initials="JD" width="w-8" />
        <div class="flex-auto flex justify-between items-center">
            <h6 class="font-bold" data-toc-ignore>By {author}</h6>
            <small>On {dateAdded}</small>
        </div>
    </footer>
</a>
