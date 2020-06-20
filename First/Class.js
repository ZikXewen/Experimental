function Person(first, last){
    this.first = first;
    this.last = last;

    this.full = function(){
        return this.first + " " + this.last;
    }
} //Uses function as class -> built in constructor
myPerson = new Person("John", "Wick");
console.log(myPerson.full());