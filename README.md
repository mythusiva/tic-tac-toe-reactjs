# Example App

View a quick demo here: https://youtu.be/ZxoNgbsh4OA

### How to run this example
1. Create a new application key on RapidAPI.
2. Go to [https://FFlag-MS.com](https://FFlag-MS.com), and enter your key. For namespace, enter `example-app`.
3. Add the following in the textarea:
```json
{
    "pageTitle": "Let's play Tic Tac Toe!",
    "backgroundColor": "#f5f5f5",
    "isMaintenanceMode": false
}
```
4. Add the following in the `Exposed Flags` section:
```
pageTitle,backgroundColor
```
5. Press `Apply flags`, and then `Fetch flags` at the top. This will enable a link called `the CDN`. Copy the CDN url. It will look something like this:
```
https://fflag-ms.com/service/publicFlags/ce7b67a09ce057596c934053da6027b5678fe336fc89fd6eb4fcdab6681eaf73
```
6. Next, let's run our example app. Install nvm, or ensure you have the same node version running as specified in `./server/.nvmrc`.
7. Create `./server/.env` file with the following contents:
```sh
RAPID_API_KEY="xxx"
FFLAG_NAMESPACE="example-app"
SERVER_PORT=3005
```
8. Update the env file with your application key, generated [here](https://rapidapi.com/developer/authorization).
9. Now, navigate to `client/src/App.js`, and change the following line to use your CDN url instead.
```js
useEffect(() => {
    fetch("https://fflag-ms.com/service/publicFlags/ce7b67a09ce057596c934053da6027b5678fe336fc89fd6eb4fcdab6681eaf73").then(r => r.json()).then(setFeatureFlags);
}, []);
```
10. Open a terminal and assuming that you are at the top-level of the project, run the following.
```sh
$ cd server
$ nvm i # skip this if you aren't using nvm
$ rm -rf node_modules; npm i; npm run build; npm run start
```
11. Open your browser and navigate to [https://localhost:3005](https://localhost:3005).

Tada! You now have feature flags running, affecting both the client and server side of the application. Play around with the flags, and see how it impacts things.
Note, the backend is set to refresh flags every 5 mins. To get the latest flags, simply restart the server, or add a route so you can manually fetch on demand.

### Referencing feature flags on client
FFlag-MS generates a CDN link that you can use to reference the flags on your client-side app. As a reminder, you should never use the `fflag-ms` npm module on the client side, since this will expose your RapidAPI key. 

Take a look at `./client/src/App.js` for an example of reading flags from the CDN.

In React, loading the flags looks like this:
```js
// Create a state for feature flags. 
const [featureFlags, setFeatureFlags] = useState({});

// Fetch using CDN url, replace this URL with the one provided to you.
useEffect(() => {
    fetch("https://fflag-ms.com/service/publicFlags/ce7b67a09ce057596c934053da6027b5678fe336fc89fd6eb4fcdab6681eaf73").then(r => r.json()).then(setFeatureFlags);
}, []);
```

Next, reference the flag where you need to, but always ensure there is a fallback value in case the CDN is not available, or the flag has been deleted.

```html
<span className="...">{featureFlags['pageTitle'] || "Let's play the tic-tac-toe Game!"}</span>
```

### Referencing feature flags on server
FFlag-MS offers an official npm package, for backend applications. Make sure you install the module first.

```sh
$ npm i fflag-ms
```


Take a look at `./server/server.js` for an example of reading flags using the npm module.

With ExpressJS it looks like this:

```js
const FeatureFlags = require('fflag-ms');

const ff = new FeatureFlags({
  rapidAPIKey: process.env.RAPID_API_KEY,
  namespace: "example-app"
});
```

Next, to get a flag we use the `get` method. 
```js
ff.get('isMaintenanceMode', false)
```

In ExpressJS, here's an example where we use a flag to determine if we should put an app into maintenance mode.

```js
// Trigger maintenance mode if enabled.
app.use((req, res, next) => {
  if (ff.get('isMaintenanceMode', false)) {
    res.status(200).send('Maintenance mode, please try again later.');
    return;
  }

  next();
});
```
