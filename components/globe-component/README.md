# Globe

The `globe-component` provides a schematic globe with stories loaded from the data cms. It provides functions to pan, zoom and re-render (`render`).
Data is exported during build-time and injected using an import statement.
The component's size is automaticly set to the .globe-container element.

The component allows to add an array of connections through the property connections. These will be rendered similar to flight paths. Each record in the array is in object in the form of {from: {lat: 42, lon: 3}, to: {lat: 50, lon: 3}}.

The component listens to window resize events.
