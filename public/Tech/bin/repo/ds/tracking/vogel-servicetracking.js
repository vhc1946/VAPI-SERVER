export var aservicetrack = (t)=>{
    if(!t || t==undefined){
        t = {};
    }
    console.log(t)
    return {
        id: t.id || '', //Service Track Number
        tech: t.tech || '',
        presented: t.presented || false, //Presentation clicked bool
        sold: t.sold || false, //Ticket sold bool
        emailed: t.emailed || false, //Invoice emailed bool
        downloaded: t.downloaded || false, //Invoice downloaded to device bool
    }
}
