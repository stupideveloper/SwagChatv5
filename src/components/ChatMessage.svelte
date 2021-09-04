<script>
  import { notifications, spawnNotification } from '../lib/notifications'

  export let message;
  export let sender;

  const messageClass = message.who === sender ? 'sent' : 'received';

  const avatar = `https://avatars.dicebear.com/api/croodles-neutral/${message.who}.svg?b=%23ffffff`;

  const ts = new Date(message.when);

  // Send Notification
  if ($notifications && message.who !== sender) {
    if (message.who) {
      spawnNotification(message.what, "/swaggermanbutjpeg.jpg", message.who)
    }
  }

</script>
<style>
  .message-text > p {
    max-width: 500px;
    margin: 0;
    line-height: 24px;
    padding: 7px 10px;
    border-radius: 4px;
    position: relative;
    color: white;
    text-align: center;
    font-size: 16px;
  }
  @media only screen and (max-width: 728px) {
    .message-text > p {
      max-width: 65vw;
    }
  }

  .message-text > span {
    color: rgb(167, 167, 167);
    font-family: monospace;
  }
  .message-text {
    max-width: 100%;
    margin-top: 1rem;
  }
  .message {
    display: flex;
    align-items: center;
    margin: 0;
    word-wrap:break-word;
  } 
  .sent {
    flex-direction: row-reverse;
  }
  .sent p {
    color: white;
    background: #145e94;
    align-self: flex-end;
    text-align: right;
  }
  .received p {
    background: #e5e5ea;
    color: black;
    text-align: left;
  }

  .message-text {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .received .message-text {
    align-items: flex-start;
  }

  .message-text > time {
    color: white;
    font-size: 0.7rem;
    color: #9a9a9a;
    margin: 0.3rem 0 0 0 ;
  }
  .message {
    max-width: 100%;
  }
</style>
<div class={`message ${messageClass}`}>
  <img class="proilepicture" src={avatar} alt="avatar" />
  <div class="message-text">
    <span>{message.who}</span>
    <p>{message.what}</p>
    <time>{ts.toLocaleTimeString()}</time>
  </div>
</div>
