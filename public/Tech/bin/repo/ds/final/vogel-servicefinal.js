export var aservicefinal = (f)=>{
    if(!f || f==undefined){
        f = {};
    }
    return {
        id: f.id || '', //Service Track Number
        repairs:f.repairs||[],
        savings:f.savings||0,
        monthlymem:f.monthlymem||0,
        total:f.total||0,
        contract:f.contract||{}
    }
}