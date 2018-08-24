let client = mqtt.connect();

//clientApp to reduce browser window object pollution
//contains utility methods and data stores for client side
let clientApp = {};
clientApp.name = 'NoName';
clientApp.publishList = [];
clientApp.subscribeList = [];

clientApp.saveName = function() {
    let name = $('#user-name').val().trim() || clientApp.name;
    if(name!==''){
        clientApp.name = name;
        $('#user-name-span').html(clientApp.name);
    }
    else alert('Enter a valid name!');
}

clientApp.subscribeTopic = function() {
    let topic = $('#sub-topic').val().trim();
    if(topic!=='') {
        console.log(topic);
        client.subscribe(topic);
        $('#sub-topic').val('');
        $('.subscriptions').append(
            `<button type="button" class="btn btn-outline-success">${topic}</button>&nbsp;&nbsp;`
        );
    }
    else alert('Enter a subscribe topic!');
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
    else alert('Enter a publish topic!');
};

clientApp.publishToTopic = function() {
    let publishTopic = $('#pub-topic-option').val();
    let messageBody = $('#message-body').val().trim();
    if(messageBody !== '') {
        console.log(publishTopic);
        console.log(messageBody);
        console.log(`${clientApp.name}: ${messageBody} [${publishTopic}]`);
        client.publish(publishTopic, `${messageBody} {sent by ${clientApp.name}}`);
        $('#message-body').val('');
    }
};

client.on('message', function(topic, payload) {
    $('#message-div').append(
        `[${topic}]: ${payload.toString()}<br/>`
    );
});

//buttons click handlers
$('#user-name-button').click((e) => {
    clientApp.saveName();
});

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