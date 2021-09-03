<script>
  import Chat from './Chat.svelte';
  import Header from './Header.svelte';
  import { username } from './user';
  import Login from './Login.svelte';
  import './styles/global.css'
</script>

<div class="app">
    {#if $username}
      <Header />
      <Chat />
      {:else}
      <main>
        <Header />
        <Login />
      </main>
    {/if}
</div>