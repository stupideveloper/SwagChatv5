<script>
  import { username, user } from './user';
  import { notifications } from './notifications'
  import { spawnNotification } from './notifications'
  function signout() {
    user.leave();
    username.set('');
  }

  function togglenotifications() {
    if ($notifications === true) {
      spawnNotification("Notifications have been disabled, visit settings to enable.", "/swaggermanbutjpeg.jpg", "SwagChatv5")
      notifications.set(false)
    } else {
      if (Notification.permission === "granted") {
        spawnNotification("Notifications have been enabled, visit settings to disable.", "/swaggermanbutjpeg.jpg", "SwagChatv5")
      } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            spawnNotification("Notifications have been enabled, visit settings to disable.", "/swaggermanbutjpeg.jpg", "SwagChatv5")
          } else {
            alert("Notifications were not allowed.")
          }
        });
      }
      notifications.set(true)
    } 
  }
</script>
<style>
  h1 {
    font-size: 20px;
  }
  @media only screen and (max-width: 728px) {
    h1 {
      font-size: medium;
    }
  }
  @media only screen and (max-width: 550px) {
    .headerpicture {
      display: none;
    }
  }
  @media only screen and (max-width: 400px) {
    h1 {
      display: none;
    }
  }

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgb(54, 54, 54);
  z-index: 1;
  color: white;
  right: 0;
}

.dropdown-content button {
  color: rgb(255, 255, 255);
  background-color: rgb(54, 54, 54);
  width: 100%;
  border: none;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content button:hover {background-color: rgb(66, 66, 66);}
.dropdown:hover .dropdown-content {display: block;}

</style>
<header>
  <h1>SwagChat<span style="color: #9a9a9a;"><sup>v5</sup></span></h1>

  {#if $username}

    <div class="user-bio">
      <span>Hello <strong>{$username}</strong></span>
      <img class="proilepicture headerpicture" src={`https://avatars.dicebear.com/api/croodles-neutral/${$username}.svg?b=%23ffffff`} alt="avatar" /> 
    </div>


    <div class="dropdown">
      <button class="dropbtn">⚙️</button>
      <div class="dropdown-content">
        {#if "Notification" in window}
          {#if window.Notification.permission !== "denied"}
            {#if $notifications}
              <button on:click={togglenotifications}>Disable Notifications</button>
            {:else}
              <button on:click={togglenotifications}>Enable Notifications</button>
            {/if}
          {:else}
            <button disabled>Enable Notifications</button>
          {/if}

        {/if}
        <button on:click={signout}>Sign Out</button>
      </div>
    </div>

  {:else}
    <h3>Distributed, Encrypted Messaging</h3>
  {/if}
</header>