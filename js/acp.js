// Github login
$(document).ready(function () {
    $("#submit").click(function () {
        var values = {};
        $.each($('#login').serializeArray(), function (i, field) {
            values[field.name] = field.value;
        });
        var auth = btoa(values.username + ':' + values.password);

        $.ajax({
            headers: { Authorization: "Basic " + auth },
            url: 'https://api.github.com/user',
            success: function (data) {
                if (data.login == 'machineweb') {
                    $("#login-block").toggle("slow", function () {
                        $("#hidden").toggle("slow");
                    });
                }
                else {
                    alert("Invalid login");
                }
            },
            error: function (data) {
                alert("Invalid login");
            }
        });
    })
});

$("#go").click(function () {
    var auth = btoa(username + ":" + password);
    var putdata = {
        'message': 'my commit message',
        'committer': {
            'name': 'Charlie Kilpatrick',
            'email': 'info@charliekilpatrick.com'
        },
        'content': 'bXkgbmV3IGZpbGUgY29udGVudHM=',
        'sha': 'cf01f41a60e55f0f8d56640af4d3664a88d6cb2f'
    };
    var jsondata = JSON.stringify(putdata);
    $.ajax({
        headers: { Authorization: "Basic " + auth },
        url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/_posts/test.txt',
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(putdata),
        complete: function (data) {
            
        }
    });
})