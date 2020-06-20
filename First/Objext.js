var person = {
    name : "John"
};
function printname(){
    console.log(this.name);
}

var bound = printname.bind(person);
bound();
// equals
printname.call(person);