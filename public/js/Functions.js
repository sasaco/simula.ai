btconfig.onclick = function(){
    if(isvisible){
        lbmainlabel.innerHTML = "Am Visible";
        console.log("am CLicking");
        isvisible = false;
    }
    else{
        lbmainlabel.innerHTML = "Am Invisible";
        isvisible = true;
    }
};