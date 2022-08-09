extern crate glfw;

use glfw::Context;

fn main() {
    let mut glfw = glfw::init(glfw::FAIL_ON_ERRORS).expect("GLFW Failed to initialize.");
    // glfw.default_window_hints();
    let (mut window, events) = glfw
        .create_window(300, 300, "Hello Window", glfw::WindowMode::Windowed)
        .expect("Failed to create window.");
    window.make_current();
    window.set_key_polling(true);
    while !window.should_close() {
        window.swap_buffers();
        glfw.poll_events();
        for (_, event) in glfw::flush_messages(&events) {
            println!("{:?}", event);
            if let glfw::WindowEvent::Key(glfw::Key::Escape, _, glfw::Action::Press, _) = event {
                window.set_should_close(true);
            }
        }
    }
}
