var response1;
var response2;
var token = "your token here";


run();

async function run() {
    response1 = await runAssignmentCall();
    console.log(response1);
    for (let elm of response1) {
        let muted = elm.muted;
        if (muted == true) {
            console.log("muted id " + elm.id);
            response2 = await unmuteAssignmentCall(elm.id);

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
                    reject("something went wrong with the call")
                }
            }
        });

        xhr.open("GET", "https://{yourInstance}.instructure.com/api/v1/courses/{your_course}/assignments/?per_page=100&page=1");
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
    
    xhr.open("PUT", "https://{yourInstance}.instructure.com/api/v1/courses/{yourCourse}/assignments/" + assignmentID + "?assignment[muted]=false");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
   
    
    xhr.send(data);
    

    })
    

}