<script>
    import { page } from '$app/stores';
</script>

<style>
    img {
        height: auto;
        width: 100%;
    }
</style>

<div class="grid grid-cols-3">
    <div class="col-span-1 col-start-2">
        <img src="/push.gif" class="pt-6"  alt="pusheen looking for clues..." />
        <h3 class="font-bold">hmmm...</h3>
        <p>status: {$page.status}</p>
        <p>message: {$page.error.message}</p>
        <br>
        <div class="grid grid-cols-3">
            <a href="/" class="btn btn-sm bg-primary-500 col-span-3">scram! (home)</a>
        </div>
    </div>
</div>