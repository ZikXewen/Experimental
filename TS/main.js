var bob = "hey I'm bob";
console.log(bob);
var obj = {
    x: 5.32,
    y: 7
};
var obj2 = {
    x: 3,
    y: 2.22
};
console.log(obj);
obj2.z = 123;
console.log(obj2.z);
var add = function (x, y) { return x + y; };
console.log(add(21, obj.x));
