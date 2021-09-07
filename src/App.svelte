<script>
  import Chat from './Chat.svelte';
  import Header from './components/Header.svelte';
  //import { username } from './lib/user';
  import Login from './Login.svelte';
  import './styles/global.css'

  const username = false
  /*

  */
    
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
