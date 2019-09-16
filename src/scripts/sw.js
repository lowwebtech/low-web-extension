self.addEventListener('fetch', event => {
  console.log(event)
  console.log(event.request.url)
  event.respondWith(
    fetch(event.request.url, { headers: event.request.headers })
  );
});