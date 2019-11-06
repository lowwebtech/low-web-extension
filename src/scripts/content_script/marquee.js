export default function(){
  
  const marquees = document.querySelectorAll('marquee')
  marquees.forEach((marquee)=>{
    marquee.stop()
  })

}