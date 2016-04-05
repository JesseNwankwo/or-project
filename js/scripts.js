var reader; //GLOBAL File Reader object for demo purpose only
var dataSum = 0;
var dataArray = [];
/**
    * Check for the various File API support.
 */
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
    reader = new FileReader();
    return true; 
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}
/**
    * read text input and populate it into an array
*/
function readText(filePath) {
    var output = ""; //placeholder for text output
    var stringArray = new Array();
    if(filePath.files && filePath.files[0]) {           
        reader.onload = function (e) {
            output = e.target.result;
            cleanOutput = output.replace(/\s+/g,"").replace(/\./g," ").replace(/\s+$/, ""); //remove unnecessary whitespace, period, and then remove space from end of string
            stringArray = cleanOutput.split(" ");
            //console.log(stringArray);
            stringArray.pop();
            displayContents(cleanOutput); //print output of file to page
            for(i = 0; i < stringArray.length; i++) { //loop through array, convert each element to an integer, then add to dataArray
                x = parseInt(stringArray[i], 10); //convert each number
                dataSum += x;
                dataArray[i] = x;
            }
        };//end onload()
        reader.readAsText(filePath.files[0]);
    }//end if html5 filelist support
    else if(ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
        try {
            reader = new ActiveXObject("Scripting.FileSystemObject");
            var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
            output = file.ReadAll(); //text contents of file
            cleanOutput = output.replace(/\s+/g, '') //remove whitespace from string 
            console.log(cleanOutput);
            file.Close(); //close file "input stream"
            displayContents(output);
         }
         catch (e) {
            if (e.number == -2146827859) {
                alert('Unable to access local files due to browser security settings. ' + 
                    'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' + 
                    'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"'); 
            }
         }       
    }
    else { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }       
    return true;
}   
/**
    * display content using a basic HTML replacement
*/
function displayContents(txt) {
    var el = document.getElementById('main'); 
    el.innerHTML = txt; //display output in DOM
}