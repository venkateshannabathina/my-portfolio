const vertexShader = `
attribute vec2 aPosition;
varying vec2 vUV;

void main() {
  vUV = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShader = `
precision mediump float;
varying vec2 vUV;
uniform sampler2D uMedia;
uniform float uAspect;
uniform float uMediaAspect;
uniform float uBox;
uniform float uPhoto;
uniform float uTime;
uniform vec3 uPointer;

void main() {
  vec2 scale = vec2(uAspect, 1.0);
  vec2 point = (vUV * 2.0 - 1.0) * scale;
  vec2 pointer = (uPointer.xy * 2.0 - 1.0) * scale;
  vec2 offset = point - pointer;
  float pointerDistance = length(offset);
  float touch = exp(-pointerDistance * pointerDistance * 4.5) * uPointer.z;
  float t = uTime * 0.72;

  vec2 warped = point + vec2(
    sin(point.y * 3.4 + t) * 0.058 + cos(point.x * 3.1 - t * 0.8) * 0.025,
    sin(point.x * 2.4 - t * 1.1) * 0.072 + sin(point.y * 3.8 + t * 0.65) * 0.025
  );
  warped += offset * touch * 0.23 * sin(pointerDistance * 13.0 - t * 3.0);

  float radius = 0.78;
  float edge = length(point) - radius;
  vec2 radial = normalize(point + vec2(0.0001));
  vec2 mediaSize = vec2(radius * 1.15);
  vec2 photoSize = mediaSize;
  if (uBox > 0.5) {
    vec2 bounds = vec2(uAspect * 0.90, 0.80);
    float corner = 0.40;
    vec2 q = abs(warped) - bounds + corner;
    edge = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - corner;
    vec2 axis = q.x > q.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    radial = normalize(sign(warped + 0.0001) * (max(q, 0.0) + axis * 0.001));
    mediaSize = max(bounds.x / uMediaAspect, bounds.y) * vec2(uMediaAspect, 1.0) * 1.12;
    photoSize = min(bounds.x / uMediaAspect, bounds.y) * vec2(uMediaAspect, 1.0) * 0.96;
  }

  float inside = 1.0 - smoothstep(-0.012, 0.009, edge);
  float glass = exp(-abs(edge + 0.055) * 8.5);
  vec2 ripple = offset * touch * 0.035 * sin(pointerDistance * 16.0 - t * 4.0);
  vec2 mediaPoint = warped - radial * glass * 0.11;
  vec2 uv = 0.5 + mediaPoint / (2.0 * mediaSize) + ripple;
  vec2 split = radial * (0.002 + 0.013 * glass + 0.012 * touch);

  vec3 color = vec3(
    texture2D(uMedia, uv + split).r,
    texture2D(uMedia, uv).g,
    texture2D(uMedia, uv - split).b
  );
  if (uPhoto > 0.5) {
    vec2 photoUV = 0.5 + mediaPoint / (2.0 * photoSize) + ripple;
    vec2 border = min(photoUV, 1.0 - photoUV);
    float foreground = smoothstep(-0.01, 0.05, min(border.x, border.y));
    vec3 photo = texture2D(uMedia, photoUV).rgb;
    vec2 blur = vec2(0.10, 0.12);
    vec3 backdrop = (
      color + texture2D(uMedia, uv + blur).rgb + texture2D(uMedia, uv - blur).rgb
      + texture2D(uMedia, uv + vec2(-blur.x, blur.y)).rgb
      + texture2D(uMedia, uv + vec2(blur.x, -blur.y)).rgb
    ) * 0.14;
    color = mix(backdrop, photo, foreground);
  }
  vec3 amber = vec3(1.0, 0.72, 0.41);
  vec3 violet = vec3(0.68, 0.69, 1.0);
  float tint = smoothstep(-0.8, 0.9, dot(radial, vec2(0.63, -0.55)));
  vec3 halo = mix(amber, violet, tint * 0.67);

  float rim = exp(-abs(edge + 0.01) * 45.0);
  float reflection = 0.34 + 0.66 * pow(max(dot(radial, vec2(-0.55, 0.83)), 0.0), 2.0);
  color = mix(color, halo, glass * 0.16);
  color = mix(color, vec3(1.0, 0.98, 0.91), rim * (0.36 + reflection * 0.50 + touch * 0.12));

  float outer = exp(-max(edge, 0.0) * 10.5) * (0.40 + 0.10 * touch);
  gl_FragColor = vec4(mix(halo, color, inside), max(inside, outer));
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

function createRenderer(canvas) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
  if (!gl) return null;

  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  return {
    gl,
    aspect: gl.getUniformLocation(program, 'uAspect'),
    mediaAspect: gl.getUniformLocation(program, 'uMediaAspect'),
    box: gl.getUniformLocation(program, 'uBox'),
    photo: gl.getUniformLocation(program, 'uPhoto'),
    time: gl.getUniformLocation(program, 'uTime'),
    pointer: gl.getUniformLocation(program, 'uPointer'),
  };
}

