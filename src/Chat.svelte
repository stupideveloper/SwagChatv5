<script>
  import ChatMessage from './ChatMessage.svelte';
  import { onMount } from 'svelte';
  import { username, user } from './user';
  import debounce from 'lodash.debounce';
  import { onDestroy } from 'svelte'


  import GUN from 'gun';
  const db = GUN();

  let newMessage;
  let messages = [];

  let scrollBottom;
  let lastScrollTop;
  let canAutoScroll = true;
  let unreadMessages = true;



  

  function autoScroll() {
    setTimeout(() => scrollBottom?.scrollIntoView({ behavior: 'smooth' }), 300);
    unreadMessages = false;
  }

  function watchScroll(e) {
    canAutoScroll = (e.target.scrollTop || Infinity) > lastScrollTop;
    lastScrollTop = e.target.scrollTop;
  }

  $: debouncedWatchScroll = debounce(watchScroll, 1000);


  onMount(() => {
    autoScroll();
    var match = {
      // lexical queries are kind of like a limited RegEx or Glob.
      '.': {
        // property selector
        '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      '-': 1, // filter in reverse
    };

    // Get Messages
    db.get('chatmessage')
      .map(match)
      .once(async (data, id) => {
        if (data) {
          // Key for end-to-end encryption
          const key = '#foo';

          var message = {
            // transform the data
            who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
            what: (await SEA.decrypt(data.what, key)) + '', // force decrypt as text.
            when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
          };

          if (message.what) {
            messages = [...messages.slice(-100), message].sort((a, b) => a.when - b.when);
            if (canAutoScroll) {
              autoScroll();
            } else {
              unreadMessages = true;
            }
          }
        }
        autoScroll();
      });
      autoScroll();
  });

  async function sendMessage() {
    const secret = await SEA.encrypt(newMessage, '#foo');
    const message = user.get('all').set({ what: secret });
    const index = new Date().toISOString();
    db.get('chatmessage').get(index).put(message);
    newMessage = '';
    canAutoScroll = true;
    autoScroll();
  }
</script>
<style>
  .container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100vh;
	background-color: rgb(26, 26, 26);
}
main {
	height: 80vh;
	overflow-y: scroll;
	flex-direction: column;
  max-width: 100%;
}

.messageform {
	height: 8vh;
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 728px;
	display: flex;
	font-size: 1.5rem;
}
.messageform > input {
	width: 100%;
}
  
</style>
<div class="container">
    <main id="main" on:scroll={debouncedWatchScroll}>
      <div>
        <h2 style="color: #9a9a9a; font-weight: bolder;">Welcome to the start of chat..</h2>
        <button on:click={autoScroll}>Scroll to latest 🚀</button>
      </div>
      {#each messages as message (message.when)}
        <ChatMessage {message} sender={$username} />
      {/each}

      <div class="dummy" bind:this={scrollBottom} />
    </main>

    <form on:submit|preventDefault={sendMessage} class="messageform">
      <input type="text" placeholder="Type a message..." bind:value={newMessage} maxlength="100" />

      <button type="submit" disabled={!newMessage} style="height: 100%;">✨</button>
    </form>


    {#if !canAutoScroll}
    <div class="scroll-button">
      <button on:click={autoScroll} class:red={unreadMessages}>
        {#if unreadMessages}
          💬
        {/if}
        👇
      </button>
    </div>
   {/if}
</div>
