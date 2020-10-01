function retrieveParkData(aUrl,maxResults,state){
    

    fetch(aUrl).then(
        (response)=>{
            if (response.ok){
                return response.json()
            }
            throw new Error(response.statusText)
            }
        
    ).then(
        data=>displayResults(data,maxResults,state)
    )
    .catch(
        err=>$('#js-error-message').text(`Something went wrong: ${err.message}`)
    )
}

function displayResults(data,num,state){
    $('#js-error-message').text('')
    $('#display-results').html('')
    $('#display-results').html(buildTemplate(data,num,state))
}
function buildTemplate(data,num,state){
    let bigString=`<h2>${state}</h2>`;
    
    //TODO: finish buildTemplate
    let listItems=''
    for (let i=0;i<Math.min(num,data['data'].length);i++){
        listItems+=`<li>${data['data'][i].fullName}
            <ul>
                <li>${data['data'][i].description}</li>
                <li>Website:<a href=${data['data'][i].url}>${data['data'][i].url}<a></li>
                <li>Park address:
                    <br>
                    ${data['data'][i].addresses[0].line1}
                    <br>
                    ${data['data'][i].addresses[0].city}, ${data['data'][i].addresses[0].stateCode} ${data['data'][i].addresses[0].postalCode}
                </li>
            </ul>
        
        </li>`
    }
    listItems='<ol>'+listItems+'</ol>';
    bigString+=listItems;
    return bigString
}

function constructUrl(state) {
    const baseUrl="https://developer.nps.gov/api/v1/parks?parkCode=&";
    const endUrl='api_key=xrDIQ1JpFCf18oDxURf21t8t9qZsaodwZJRmJJEV';
    
    const stateUrl=`stateCode=${state.toLowerCase()}&`;
    
    
    return baseUrl+stateUrl+endUrl;
}


function watchForm(){
    $('form').on('submit',(e)=>{
        e.preventDefault()
        const state=e.target.states.value;
        const maxResults=e.target['max-results'].value
        retrieveParkData(constructUrl(state),maxResults,state);
        
        


    })
}



$(watchForm)


