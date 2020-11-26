function createSession() {
    var result = "SUCCESS";
    sessionID = createSessionID();

    db.collection(sessionID).doc("RawData").set({
            TextCounter: 0,
            TotalParticipants: 1,
            Name: firebase.firestore.FieldValue.arrayUnion(name)
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            result = "ERROR";
            console.error("Error writing document: ", error);
        });

    db.collection(sessionID).doc("Chat").set({
            ChatPattern: "",
            Text: "welcome"
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            result = "ERROR";
            console.error("Error writing document: ", error);
        });
    return result;

}

function createSessionID() {
    var d = new Date();

    var SessionID = d.getFullYear().toString() + ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1).toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString();
    console.log(SessionID);
    return SessionID;
}

function joinSession() {
    var result = "SUCCESS";
    // var totalParticipants;
    // //read data
    // db.collection(sessionID).doc("RawData")
    //     .onSnapshot(function(doc) {
    //         console.log("Total Participants: ", doc.data().TotalParticipants);
    //         totalParticipants = doc.data().TotalParticipants;
    //     });

    // //change the data
    // totalParticipants = parseInt(totalParticipants) + 1;
    // console.log(typeof(totalParticipants));
    //update the data
    db.collection(sessionID).doc("RawData").update({
            TotalParticipants: firebase.firestore.FieldValue.increment(1),
            Name: firebase.firestore.FieldValue.arrayUnion(name)
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            result = "ERROR";
            console.error("Error writing document: ", error);
        });

    return result;
}


//send Message

function sendMessage(newMessage) {
    var textCounter = 0;
    var participantName = [];

    db.collection(sessionID).doc("RawData").update({
            TextCounter: firebase.firestore.FieldValue.increment(1)
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            result = "ERROR";
            console.error("Error writing document: ", error);
        });

    db.collection(sessionID).doc("RawData")
        .onSnapshot(function(doc) {
            if (textCounter < doc.data().TextCounter) {
                textCounter = doc.data().TextCounter;
                participantName = doc.data().Name;
                console.log(textCounter);
                console.log(participantName);
            }

        });


    db.collection(sessionID).doc("Chat").update({
            ChatPattern: name,
            Text: newMessage
        })
        .then(function() {
            console.log("Document successfully written!1");
        })
        .catch(function(error) {
            result = "ERROR";
            console.error("Error writing document: ", error);
        });
}

function startReadingMessages() {

    var textCounter = 0;
    var chatPattern = "";
    document.getElementById("frameContent").innerHTML = "";
    var textMessages = "";

    db.collection(sessionID).doc("RawData")
        .onSnapshot(function(doc) {
            console.log("Text Conter: ", doc.data().TextCounter);
            textCounter = doc.data().TextCounter;
        });

    db.collection(sessionID).doc("Chat")
        .onSnapshot(function(doc) {
            console.log("Chat Pattern: ", doc.data().ChatPattern);
            chatPattern = doc.data().ChatPattern;
            textMessages = doc.data().Text;
            displayMessage(chatPattern, textMessages, textCounter);
        });

}

function displayMessage(chatPattern, textMessages, textCounter) {

    var owner = false;
    var sender = "";
    if (name == chatPattern) {
        owner = true;
    }

    sender = chatPattern;

    var dataObject = new MessageCard(owner, sender, textMessages);


    loadMessage(dataObject);

}

function loadMessage(messageCard) {
    var ticket = document.getElementById("frameContent").innerHTML;
    var frame = "";

    if (messageCard.owner) {
        frame = '<div class=\"row pt-3 pr-2\">' +
            '<div class=\"col d-flex justify-content-end"\>' +
            '<div class=\"card text-white bg-success mb-3\" style=\"max-width: 18rem;\">' +
            '<div class=\"card-header\" style=\"font-size: 12px;\">' + messageCard.sender + '</div>' +
            '<div class=\"card-body\">' +
            '<p class=\"card-text\">' + messageCard.message + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    } else {
        frame = '<div class=\"row pt-3 pl-2\">' +
            '<div class=\"col d-flex justify-content-start"\>' +
            '<div class=\"card text-white bg-dark mb-3\" style=\"max-width: 18rem;\">' +
            '<div class=\"card-header\" style=\"font-size: 12px;\">' + messageCard.sender + '</div>' +
            '<div class=\"card-body\">' +
            '<p class=\"card-text\">' + messageCard.message + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    ticket = ticket + frame;
    document.getElementById("frameContent").innerHTML = ticket;

}



var inputText = document.getElementById("newMessage");
inputText.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sendMessage").click();
    }
});



window.onbeforeunload = function() {
    return "a";
};