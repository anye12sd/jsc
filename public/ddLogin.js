;(function (window) {
    var DDLogin = function (a) {
      var e;
      var c = document.createElement('iframe');
      var d = a.goto;
      c.src = d;
      c.frameBorder = '0';
      c.allowTransparency = 'true';
      c.scrolling = 'no';
      c.width = a.width ? a.width + 'px' : '365px';
      c.height = a.height ? a.height + 'px' : '400px';
      e = document.getElementById(a.id);
      e.innerHTML = '';
      e.appendChild(c);
    };
    var d = function (params) {
      const ddOrigin = params.ddOrigin || 'https://login-pro.ding.zj.gov.cn';
      let url = encodeURIComponent(params.defaultPage + '/entry?clientId=' + params.clientId + '&version=2');
      if (params.redirectUri) {
        url = encodeURIComponent(params.defaultPage + '/entry?redirect_uri=' + params.redirectUri + '&clientId=' + params.clientId + '&version=2');
      }
      let goTo = `${ddOrigin}/oauth2/auth.htm?client_id=${params.appKey}&response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true&redirect_uri=${url}`;
      DDLogin({
        id: params.elementId,
        goto: goTo,
        style: 'border:none;background-color:transparent;margin-top: 0;',
        width: '220',
        height: '292',
      });
      let hanndleMessage = (event) => {
        let origin = event.origin;
        if (origin === ddOrigin) {
          let loginTmpCode = event.data;
          const entry = `${decodeURIComponent(url)}&code=${loginTmpCode.code}`;
          location.href = entry;
          window.event.returnValue = false;
        }
      };
      if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('message', hanndleMessage, false);
      } else if (typeof window.attachEvent !== 'undefined') {
        window.attachEvent('onmessage', hanndleMessage);
      }
    };
  
    window.HZScan = d;
  }(window));

  !function (window, document) {
    function d(a) {
        var e, c = document.createElement("iframe"),
            d = "https://login.dingtalk.com/login/qrcode.htm?goto=" + a.goto ;
        d += a.style ? "&style=" + encodeURIComponent(a.style) : "",
            d += a.href ? "&href=" + a.href : "",
            c.src = d,
            c.frameBorder = "0",
            c.allowTransparency = "true",
            c.scrolling = "no",
            c.width =  a.width ? a.width + 'px' : "365px",
            c.height = a.height ? a.height + 'px' : "400px",
            e = document.getElementById(a.id),
            e.innerHTML = "",
            e.appendChild(c)
    }
    window.DDLogin = d
}(window, document);