export function setupMediaPortal(portal, reducedMotion, { box = false, getPhoto } = {}) {
  const canvas = portal.querySelector('canvas');
  const video = portal.querySelector('video');
  const pointer = { x: 0.5, y: 0.5, strength: 0 };
  let influence = 0;
  let renderer;
  let visible = false;
  let frame = 0;
  let lastPaint = 0;
  let lastMedia;
  let lastVideoTime = -1;

  function draw(now) {
    frame = requestAnimationFrame(draw);
    if (now - lastPaint < 30) return;
    const media = video ?? getPhoto?.();
    if (!media || (video ? video.readyState < 2 : !media.complete || !media.naturalWidth)) return;
    lastPaint = now;

    const { gl, aspect, mediaAspect, box: boxUniform, photo, time, pointer: pointerUniform } = renderer;
    const scale = Math.min(devicePixelRatio, 1.5);
    const width = Math.round(canvas.clientWidth * scale);
    const height = Math.round(canvas.clientHeight * scale);
    if (!width || !height) return;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    if (lastMedia !== media || (video && lastVideoTime !== video.currentTime)) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, media);
      lastMedia = media;
      lastVideoTime = video?.currentTime;
    }
    influence += (pointer.strength - influence) * 0.19;
    gl.uniform1f(aspect, width / height);
    gl.uniform1f(mediaAspect, video ? video.videoWidth / video.videoHeight : media.naturalWidth / media.naturalHeight);
    gl.uniform1f(boxUniform, Number(box));
    gl.uniform1f(photo, Number(!video));
    gl.uniform1f(time, now / 1000);
    gl.uniform3f(pointerUniform, pointer.x, pointer.y, influence);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    portal.classList.add('is-rendered');
  }

  function updatePlayback() {
    const shouldPlay = visible && !portal.hidden && !document.hidden && !reducedMotion.matches;
    if (!shouldPlay) {
      cancelAnimationFrame(frame);
      frame = 0;
      video?.pause();
      if (reducedMotion.matches) portal.classList.remove('is-rendered');
      return;
    }
    if (video) video.play().catch(() => {});
    if (renderer === undefined) renderer = createRenderer(canvas);
    if (renderer && !frame) frame = requestAnimationFrame(draw);
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  }).observe(portal);
  reducedMotion.addEventListener('change', updatePlayback);
  document.addEventListener('visibilitychange', updatePlayback);

  portal.addEventListener('pointermove', event => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = (event.clientX - bounds.left) / bounds.width;
    pointer.y = 1 - (event.clientY - bounds.top) / bounds.height;
    pointer.strength = 1;
  });
  portal.addEventListener('pointerleave', () => { pointer.strength = 0; });

  canvas.addEventListener('webglcontextlost', () => {
    renderer = null;
    cancelAnimationFrame(frame);
    frame = 0;
    portal.classList.remove('is-rendered');
  });

  return updatePlayback;
}
