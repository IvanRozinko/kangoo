self.addEventListener('push', event => {
  const data = event.data.json()
  console.log(data)
  const date = new Date(data.body.datetime);
  const body = `Коли: ${date.toLocaleDateString('uk-UA')} \nЧаc початку: ${date.toLocaleTimeString('uk-UA')} \nЛокація: ${data.body.location}`

  const options = {
    body,
    icon: './bootlogo.png',
    data: {
      url: data.body.url
    },
    actions: [
      {
        action: 'add',
        title: 'Додати тренування',
        icon: './bootlogo.png'
      }
    ]
  }
 
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})

self.addEventListener('notificationclick', event => {
  event.notification.close()

  const url = event.notification.data.url
  const trainingId = url.split('/').pop();
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window'})
    .then(clientsArr => {
      const appTab = clientsArr[0];
      if (appTab) {
        appTab.focus();
        appTab.postMessage({
          type: "NOTIFICATION_CLICK",
          trainingId
        })
      } else {
        clients.openWindow(url)
          .then((windowClient) => {
            windowClient.postMessage({
              type: "NOTIFICATION_CLICK",
              trainingId
            })
          })
      }
    })
  )

  // event.waitUntil(clients.openWindow(url))
})