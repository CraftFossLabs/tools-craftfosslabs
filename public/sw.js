self.addEventListener('push', event => {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/Logo.svg',
        data: { url: data.url }
      })
    );
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    if (event.notification.data.url) {
      clients.openWindow(event.notification.data.url);
    }
  });
  