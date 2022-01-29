const cacheName = 'mapmaker';

const assets = [
	'./',

	'./manifest.json',


	'./*',
];

self.addEventListener( 'install', async function () {

	const cache = await caches.open( cacheName );

	assets.forEach( function ( asset ) {

		cache.add( asset ).catch( function () {

			console.warn( '[SW] Cound\'t cache:', asset );

		} );

	} );

} );

self.addEventListener( 'fetch', async function ( event ) {

	const request = event.request;
	event.respondWith( networkFirst( request ) );

} );

async function networkFirst( request ) {

	return fetch( request ).catch( async function () {

		const cachedResponse = await caches.match( request );

		if ( cachedResponse === undefined ) {

			console.warn( '[SW] Not cached:', request.url );

		}

		return cachedResponse;

	} );

}
