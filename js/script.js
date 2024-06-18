let translatebtn = document.querySelector(".translate-button");
let fromtext = document.querySelector(".translate-from")
let totext = document.querySelector(".translate-to")
const selectTag = document.querySelectorAll("select")
let swap = document.querySelector(".swap-button");
let icons = document.querySelectorAll(".controls i")




selectTag.forEach((tag, id) => {
    for(const code in countries)
        {
            let se ;
            if(id == 0 && code == "en-GB")
            {
                se = "selected";
            }
            else if(id == 1 && code == "hi-IN")
            {
                se = "selected";
            }
            let option = `<option value="${code}" ${se}>${countries[code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);
        }    
});


swap.addEventListener('click', function(){
    let temp = fromtext.value;
    let templang = selectTag[0].value;
    fromtext.value = totext.value;
    selectTag[0].value = selectTag[1].value;
    totext.value = temp;
    selectTag[1].value = templang
})

icons.forEach(icon => {
    icon.addEventListener('click',({target}) => {
        if(target.classList.contains("fa-copy"))
            {
                if(target.id == 'from'){
                    navigator.clipboard.writeText(fromtext.value)
                }
                else
                {
                    navigator.clipboard.writeText(totext.value);
                }
            }
        else
        {
            let utterance;
            if(target.id == 'from'){
                utterance = new SpeechSynthesisUtterance(fromtext.value)
                utterance.lang = selectTag[0].value;
            }
            else
            {
                utterance = new SpeechSynthesisUtterance(totext.value)
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
})



document.addEventListener('DOMContentLoaded', function(){
    translatebtn.addEventListener('click', function(){
        let text = fromtext.value;
        translatefrom = selectTag[0].value
        translateto = selectTag[1].value    
        console.log(text,translatefrom,translateto)
        let apiurl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translatefrom}|${translateto}`;
        fetch(apiurl)
        .then((re) => {
            return re.json()
        })
        .then((data) => {
            console.log(data);
            totext.value = data.responseData.translatedText;
        })

    })
})
