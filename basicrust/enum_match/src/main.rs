enum Direction {
    Up,
    Down,
    Left,
    Right,
}
fn direction_to_string(direction: &Direction) -> &str {
    match direction {
        Direction::Up => "Heading up.",
        Direction::Down => "Goin' down.",
        Direction::Left => "Far left.",
        Direction::Right => "Turning right.",
    }
}
struct Pattern {
    red: (Direction, Direction),
    green: (Direction, Direction),
    blue: (Direction, Direction),
}
struct Triplet(Direction, Direction, Direction);
fn main() {
    let player_direction = Pattern {
        red: (Direction::Right, Direction::Up),
        green: (Direction::Left, Direction::Down),
        blue: (Direction::Up, Direction::Up),
    };
    let triplet_direction = Triplet(Direction::Up, Direction::Down, Direction::Right);
    println!("{}", direction_to_string(&player_direction.red.0));
    println!("{}", direction_to_string(&player_direction.green.0));
    println!("{}", direction_to_string(&player_direction.blue.1));
    println!("{}", direction_to_string(&triplet_direction.2))
}
