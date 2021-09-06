import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import { writable } from 'svelte/store';

// Database
export const db = GUN({peers: ['https://swagchat-backend-v5-eu.herokuapp.com/gun','ws://192.168.194.207:8765/gun', 'http://localhost:8765/gun']});

setInterval(() => {
    console.dir(db._.opt.peers)
}, 1000);

// Gun User
export const user = db.user().recall({sessionStorage: true});

// Current User's username
export const username = writable('');

user.get('alias').on(v => username.set(v))

db.on('auth', async(event) => {
    const alias = await user.get('alias'); // username string
    username.set(alias);

    console.log(`signed in as ${alias}`);
});