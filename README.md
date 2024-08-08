# Important information
![screencast](https://bitbucket.org/clicnetcode/challenge-oystr/raw/44ba8e8ef288370924fbe8e0a5674fc0776b0dc9/media/Pagination.gif)
![screencast](https://bitbucket.org/clicnetcode/challenge-oystr/raw/44ba8e8ef288370924fbe8e0a5674fc0776b0dc9/media/Timeline.gif)

## Features

1. Responsive UI, shows skeletons when loading information.
2. Requests are cached, successive calls are instant.
3. Characters can be toggled as favorite.
4. Characters are saved to state, avoiding an extra call when opening details.
5. Character details shows timeline information for Comics.
6. Error handling, application fails gracefully.
7. Character Id is used in the route, making that link sharable/restorable.
8. Character route can be resumed despite lacking cached info.

## Planning/Reasoning

1. Why expo? Simply what I am accustomed to building new apps and sites.
I have worked with other approaches, although we will not be using native features, in this case the benefits are:
    1. Elegant file-based router.
    2. Handles bundling.
    3. As this is a very small app, I can use the StyleSheet namespace (RN also provides the typing for it) and conform to its patterns and good practices, avoiding the need to use styled components (external to mui) and/or tailwind.
2. Why zustand? Very light-weight, performant, global state management.
3. Why react query instead of axios+state? Using a lib like this is actually recommended in the official react docs, and avoids a lot of code repetition, well described here: <https://tkdodo.eu/blog/why-you-want-react-query>.
4. Why mui? Free and complete, well maintained, works on web and mobile.
5. .env files: of course in production you wouldn't maintain api keys in the frontend, would add auth + get the keys from a backend.
6. Lack of tests? Just because of the scope of the project, I didn't spend the time implementing tests, because there isn't much of a critical business logic, if this project had tests it would be obvious stuff like checking for API results and UI components.
7. Why not use Suspense? At the moment it seems like suspense is interacting with expo's async routes, so I am managing error/loading state on each query, the requests fail gracefully.

## Known issues, future improvements

1. Error page is unstyled.
2. Errors are handled but no auto retry with backoff nor any manual retry is used.
3. No theming, just default mui components due to time.
4. No prefetching the next pages.
5. Assuming this content is very static, I would actually fetch everything into localstorage, making the search and pagination instant.
6. Clicking on comics/series chips should filter by that or show those.
7. Clicking on the Favorites on the topbar should show all favorite characters.
8. Search query should be included as url params as I did for ids.

## How to run

Create a .env file with the following:

```bash
EXPO_PUBLIC_MARVEL_PUBLIC_KEY=public_key
EXPO_PUBLIC_MARVEL_PRIVATE_KEY=private_key
EXPO_PUBLIC_MARVEL_API_URL=https://gateway.marvel.com/v1/public
```

Then run the following:

```bash
npm i
npm run start
```
