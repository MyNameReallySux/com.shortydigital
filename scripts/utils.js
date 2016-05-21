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

String.prototype.isEquivalent = function(value){
    return this.toString() == value.singularize() || this.toString() == value.pluralize()
}
       
isSet = function(variable){
    return (typeof variable != undefined)
        && variable !== null 
        && variable != ''
        && variable != undefined;
}

String.prototype.splitBy = function(type){
    if(type.isEquivalent('word')){
        var words = this.split(" ");
        return words;
    } 
}

String.prototype.countBy = function(type){
    if(type.isEquivalent('word')){
        var count = this.split(" ");
        return count.length;
    } 
}

String.prototype.shortenBy = function(type, limit){
    if(type.isEquivalent('word')){
        var words = this.splitBy(type);
        if (words.length > limit) {
            var snippet = words.slice(0, limit)
            console.dir(snippet, logopts);
            snippet = snippet.join(" ");
            console.dir(snippet, logopts);
            snippet = snippet.trim() + " ...";
            console.dir(snippet, logopts);
            return snippet;
        } else {
            return words.join(" ");
        } 
        
    } 
}
       
logopts = {
    showHidden: true,
    depth: 2,
    colors: true
}

module.exports = this;