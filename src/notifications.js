import { writable } from 'svelte/store'
export const notifications = writable(false)

export function spawnNotification(body, icon, title) {
    var options = {
      body: body,
      icon: icon
    }
    var notification = new Notification(title, options);
}

