"use strict";
const apiKey='xrDIQ1JpFCf18oDxURf21t8t9qZsaodwZJRmJJEV';
const searchUrl="https://developer.nps.gov/api/v1/parks?parkCode=&";
const endUrl='api_key=xrDIQ1JpFCf18oDxURf21t8t9qZsaodwZJRmJJEV';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${params[key]}`)
    return queryItems.join('&');
}

function retrieveParkData(states,maxResults){
    const params ={
        api_key:apiKey,
        stateCode: states.join(','),
        limit: maxResults
    }
    //console.log(params)
    const queryString=formatQueryParams(params)
    const url=searchUrl+queryString

    fetch(url).then(
        (response)=>{
            if (response.ok){
                return response.json()
            }
            throw new Error(response.statusText)
            }
        
    ).then(
        response=>displayResults(response.data)
    )
    .catch(
        err=>$('#js-error-message').text(`Something went wrong: ${err.message}`)
    )
}

function displayResults(data){
    $('#display-results').removeClass('hidden')
    $('#js-error-message').text('')
    $('#display-results').html('')
    $('#display-results').html(parkListTemplate(data))
}


function parkListTemplate(data){
    let bigString='';
    
    
    let listItems=''
    for (let i=0;i<data.length;i++){
        listItems+=`<li>${data[i].fullName}
            <ul>
                <li>${data[i].description}</li>
                <li>Website:<a href=${data[i].url}>${data[i].url}<a></li>
                <li>Park address:
                    <br>
                    ${data[i].addresses[0].line1}
                    <br>
                    ${data[i].addresses[0].city}, ${data[i].addresses[0].stateCode} ${data[i].addresses[0].postalCode}
                </li>
            </ul>
        
        </li>`
    }
    listItems='<ol>'+listItems+'</ol>';
    bigString+=listItems;
    return bigString
}




function watchForm(){
    $('form').on('submit',(e)=>{
        e.preventDefault()
        
        let choices=document.getElementById('states')
        let selections=[];
        
        for (let  i=0;i<choices.length;i++){
            if (choices[i].selected){
                
                selections.push(choices[i].value)
  
            }
        }
        //const state=e.target.states.value;
        //console.log(state)
        
        
        const maxResults=e.target['max-results'].value
        retrieveParkData(selections,maxResults);
        
        
        


    })
}



$(watchForm)


