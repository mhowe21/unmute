var response1;
var response2;
var token = "token";
var courseID = document.URL.substring(document.URL.indexOf('/courses/'));
var instance = window.location.hostname;

run();

async function run() {
    response1 = await runAssignmentCall();
    console.log(response1);
    for (let elm of response1) {
        let muted = elm.muted;
        let pm = elm.post_manually; 
        if (muted == true && pm != true){
            console.log("muted id " + elm.id);
            response2 = await unmuteAssignmentCall(elm.id);

        }
        if(muted == true && pm == true)
        {
            console.log("manual post exception thrown for assigment " + elm.id);
        }
        
    }
}



function runAssignmentCall() {
    return new Promise(function (resolve, reject) {
        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                if (this.status == 200) {
                    let response = JSON.parse(this.responseText);
                    resolve(response);
                }
                if (this.status != 200) {
                    reject("something went wrong with the call");
                }
            }
        });

        xhr.open("GET", "https://" + instance + "/api/v1" + courseID + "/assignments/?per_page=100&page=1");
        xhr.setRequestHeader("Authorization", "Bearer " + token);

        xhr.send(data);

    })

}

function unmuteAssignmentCall(assignmentID) {
    return new Promise(function(resolve,reject){
        var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        //console.log(this.responseText);
        if(this.status == 200){
            let response = JSON.parse(this.responseText);
            resolve(response);
            console.log("put gave 200");
            
        }
        if(this.status != 200){
            reject("the call did not process correctly");
        }
      }
    });
    
    xhr.open("PUT", "https://" + instance + "/api/v1" + courseID + "/assignments/" + assignmentID + "?assignment[muted]=false");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
   
    
    xhr.send(data);
    

    })
    

}