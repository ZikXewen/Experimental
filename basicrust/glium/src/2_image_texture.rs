#[macro_use]
extern crate glium;

fn main() {
    use glium::{glutin, Surface};
    use std::io::Cursor;
    let event_loop = glutin::event_loop::EventLoop::new();
    let wb = glutin::window::WindowBuilder::new().with_title("My title");
    let cb = glutin::ContextBuilder::new();
    let display = glium::Display::new(wb, cb, &event_loop).unwrap();
    let image = image::load(
        Cursor::new(&include_bytes!("image.png")),
        image::ImageFormat::Png,
    )
    .unwrap()
    .to_rgba8();
    let dim = image.dimensions();
    let texture = glium::texture::SrgbTexture2d::new(
        &display,
        glium::texture::RawImage2d::from_raw_rgba_reversed(&image.into_raw(), dim),
    )
    .unwrap();

    #[derive(Copy, Clone)]
    struct Vertex {
        position: [f32; 2],
        tex_coords: [f32; 2],
    }
    implement_vertex!(Vertex, position, tex_coords);

    let shape = vec![
        Vertex {
            position: [-0.5, -0.5],
            tex_coords: [0.0, 0.0],
        },
        Vertex {
            position: [0.0, 0.5],
            tex_coords: [0.0, 1.0],
        },
        Vertex {
            position: [0.5, -0.25],
            tex_coords: [1.0, 0.0],
        },
    ];
    let vertex_buffer = glium::VertexBuffer::new(&display, &shape).unwrap();
    let indices = glium::index::NoIndices(glium::index::PrimitiveType::TrianglesList);

    let vertex_shader_src = r#"
        #version 140    
        in vec2 position;
        in vec2 tex_coords;
        out vec2 v_tex_coords;

        uniform mat4 matrix;

        void main() {
            v_tex_coords = tex_coords;
            gl_Position = matrix * vec4(position, 0.0, 1.0);
        }
    "#;
    let fragment_shader_src = r#"
        #version 140
        in vec2 v_tex_coords;
        out vec4 color;

        uniform sampler2D tex;

        void main() {
            color = texture(tex, v_tex_coords);
        }
    "#;
    let program =
        glium::Program::from_source(&display, vertex_shader_src, fragment_shader_src, None)
            .unwrap();
    let mut t: f32 = -0.5;

    event_loop.run(move |ev, _, control_flow| {
        match ev {
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

        let next_frame_time =
            std::time::Instant::now() + std::time::Duration::from_nanos(16_666_667);
        *control_flow = glutin::event_loop::ControlFlow::WaitUntil(next_frame_time);

        t += 0.002;
        if t > 0.5 {
            t = -0.5
        }

        let mut frame = display.draw();
        frame.clear_color(0.0, 0.0, 1.0, 1.0);
        frame
            .draw(
                &vertex_buffer,
                &indices,
                &program,
                // &glium::uniforms::EmptyUniforms,
                // &uniform! { t: t },
                &uniform! {matrix: [
                    [t.cos(), t.sin(), 0.0, 0.0],
                    [-t.sin(), t.cos(), 0.0, 0.0],
                    [0.0, 0.0, 0.0, 0.0],
                    [t, 0.0, 0.0, 1.0]
                ], tex: &texture},
                &Default::default(),
            )
            .unwrap();
        frame.finish().unwrap();
    })
}
