// Github login
var auth;
var editTarget;
var editsha;
var mode;

function getFormattedDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return yyyy + '-' + mm + '-' + dd;
}

$("#submit").click(function () {
    var values = {};
    $.each($('#login').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });
    auth = btoa(values.username + ':' + values.password);

    $.ajax({
        headers: { Authorization: "Basic " + auth },
        url: 'https://api.github.com/user',
        success: function (data) {
            if (data.login == 'machineweb') {
                updateStatus('');
                $("#login-block").toggle("slow", function () {
                    $("#hidden").toggle("slow");
                });
            }
            else {
                updateStatus("Invalid login.");
            }
        },
        error: function (data) {
            updateStatus("Invalid login.");
        }
    });
})

function updateStatus(value) {
    $("#statustext").html(value);
}

$("#newpost").click(function () {
    mode = 'new';
    $("#subjectbox")[0].value = "";
    $("#editbox")[0].value = "";
    $("#editdiv").toggle(true);
});

$("#cancel").click(function () {
    mode = undefined;
    $("#editdiv").toggle(false);
});

function editPost(postname) {
    mode = 'edit';
    editTarget = postname.replace(/\//g, '-').substring(1, postname.length - 5) + ".md";
    $.ajax({
        url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/_posts/' + editTarget,
        success: function (data) {
            $("#editdiv").toggle(true);
            editsha = data.sha;
            var content = (atob(data.content));
            var subject = content.substring(content.search("title") + 7, content.search("---\n\n") - 1);
            var body = content.substring(content.search("\n\n") + 2);
            $("#subjectbox")[0].value = subject;
            $("#editbox")[0].value = body;
        },
        error: function (data) {
            updateStatus("Couldn't find the requested file.");
        }
    });
}

function deletePost(postname) {
    var deleteTarget = postname.replace(/\//g, '-').substring(1, postname.length - 5) + ".md";
    var sure = confirm("Are you sure you want to delete " + deleteTarget + "?");
    var deleteSha = '';
    if (sure) {
        $.ajax({
            url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/_posts/' + deleteTarget,
            success: function (data) {
                var putdata = {
                    'message': 'Deleted news item',
                    'sha': data.sha
                };
                $.ajax({
                    headers: { Authorization: "Basic " + auth },
                    url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/_posts/' + deleteTarget,
                    type: 'DELETE',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(putdata),
                    success: function (data2) {
                        updateStatus("File deleted.");
                        document.getElementById(postname).style.display = "none";
                    },
                    error: function (data2) {
                        updateStatus("Couldn't find the requested file.");
                    }
                });
            },
            error: function (data) {
                updateStatus("Couldn't find the requested file.");
            }
        });
    }
    
}

$("#submitedit").click(function () {
    var content = btoa("---\nlayout: post\nsection-type: post\ntitle: " + $("#subjectbox")[0].value + "\n---\n\n" + $('#editbox')[0].value);

    if (mode == 'edit') {
        var putdata = {
            'message': 'Updated news item',
            'content': content,
            'sha': editsha
        };
        $.ajax({
            headers: { Authorization: "Basic " + auth },
            url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/_posts/' + editTarget,
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(putdata),
            success: function (data) {
                $("#statustext").html("Update successful.");
                $("#editdiv").toggle();
            },
            error: function (data) {
                $("#statustext").html("Update NOT successful.");
            }
        });
    }

    else if (mode == 'new') {
        var postname = getFormattedDate() + "-" + $("#subjectbox")[0].value.toLowerCase().replace(" ", "-").replace("\n", "-") + ".md";
        postname = postname.replace(/[|&;$%@"<>()+,]/g, "");
        var putdata = {
            'message': 'New news item',
            'content': content,
            'sha': sjcl.encrypt(auth, postname)
        };
        $.ajax({
            headers: { Authorization: "Basic " + auth },
            url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/_posts/' + postname,
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(putdata),
            success: function (data) {
                $("#statustext").html("Post successful. The list of posts will be updated shortly.");
                $("#editdiv").toggle();
            },
            error: function (data) {
                $("#statustext").html("Post NOT successful.");
            }
        });
    }
    
});

$("input#file-input").change(function () {
    var file = document.getElementById('file-input').files[0];
    readFile(file, function (e) {
        var putdata = {
            'message': 'Image uploaded',
            'content': btoa(e.target.result),
            'sha': sjcl.encrypt(auth, file.name)
        };
        $.ajax({
            headers: { Authorization: "Basic " + auth },
            url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/img/posts/' + file.name,
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(putdata),
            success: function (data) {
                $("#statustext").html("Image uploaded.");
                $("#editbox")[0].value += '<img src="../img/posts/' + file.name + '">';
            },
            error: function (data) {
                $("#statustext").html("Image upload failed.");
            }
        });
    });
    
    
});

function readFile(file, callback) {
    var reader = new FileReader();
    reader.onload = callback
    reader.readAsBinaryString(file);
}