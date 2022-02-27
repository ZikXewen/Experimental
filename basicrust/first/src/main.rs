fn main() {
    let hello: Vec<i32> = (0..10).collect();

    fn print_len(vec: &Vec<i32>) {
        println!("{}", vec.len());
    }

    print_len(&hello);
}
