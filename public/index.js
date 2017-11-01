let client = mqtt.connect('ws://127.0.0.1:1883');

//clientApp to reduce browser window object pollution
//contains utility methods and data stores for client side
let clientApp = {};
clientApp.publishList = [];
clientApp.subscribeList = [];

clientApp.subscribeTopic = function() {
    let topic = $('#sub-topic').val().trim();
    if(topic!=='') {
        console.log(topic);
        client.subscribe(topic);
    }
};

clientApp.addPublishTopic = function() {
    let topic = $('#pub-topic').val().trim();
    if(topic !== '') {
        clientApp.publishList.push(topic);
        $('#pub-topic-option').append(
            `<option value = ${topic}>${topic}</option>`
        );
        $('#pub-topic').val('');
    }
}

clientApp.publishToTopic = function() {
    let publishTopic = $('#pub-topic-option').val();
    let messageBody = $('#message-body').val().trim();
    if(messageBody !== '') {
        console.log(publishTopic);
        console.log(messageBody);
        client.publish(publishTopic, messageBody);
    }
};

$('#sub-topic-button').click((e) => {
    clientApp.subscribeTopic();
});

//Publish message
$('#publish-topic-button').click((e) => {
    clientApp.publishToTopic();
});

//Add new publish topic 
$('#add-pub-topic-button').click((e) => {
    clientApp.addPublishTopic();
});