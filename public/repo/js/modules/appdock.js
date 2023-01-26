export class AppDock{
    constructor(cont,apps){
        this.cont=this.CREATEdock(apps);
    }
    CREATEdock=(apps)=>{
        let appdock = document.createElement('div');
        appdock.id="vhc-app-dock";

        for(let app in apps){
            let appbox = document.createElement('div');
            appbox.classList.add('vhc-app');
            appbox.id = 'app-' + app;
            appbox.appendChild(document.createElement('img'));
            appbox.lastChild.src = './bin/repo/assets/icons/' + `${app}` + '.png';
            appbox.appendChild(document.createElement('div'));
            appbox.lastChild.innerText = app;
            let func = apps[app];
            appbox.addEventListener('click', (ele)=>{func();});
            appdock.appendChild(appbox);
        }
        return appdock;
    }

}
