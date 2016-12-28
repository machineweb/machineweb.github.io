﻿var auth;
var editTarget;
var editsha;
var mode;
var touryml;

CKEDITOR.replace('editbox');
CKEDITOR.config.htmlEncodeOutput = false;
CKEDITOR.config.entities = false;

$("#tour-date").datepicker({
    dateFormat: "MM d yy"
});

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

function updateStatus(value) {
    $("#statustext").html(value);
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
            console.log(data);
        }
    });
})

$("#newtour").click(function () {
    $("#tourdiv").toggle(true);
})

$("#canceltour").click(function () {
    $("#tourdiv").toggle(false);
});

$("#submittour").click(function () {
    $.ajax({
        url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/_data/tour.yml',
        success: function (data) {
            toursha = data.sha;
            var newcontent = (atob(data.content)) + "\n  - date: \"" + $("#tour-date")[0].value + "\"\n    venue: \"" + $("#tour-venue")[0].value + "\"\n    venue-url: \"" + $("#tour-venue-url")[0].value + "\"\n    location: \"" + $("#tour-location")[0].value + "\"\n    tickets-url: \"" + $("#tour-tickets-url")[0].value + "\"\n    rsvp-url: \"" + $("#tour-rsvp-url")[0].value + "\"";
            var putdata = {
                'message': 'New tour item',
                'content': btoa(newcontent),
                'sha': toursha
            };
            $.ajax({
                headers: { Authorization: "Basic " + auth },
                url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/_data/tour.yml',
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(putdata),
                success: function (data2) {
                    $("#statustext").html("Date successfully added.");
                    $("#tourdiv").toggle(false);
                },
                error: function (data2) {
                    $("#statustext").html("Date NOT successfully added. Something went wrong.");
                    console.log(data2);
                }
            });
        },
        error: function (data) {
            updateStatus("Couldn't reach the tour data file.");
            console.log(data);
        }
    });
})

$("#edittour").click(function () {
    mode = 'tour';
    $("#cke_editbox").toggle(false);
    $.ajax({
        url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/_data/tour.yml',
        success: function (data) {
            $("#editdiv").toggle(true);
            $("#bareeditbox").toggle(true);
            editsha = data.sha;
            $("#bareeditbox")[0].value = (atob(data.content));
            var psconsole = $('#bareeditbox');
            if (psconsole.length)
                psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
        },
        error: function (data) {
            updateStatus("Couldn't reach the tour data file.");
            console.log(data);
        }
    });
})

$("#editabout").click(function () {
    mode = 'about';
    $.ajax({
        url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/about.html',
        success: function (data) {
            $("#editdiv").toggle(true);
            $("#cke_editbox").toggle(true);
            $("#subjectbox").toggle(false);
            $("#bareeditbox").toggle(false);
            editsha = data.sha;
            var content = (atob(data.content));
            var body = content.substring(content.search("\n\n") + 2);
            CKEDITOR.instances.editbox.setData(body);
        },
        error: function (data) {
            updateStatus("Couldn't find the requested file.");
            console.log(data);
        }
    });
})

$("#editcontact").click(function () {
    mode = 'contact';
    $.ajax({
        url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/contact.html',
        success: function (data) {
            $("#editdiv").toggle(true);
            $("#cke_editbox").toggle(true);
            $("#subjectbox").toggle(false);
            $("#bareeditbox").toggle(false);
            editsha = data.sha;
            var content = (atob(data.content));
            var body = content.substring(content.search("\n\n") + 2);
            CKEDITOR.instances.editbox.setData(body);
        },
        error: function (data) {
            updateStatus("Couldn't find the requested file.");
            console.log(data);
        }
    });
})

$("#newpost").click(function () {
    mode = 'new';
    $("#subjectbox").toggle(true);
    $("#bareeditbox").toggle(false);
    $("#cke_editbox").toggle(true);
    $("#subjectbox")[0].value = "";
    CKEDITOR.instances.editbox.setData('');
    $("#editdiv").toggle(true);
});

$("#cancel").click(function () {
    mode = undefined;
    $("#editdiv").toggle(false);
});

