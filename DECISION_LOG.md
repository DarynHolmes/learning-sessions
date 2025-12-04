# DECISION LOG

## Where do you coerce mins to a number and why there?

I decided to do this in the API layer. This seemed like a good place to transform the data as it would interface with the external API. This way only the API layer knows about the details of the structure of the API.

## How did you implement the debounce and why did you choose that approach?

I used [refDebounced](https://vueuse.org/shared/refDebounced/) from VueUse. It is a popular, battle tested library that works well with Vue's reactivity system.

## If two sessions share the same popularity, what guarantees their relative order?

In the case of equal popularity, the code will use the title to sort it alphabetically. With the way it is implemented, these will always be sorted in ascending alphabetical order regardless of the sort order.

## What’s your approach to accessibility for the toggle?

Standard components were used with good practices. For example the checkbox and select tags have a label which is recommended.

## Why TanStack Query?

TanStack Query (Vue Query) is an excellent tool for asynchronous state management. It has a nice API for obtaining errors, loading state and the data. It caches data, which is why the app is fast when repeating a search term.
