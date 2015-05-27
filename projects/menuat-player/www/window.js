chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
    }
});

function useToken(userid) {
    var checkReset = setInterval(function() {
        $.getJSON('http://menuat.com/menuat/' + userid, function(doc) {
            if ( typeof doc.reset !== 'undefined' ) {
                if ( doc.reset > 0 ) {
                    $.ajax({
                        url: 'http://menuat.com/_update/poll/' + userid,
                        type: 'POST',
                        data: JSON.parse('{"reset": 0}'),
                        success: function (data) {
                            chrome.runtime.reload();
                        },
                        error: function(status) {}
                    });
                }
            }
        });
    }, 30000);

    $.getJSON('http://menuat.com/menuat/' + userid, function(doc) {
        if ( typeof doc.url !== 'undefined' ) {
            if (doc.url.indexOf('sssp') == -1) {
                makeFrame(doc.url);
            }
            else {
                document.body.innerHTML = '<div class="message"><h1>Device: ' + userid + '</h1><p>Please set your device id in your admin console.</p></div>';
            }
            if ( typeof doc.orientation !== 'undefined' ) {
                document.body.className = doc.orientation;
            }
        }
        else {
            document.body.innerHTML = '<div class="message"><h1>Device: ' + userid + '</h1><p>Please check your admin console url is set or call Menuat at <strong>904.495.0616</strong> or by email at support@menuat.com to reset your configuration.</p></div>';
        }
        }).error(function() {
            // create empty config doc from template and send me an email
            $.ajax({
                url: 'http://menuat.com/_update/new_client/android',
                type: 'POST',
                data: JSON.parse('{"uid": "'+userid+'"}'),
                success: function (data) {
                    document.body.innerHTML = '<div class="message"><h1>Device: ' + userid + '</h1><p>Please set your device id in your admin console.</p></div>';
                },
                error: function(status) {
                    document.body.innerHTML = '<div class="message"><h1>Device issue</h1><p>There was an issue setting your device id, please call Menuat, <strong>904.495.0616</strong> or by email at support@menuat.com.</p></div>';
                }
            });
            document.body.innerHTML = '<div class="message"><h1>Device issue</h1><p>There was an issue setting your device id, please call Menuat, <strong>904.495.0616</strong> or by email at support@menuat.com.</p></div>';
    });
}

function makeFrame(url) {
    var ifrm = document.createElement("iframe"); 
    ifrm.setAttribute("src", url);
    document.body.appendChild(ifrm);
}

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(5);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}