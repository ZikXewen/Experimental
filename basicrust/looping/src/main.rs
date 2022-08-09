fn main() {
    let mut loop_count = 1;

    loop {
        if loop_count > 10 {
            break;
        }
        println!("Loop: {}", loop_count);
        loop_count += 1;
    }

    loop_count = 1;

    while loop_count <= 10 {
        println!("While: {}", loop_count);
        loop_count += 1;
    }

    for i in 1..=10 {
        println!("For: {}", i);
    }

    let vec = vec!["Dog", "Cat", "Man"];

    for (idx, a) in vec.iter().enumerate() {
        println!("Iterate: {}, {}", idx, a);
    }

    'outer: for x in 0..10 {
        'inner: for y in 0..10 {
            if x % 2 == 0 {
                continue 'outer;
            }
            if y % 2 == 0 {
                continue 'inner;
            }
            println!("x: {}, y: {}", x, y);
        }
    }
}
