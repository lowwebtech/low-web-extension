<template>
  <main>
    <h1>Thanks !</h1>
    
    <p>L'extension low—web est bien installé. Vous allez dès maintenant réduire les datas que vous consommez pour naviguer sur Internet et réduire ainsi votre consommation d'électricité et de CO2.</p>
    
    <p>
        2 modes s'offrent à vous : 
        <ul>
            <li>mode LOW: impact+ applique les fonctionnalités de base, il a peu d'impact sur la navigation et la réduction des datas, certains sites peuvent tout de même de pas fonctionner</li>
            <li>mode RADICAL: impact+++ Il ne reste que le texte, les images, vidéos, iframes ne sont pas chargées. Juste le html, css et un peu de js.</li>
        </ul>
        Le mode choisi pour chaque site est sauvegardé et sera appliqué lors de la prochaine visite.
    </p>

    <h2>Fonctionnalités</h2>
    <table>
      <thead>
        <tr>
          <td>Fonctionnalités</td>
          <td>LOW</td>
          <td>RADICAL</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Réduction qualité vidéo youtube</td>
          <td>+++</td>
          <td>+++</td>
        </tr>
        <tr>
          <td>block embeds (custom youtube, vimeo, dailymotion) / click to load</td>
          <td>++</td>
          <td>++</td>
        </tr>
        <tr>
          <td>block social embed/tracker (already blocked by ad-blocker)</td>
          <td>++</td>
          <td>++</td>
        </tr>
        <tr>
          <td>update audio/video DOM attributes (loop: false, autoplay: false, preload:none + pause())</td>
          <td>++</td>
          <td>++</td>
        </tr>
        <tr>
          <td>add header save-data</td>
          <td>+</td>
          <td>+</td>
        </tr>
        <tr>
          <td>block by type images, videos, fonts, iframes and more</td>
          <td>x</td>
          <td>+++</td>
        </tr>
        <tr>
          <td>disable css animation/transition</td>
          <td>x</td>
          <td>+</td>
        </tr>
        
      </tbody>
    </table>
    <ul>
        <li></li>
        <li>qualité basse auto youtube.com</li>
        <li>block embeds (custom youtube, vimeo, dailymotion) / click to load</li>
        <li>block social embed/tracker (already blocked by ad-blocker)</li>
        <li>update audio/video DOM attributes (loop: false, autoplay: false, preload:none + pause())</li>
        <li>add header save-data</li>
        <li>block by type images, videos, fonts, iframes and more</li>
        <li>disable css animation/transition</li>
    </ul>

    <h2>Choix du mode par défaut</h2>

    <form>
        <input type="radio" name="defaultMode" id="radical" checked /><label for="radical">Radical</label>
        <input type="radio" name="defaultMode" id="low" /><label for="low">Low</label>
    </form>
  </main>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/common.scss";

td{
  border: 1px solid black;
}
</style>
