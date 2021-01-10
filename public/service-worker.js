importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js'
)

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
)

workbox.precaching.addPlugins([
  new workbox.broadcastUpdate.Plugin('precache-channel')
])

const updateChannel = new BroadcastChannel('precache-channel')
updateChannel.addEventListener('message', (event) => {
  if (confirm(`New content is available!. Click OK to refresh`)) {
    window.location.reload()
  }
})
