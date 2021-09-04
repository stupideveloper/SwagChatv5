<script lang="javascript">
  import PageTransitions from './components/PageTransitions.svelte';
  import logo from './assets/swaggerman.webp'
  import Spacer from './components/Spacer.svelte';
  import { user } from './lib/user';

  let username;
  let password;
  var isNewUser = false;
  function login() {
    user.auth(username, password, ({ err }) => err && alert(err));
  }

  function signup() {
    user.create(username, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        login();
      }
    });
  }
  function toggleSignupState() {
    if (isNewUser) {
      isNewUser = false
    } else {
      isNewUser = true
    }
  }
</script>
<style>
  .inputarea {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  label {
    color: rgb(154, 154, 154);
  }
  .swaggerman {
    margin-top: 1rem;
    width: 15vw;
  }
  h2, h3 {
    color: white;
  }
  h3 {
    font-weight: normal;
  }
  h3 > button {
    all: inherit;
    cursor: pointer; 
    display: inline;
    color:rgb(0, 163, 54);
    font-weight: bolder;
  }
  .login {
	background: #1a1520;
	color: white;
  margin-top: 1rem;
}
p {
  color: rgb(154, 154, 154);
  margin-top: 0;
  margin-bottom: 0;
}
</style>

<PageTransitions>
  <img src={logo} alt="Swaggerman" class="swaggerman" >
  {#if isNewUser}
    <div>
      <h2>Sign up</h2>
      <form>
        <div class="inputarea">
          <label for="username">Username</label>
          <input name="username" aria-label="Username" bind:value={username} minlength="3" maxlength="16" />
        </div>
        <div class="inputarea">
          <label for="password" >Password</label>
          <input name="password" aria-label="Password" bind:value={password} type="password" />
        </div>

      </form>
      <button class="login"  on:click={signup} >Sign Up</button>
      
      <h3>Already have an account? <button on:click={toggleSignupState}>Log In</button></h3>
    </div>
    {:else}
    <div>
      <h2>Log In</h2>
      <form>
        <div class="inputarea">
          <label for="username">Username</label>
          <input name="username" aria-label="Username" bind:value={username} minlength="3" maxlength="16" />
        </div>
        <div class="inputarea">
          <label for="password" >Password</label>
          <input name="password" aria-label="Password" bind:value={password} type="password" />
        </div>

      </form>
      <button class="login"  on:click={login}>Log In</button>
      
      <h3>Don't have an account? <button on:click={toggleSignupState}>Sign Up</button></h3>
    </div>
  {/if}
  {#if document.location.protocol == 'https:'}
    <p>Connection is &nbsp;<span class="good">secured</span>&nbsp;by TLS and is encrypted.</p>
    <Spacer size={1}/>
    <p>TLS: <span class="good">✔</span></p>

  {:else}
    <p>Connection is &nbsp;<span class="bad">not secured</span>&nbsp; by TLS.</p>
    <Spacer size={1}/>
    <p>TLS: <span class="bad">✗</span></p>
  {/if}

  {#if user}
    <p>GUN DATA ENCRYPTION: <span class="good">✔</span></p>
    {:else}
    <p>GUN DATA ENCRYPTION: <span class="bad">✗</span></p>
  {/if}


  {#if window.localStorage}
    <p>DATABASE NETWORK CAPABLE: <span class="good">✔</span></p>
    {:else}
    <p>DATABASE NETWORK CAPABLE: <span class="bad">✗</span></p>
  {/if}
  {#if "Notification" in window}
  <p>NOTIFICATION CAPABLE: <span class="good">✔</span></p>
  {:else}
  <p>NOTIFICATION CAPABLE: <span class="bad">✗</span></p>
  {/if}
  <Spacer size={1}/>
</PageTransitions>
