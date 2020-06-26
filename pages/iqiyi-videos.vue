/* eslint-disable vue/no-parsing-error */
<template>
  <div style="padding:1rem">
    <h1>iqiyi videos</h1>
    <a href="https://www.iqiyi.com/v_19rxs3yy1c.html">demo video</a>

    <h2>Embed</h2>
    <embed
      src="//player.video.iqiyi.com/0cdc4d9b931d7e85023d505d5f5c43f8/0/0/v_19rxs3yy1c.swf-albumId=17175667900-tvId=17175667900-isPurchase=0-cnId=undefined"
      allowFullScreen="true"
      quality="high"
      width="480"
      height="350"
      align="middle"
      allowScriptAccess="always"
      type="application/x-shockwave-flash"
    ></embed>

    <h2>Iframe</h2>
    <iframe
      src="http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=0cdc4d9b931d7e85023d505d5f5c43f8&tvId=17175667900&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%"
      frameborder="1"
      allowfullscreen="true"
      width="500px"
      height="300px"
      style="background:white;"
    />
  </div>
</template>
