function loadScript(url, integrity='')
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = true;
    if(integrity !== '') script.integrity = integrity;
    script.crossOrigin = 'anonymous'
    head.appendChild(script);
}

function loadStyle(url, integrity)
{    
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    link.integrity = integrity;
    link.crossOrigin = 'anonymous'
    head.appendChild(link);
}

export default { loadScript, loadStyle }
