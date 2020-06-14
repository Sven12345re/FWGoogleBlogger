<template>
    <div class="landing-page">
     <div class="Title">
       <h1><a  class="text" href="#">Google Blogger<span>.</span> </a></h1>
     </div>

    <div class="container">
     
      <h2 class="titel"> Was ist Blogger? Einfach erklärt </h2>
      <br>
      <br>
      <section class="section">
       <div class="container">
           <p> 
              Bei der Webseite Blogger.com handelt es sich um einen Dienst von Google. Damit ist es jeder Person kostenlos möglich, einen eigenen Blog zu erstellen. 
              Bei einem Blog handelt es sich um eine Art öffentliches Tagebuch einer Person. Ob Sie Bilder, Videos oder Texte veröffentlichen bleibt Ihnen überlassen.  

          </p>
        </div>
         <div class="container">
           <p>
               Damit andere Personen Zugriff auf Ihren Blog haben, erhalten Sie von Blogger Ihre eigene Internet-Adresse. Diese werden im Format "IhrBlog.blogspot.com" vergeben.
               Dank vorgegebener Grundstruktur müssen Sie keine HTML-Kenntnisse mitbringen, um den Blog zu betreiben.
           </p>
        </div>
     </section>
     <br>
     <br>
     <br>
     <hr>
    </div>
     <team />       
    </div>
   
</template>

<script>
import team from '../Landingpage/team'
export default {
  name: "Landingpage",
  components :{
      team
  }
};
</script>

<style scoped src="@/assets/style/team.css"> 
</style>



