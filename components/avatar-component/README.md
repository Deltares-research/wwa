# Avatar

Returns an image, default image if no src is supplied
otherwise an image from supplied avatar data path and imgixHost
storyteller name is for the title attribute

## How to use

<avatar-component
  v-bind:avatar="page.storyteller.avatar"
  v-bind:name="page.storyteller.name"
  />

The following properties ar used:

storytellerName
storyteller.value.path
storyteller.imgixHost
