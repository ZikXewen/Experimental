const bob = "hey I'm bob";
console.log(bob);

interface MyObj{
    x: number;
    y: number;
    z?: number;
}
const obj: MyObj = {
    x: 5.32,
    y: 7
};
const obj2: MyObj = {
    x: 3,
    y: 2.22
};
console.log(obj);

obj2.z = 123;
console.log(obj2.z);

type Addfunc = (x: number, y: number) => number;
const add: Addfunc = (x: number, y: number) => x + y;

console.log(add(21, obj.x));