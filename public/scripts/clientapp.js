$(document).ready(function() {

    $('#submit-button').on('click', postData);


});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);

            $.each(data, function(i, person) {
                $('#container').append('<div class="person"></div>');
                var $el = $('#container').children().last();
                $el.append('<h2>' + person.name + '</h2>');
                $el.append('<p>' + person.address + '</p>');
                $el.append('<p>' + person.city + '</p>');
                $el.append('<p>' + person.state + '</p>');
                $el.append('<p>' + person.zip_code + '</p>');
            });
        }
    });
}
