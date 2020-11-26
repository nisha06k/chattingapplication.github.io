$("#joinSessionPage").ready(function() {
    $("#joinSessionPage").hide(0);
});

$("#joinSessionPageButton").click(function() {
    $("#createNewSessionPage").hide(0);
    $("#joinSessionPage").show(0);
});

$("#createSessionPageButton").click(function() {
    $("#joinSessionPage").hide(0);
    $("#createNewSessionPage").show(0);
});

$("#chatPage").ready(function() {
    $("#chatPage").hide(0);
});

$("#createNewSessionSubmitButton").click(function() {
    name = document.getElementById("createNewSessionName").value;
    console.log(name);
    var result = createSession();

    if (result == "SUCCESS") {
        $("#createNewSessionPage").hide(0);
        document.getElementById("sessionId").innerHTML = sessionID;
        document.getElementById("participantName").innerHTML = name;
        $("#chatPage").show(0);
        startReadingMessages();
    }
});

$("#joinSessionSubmitButton").click(function() {
    sessionID = document.getElementById("joinSessionId").value;
    name = document.getElementById("joinSessionName").value;

    console.log(sessionID);
    console.log(name);

    var result = joinSession();
    if (result == "SUCCESS") {
        $("#joinSessionPage").hide(0);
        document.getElementById("sessionId").innerHTML = sessionID;
        document.getElementById("participantName").innerHTML = name;
        $("#chatPage").show(0);
        startReadingMessages();
    }
});

$("#sendMessage").click(function() {
    var newMessage = document.getElementById("newMessage").value;
    console.log(newMessage);
    sendMessage(newMessage);

})

$("#sendMessage").click(function() {
    document.getElementById("newMessage").value = '';
})