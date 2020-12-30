//variables

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

//func

type Addfunc = (x: number, y: number) => number;
const add: Addfunc = (x: number, y: number) => x + y;
const add2 = (nums: {a: number, b: number}) => nums.a + nums.b;

console.log(add(21, obj.x));

//union

let maybeNum: number | string = 5;
maybeNum = "boi";

interface Dog{
    bark: string;
}
interface Cat{
    purr: string;
}
type DogCat = Dog & Cat | number;
let dogCat: DogCat = {
    bark: "bark!",
    purr: "purr!"
}
dogCat = 5;

if(typeof dogCat === "string"){
    console.log("it's a string bro");
} else {
    console.log("it ain't no string bro");
}

//casting

console.log(add(dogCat as number, dogCat as any));

//any

const printf = (x: any) => {
    console.log(x);
}
printf(5);