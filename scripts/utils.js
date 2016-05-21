String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



String.prototype.singularize = function(){
    if(this.charAt(this.length - 1) == 's') {
        return this.slice(0, this.length - 1);
    }
}

String.prototype.pluralize = function(){
    if(this.charAt(this.length - 1) != 's') {
        return this + 's';
    }
}
       
isSet = function(variable){
    return (typeof variable != undefined)
        && variable !== null 
        && variable != ''
        && variable != undefined;
}
       
logopts = {
    showHidden: true,
    depth: 2,
    colors: true
}

module.exports = this;