function editPost(postname) {
    window.scrollTo(0,0);
    mode = 'edit';
    $("#subjectbox").toggle(true);
    $("#bareeditbox").toggle(false);
    $("#cke_editbox").toggle(true);
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
            CKEDITOR.instances.editbox.setData(body);
        },
        error: function (data) {
            updateStatus("Couldn't find the requested file.");
            console.log(data);
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
                        console.log(data);
                    }
                });
            },
            error: function (data) {
                updateStatus("Couldn't find the requested file.");
                console.log(data);
            }
        });
    }
    
}

$("#submitedit").click(function () {
    if ($("#subjectbox")[0].value.match(/[|&;$%@"<>()+,#]/g)) {
        alert("Subject line may not contain any of the following characters:\n &;$%@\"<>()+,#");
        return;
    }

    if (mode == 'about') {
        var content = btoa("---\nlayout: null\norder: 3\nsection-type: about\ntitle: About\n---\n\n## About\n\n" + CKEDITOR.instances.editbox.getData());
        var putdata = {
            'message': 'Updated about',
            'content': content,
            'sha': editsha
        };
        $.ajax({
            headers: { Authorization: "Basic " + auth },
            url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/about.html',
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(putdata),
            success: function (data) {
                $("#statustext").html("Update successful.");
                $("#editdiv").toggle();
            },
            error: function (data) {
                $("#statustext").html("Update NOT successful. Something went wrong.");
                console.log(data);
            }
        });
    }

    else if (mode == 'contact') {
        var content = btoa("---\nlayout: null\norder: 4\nsection-type: contact\ntitle: Contact\n---\n\n## Contact\n\n" + CKEDITOR.instances.editbox.getData());
        var putdata = {
            'message': 'Updated contact',
            'content': content,
            'sha': editsha
        };
        $.ajax({
            headers: { Authorization: "Basic " + auth },
            url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/contact.html',
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(putdata),
            success: function (data) {
                $("#statustext").html("Update successful.");
                $("#editdiv").toggle();
            },
            error: function (data) {
                $("#statustext").html("Update NOT successful. Something went wrong.");
                console.log(data);
            }
        });
    }

    else if (mode == 'tour') {
        var content = btoa($("#bareeditbox")[0].value);
        var putdata = {
            'message': 'Updated tour',
            'content': content,
            'sha': editsha
        };
        $.ajax({
            headers: { Authorization: "Basic " + auth },
            url: 'https://api.github.com/repos/machineweb/machineweb.github.io/contents/_data/tour.yml',
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(putdata),
            success: function (data) {
                $("#statustext").html("Update successful.");
                $("#editdiv").toggle();
            },
            error: function (data) {
                $("#statustext").html("Update NOT successful. Something went wrong.");
                console.log(data);
            }
        });
    }

    else if (mode == 'edit') {
        var content = btoa("---\nlayout: post\nsection-type: post\ntitle: " + $("#subjectbox")[0].value + "\n---\n\n" + CKEDITOR.instances.editbox.getData());
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
                $("#statustext").html("Update NOT successful. Something went wrong.");
                console.log(data);
            }
        });
    }

    else if (mode == 'new') {
        var content = btoa("---\nlayout: post\nsection-type: post\ntitle: " + $("#subjectbox")[0].value + "\n---\n\n" + CKEDITOR.instances.editbox.getData());
        var thing = 'string';
        var postname = getFormattedDate() + "-" + $("#subjectbox")[0].value.toLowerCase().replace(/ |\n/g, "-") + ".md";
        postname = postname.replace(/[|&;$%@"<>()+,#]/g, "").replace(/-+/g, "-");
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
                $("#statustext").html("Post successful.");
                $("#editdiv").toggle();
            },
            error: function (data) {
                $("#statustext").html("Post NOT successful. Something went wrong.");
                console.log(data);
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
                console.log(data);
            }
        });
    });
    
    
});

function readFile(file, callback) {
    var reader = new FileReader();
    reader.onload = callback
    reader.readAsBinaryString(file);
}