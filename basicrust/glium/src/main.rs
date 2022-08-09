#[macro_use]
extern crate glium;

#[path = "teapot.rs"]
mod teapot;

fn main() {
    use glium::{glutin, Surface};
    let wb = glutin::window::WindowBuilder::new().with_title("Hey");
    let event_loop = glutin::event_loop::EventLoop::new();
    let display = glium::Display::new(wb, glutin::ContextBuilder::new(), &event_loop).unwrap();

    let positions = glium::VertexBuffer::new(&display, &teapot::VERTICES).unwrap();
    let normals = glium::VertexBuffer::new(&display, &teapot::NORMALS).unwrap();
    let indices = glium::IndexBuffer::new(
        &display,
        glium::index::PrimitiveType::TrianglesList,
        &teapot::INDICES,
    )
    .unwrap();

    let vertex_shader = r#"
        #version 140
        in vec3 position;
        in vec3 normal;

        uniform mat4 matrix;

        void main(){
            gl_Position = matrix * vec4(position, 1.0);
        }
    "#;
    let fragment_shader = r#"
        #version 140
        out vec4 color;

        void main(){
            color = vec4(1.0, 0.0, 0.0, 1.0);
        }
    "#;

    let program =
        glium::Program::from_source(&display, vertex_shader, fragment_shader, None).unwrap();

    event_loop.run(move |event, _, control_flow| {
        let next_frame_time =
            std::time::Instant::now() + std::time::Duration::from_nanos(16_666_667);
        *control_flow = glutin::event_loop::ControlFlow::WaitUntil(next_frame_time);

        match event {
            glutin::event::Event::WindowEvent { event, .. } => match event {
                glutin::event::WindowEvent::CloseRequested => {
                    *control_flow = glutin::event_loop::ControlFlow::Exit;
                    return;
                }
                _ => return,
            },
            glutin::event::Event::NewEvents(cause) => match cause {
                glutin::event::StartCause::ResumeTimeReached { .. } => (),
                glutin::event::StartCause::Init => (),
                _ => return,
            },
            _ => return,
        }

        let mut frame = display.draw();
        frame.clear_color(0.0, 0.0, 1.0, 1.0);
        frame
            .draw(
                (&positions, &normals),
                &indices,
                &program,
                &uniform! {
                matrix: [
                    [0.01, 0.0, 0.0, 0.0],
                    [0.0, 0.01, 0.0, 0.0],
                    [0.0, 0.0, 0.01, 0.0],
                    [0.0, 0.0, 0.0, 1.0f32]
                ]},
                &Default::default(),
            )
            .unwrap();
        frame.finish().unwrap();
    })
}
