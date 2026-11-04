import{t as e}from"./shaderStore-D-XQlhUT.js";import"./mainUVVaryingDeclaration-B_7d0nc3.js";var t=`oitDeclaration`,n=`#ifdef ORDER_INDEPENDENT_TRANSPARENCY
#define MAX_DEPTH 99999.0
var oitDepthSamplerSampler: sampler;var oitDepthSampler: texture_2d<f32>;var oitFrontColorSamplerSampler: sampler;var oitFrontColorSampler: texture_2d<f32>;
#endif
`;e.IncludesShadersStoreWGSL[t]||(e.IncludesShadersStoreWGSL[t]=n);var ee={name:t,shader:n},r=`pbrFragmentExtraDeclaration`,i=`varying vPositionW: vec3f;
#if DEBUGMODE>0
varying vClipSpacePosition: vec4f;
#endif
#include<mainUVVaryingDeclaration>[1..7]
#ifdef NORMAL
varying vNormalW: vec3f;
#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
varying vEnvironmentIrradiance: vec3f;
#endif
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vColor: vec4f;
#endif
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
varying vViewDepth: f32;
#endif
`;e.IncludesShadersStoreWGSL[r]||(e.IncludesShadersStoreWGSL[r]=i);var a={name:r,shader:i},o=`lightUboDeclaration`,s=`#ifdef LIGHT{X}
struct Light{X}
{vLightData: vec4f,
vLightDiffuse: vec4f,
vLightSpecular: vec4f,
#ifdef SPOTLIGHT{X}
vLightDirection: vec4f,
vLightFalloff: vec4f,
#elif defined(POINTLIGHT{X})
vLightFalloff: vec4f,
#elif defined(HEMILIGHT{X})
vLightGround: vec3f,
#elif defined(CLUSTLIGHT{X})
vSliceData: vec2f,
vSliceRanges: array<vec4f,CLUSTLIGHT_SLICES>,
#endif
#if defined(AREALIGHT{X}) && defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
vLightWidth: vec4f,
vLightHeight: vec4f,
#endif
shadowsInfo: vec4f,
depthValues: vec2f} ;var<uniform> light{X} : Light{X};
#ifdef IESLIGHTTEXTURE{X}
var iesLightTexture{X}Sampler: sampler;var iesLightTexture{X}: texture_2d<f32>;
#endif
#ifdef RECTAREALIGHTEMISSIONTEXTURE{X}
var rectAreaLightEmissionTexture{X}Sampler: sampler;var rectAreaLightEmissionTexture{X}: texture_2d<f32>;
#endif
#ifdef PROJECTEDLIGHTTEXTURE{X}
uniform textureProjectionMatrix{X}: mat4x4f;var projectionLightTexture{X}Sampler: sampler;var projectionLightTexture{X}: texture_2d<f32>;
#endif
#ifdef CLUSTLIGHT{X}
var lightDataTexture{X}: texture_2d<f32>;var<storage,read> tileMaskBuffer{X}: array<u32>;
#endif
#ifdef SHADOW{X}
#ifdef SHADOWCSM{X}
#ifdef SHADOWCSMUBO{X}
struct Cascades{X} {viewFrustumZ: vec4f,
frustumLengths: vec4f,
cascadeBlendFactor: f32,
penumbraDarkness: f32,
depthCorrection: vec4f,
lightSizeUVCorrection: array<vec4f,4>,
lightMatrix: array<mat4x4f,SHADOWCSMNUM_CASCADES{X}>,};var<uniform> cascades{X} : Cascades{X};
#else
uniform lightMatrix{X}: array<mat4x4f,SHADOWCSMNUM_CASCADES{X}>;uniform viewFrustumZ{X}: array<f32,SHADOWCSMNUM_CASCADES{X}>;uniform frustumLengths{X}: array<f32,SHADOWCSMNUM_CASCADES{X}>;uniform cascadeBlendFactor{X}: f32;
#endif
varying vPositionFromLight{X}_0: vec4f;varying vDepthMetric{X}_0: f32;varying vPositionFromLight{X}_1: vec4f;varying vDepthMetric{X}_1: f32;varying vPositionFromLight{X}_2: vec4f;varying vDepthMetric{X}_2: f32;varying vPositionFromLight{X}_3: vec4f;varying vDepthMetric{X}_3: f32;varying vPositionFromCamera{X}: vec4f;var<private> vPositionFromLight{X}: array<vec4f,4>;var<private> vDepthMetric{X} : array<f32,4>;
#if defined(SHADOWPCSS{X})
var shadowTexture{X}Sampler: sampler_comparison; 
var shadowTexture{X}: texture_depth_2d_array;var depthTexture{X}Sampler: sampler;var depthTexture{X}: texture_2d_array<f32>;
#ifndef SHADOWCSMUBO{X}
uniform lightSizeUVCorrection{X}: array<vec2f,SHADOWCSMNUM_CASCADES{X}>;uniform depthCorrection{X}: array<f32,SHADOWCSMNUM_CASCADES{X}>;uniform penumbraDarkness{X}: f32;
#endif
#elif defined(SHADOWPCF{X})
var shadowTexture{X}Sampler: sampler_comparison;var shadowTexture{X}: texture_depth_2d_array;
#else
var shadowTexture{X}Sampler: sampler; 
var shadowTexture{X}: texture_2d_array<f32>;
#endif
#ifdef SHADOWCSMDEBUG{X}
const vCascadeColorsMultiplier{X}: array<vec3f,8>=array<vec3f,8>
(
vec3f ( 1.5,0.0,0.0 ),
vec3f ( 0.0,1.5,0.0 ),
vec3f ( 0.0,0.0,5.5 ),
vec3f ( 1.5,0.0,5.5 ),
vec3f ( 1.5,1.5,0.0 ),
vec3f ( 1.0,1.0,1.0 ),
vec3f ( 0.0,1.0,5.5 ),
vec3f ( 0.5,3.5,0.75 )
);
#endif
#elif defined(SHADOWCUBE{X})
var shadowTexture{X}Sampler: sampler;var shadowTexture{X}: texture_cube<f32>;
#else
varying vPositionFromLight{X}: vec4f;varying vDepthMetric{X}: f32;
#if defined(SHADOWPCSS{X})
var shadowTexture{X}Sampler: sampler_comparison; 
var shadowTexture{X}: texture_depth_2d;var depthTexture{X}Sampler: sampler; 
var depthTexture{X}: texture_2d<f32>;
#elif defined(SHADOWPCF{X})
var shadowTexture{X}Sampler: sampler_comparison;var shadowTexture{X}: texture_depth_2d;
#else
var shadowTexture{X}Sampler: sampler; 
var shadowTexture{X}: texture_2d<f32>;
#endif
uniform lightMatrix{X}: mat4x4f;
#endif
#endif
#endif
`;e.IncludesShadersStoreWGSL[o]||(e.IncludesShadersStoreWGSL[o]=s);var te={name:o,shader:s},c=`textureRepetitionFunctions`,l=`#if TEXTURE_REPETITION_MODE>0
fn _texRepHash4(p: vec2f)->vec4f {return fract(sin(vec4f(
1.0+dot(p,vec2f(37.0,17.0)),
2.0+dot(p,vec2f(11.0,47.0)),
3.0+dot(p,vec2f(41.0,29.0)),
4.0+dot(p,vec2f(23.0,31.0))
))*103.0);}
#endif
#if TEXTURE_REPETITION_MODE==1
fn _texRepSample(tex: texture_2d<f32>,samp: sampler,uv: vec2f)->vec4f {var k: f32=textureSample(tex,samp,0.005*uv).x;var index: f32=k*8.0;var f: f32=fract(index);var i: f32=floor(index+0.5);var ib: f32=floor(index);f=min(f,1.0-f)*2.0;var offa: vec2f=sin(vec2f(3.0,7.0)*i);var offb: vec2f=sin(vec2f(3.0,7.0)*ib);var dx: vec2f=dpdx(uv);var dy: vec2f=dpdy(uv);var cola: vec4f=textureSampleGrad(tex,samp,uv+0.3*offa,dx,dy);var colb: vec4f=textureSampleGrad(tex,samp,uv+0.3*offb,dx,dy);var colSum: f32=cola.x+cola.y+cola.z-colb.x-colb.y-colb.z;return mix(cola,colb,vec4f(smoothstep(0.2,0.8,f-0.1*colSum)));}
#elif TEXTURE_REPETITION_MODE==2
fn _texRepHexHash(p: vec2f)->vec2f {var r: vec2f=mat2x2f(127.1,269.5,311.7,183.3)*p;return fract(sin(r)*43758.5453);}
struct _TexRepTriGrid {w1: f32,
w2: f32,
w3: f32,
vertex1: vec2i,
vertex2: vec2i,
vertex3: vec2i,};fn _texRepTriangleGrid(st_in: vec2f)->_TexRepTriGrid {var st: vec2f=st_in*2.0*sqrt(3.0);var gridToSkewedGrid: mat2x2f=mat2x2f(1.0,0.0,-0.57735027,1.15470054);var skewedCoord: vec2f=gridToSkewedGrid*st;var baseId: vec2i=vec2i(floor(skewedCoord));var temp: vec3f=vec3f(fract(skewedCoord),0.0);temp.z=1.0-temp.x-temp.y;var s: f32=step(0.0,-temp.z);var s2: f32=2.0*s-1.0;var result: _TexRepTriGrid;result.w1=-temp.z*s2;result.w2=s-temp.y*s2;result.w3=s-temp.x*s2;result.vertex1=baseId+vec2i(i32(s),i32(s));result.vertex2=baseId+vec2i(i32(s),i32(1.0-s));result.vertex3=baseId+vec2i(i32(1.0-s),i32(s));return result;}
fn _texRepMakeCenST(Vertex: vec2i)->vec2f {var invSkewMat: mat2x2f=mat2x2f(1.0,0.0,0.5,1.0/1.15470054);return (invSkewMat*vec2f(Vertex))/(2.0*sqrt(3.0));}
fn _texRepLoadRot2x2(idx: vec2i,rotStr: f32)->mat2x2f {var angle: f32=f32(abs(idx.x*idx.y)+abs(idx.x+idx.y))+3.14159265358979;angle=angle % (2.0*3.14159265358979);if (angle<0.0) { angle+=2.0*3.14159265358979; }
if (angle>3.14159265358979) { angle-=3.14159265358979; }
angle*=rotStr;var cs: f32=cos(angle);var si: f32=sin(angle);return mat2x2f(cs,si,-si,cs);}
fn _texRepGain3(x: vec3f,r: f32)->vec3f {var k: f32=log(1.0-r)/log(0.5);var s: vec3f=2.0*step(vec3f(0.5),x);var m: vec3f=2.0*(1.0-s);var res: vec3f=0.5*s+0.25*m*pow(max(vec3f(0.0),s+x*m),vec3f(k));return res/(res.x+res.y+res.z);}
fn _texRepSample(tex: texture_2d<f32>,samp: sampler,uv: vec2f)->vec4f {var rotStrength: f32=uniforms.vTextureRepetitionHexTilingParams.x;var fallOffContrast: f32=uniforms.vTextureRepetitionHexTilingParams.y;var expVal: f32=uniforms.vTextureRepetitionHexTilingParams.z;var r: f32=uniforms.vTextureRepetitionHexTilingParams.w;var dSTdx: vec2f=dpdx(uv);var dSTdy: vec2f=dpdy(uv);var grid: _TexRepTriGrid=_texRepTriangleGrid(uv);var rot1: mat2x2f=_texRepLoadRot2x2(grid.vertex1,rotStrength);var rot2: mat2x2f=_texRepLoadRot2x2(grid.vertex2,rotStrength);var rot3: mat2x2f=_texRepLoadRot2x2(grid.vertex3,rotStrength);var cen1: vec2f=_texRepMakeCenST(grid.vertex1);var cen2: vec2f=_texRepMakeCenST(grid.vertex2);var cen3: vec2f=_texRepMakeCenST(grid.vertex3);var st1: vec2f=(uv-cen1)*rot1+cen1+_texRepHexHash(vec2f(grid.vertex1));var st2: vec2f=(uv-cen2)*rot2+cen2+_texRepHexHash(vec2f(grid.vertex2));var st3: vec2f=(uv-cen3)*rot3+cen3+_texRepHexHash(vec2f(grid.vertex3));var c1: vec4f=textureSampleGrad(tex,samp,st1,dSTdx*rot1,dSTdy*rot1);var c2: vec4f=textureSampleGrad(tex,samp,st2,dSTdx*rot2,dSTdy*rot2);var c3: vec4f=textureSampleGrad(tex,samp,st3,dSTdx*rot3,dSTdy*rot3);var Lw: vec3f=vec3f(0.299,0.587,0.114);var Dw: vec3f=vec3f(dot(c1.rgb,Lw),dot(c2.rgb,Lw),dot(c3.rgb,Lw));Dw=mix(vec3f(1.0),Dw,fallOffContrast);var W: vec3f=Dw*pow(vec3f(grid.w1,grid.w2,grid.w3),vec3f(expVal));W=W/(W.x+W.y+W.z);if (r != 0.5) {W=_texRepGain3(W,r);}
return W.x*c1+W.y*c2+W.z*c3;}
#elif TEXTURE_REPETITION_MODE==3
fn _texRepSample(tex: texture_2d<f32>,samp: sampler,uv: vec2f)->vec4f {var iuv: vec2f=floor(uv);var fuv: vec2f=fract(uv);var ofa: vec4f=_texRepHash4(iuv+vec2f(0.0,0.0));var ofb: vec4f=_texRepHash4(iuv+vec2f(1.0,0.0));var ofc: vec4f=_texRepHash4(iuv+vec2f(0.0,1.0));var ofd: vec4f=_texRepHash4(iuv+vec2f(1.0,1.0));var dx: vec2f=dpdx(uv);var dy: vec2f=dpdy(uv);ofa=vec4f(ofa.xy,sign(ofa.zw-0.5));ofb=vec4f(ofb.xy,sign(ofb.zw-0.5));ofc=vec4f(ofc.xy,sign(ofc.zw-0.5));ofd=vec4f(ofd.xy,sign(ofd.zw-0.5));var uva: vec2f=uv*ofa.zw+ofa.xy; var ddxa: vec2f=dx*ofa.zw; var ddya: vec2f=dy*ofa.zw;var uvb: vec2f=uv*ofb.zw+ofb.xy; var ddxb: vec2f=dx*ofb.zw; var ddyb: vec2f=dy*ofb.zw;var uvc: vec2f=uv*ofc.zw+ofc.xy; var ddxc: vec2f=dx*ofc.zw; var ddyc: vec2f=dy*ofc.zw;var uvd: vec2f=uv*ofd.zw+ofd.xy; var ddxd: vec2f=dx*ofd.zw; var ddyd: vec2f=dy*ofd.zw;var b: vec2f=smoothstep(vec2f(0.25),vec2f(0.75),fuv);return mix(
mix(textureSampleGrad(tex,samp,uva,ddxa,ddya),textureSampleGrad(tex,samp,uvb,ddxb,ddyb),b.x),
mix(textureSampleGrad(tex,samp,uvc,ddxc,ddyc),textureSampleGrad(tex,samp,uvd,ddxd,ddyd),b.x),
b.y
);}
#elif TEXTURE_REPETITION_MODE==4
fn _texRepSample(tex: texture_2d<f32>,samp: sampler,uv: vec2f)->vec4f {var p: vec2f=floor(uv);var f: vec2f=fract(uv);var dx: vec2f=dpdx(uv);var dy: vec2f=dpdy(uv);var va: vec4f=vec4f(0.0);var wt: f32=0.0;var w2: f32=0.0;for (var j: i32=-1; j<=1; j++) {for (var i: i32=-1; i<=1; i++) {var g: vec2f=vec2f(f32(i),f32(j));var o: vec4f=_texRepHash4(p+g);var r: vec2f=g-f+o.xy;var d: f32=dot(r,r);var w: f32=exp(-5.0*d);var c: vec4f=textureSampleGrad(tex,samp,uv+o.zw,dx,dy);va+=w*c;wt+=w;w2+=w*w;}}
var mean: f32=0.3;var res: vec4f=mean+(va-wt*mean)/sqrt(w2);return mix(va/wt,res,0.4);}
#endif
#if TEXTURE_REPETITION_MODE>0
fn TEXRD(t: texture_2d<f32>,ts: sampler,uv: vec2f)->vec4f {return _texRepSample(t,ts,uv);}
#else
fn TEXRD(t: texture_2d<f32>,ts: sampler,uv: vec2f)->vec4f {return textureSample(t,ts,uv);}
#endif
#define TEXRD_DEFINED
`;e.IncludesShadersStoreWGSL[c]||(e.IncludesShadersStoreWGSL[c]=l);var ne={name:c,shader:l},u=`subSurfaceScatteringFunctions`,d=`fn testLightingForSSS(diffusionProfile: f32)->bool
{return diffusionProfile<1.;}`;e.IncludesShadersStoreWGSL[u]||(e.IncludesShadersStoreWGSL[u]=d);var f={name:u,shader:d},p=`importanceSampling`,m=`fn hemisphereCosSample(u: vec2f)->vec3f {var phi: f32=2.*PI*u.x;var cosTheta2: f32=1.-u.y;var cosTheta: f32=sqrt(cosTheta2);var sinTheta: f32=sqrt(1.-cosTheta2);return vec3f(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);}
fn hemisphereImportanceSampleDggx(u: vec2f,a: f32)->vec3f {var phi: f32=2.*PI*u.x;var cosTheta2: f32=(1.-u.y)/(1.+(a+1.)*((a-1.)*u.y));var cosTheta: f32=sqrt(cosTheta2);var sinTheta: f32=sqrt(1.-cosTheta2);return vec3f(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);}
fn hemisphereImportanceSampleDggxAnisotropic(Xi: vec2f,alphaTangent: f32,alphaBitangent: f32)->vec3f
{let alphaT: f32=max(alphaTangent,0.0001);let alphaB: f32=max(alphaBitangent,0.0001);var phi: f32=atan(alphaB/alphaT*tan(2.0f*PI*Xi.x));if (Xi.x>0.5) {phi+=PI; }
let cosPhi: f32=cos(phi);let sinPhi: f32=sin(phi);let alpha2: f32=(cosPhi*cosPhi)/(alphaT*alphaT) +
(sinPhi*sinPhi)/(alphaB*alphaB);let tanTheta2: f32=Xi.y/(1.0f-Xi.y)/alpha2;let cosTheta: f32=1.0f/sqrt(1.0f+tanTheta2);let sinTheta: f32=sqrt(max(0.0f,1.0f-cosTheta*cosTheta));return vec3f(sinTheta*cosPhi,sinTheta*sinPhi,cosTheta);}
fn hemisphereImportanceSampleDCharlie(u: vec2f,a: f32)->vec3f { 
var phi: f32=2.*PI*u.x;var sinTheta: f32=pow(u.y,a/(2.*a+1.));var cosTheta: f32=sqrt(1.-sinTheta*sinTheta);return vec3f(sinTheta*cos(phi),sinTheta*sin(phi),cosTheta);}`;e.IncludesShadersStoreWGSL[p]||(e.IncludesShadersStoreWGSL[p]=m);var re={name:p,shader:m},h=`pbrHelperFunctions`,g=`#define MINIMUMVARIANCE 0.0005
#ifndef TEXRD_DEFINED
fn TEXRD(t: texture_2d<f32>,ts: sampler,uv: vec2f)->vec4f {return textureSample(t,ts,uv);}
#define TEXRD_DEFINED
#endif
fn convertRoughnessToAverageSlope(roughness: f32)->f32
{return roughness*roughness+MINIMUMVARIANCE;}
fn fresnelGrazingReflectance(reflectance0: f32)->f32 {var reflectance90: f32=saturate(reflectance0*25.0);return reflectance90;}
fn getAARoughnessFactors(normalVector: vec3f)->vec2f {
#ifdef SPECULARAA
var nDfdx: vec3f=dpdx(normalVector.xyz);var nDfdy: vec3f=dpdy(normalVector.xyz);var slopeSquare: f32=max(dot(nDfdx,nDfdx),dot(nDfdy,nDfdy));var geometricRoughnessFactor: f32=pow(saturate(slopeSquare),0.333);var geometricAlphaGFactor: f32=sqrt(slopeSquare);geometricAlphaGFactor*=0.75;return vec2f(geometricRoughnessFactor,geometricAlphaGFactor);
#else
return vec2f(0.);
#endif
}
#ifdef ANISOTROPIC
#ifdef ANISOTROPIC_LEGACY
fn getAnisotropicRoughness(alphaG: f32,anisotropy: f32)->vec2f {var alphaT: f32=max(alphaG*(1.0+anisotropy),MINIMUMVARIANCE);var alphaB: f32=max(alphaG*(1.0-anisotropy),MINIMUMVARIANCE);return vec2f(alphaT,alphaB);}
fn getAnisotropicBentNormals(T: vec3f,B: vec3f,N: vec3f,V: vec3f,anisotropy: f32,roughness: f32)->vec3f {var anisotropicFrameDirection: vec3f=select(T,B,anisotropy>=0.0);var anisotropicFrameTangent: vec3f=cross(normalize(anisotropicFrameDirection),V);var anisotropicFrameNormal: vec3f=cross(anisotropicFrameTangent,anisotropicFrameDirection);var anisotropicNormal: vec3f=normalize(mix(N,anisotropicFrameNormal,abs(anisotropy)));return anisotropicNormal;}
#elif ANISOTROPIC_OPENPBR
fn getAnisotropicRoughness(alphaG: f32,anisotropy: f32)->vec2f {var alphaT: f32=max(alphaG*alphaG*sqrt(2.0/(1.0+(1.0-anisotropy)*(1.0-anisotropy))),MINIMUMVARIANCE);var alphaB: f32=max(alphaT*(1.0-anisotropy),MINIMUMVARIANCE);return vec2f(alphaT,alphaB);}
#else
fn getAnisotropicRoughness(alphaG: f32,anisotropy: f32)->vec2f {var alphaT: f32=max(mix(alphaG,1.0,anisotropy*anisotropy),MINIMUMVARIANCE);var alphaB: f32=max(alphaG,MINIMUMVARIANCE);return vec2f(alphaT,alphaB);}
fn getAnisotropicBentNormals(T: vec3f,B: vec3f,N: vec3f,V: vec3f,anisotropy: f32,roughness: f32)->vec3f {var bentNormal: vec3f=cross(B,V);bentNormal=normalize(cross(bentNormal,B));var sq=1.0-anisotropy*(1.0-roughness);var a: f32=sq*sq*sq*sq;bentNormal=normalize(mix(bentNormal,N,a));return bentNormal;}
#endif
#endif
#if defined(CLEARCOAT) || defined(SS_REFRACTION)
fn cocaLambertVec3(alpha: vec3f,distance: f32)->vec3f {return exp(-alpha*distance);}
fn cocaLambert(NdotVRefract: f32,NdotLRefract: f32,alpha: vec3f,thickness: f32)->vec3f {return cocaLambertVec3(alpha,(thickness*((NdotLRefract+NdotVRefract)/(NdotLRefract*NdotVRefract))));}
fn computeColorAtDistanceInMedia(color: vec3f,distance: f32)->vec3f {return -log(color)/distance;}
fn computeClearCoatAbsorption(NdotVRefract: f32,NdotLRefract: f32,clearCoatColor: vec3f,clearCoatThickness: f32,clearCoatIntensity: f32)->vec3f {var clearCoatAbsorption: vec3f=mix( vec3f(1.0),
cocaLambert(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness),
clearCoatIntensity);return clearCoatAbsorption;}
#endif
#ifdef MICROSURFACEAUTOMATIC
fn computeDefaultMicroSurface(microSurface: f32,reflectivityColor: vec3f)->f32
{const kReflectivityNoAlphaWorkflow_SmoothnessMax: f32=0.95;var reflectivityLuminance: f32=getLuminance(reflectivityColor);var reflectivityLuma: f32=sqrt(reflectivityLuminance);var resultMicroSurface=reflectivityLuma*kReflectivityNoAlphaWorkflow_SmoothnessMax;return resultMicroSurface;}
#endif
`;e.IncludesShadersStoreWGSL[h]||(e.IncludesShadersStoreWGSL[h]=g);var _={name:h,shader:g},v=`shadowsFragmentFunctions`,y=`#ifdef SHADOWS
#ifndef SHADOWFLOAT
fn unpack(color: vec4f)->f32
{const bit_shift: vec4f= vec4f(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);return dot(color,bit_shift);}
#endif
fn computeFallOff(value: f32,clipSpace: vec2f,frustumEdgeFalloff: f32)->f32
{var mask: f32=smoothstep(1.0-frustumEdgeFalloff,1.00000012,clamp(dot(clipSpace,clipSpace),0.,1.));return mix(value,1.0,mask);}
fn computeShadowCube(worldPos: vec3f,lightPosition: vec3f,shadowTexture: texture_cube<f32>,shadowSampler: sampler,darkness: f32,depthValues: vec2f)->f32
{var directionToLight: vec3f=worldPos-lightPosition;var depth: f32=length(directionToLight);depth=(depth+depthValues.x)/(depthValues.y);depth=clamp(depth,0.,1.0);directionToLight=normalize(directionToLight);directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
var shadow: f32=unpack(textureSample(shadowTexture,shadowSampler,directionToLight));
#else
var shadow: f32=textureSample(shadowTexture,shadowSampler,directionToLight).x;
#endif
return select(1.0,darkness,depth>shadow);}
fn computeShadowWithPoissonSamplingCube(worldPos: vec3f,lightPosition: vec3f,shadowTexture: texture_cube<f32>,shadowSampler: sampler,mapSize: f32,darkness: f32,depthValues: vec2f)->f32
{var directionToLight: vec3f=worldPos-lightPosition;var depth: f32=length(directionToLight);depth=(depth+depthValues.x)/(depthValues.y);depth=clamp(depth,0.,1.0);directionToLight=normalize(directionToLight);directionToLight.y=-directionToLight.y;var visibility: f32=1.;var poissonDisk: array<vec3f,4>;poissonDisk[0]= vec3f(-1.0,1.0,-1.0);poissonDisk[1]= vec3f(1.0,-1.0,-1.0);poissonDisk[2]= vec3f(-1.0,-1.0,-1.0);poissonDisk[3]= vec3f(1.0,-1.0,1.0);
#ifndef SHADOWFLOAT
if (unpack(textureSample(shadowTexture,shadowSampler,directionToLight+poissonDisk[0]*mapSize))<depth) {visibility-=0.25;};if (unpack(textureSample(shadowTexture,shadowSampler,directionToLight+poissonDisk[1]*mapSize))<depth) {visibility-=0.25;};if (unpack(textureSample(shadowTexture,shadowSampler,directionToLight+poissonDisk[2]*mapSize))<depth) {visibility-=0.25;};if (unpack(textureSample(shadowTexture,shadowSampler,directionToLight+poissonDisk[3]*mapSize))<depth) {visibility-=0.25;};
#else
if (textureSample(shadowTexture,shadowSampler,directionToLight+poissonDisk[0]*mapSize).x<depth) {visibility-=0.25;};if (textureSample(shadowTexture,shadowSampler,directionToLight+poissonDisk[1]*mapSize).x<depth) {visibility-=0.25;};if (textureSample(shadowTexture,shadowSampler,directionToLight+poissonDisk[2]*mapSize).x<depth) {visibility-=0.25;};if (textureSample(shadowTexture,shadowSampler,directionToLight+poissonDisk[3]*mapSize).x<depth) {visibility-=0.25;};
#endif
return min(1.0,visibility+darkness);}
fn computeShadowWithESMCube(worldPos: vec3f,lightPosition: vec3f,shadowTexture: texture_cube<f32>,shadowSampler: sampler,darkness: f32,depthScale: f32,depthValues: vec2f)->f32
{var directionToLight: vec3f=worldPos-lightPosition;var depth: f32=length(directionToLight);depth=(depth+depthValues.x)/(depthValues.y);var shadowPixelDepth: f32=clamp(depth,0.,1.0);directionToLight=normalize(directionToLight);directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
var shadowMapSample: f32=unpack(textureSample(shadowTexture,shadowSampler,directionToLight));
#else
var shadowMapSample: f32=textureSample(shadowTexture,shadowSampler,directionToLight).x;
#endif
var esm: f32=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness);return esm;}
fn computeShadowWithCloseESMCube(worldPos: vec3f,lightPosition: vec3f,shadowTexture: texture_cube<f32>,shadowSampler: sampler,darkness: f32,depthScale: f32,depthValues: vec2f)->f32
{var directionToLight: vec3f=worldPos-lightPosition;var depth: f32=length(directionToLight);depth=(depth+depthValues.x)/(depthValues.y);var shadowPixelDepth: f32=clamp(depth,0.,1.0);directionToLight=normalize(directionToLight);directionToLight.y=-directionToLight.y;
#ifndef SHADOWFLOAT
var shadowMapSample: f32=unpack(textureSample(shadowTexture,shadowSampler,directionToLight));
#else
var shadowMapSample: f32=textureSample(shadowTexture,shadowSampler,directionToLight).x;
#endif
var esm: f32=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);return esm;}
fn computeShadowCSM(layer: i32,vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_2d_array<f32>,shadowSampler: sampler,darkness: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uv: vec2f=0.5*clipSpace.xy+ vec2f(0.5);var shadowPixelDepth: f32=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
var shadow: f32=unpack(textureSample(shadowTexture,shadowSampler,uv,layer));
#else
var shadow: f32=textureSample(shadowTexture,shadowSampler,uv,layer).x;
#endif
return select(1.,computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff),shadowPixelDepth>shadow );}
fn computeShadow(vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_2d<f32>,shadowSampler: sampler,darkness: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uv: vec2f=0.5*clipSpace.xy+ vec2f(0.5);if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{return 1.0;}
else
{var shadowPixelDepth: f32=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
var shadow: f32=unpack(textureSampleLevel(shadowTexture,shadowSampler,uv,0.));
#else
var shadow: f32=textureSampleLevel(shadowTexture,shadowSampler,uv,0.).x;
#endif
return select(1.,computeFallOff(darkness,clipSpace.xy,frustumEdgeFalloff),shadowPixelDepth>shadow );}}
fn computeShadowWithPoissonSampling(vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_2d<f32>,shadowSampler: sampler,mapSize: f32,darkness: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uv: vec2f=0.5*clipSpace.xy+ vec2f(0.5);if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{return 1.0;}
else
{var shadowPixelDepth: f32=clamp(depthMetric,0.,1.0);var visibility: f32=1.;var poissonDisk: array<vec2f,4>;poissonDisk[0]= vec2f(-0.94201624,-0.39906216);poissonDisk[1]= vec2f(0.94558609,-0.76890725);poissonDisk[2]= vec2f(-0.094184101,-0.92938870);poissonDisk[3]= vec2f(0.34495938,0.29387760);
#ifndef SHADOWFLOAT
if (unpack(textureSampleLevel(shadowTexture,shadowSampler,uv+poissonDisk[0]*mapSize,0.))<shadowPixelDepth) {visibility-=0.25;}
if (unpack(textureSampleLevel(shadowTexture,shadowSampler,uv+poissonDisk[1]*mapSize,0.))<shadowPixelDepth) {visibility-=0.25;}
if (unpack(textureSampleLevel(shadowTexture,shadowSampler,uv+poissonDisk[2]*mapSize,0.))<shadowPixelDepth) {visibility-=0.25;}
if (unpack(textureSampleLevel(shadowTexture,shadowSampler,uv+poissonDisk[3]*mapSize,0.))<shadowPixelDepth) {visibility-=0.25;}
#else
if (textureSampleLevel(shadowTexture,shadowSampler,uv+poissonDisk[0]*mapSize,0.).x<shadowPixelDepth) {visibility-=0.25;}
if (textureSampleLevel(shadowTexture,shadowSampler,uv+poissonDisk[1]*mapSize,0.).x<shadowPixelDepth) {visibility-=0.25;}
if (textureSampleLevel(shadowTexture,shadowSampler,uv+poissonDisk[2]*mapSize,0.).x<shadowPixelDepth) {visibility-=0.25;}
if (textureSampleLevel(shadowTexture,shadowSampler,uv+poissonDisk[3]*mapSize,0.).x<shadowPixelDepth) {visibility-=0.25;}
#endif
return computeFallOff(min(1.0,visibility+darkness),clipSpace.xy,frustumEdgeFalloff);}}
fn computeShadowWithESM(vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_2d<f32>,shadowSampler: sampler,darkness: f32,depthScale: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uv: vec2f=0.5*clipSpace.xy+ vec2f(0.5);if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{return 1.0;}
else
{var shadowPixelDepth: f32=clamp(depthMetric,0.,1.0);
#ifndef SHADOWFLOAT
var shadowMapSample: f32=unpack(textureSampleLevel(shadowTexture,shadowSampler,uv,0.));
#else
var shadowMapSample: f32=textureSampleLevel(shadowTexture,shadowSampler,uv,0.).x;
#endif
var esm: f32=1.0-clamp(exp(min(87.,depthScale*shadowPixelDepth))*shadowMapSample,0.,1.-darkness);return computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);}}
fn computeShadowWithCloseESM(vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_2d<f32>,shadowSampler: sampler,darkness: f32,depthScale: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uv: vec2f=0.5*clipSpace.xy+ vec2f(0.5);if (uv.x<0. || uv.x>1.0 || uv.y<0. || uv.y>1.0)
{return 1.0;}
else
{var shadowPixelDepth: f32=clamp(depthMetric,0.,1.0); 
#ifndef SHADOWFLOAT
var shadowMapSample: f32=unpack(textureSampleLevel(shadowTexture,shadowSampler,uv,0.));
#else
var shadowMapSample: f32=textureSampleLevel(shadowTexture,shadowSampler,uv,0.).x;
#endif
var esm: f32=clamp(exp(min(87.,-depthScale*(shadowPixelDepth-shadowMapSample))),darkness,1.);return computeFallOff(esm,clipSpace.xy,frustumEdgeFalloff);}}
fn getZInClip(clipSpace: vec3f,uvDepth: vec3f)->f32
{
#ifdef IS_NDC_HALF_ZRANGE
return clipSpace.z;
#else
return uvDepth.z;
#endif
}
const GREATEST_LESS_THAN_ONE: f32=0.99999994;
#define DISABLE_UNIFORMITY_ANALYSIS
fn computeShadowWithCSMPCF1(layer: i32,vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_depth_2d_array,shadowSampler: sampler_comparison,darkness: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uvDepth: vec3f= vec3f(0.5*clipSpace.xyz+ vec3f(0.5));uvDepth.z=clamp(getZInClip(clipSpace,uvDepth),0.,GREATEST_LESS_THAN_ONE);var shadow: f32=textureSampleCompare(shadowTexture,shadowSampler,uvDepth.xy,layer,uvDepth.z);shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}
fn computeShadowWithCSMPCF3(layer: i32,vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_depth_2d_array,shadowSampler: sampler_comparison,shadowMapSizeAndInverse: vec2f,darkness: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uvDepth: vec3f= vec3f(0.5*clipSpace.xyz+ vec3f(0.5));uvDepth.z=clamp(getZInClip(clipSpace,uvDepth),0.,GREATEST_LESS_THAN_ONE);var uv: vec2f=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
var st: vec2f=fract(uv); 
var base_uv: vec2f=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
var uvw0: vec2f=3.-2.*st;var uvw1: vec2f=1.+2.*st;var u: vec2f= vec2f((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;var v: vec2f= vec2f((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;var shadow: f32=0.;shadow+=uvw0.x*uvw0.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[0],v[0]),layer,uvDepth.z);shadow+=uvw1.x*uvw0.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[1],v[0]),layer,uvDepth.z);shadow+=uvw0.x*uvw1.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[0],v[1]),layer,uvDepth.z);shadow+=uvw1.x*uvw1.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[1],v[1]),layer,uvDepth.z);shadow=shadow/16.;shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}
fn computeShadowWithCSMPCF5(layer: i32,vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_depth_2d_array,shadowSampler: sampler_comparison,shadowMapSizeAndInverse: vec2f,darkness: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uvDepth: vec3f= vec3f(0.5*clipSpace.xyz+ vec3f(0.5));uvDepth.z=clamp(getZInClip(clipSpace,uvDepth),0.,GREATEST_LESS_THAN_ONE);var uv: vec2f=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
var st: vec2f=fract(uv); 
var base_uv: vec2f=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
var uvw0: vec2f=4.-3.*st;var uvw1: vec2f= vec2f(7.);var uvw2: vec2f=1.+3.*st;var u: vec3f= vec3f((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;var v: vec3f= vec3f((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;var shadow: f32=0.;shadow+=uvw0.x*uvw0.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[0],v[0]),layer,uvDepth.z);shadow+=uvw1.x*uvw0.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[1],v[0]),layer,uvDepth.z);shadow+=uvw2.x*uvw0.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[2],v[0]),layer,uvDepth.z);shadow+=uvw0.x*uvw1.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[0],v[1]),layer,uvDepth.z);shadow+=uvw1.x*uvw1.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[1],v[1]),layer,uvDepth.z);shadow+=uvw2.x*uvw1.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[2],v[1]),layer,uvDepth.z);shadow+=uvw0.x*uvw2.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[0],v[2]),layer,uvDepth.z);shadow+=uvw1.x*uvw2.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[1],v[2]),layer,uvDepth.z);shadow+=uvw2.x*uvw2.y*textureSampleCompare(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[2],v[2]),layer,uvDepth.z);shadow=shadow/144.;shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}
fn computeShadowWithPCF1(vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_depth_2d,shadowSampler: sampler_comparison,darkness: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uvDepth: vec3f= vec3f(0.5*clipSpace.xyz+ vec3f(0.5));uvDepth.z=getZInClip(clipSpace,uvDepth);if (depthMetric<0.0 || depthMetric>1.0 || uvDepth.x<0. || uvDepth.x>1.0 || uvDepth.y<0. || uvDepth.y>1.0) {return 1.0;} else {var shadow: f32=textureSampleCompareLevel(shadowTexture,shadowSampler,uvDepth.xy,uvDepth.z);shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}}
fn computeShadowWithPCF3(vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_depth_2d,shadowSampler: sampler_comparison,shadowMapSizeAndInverse: vec2f,darkness: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uvDepth: vec3f= vec3f(0.5*clipSpace.xyz+ vec3f(0.5));uvDepth.z=getZInClip(clipSpace,uvDepth);if (depthMetric<0.0 || depthMetric>1.0 || uvDepth.x<0. || uvDepth.x>1.0 || uvDepth.y<0. || uvDepth.y>1.0) {return 1.0;} else {var uv: vec2f=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
var st: vec2f=fract(uv); 
var base_uv: vec2f=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
var uvw0: vec2f=3.-2.*st;var uvw1: vec2f=1.+2.*st;var u: vec2f= vec2f((2.-st.x)/uvw0.x-1.,st.x/uvw1.x+1.)*shadowMapSizeAndInverse.y;var v: vec2f= vec2f((2.-st.y)/uvw0.y-1.,st.y/uvw1.y+1.)*shadowMapSizeAndInverse.y;var shadow: f32=0.;shadow+=uvw0.x*uvw0.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[0],v[0]),uvDepth.z);shadow+=uvw1.x*uvw0.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[1],v[0]),uvDepth.z);shadow+=uvw0.x*uvw1.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[0],v[1]),uvDepth.z);shadow+=uvw1.x*uvw1.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[1],v[1]),uvDepth.z);shadow=shadow/16.;shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}}
fn computeShadowWithPCF5(vPositionFromLight: vec4f,depthMetric: f32,shadowTexture: texture_depth_2d,shadowSampler: sampler_comparison,shadowMapSizeAndInverse: vec2f,darkness: f32,frustumEdgeFalloff: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uvDepth: vec3f= vec3f(0.5*clipSpace.xyz+ vec3f(0.5));uvDepth.z=getZInClip(clipSpace,uvDepth);if (depthMetric<0.0 || depthMetric>1.0 || uvDepth.x<0. || uvDepth.x>1.0 || uvDepth.y<0. || uvDepth.y>1.0) {return 1.0;} else {var uv: vec2f=uvDepth.xy*shadowMapSizeAndInverse.x; 
uv+=0.5; 
var st: vec2f=fract(uv); 
var base_uv: vec2f=floor(uv)-0.5; 
base_uv*=shadowMapSizeAndInverse.y; 
var uvw0: vec2f=4.-3.*st;var uvw1: vec2f= vec2f(7.);var uvw2: vec2f=1.+3.*st;var u: vec3f= vec3f((3.-2.*st.x)/uvw0.x-2.,(3.+st.x)/uvw1.x,st.x/uvw2.x+2.)*shadowMapSizeAndInverse.y;var v: vec3f= vec3f((3.-2.*st.y)/uvw0.y-2.,(3.+st.y)/uvw1.y,st.y/uvw2.y+2.)*shadowMapSizeAndInverse.y;var shadow: f32=0.;shadow+=uvw0.x*uvw0.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[0],v[0]),uvDepth.z);shadow+=uvw1.x*uvw0.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[1],v[0]),uvDepth.z);shadow+=uvw2.x*uvw0.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[2],v[0]),uvDepth.z);shadow+=uvw0.x*uvw1.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[0],v[1]),uvDepth.z);shadow+=uvw1.x*uvw1.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[1],v[1]),uvDepth.z);shadow+=uvw2.x*uvw1.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[2],v[1]),uvDepth.z);shadow+=uvw0.x*uvw2.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[0],v[2]),uvDepth.z);shadow+=uvw1.x*uvw2.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[1],v[2]),uvDepth.z);shadow+=uvw2.x*uvw2.y*textureSampleCompareLevel(shadowTexture,shadowSampler, base_uv.xy+ vec2f(u[2],v[2]),uvDepth.z);shadow=shadow/144.;shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}}
const PoissonSamplers32: array<vec3f,64>=array<vec3f,64> (
vec3f(0.06407013,0.05409927,0.),
vec3f(0.7366577,0.5789394,0.),
vec3f(-0.6270542,-0.5320278,0.),
vec3f(-0.4096107,0.8411095,0.),
vec3f(0.6849564,-0.4990818,0.),
vec3f(-0.874181,-0.04579735,0.),
vec3f(0.9989998,0.0009880066,0.),
vec3f(-0.004920578,-0.9151649,0.),
vec3f(0.1805763,0.9747483,0.),
vec3f(-0.2138451,0.2635818,0.),
vec3f(0.109845,0.3884785,0.),
vec3f(0.06876755,-0.3581074,0.),
vec3f(0.374073,-0.7661266,0.),
vec3f(0.3079132,-0.1216763,0.),
vec3f(-0.3794335,-0.8271583,0.),
vec3f(-0.203878,-0.07715034,0.),
vec3f(0.5912697,0.1469799,0.),
vec3f(-0.88069,0.3031784,0.),
vec3f(0.5040108,0.8283722,0.),
vec3f(-0.5844124,0.5494877,0.),
vec3f(0.6017799,-0.1726654,0.),
vec3f(-0.5554981,0.1559997,0.),
vec3f(-0.3016369,-0.3900928,0.),
vec3f(-0.5550632,-0.1723762,0.),
vec3f(0.925029,0.2995041,0.),
vec3f(-0.2473137,0.5538505,0.),
vec3f(0.9183037,-0.2862392,0.),
vec3f(0.2469421,0.6718712,0.),
vec3f(0.3916397,-0.4328209,0.),
vec3f(-0.03576927,-0.6220032,0.),
vec3f(-0.04661255,0.7995201,0.),
vec3f(0.4402924,0.3640312,0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.),
vec3f(0.)
);const PoissonSamplers64: array<vec3f,64>=array<vec3f,64> (
vec3f(-0.613392,0.617481,0.),
vec3f(0.170019,-0.040254,0.),
vec3f(-0.299417,0.791925,0.),
vec3f(0.645680,0.493210,0.),
vec3f(-0.651784,0.717887,0.),
vec3f(0.421003,0.027070,0.),
vec3f(-0.817194,-0.271096,0.),
vec3f(-0.705374,-0.668203,0.),
vec3f(0.977050,-0.108615,0.),
vec3f(0.063326,0.142369,0.),
vec3f(0.203528,0.214331,0.),
vec3f(-0.667531,0.326090,0.),
vec3f(-0.098422,-0.295755,0.),
vec3f(-0.885922,0.215369,0.),
vec3f(0.566637,0.605213,0.),
vec3f(0.039766,-0.396100,0.),
vec3f(0.751946,0.453352,0.),
vec3f(0.078707,-0.715323,0.),
vec3f(-0.075838,-0.529344,0.),
vec3f(0.724479,-0.580798,0.),
vec3f(0.222999,-0.215125,0.),
vec3f(-0.467574,-0.405438,0.),
vec3f(-0.248268,-0.814753,0.),
vec3f(0.354411,-0.887570,0.),
vec3f(0.175817,0.382366,0.),
vec3f(0.487472,-0.063082,0.),
vec3f(-0.084078,0.898312,0.),
vec3f(0.488876,-0.783441,0.),
vec3f(0.470016,0.217933,0.),
vec3f(-0.696890,-0.549791,0.),
vec3f(-0.149693,0.605762,0.),
vec3f(0.034211,0.979980,0.),
vec3f(0.503098,-0.308878,0.),
vec3f(-0.016205,-0.872921,0.),
vec3f(0.385784,-0.393902,0.),
vec3f(-0.146886,-0.859249,0.),
vec3f(0.643361,0.164098,0.),
vec3f(0.634388,-0.049471,0.),
vec3f(-0.688894,0.007843,0.),
vec3f(0.464034,-0.188818,0.),
vec3f(-0.440840,0.137486,0.),
vec3f(0.364483,0.511704,0.),
vec3f(0.034028,0.325968,0.),
vec3f(0.099094,-0.308023,0.),
vec3f(0.693960,-0.366253,0.),
vec3f(0.678884,-0.204688,0.),
vec3f(0.001801,0.780328,0.),
vec3f(0.145177,-0.898984,0.),
vec3f(0.062655,-0.611866,0.),
vec3f(0.315226,-0.604297,0.),
vec3f(-0.780145,0.486251,0.),
vec3f(-0.371868,0.882138,0.),
vec3f(0.200476,0.494430,0.),
vec3f(-0.494552,-0.711051,0.),
vec3f(0.612476,0.705252,0.),
vec3f(-0.578845,-0.768792,0.),
vec3f(-0.772454,-0.090976,0.),
vec3f(0.504440,0.372295,0.),
vec3f(0.155736,0.065157,0.),
vec3f(0.391522,0.849605,0.),
vec3f(-0.620106,-0.328104,0.),
vec3f(0.789239,-0.419965,0.),
vec3f(-0.545396,0.538133,0.),
vec3f(-0.178564,-0.596057,0.)
);fn computeShadowWithCSMPCSS(layer: i32,vPositionFromLight: vec4f,depthMetric: f32,depthTexture: texture_2d_array<f32>,depthSampler: sampler,shadowTexture: texture_depth_2d_array,shadowSampler: sampler_comparison,shadowMapSizeInverse: f32,lightSizeUV: f32,darkness: f32,frustumEdgeFalloff: f32,searchTapCount: i32,pcfTapCount: i32,poissonSamplers: array<vec3f,64>,lightSizeUVCorrection: vec2f,depthCorrection: f32,penumbraDarkness: f32)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uvDepth: vec3f= vec3f(0.5*clipSpace.xyz+ vec3f(0.5));uvDepth.z=clamp(getZInClip(clipSpace,uvDepth),0.,GREATEST_LESS_THAN_ONE);var uvDepthLayer: vec4f= vec4f(uvDepth.x,uvDepth.y,f32(layer),uvDepth.z);var blockerDepth: f32=0.0;var sumBlockerDepth: f32=0.0;var numBlocker: f32=0.0;for (var i: i32=0; i<searchTapCount; i ++) {blockerDepth=textureSample(depthTexture,depthSampler, uvDepth.xy+(lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse*PoissonSamplers32[i].xy),layer).r;numBlocker+=select(0.,1.,blockerDepth<depthMetric);sumBlockerDepth+=select(0.,blockerDepth,blockerDepth<depthMetric);}
var avgBlockerDepth: f32=sumBlockerDepth/numBlocker;var AAOffset: f32=shadowMapSizeInverse*10.;var penumbraRatio: f32=((depthMetric-avgBlockerDepth)*depthCorrection+AAOffset);var filterRadius: vec4f= vec4f(penumbraRatio*lightSizeUV*lightSizeUVCorrection*shadowMapSizeInverse,0.,0.);var random: f32=getRand(vPositionFromLight.xy);var rotationAngle: f32=random*3.1415926;var rotationVector: vec2f= vec2f(cos(rotationAngle),sin(rotationAngle));var shadow: f32=0.;for (var i: i32=0; i<pcfTapCount; i++) {var offset: vec4f= vec4f(poissonSamplers[i],0.);offset= vec4f(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.,0.);let coords=uvDepthLayer+offset*filterRadius;shadow+=textureSampleCompare(shadowTexture,shadowSampler,coords.xy,i32(coords.z),coords.w);}
shadow/= f32(pcfTapCount);shadow=mix(shadow,1.,min((depthMetric-avgBlockerDepth)*depthCorrection*penumbraDarkness,1.));shadow=mix(darkness,1.,shadow);return select(computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff),1.0,numBlocker<1.0);}
fn computeShadowWithPCSS(vPositionFromLight: vec4f,depthMetric: f32,depthTexture: texture_2d<f32>,depthSampler: sampler,shadowTexture: texture_depth_2d,shadowSampler: sampler_comparison,shadowMapSizeInverse: f32,lightSizeUV: f32,darkness: f32,frustumEdgeFalloff: f32,searchTapCount: i32,pcfTapCount: i32,poissonSamplers: array<vec3f,64>)->f32
{var clipSpace: vec3f=vPositionFromLight.xyz/vPositionFromLight.w;var uvDepth: vec3f= vec3f(0.5*clipSpace.xyz+ vec3f(0.5));uvDepth.z=getZInClip(clipSpace,uvDepth);if (depthMetric<0.0 || depthMetric>1.0 || uvDepth.x<0. || uvDepth.x>1.0 || uvDepth.y<0. || uvDepth.y>1.0) {return 1.0;}
var blockerDepth: f32=0.0;var sumBlockerDepth: f32=0.0;var numBlocker: f32=0.0;for (var i: i32=0; i<searchTapCount; i ++) {blockerDepth=textureSampleLevel(depthTexture,depthSampler,uvDepth.xy+(lightSizeUV*shadowMapSizeInverse*PoissonSamplers32[i].xy),0).r;numBlocker+=select(0.,1.,blockerDepth<depthMetric);sumBlockerDepth+=select(0.,blockerDepth,blockerDepth<depthMetric);}
if (numBlocker<1.0) {return 1.0;}
var avgBlockerDepth: f32=sumBlockerDepth/numBlocker;var AAOffset: f32=shadowMapSizeInverse*10.;var penumbraRatio: f32=((depthMetric-avgBlockerDepth)+AAOffset);var filterRadius: f32=penumbraRatio*lightSizeUV*shadowMapSizeInverse;var random: f32=getRand(vPositionFromLight.xy);var rotationAngle: f32=random*3.1415926;var rotationVector: vec2f= vec2f(cos(rotationAngle),sin(rotationAngle));var shadow: f32=0.;for (var i: i32=0; i<pcfTapCount; i++) {var offset: vec3f=poissonSamplers[i];offset= vec3f(offset.x*rotationVector.x-offset.y*rotationVector.y,offset.y*rotationVector.x+offset.x*rotationVector.y,0.);let coords=uvDepth+offset*filterRadius;shadow+=textureSampleCompareLevel(shadowTexture,shadowSampler,coords.xy,coords.z);}
shadow/= f32(pcfTapCount);shadow=mix(shadow,1.,depthMetric-avgBlockerDepth);shadow=mix(darkness,1.,shadow);return computeFallOff(shadow,clipSpace.xy,frustumEdgeFalloff);}
fn computeShadowWithPCSS16(vPositionFromLight: vec4f,depthMetric: f32,depthTexture: texture_2d<f32>,depthSampler: sampler,shadowTexture: texture_depth_2d,shadowSampler: sampler_comparison,shadowMapSizeInverse: f32,lightSizeUV: f32,darkness: f32,frustumEdgeFalloff: f32)->f32
{return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthTexture,depthSampler,shadowTexture,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32);}
fn computeShadowWithPCSS32(vPositionFromLight: vec4f,depthMetric: f32,depthTexture: texture_2d<f32>,depthSampler: sampler,shadowTexture: texture_depth_2d,shadowSampler: sampler_comparison,shadowMapSizeInverse: f32,lightSizeUV: f32,darkness: f32,frustumEdgeFalloff: f32)->f32
{return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthTexture,depthSampler,shadowTexture,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32);}
fn computeShadowWithPCSS64(vPositionFromLight: vec4f,depthMetric: f32,depthTexture: texture_2d<f32>,depthSampler: sampler,shadowTexture: texture_depth_2d,shadowSampler: sampler_comparison,shadowMapSizeInverse: f32,lightSizeUV: f32,darkness: f32,frustumEdgeFalloff: f32)->f32
{return computeShadowWithPCSS(vPositionFromLight,depthMetric,depthTexture,depthSampler,shadowTexture,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64);}
fn computeShadowWithCSMPCSS16(layer: i32,vPositionFromLight: vec4f,depthMetric: f32,depthTexture: texture_2d_array<f32>,depthSampler: sampler,shadowTexture: texture_depth_2d_array,shadowSampler: sampler_comparison,shadowMapSizeInverse: f32,lightSizeUV: f32,darkness: f32,frustumEdgeFalloff: f32,lightSizeUVCorrection: vec2f,depthCorrection: f32,penumbraDarkness: f32)->f32
{return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthTexture,depthSampler,shadowTexture,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,16,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);}
fn computeShadowWithCSMPCSS32(layer: i32,vPositionFromLight: vec4f,depthMetric: f32,depthTexture: texture_2d_array<f32>,depthSampler: sampler,shadowTexture: texture_depth_2d_array,shadowSampler: sampler_comparison,shadowMapSizeInverse: f32,lightSizeUV: f32,darkness: f32,frustumEdgeFalloff: f32,lightSizeUVCorrection: vec2f,depthCorrection: f32,penumbraDarkness: f32)->f32
{return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthTexture,depthSampler,shadowTexture,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,16,32,PoissonSamplers32,lightSizeUVCorrection,depthCorrection,penumbraDarkness);}
fn computeShadowWithCSMPCSS64(layer: i32,vPositionFromLight: vec4f,depthMetric: f32,depthTexture: texture_2d_array<f32>,depthSampler: sampler,shadowTexture: texture_depth_2d_array,shadowSampler: sampler_comparison,shadowMapSizeInverse: f32,lightSizeUV: f32,darkness: f32,frustumEdgeFalloff: f32,lightSizeUVCorrection: vec2f,depthCorrection: f32,penumbraDarkness: f32)->f32
{return computeShadowWithCSMPCSS(layer,vPositionFromLight,depthMetric,depthTexture,depthSampler,shadowTexture,shadowSampler,shadowMapSizeInverse,lightSizeUV,darkness,frustumEdgeFalloff,32,64,PoissonSamplers64,lightSizeUVCorrection,depthCorrection,penumbraDarkness);}
#endif
`;e.IncludesShadersStoreWGSL[v]||(e.IncludesShadersStoreWGSL[v]=y);var b={name:v,shader:y},x=`ltcHelperFunctions`,S=`fn LTCUv(N: vec3f,V: vec3f,roughness: f32)->vec2f {var LUTSIZE: f32=64.0;var LUTSCALE: f32=( LUTSIZE-1.0 )/LUTSIZE;var LUTBIAS:f32=0.5/LUTSIZE;var dotNV:f32=saturate( dot( N,V ) );var uv:vec2f=vec2f( roughness,sqrt( 1.0-dotNV ) );uv=uv*LUTSCALE+LUTBIAS;return uv;}
fn LTCClippedSphereFormFactor( f:vec3f )->f32 {var l: f32=length( f );return max( ( l*l+f.z )/( l+1.0 ),0.0 );}
fn LTCEdgeVectorFormFactor( v1:vec3f,v2:vec3f )->vec3f {var x:f32=dot( v1,v2 );var y:f32=abs( x );var a:f32=0.8543985+( 0.4965155+0.0145206*y )*y;var b:f32=3.4175940+( 4.1616724+y )*y;var v:f32=a/b;var thetaSintheta:f32=0.0;if( x>0.0 )
{thetaSintheta=v;}
else
{thetaSintheta=0.5*inverseSqrt( max( 1.0-x*x,0.00000001 ) )-v;}
return cross( v1,v2 )*thetaSintheta;}
fn LTCEvaluate( N:vec3f,V:vec3f,P:vec3f,mInv: mat3x3<f32>,rectCoords0:vec3f,rectCoords1:vec3f,rectCoords2:vec3f,rectCoords3:vec3f )->vec3f {var v1:vec3f=rectCoords1-rectCoords0;var v2:vec3f=rectCoords3-rectCoords0;var lightNormal:vec3f=cross( v1,v2 );if( dot( lightNormal,P-rectCoords0 )<0.0 ){return vec3f( 0.0 );}
var T1:vec3f=normalize( V-N*dot( V,N ) );var T2:vec3f=- cross( N,T1 ); 
var mat: mat3x3<f32>=mInv*transposeMat3( mat3x3<f32>( T1,T2,N ) );var coords0: vec3f=mat*( rectCoords0-P );var coords1: vec3f=mat*( rectCoords1-P );var coords2: vec3f=mat*( rectCoords2-P );var coords3: vec3f=mat*( rectCoords3-P );coords0=normalize( coords0 );coords1=normalize( coords1 );coords2=normalize( coords2 );coords3=normalize( coords3 );var vectorFormFactor:vec3f=vec3( 0.0 );vectorFormFactor+=LTCEdgeVectorFormFactor( coords0,coords1 );vectorFormFactor+=LTCEdgeVectorFormFactor( coords1,coords2 );vectorFormFactor+=LTCEdgeVectorFormFactor( coords2,coords3 );vectorFormFactor+=LTCEdgeVectorFormFactor( coords3,coords0 );var result:f32=LTCClippedSphereFormFactor( vectorFormFactor );return vec3f( result );}
struct areaLightData
{Diffuse: vec3f,
Specular: vec3f,
Fresnel: vec4f};fn computeAreaLightSpecularDiffuseFresnel(ltc1: texture_2d<f32>,ltc1Sampler:sampler,ltc2:texture_2d<f32>,ltc2Sampler:sampler,viewDir: vec3f,normal:vec3f,position:vec3f,lightPos:vec3f,halfWidth:vec3f, halfHeight:vec3f,roughness:f32)->areaLightData {var result: areaLightData;var rectCoords0:vec3f=lightPos+halfWidth-halfHeight; 
var rectCoords1:vec3f=lightPos-halfWidth-halfHeight;var rectCoords2:vec3f=lightPos-halfWidth+halfHeight;var rectCoords3:vec3f=lightPos+halfWidth+halfHeight;
#ifdef SPECULARTERM
var uv:vec2f=LTCUv( normal,viewDir,roughness );var t1:vec4f=textureSample( ltc1,ltc1Sampler,uv );var t2:vec4f=textureSample( ltc2,ltc2Sampler,uv );var mInv:mat3x3<f32>=mat3x3<f32>(
vec3f( t1.x,0,t1.y ),
vec3f( 0,1, 0 ),
vec3f( t1.z,0,t1.w )
);result.Fresnel=t2;result.Specular=LTCEvaluate( normal,viewDir,position,mInv,rectCoords0,rectCoords1,rectCoords2,rectCoords3 );
#endif
var mInvEmpty:mat3x3<f32>=mat3x3<f32>(
vec3f( 1,0,0 ),
vec3f( 0,1,0 ),
vec3f( 0,0,1 )
);result.Diffuse+=LTCEvaluate( normal,viewDir,position,mInvEmpty,rectCoords0,rectCoords1,rectCoords2,rectCoords3 );return result;}
fn FetchDiffuseFilteredTexture(texLightFiltered: texture_2d<f32>,texLightFilteredSampler: sampler,p1_: vec3f,p2_: vec3f,p3_: vec3f,p4_: vec3f)->vec3f {var V1: vec3f=p2_-p1_;var V2: vec3f=p4_-p1_;var planeOrtho: vec3f=cross(V1,V2);var planeAreaSquared: f32=dot(planeOrtho,planeOrtho);var planeDistxPlaneArea: f32=dot(planeOrtho,p1_);var P: vec3f=planeDistxPlaneArea*planeOrtho/planeAreaSquared-p1_;var dot_V1_V2: f32=dot(V1,V2);var inv_dot_V1_V1: f32=1.0/dot(V1,V1);var V2_: vec3f=V2-V1*dot_V1_V2*inv_dot_V1_V1;var Puv: vec2f;Puv.y=dot(V2_,P)/dot(V2_,V2_);Puv.x=dot(V1,P)*inv_dot_V1_V1-dot_V1_V2*inv_dot_V1_V1*Puv.y;var d: f32=abs(planeDistxPlaneArea)/pow(planeAreaSquared,0.75);var sampleLOD: f32=log(2048.0*d)/log(3.0);var sampleUV: vec2f=vec2f(0.125,0.125)+(vec2f(0.75)*Puv);sampleUV.x=1.0-sampleUV.x;return textureSampleLevel(texLightFiltered,texLightFilteredSampler,sampleUV,sampleLOD).rgb;}
fn LTCEvaluateWithEmission(N: vec3f,V: vec3f,P: vec3f,mInv: mat3x3<f32>,rectCoords0: vec3f,rectCoords1: vec3f,rectCoords2: vec3f,rectCoords3: vec3f,texFilteredMap: texture_2d<f32>,texFilteredMapSampler: sampler)->vec3f {var v1: vec3f=rectCoords1-rectCoords0;var v2: vec3f=rectCoords3-rectCoords0;var lightNormal: vec3f=cross(v1,v2);if (dot(lightNormal,P-rectCoords0)<0.0) {return vec3f(0.0);}
var T1: vec3f=normalize(V-N*dot(V,N));var T2: vec3f=-cross(N,T1);var mat: mat3x3<f32>=mInv*transposeMat3(mat3x3<f32>(T1,T2,N));var coords0: vec3f=mat*(rectCoords0-P);var coords1: vec3f=mat*(rectCoords1-P);var coords2: vec3f=mat*(rectCoords2-P);var coords3: vec3f=mat*(rectCoords3-P);var textureLight: vec3f=FetchDiffuseFilteredTexture(texFilteredMap,texFilteredMapSampler,coords0,coords1,coords2,coords3);coords0=normalize(coords0);coords1=normalize(coords1);coords2=normalize(coords2);coords3=normalize(coords3);var vectorFormFactor: vec3f=vec3f(0.0);vectorFormFactor+=LTCEdgeVectorFormFactor(coords0,coords1);vectorFormFactor+=LTCEdgeVectorFormFactor(coords1,coords2);vectorFormFactor+=LTCEdgeVectorFormFactor(coords2,coords3);vectorFormFactor+=LTCEdgeVectorFormFactor(coords3,coords0);var result: f32=LTCClippedSphereFormFactor(vectorFormFactor);return vec3f(result)*textureLight;}
fn computeAreaLightSpecularDiffuseFresnelWithEmission(ltc1: texture_2d<f32>,ltc1Sampler:sampler,ltc2:texture_2d<f32>,ltc2Sampler:sampler,emissionTexture: texture_2d<f32>,emissionTextureSampler:sampler,viewDir: vec3f,normal:vec3f,position:vec3f,lightPos:vec3f,halfWidth:vec3f, halfHeight:vec3f,roughness:f32)->areaLightData {var result: areaLightData;var rectCoords0: vec3f=lightPos+halfWidth-halfHeight; 
var rectCoords1: vec3f=lightPos-halfWidth-halfHeight;var rectCoords2: vec3f=lightPos-halfWidth+halfHeight;var rectCoords3: vec3f=lightPos+halfWidth+halfHeight;
#ifdef SPECULARTERM
var uv: vec2f=LTCUv(normal,viewDir,roughness);var t1: vec4f=textureSample(ltc1,ltc1Sampler,uv);var t2: vec4f=textureSample(ltc2,ltc2Sampler,uv);var mInv: mat3x3<f32>=mat3x3<f32>(
vec3f(t1.x,0,t1.y),
vec3f(0,1,0),
vec3f(t1.z,0,t1.w)
);result.Specular=LTCEvaluateWithEmission(normal,viewDir,position,mInv,rectCoords0,rectCoords1,rectCoords2,rectCoords3,emissionTexture,emissionTextureSampler);result.Fresnel=t2;
#endif
var mInvEmpty: mat3x3<f32>=mat3x3<f32>(
vec3f(1,0,0),
vec3f(0,1,0),
vec3f(0,0,1)
);result.Diffuse=LTCEvaluateWithEmission(normal,viewDir,position,mInvEmpty,rectCoords0,rectCoords1,rectCoords2,rectCoords3,emissionTexture,emissionTextureSampler);return result;}
`;e.IncludesShadersStoreWGSL[x]||(e.IncludesShadersStoreWGSL[x]=S);var ie={name:x,shader:S},C=`pbrDirectLightingSetupFunctions`,w=`struct preLightingInfo
{lightOffset: vec3f,
lightDistanceSquared: f32,
lightDistance: f32,
attenuation: f32,
L: vec3f,
H: vec3f,
NdotV: f32,
NdotLUnclamped: f32,
NdotL: f32,
VdotH: f32,
LdotV: f32,
roughness: f32,
diffuseRoughness: f32,
surfaceAlbedo: vec3f,
#ifdef IRIDESCENCE
iridescenceIntensity: f32,
#endif
#if defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
areaLightDiffuse: vec3f,
#ifdef SPECULARTERM
areaLightSpecular: vec3f,
areaLightFresnel: vec4f
#endif
#endif
};fn computePointAndSpotPreLightingInfo(lightData: vec4f,V: vec3f,N: vec3f,posW: vec3f)->preLightingInfo {var result: preLightingInfo;result.lightOffset=lightData.xyz-posW;result.lightDistanceSquared=dot(result.lightOffset,result.lightOffset);result.lightDistance=sqrt(result.lightDistanceSquared);result.L=normalize(result.lightOffset);result.H=normalize(V+result.L);result.VdotH=saturate(dot(V,result.H));result.NdotLUnclamped=dot(N,result.L);result.NdotL=saturateEps(result.NdotLUnclamped);return result;}
fn computeDirectionalPreLightingInfo(lightData: vec4f,V: vec3f,N: vec3f)->preLightingInfo {var result: preLightingInfo;result.lightDistance=length(-lightData.xyz);result.L=normalize(-lightData.xyz);result.H=normalize(V+result.L);result.VdotH=saturate(dot(V,result.H));result.NdotLUnclamped=dot(N,result.L);result.NdotL=saturateEps(result.NdotLUnclamped);result.LdotV=dot(result.L,V);return result;}
fn computeHemisphericPreLightingInfo(lightData: vec4f,V: vec3f,N: vec3f)->preLightingInfo {var result: preLightingInfo;result.NdotL=dot(N,lightData.xyz)*0.5+0.5;result.NdotL=saturateEps(result.NdotL);result.NdotLUnclamped=result.NdotL;
#ifdef SPECULARTERM
result.L=normalize(lightData.xyz);result.H=normalize(V+result.L);result.VdotH=saturate(dot(V,result.H));
#endif
return result;}
#if defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
#include<ltcHelperFunctions>
var areaLightsLTC1SamplerSampler: sampler;var areaLightsLTC1Sampler: texture_2d<f32>;var areaLightsLTC2SamplerSampler: sampler;var areaLightsLTC2Sampler: texture_2d<f32>;fn computeAreaPreLightingInfo(ltc1: texture_2d<f32>,ltc1Sampler:sampler,ltc2:texture_2d<f32>,ltc2Sampler:sampler,viewDirectionW: vec3f,vNormal:vec3f,vPosition:vec3f,lightCenter:vec3f,halfWidth:vec3f, halfHeight:vec3f,roughness:f32)->preLightingInfo {var result: preLightingInfo;var data: areaLightData=computeAreaLightSpecularDiffuseFresnel(ltc1,ltc1Sampler,ltc2,ltc2Sampler,viewDirectionW,vNormal,vPosition,lightCenter,halfWidth,halfHeight,roughness);
#ifdef SPECULARTERM
result.areaLightFresnel=data.Fresnel;result.areaLightSpecular=data.Specular;
#endif
result.areaLightDiffuse+=data.Diffuse;return result;}
fn computeAreaPreLightingInfoWithTexture(ltc1: texture_2d<f32>,ltc1Sampler:sampler,ltc2:texture_2d<f32>,ltc2Sampler:sampler,emissionTexture:texture_2d<f32>,emissionTextureSampler:sampler,viewDirectionW: vec3f,vNormal:vec3f,vPosition:vec3f,lightCenter:vec3f,halfWidth:vec3f, halfHeight:vec3f,roughness:f32)->preLightingInfo {var result: preLightingInfo;result.lightOffset=lightCenter-vPosition;result.lightDistanceSquared=dot(result.lightOffset,result.lightOffset);result.lightDistance=sqrt(result.lightDistanceSquared);var data: areaLightData=computeAreaLightSpecularDiffuseFresnelWithEmission(ltc1,ltc1Sampler,ltc2,ltc2Sampler,emissionTexture,emissionTextureSampler,viewDirectionW,vNormal,vPosition,lightCenter,halfWidth,halfHeight,roughness);
#ifdef SPECULARTERM
result.areaLightFresnel=data.Fresnel;result.areaLightSpecular=data.Specular;
#endif
result.areaLightDiffuse=data.Diffuse;result.LdotV=0.;result.roughness=0.;result.diffuseRoughness=0.;result.surfaceAlbedo=vec3f(0.);return result;}
#endif
`;e.IncludesShadersStoreWGSL[C]||(e.IncludesShadersStoreWGSL[C]=w);var T={name:C,shader:w},E=`pbrDirectLightingFalloffFunctions`,D=`fn computeDistanceLightFalloff_Standard(lightOffset: vec3f,range: f32)->f32
{return max(0.,1.0-length(lightOffset)/range);}
fn computeDistanceLightFalloff_Physical(lightDistanceSquared: f32)->f32
{return 1.0/maxEps(lightDistanceSquared);}
fn computeDistanceLightFalloff_GLTF(lightDistanceSquared: f32,inverseSquaredRange: f32)->f32
{var lightDistanceFalloff: f32=1.0/maxEps(lightDistanceSquared);var factor: f32=lightDistanceSquared*inverseSquaredRange;var attenuation: f32=saturate(1.0-factor*factor);attenuation*=attenuation;lightDistanceFalloff*=attenuation;return lightDistanceFalloff;}
fn computeDirectionalLightFalloff_IES(lightDirection: vec3f,directionToLightCenterW: vec3f,iesLightTexture: texture_2d<f32>,iesLightTextureSampler: sampler)->f32
{var cosAngle: f32=dot(-lightDirection,directionToLightCenterW);var angle=acos(cosAngle)/PI;return textureSampleLevel(iesLightTexture,iesLightTextureSampler,vec2f(angle,0),0.).r;}
fn computeDistanceLightFalloff(lightOffset: vec3f,lightDistanceSquared: f32,range: f32,inverseSquaredRange: f32)->f32
{
#ifdef USEPHYSICALLIGHTFALLOFF
return computeDistanceLightFalloff_Physical(lightDistanceSquared);
#elif defined(USEGLTFLIGHTFALLOFF)
return computeDistanceLightFalloff_GLTF(lightDistanceSquared,inverseSquaredRange);
#else
return computeDistanceLightFalloff_Standard(lightOffset,range);
#endif
}
fn computeDirectionalLightFalloff_Standard(lightDirection: vec3f,directionToLightCenterW: vec3f,cosHalfAngle: f32,exponent: f32)->f32
{var falloff: f32=0.0;var cosAngle: f32=maxEps(dot(-lightDirection,directionToLightCenterW));if (cosAngle>=cosHalfAngle)
{falloff=max(0.,pow(cosAngle,exponent));}
return falloff;}
fn computeDirectionalLightFalloff_Physical(lightDirection: vec3f,directionToLightCenterW: vec3f,cosHalfAngle: f32)->f32
{const kMinusLog2ConeAngleIntensityRatio: f32=6.64385618977; 
var concentrationKappa: f32=kMinusLog2ConeAngleIntensityRatio/(1.0-cosHalfAngle);var lightDirectionSpreadSG: vec4f= vec4f(-lightDirection*concentrationKappa,-concentrationKappa);var falloff: f32=exp2(dot( vec4f(directionToLightCenterW,1.0),lightDirectionSpreadSG));return falloff;}
fn computeDirectionalLightFalloff_GLTF(lightDirection: vec3f,directionToLightCenterW: vec3f,lightAngleScale: f32,lightAngleOffset: f32)->f32
{var cd: f32=dot(-lightDirection,directionToLightCenterW);var falloff: f32=saturate(cd*lightAngleScale+lightAngleOffset);falloff*=falloff;return falloff;}
fn computeDirectionalLightFalloff(lightDirection: vec3f,directionToLightCenterW: vec3f,cosHalfAngle: f32,exponent: f32,lightAngleScale: f32,lightAngleOffset: f32)->f32
{
#ifdef USEPHYSICALLIGHTFALLOFF
return computeDirectionalLightFalloff_Physical(lightDirection,directionToLightCenterW,cosHalfAngle);
#elif defined(USEGLTFLIGHTFALLOFF)
return computeDirectionalLightFalloff_GLTF(lightDirection,directionToLightCenterW,lightAngleScale,lightAngleOffset);
#else
return computeDirectionalLightFalloff_Standard(lightDirection,directionToLightCenterW,cosHalfAngle,exponent);
#endif
}`;e.IncludesShadersStoreWGSL[E]||(e.IncludesShadersStoreWGSL[E]=D);var O={name:E,shader:D},k=`hdrFilteringFunctions`,A=`#ifdef NUM_SAMPLES
#if NUM_SAMPLES>0
fn radicalInverse_VdC(value: u32)->f32 
{var bits=(value<<16u) | (value>>16u);bits=((bits & 0x55555555u)<<1u) | ((bits & 0xAAAAAAAAu)>>1u);bits=((bits & 0x33333333u)<<2u) | ((bits & 0xCCCCCCCCu)>>2u);bits=((bits & 0x0F0F0F0Fu)<<4u) | ((bits & 0xF0F0F0F0u)>>4u);bits=((bits & 0x00FF00FFu)<<8u) | ((bits & 0xFF00FF00u)>>8u);return f32(bits)*2.3283064365386963e-10; }
fn hammersley(i: u32,N: u32)->vec2f
{return vec2f( f32(i)/ f32(N),radicalInverse_VdC(i));}
fn log4(x: f32)->f32 {return log2(x)/2.;}
fn uv_to_normal(uv: vec2f)->vec3f {var N: vec3f;var uvRange: vec2f=uv;var theta: f32=uvRange.x*2.0*PI;var phi: f32=uvRange.y*PI;N.x=cos(theta)*sin(phi);N.z=sin(theta)*sin(phi);N.y=cos(phi);return N;}
const NUM_SAMPLES_FLOAT: f32= f32(NUM_SAMPLES);const NUM_SAMPLES_FLOAT_INVERSED: f32=1./NUM_SAMPLES_FLOAT;const K: f32=4.;fn irradiance(
#ifdef CUSTOM_IRRADIANCE_FILTERING_INPUT
CUSTOM_IRRADIANCE_FILTERING_INPUT
#else
inputTexture: texture_cube<f32>,inputSampler: sampler,
#endif
inputN: vec3f,
filteringInfo: vec2f,
diffuseRoughness: f32,
surfaceAlbedo: vec3f,
inputV: vec3f
#ifdef IBL_CDF_FILTERING
,icdfSampler: texture_2d<f32>,icdfSamplerSampler: sampler
#endif
)->vec3f
{var n: vec3f=normalize(inputN);var result: vec3f= vec3f(0.0);
#ifndef IBL_CDF_FILTERING
var tangent: vec3f=select(vec3f(1.,0.,0.),vec3f(0.,0.,1.),abs(n.z)<0.999);tangent=normalize(cross(tangent,n));var bitangent: vec3f=cross(n,tangent);var tbn: mat3x3f= mat3x3f(tangent,bitangent,n);var tbnInverse: mat3x3f=transpose(tbn);
#endif
var maxLevel: f32=filteringInfo.y;var dim0: f32=filteringInfo.x;var omegaP: f32=(4.*PI)/(6.*dim0*dim0);var clampedAlbedo: vec3f=clamp(surfaceAlbedo,vec3f(0.1),vec3f(1.0));for(var i: u32=0u; i<NUM_SAMPLES; i++)
{var Xi: vec2f=hammersley(i,NUM_SAMPLES);
#ifdef IBL_CDF_FILTERING
var T: vec2f;T.x=textureSampleLevel(icdfSampler,icdfSamplerSampler,vec2(Xi.x,0.0),0.0).x;T.y=textureSampleLevel(icdfSampler,icdfSamplerSampler,vec2(T.x,Xi.y),0.0).y;var Ls: vec3f=uv_to_normal(vec2f(1.0-fract(T.x+0.25),T.y));var NoL: f32=dot(n,Ls);var NoV: f32=dot(n,inputV);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
var LoV: f32=dot(Ls,inputV);
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
var H: vec3f=(inputV+Ls)*0.5;var VoH: f32=dot(inputV,H);
#endif 
#else
var Ls: vec3f=hemisphereCosSample(Xi);Ls=normalize(Ls);var Ns: vec3f= vec3f(0.,0.,1.);var NoL: f32=dot(Ns,Ls);var V: vec3f=tbnInverse*inputV;var NoV: f32=dot(Ns,V);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
var LoV: f32=dot(Ls,V);
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
var H: vec3f=(V+Ls)*0.5;var VoH: f32=dot(V,H);
#endif
#endif
if (NoL>0.) {
#ifdef IBL_CDF_FILTERING
var pdf: f32=textureSampleLevel(icdfSampler,icdfSamplerSampler,T,0.0).z;var c: vec3f=textureSampleLevel(inputTexture,inputSampler,Ls,0.0).rgb;
#else
var pdf_inversed: f32=PI/NoL;var omegaS: f32=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;var l: f32=log4(omegaS)-log4(omegaP)+log4(K);var mipLevel: f32=clamp(l,0.0,maxLevel);
#ifdef CUSTOM_IRRADIANCE_FILTERING_FUNCTION
CUSTOM_IRRADIANCE_FILTERING_FUNCTION
#else
var c: vec3f=textureSampleLevel(inputTexture,inputSampler,tbn*Ls,mipLevel).rgb;
#endif
#endif
#ifdef GAMMA_INPUT
c=toLinearSpaceVec3(c);
#endif
var diffuseRoughnessTerm: vec3f=vec3f(1.0);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
diffuseRoughnessTerm=diffuseBRDF_EON(clampedAlbedo,diffuseRoughness,NoL,NoV,LoV)*PI;
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
diffuseRoughnessTerm=vec3f(diffuseBRDF_Burley(NoL,NoV,VoH,diffuseRoughness)*PI);
#endif
#ifdef IBL_CDF_FILTERING
var light: vec3f=vec3f(0.0);if (pdf>1e-6) {light=vec3f(1.0)/vec3f(pdf)*c;}
result+=NoL*diffuseRoughnessTerm*light;
#else
result+=c*diffuseRoughnessTerm;
#endif
}}
result=result*NUM_SAMPLES_FLOAT_INVERSED;
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
result=result/clampedAlbedo;
#endif
return result;}
fn radiance(alphaG: f32,inputTexture: texture_cube<f32>,inputSampler: sampler,inputN: vec3f,filteringInfo: vec2f)->vec3f
{var n: vec3f=normalize(inputN);var c: vec3f=textureSampleLevel(inputTexture,inputSampler,n,0.0).rgb; 
if (alphaG==0.) {
#ifdef GAMMA_INPUT
c=toLinearSpaceVec3(c);
#endif
return c;} else {var result: vec3f= vec3f(0.);var tangent: vec3f=select(vec3f(1.,0.,0.),vec3f(0.,0.,1.),abs(n.z)<0.999);tangent=normalize(cross(tangent,n));var bitangent: vec3f=cross(n,tangent);var tbn: mat3x3f= mat3x3f(tangent,bitangent,n);var maxLevel: f32=filteringInfo.y;var dim0: f32=filteringInfo.x;var omegaP: f32=(4.*PI)/(6.*dim0*dim0);var weight: f32=0.;for(var i: u32=0u; i<NUM_SAMPLES; i++)
{var Xi: vec2f=hammersley(i,NUM_SAMPLES);var H: vec3f=hemisphereImportanceSampleDggx(Xi,alphaG);var NoV: f32=1.;var NoH: f32=H.z;var NoH2: f32=H.z*H.z;var NoL: f32=2.*NoH2-1.;var L: vec3f= vec3f(2.*NoH*H.x,2.*NoH*H.y,NoL);L=normalize(L);if (NoL>0.) {var pdf_inversed: f32=4./normalDistributionFunction_TrowbridgeReitzGGX(NoH,alphaG);var omegaS: f32=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;var l: f32=log4(omegaS)-log4(omegaP)+log4(K);var mipLevel: f32=clamp( f32(l),0.0,maxLevel);weight+=NoL;var c: vec3f=textureSampleLevel(inputTexture,inputSampler,tbn*L,mipLevel).rgb;
#ifdef GAMMA_INPUT
c=toLinearSpaceVec3(c);
#endif
result+=c*NoL;}}
result=result/weight;return result;}}
#ifdef ANISOTROPIC
fn radianceAnisotropic(
alphaTangent: f32, 
alphaBitangent: f32, 
inputTexture: texture_cube<f32>,
inputSampler: sampler,
inputView: vec3f, 
inputTangent: vec3f, 
inputBitangent: vec3f, 
inputNormal: vec3f, 
filteringInfo: vec2f,
noiseInput: vec2f, 
isRefraction: bool,
ior: f32 
)->vec3f {var V: vec3f=inputView;var N: vec3f=inputNormal;var T: vec3f=inputTangent;var B: vec3f=inputBitangent;var result: vec3f=vec3f(0.f);var maxLevel: f32=filteringInfo.y;var dim0: f32=filteringInfo.x;let clampedAlphaT: f32=max(alphaTangent,MINIMUMVARIANCE);let clampedAlphaB: f32=max(alphaBitangent,MINIMUMVARIANCE);var effectiveDim: f32=dim0*sqrt(clampedAlphaT*clampedAlphaB);var omegaP: f32=(4.f*PI)/(6.f*effectiveDim*effectiveDim);let noiseScale: f32=clamp(log2(f32(NUM_SAMPLES))/12.0f,0.0f,1.0f);var weight: f32=0.f;for(var i: u32=0u; i<NUM_SAMPLES; i++)
{var Xi: vec2f=hammersley(i,NUM_SAMPLES);Xi=fract(Xi+noiseInput*mix(0.5f,0.015f,noiseScale)); 
var H_tangent: vec3f=hemisphereImportanceSampleDggxAnisotropic(Xi,clampedAlphaT,clampedAlphaB);var H: vec3f=normalize(H_tangent.x*T+H_tangent.y*B+H_tangent.z*N);var L: vec3f;if (isRefraction) {L=refract(-V,H,1.0/ior);} else {L=reflect(-V,H);}
var NoH: f32=max(dot(N,H),0.001f);var VoH: f32=max(dot(V,H),0.001f);var NoL: f32=max(dot(N,L),0.001f);if (NoL>0.f) {var pdf_inversed: f32=4./normalDistributionFunction_BurleyGGX_Anisotropic(
H_tangent.z,H_tangent.x,H_tangent.y,vec2f(clampedAlphaT,clampedAlphaB)
);var omegaS: f32=NUM_SAMPLES_FLOAT_INVERSED*pdf_inversed;var l: f32=log4(omegaS)-log4(omegaP)+log4(K);var mipLevel: f32=clamp(l,0.0f,maxLevel);weight+=NoL;var c: vec3f=textureSampleLevel(inputTexture,inputSampler,L,mipLevel).rgb;
#if GAMMA_INPUT
c=toLinearSpaceVec3(c);
#endif
result+=c*NoL;}}
result=result/weight;return result;}
#endif
#endif
#endif
`;e.IncludesShadersStoreWGSL[k]||(e.IncludesShadersStoreWGSL[k]=A);var j={name:k,shader:A},M=`clusteredLightingFunctions`,N=`struct ClusteredLight {vLightData: vec4f,
vLightDiffuse: vec4f,
vLightSpecular: vec4f,
vLightDirection: vec4f,
vLightFalloff: vec4f,}
fn getClusteredLight(lightDataTexture: texture_2d<f32>,index: u32)->ClusteredLight {return ClusteredLight(
textureLoad(lightDataTexture,vec2u(0,index),0),
textureLoad(lightDataTexture,vec2u(1,index),0),
textureLoad(lightDataTexture,vec2u(2,index),0),
textureLoad(lightDataTexture,vec2u(3,index),0),
textureLoad(lightDataTexture,vec2u(4,index),0)
);}
fn getClusteredSliceIndex(sliceData: vec2f,viewDepth: f32)->i32 {return i32(log(viewDepth)*sliceData.x+sliceData.y);}
`;e.IncludesShadersStoreWGSL[M]||(e.IncludesShadersStoreWGSL[M]=N);var ae={name:M,shader:N},P=`pbrBlockReflectance0`,F=`var reflectanceF0: f32=reflectivityOut.reflectanceF0;var specularEnvironmentR0: vec3f=reflectivityOut.colorReflectanceF0;var specularEnvironmentR90: vec3f= reflectivityOut.reflectanceF90;
#ifdef ALPHAFRESNEL
var reflectance90: f32=fresnelGrazingReflectance(reflectanceF0);specularEnvironmentR90=specularEnvironmentR90*reflectance90;
#endif
`;e.IncludesShadersStoreWGSL[P]||(e.IncludesShadersStoreWGSL[P]=F);var oe={name:P,shader:F},I=`pbrClusteredLightingFunctions`,L=`#if defined(CLUSTLIGHT{X}) && defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
fn computeClusteredLighting{X}(
lightDataTexture: texture_2d<f32>,
lightData: vec4f,
sliceRange: vec2u,
V: vec3f,
N: vec3f,
posW: vec3f,
surfaceAlbedo: vec3f,
reflectivityOut: reflectivityOutParams,
#ifdef IRIDESCENCE
iridescenceIntensity: f32,
#endif
#ifdef SS_TRANSLUCENCY
subSurfaceOut: subSurfaceOutParams,
#endif
#ifdef SPECULARTERM
AARoughnessFactor: f32,
#endif
#ifdef ANISOTROPIC
anisotropicOut: anisotropicOutParams,
#endif
#ifdef SHEEN
sheenOut: sheenOutParams,
#endif
#ifdef CLEARCOAT
clearcoatOut: clearcoatOutParams,
#endif
)->lightingInfo {let NdotV=absEps(dot(N,V));
#include<pbrBlockReflectance0>
#ifdef CLEARCOAT
specularEnvironmentR0=clearcoatOut.specularEnvironmentR0;
#endif
var result: lightingInfo;let tilePosition=vec2u(fragmentInputs.position.xy*lightData.xy);let maskResolution=vec2u(lightData.zw);var tileIndex=(tilePosition.x*maskResolution.x+tilePosition.y)*maskResolution.y;let batchRange=sliceRange/CLUSTLIGHT_BATCH;var batchOffset=batchRange.x*CLUSTLIGHT_BATCH;tileIndex+=batchRange.x;for (var i=batchRange.x; i<=batchRange.y; i+=1) {var mask=tileMaskBuffer{X}[tileIndex];tileIndex+=1;let maskOffset=max(sliceRange.x,batchOffset)-batchOffset; 
let maskWidth=min(sliceRange.y-batchOffset+1,CLUSTLIGHT_BATCH);mask=extractBits(mask,maskOffset,maskWidth);while mask != 0 {let trailing=firstTrailingBit(mask);mask ^= 1u<<trailing;let light=getClusteredLight(lightDataTexture,batchOffset+maskOffset+trailing);var preInfo=computePointAndSpotPreLightingInfo(light.vLightData,V,N,posW);preInfo.NdotV=NdotV;preInfo.attenuation=computeDistanceLightFalloff(preInfo.lightOffset,preInfo.lightDistanceSquared,light.vLightFalloff.x,light.vLightFalloff.y);if light.vLightDirection.w>=0.0 {preInfo.attenuation*=computeDirectionalLightFalloff(light.vLightDirection.xyz,preInfo.L,light.vLightDirection.w,light.vLightData.w,light.vLightFalloff.z,light.vLightFalloff.w);}
preInfo.roughness=adjustRoughnessFromLightProperties(reflectivityOut.roughness,light.vLightSpecular.a,preInfo.lightDistance);preInfo.diffuseRoughness=reflectivityOut.diffuseRoughness;preInfo.surfaceAlbedo=surfaceAlbedo;
#ifdef IRIDESCENCE
preInfo.iridescenceIntensity=iridescenceIntensity;
#endif
var info: lightingInfo;
#ifdef SS_TRANSLUCENCY
#ifdef SS_TRANSLUCENCY_LEGACY
info.diffuse=computeDiffuseTransmittedLighting(preInfo,light.vLightDiffuse.rgb,subSurfaceOut.transmittance);info.diffuseTransmission=vec3(0);
#else
info.diffuse=computeDiffuseLighting(preInfo,light.vLightDiffuse.rgb)*(1.0-subSurfaceOut.translucencyIntensity);info.diffuseTransmission=computeDiffuseTransmittedLighting(preInfo,light.vLightDiffuse.rgb,subSurfaceOut.transmittance);
#endif
#else
info.diffuse=computeDiffuseLighting(preInfo,light.vLightDiffuse.rgb);
#endif
#ifdef SPECULARTERM
#if CONDUCTOR_SPECULAR_MODEL==CONDUCTOR_SPECULAR_MODEL_OPENPBR
let metalFresnel=reflectivityOut.specularWeight*getF82Specular(preInfo.VdotH,specularEnvironmentR0,reflectivityOut.colorReflectanceF90,reflectivityOut.roughness);let dielectricFresnel=fresnelSchlickGGXVec3(preInfo.VdotH,reflectivityOut.dielectricColorF0,reflectivityOut.colorReflectanceF90);let coloredFresnel=mix(dielectricFresnel,metalFresnel,reflectivityOut.metallic);
#else
let coloredFresnel=fresnelSchlickGGXVec3(preInfo.VdotH,specularEnvironmentR0,reflectivityOut.colorReflectanceF90);
#endif
#ifndef LEGACY_SPECULAR_ENERGY_CONSERVATION
let NdotH=dot(N,preInfo.H);let fresnel=fresnelSchlickGGXVec3(NdotH,vec3(reflectanceF0),specularEnvironmentR90);info.diffuse*=(vec3(1.0)-fresnel);
#endif
#ifdef ANISOTROPIC
info.specular=computeAnisotropicSpecularLighting(preInfo,V,N,anisotropicOut.anisotropicTangent,anisotropicOut.anisotropicBitangent,anisotropicOut.anisotropy,specularEnvironmentR0,specularEnvironmentR90,AARoughnessFactor,light.vLightDiffuse.rgb);
#else
info.specular=computeSpecularLighting(preInfo,N,specularEnvironmentR0,coloredFresnel,AARoughnessFactor,light.vLightDiffuse.rgb);
#endif
#endif
#ifdef SHEEN
#ifdef SHEEN_LINKWITHALBEDO
preInfo.roughness=sheenOut.sheenIntensity;
#else
preInfo.roughness=adjustRoughnessFromLightProperties(sheenOut.sheenRoughness,light.vLightSpecular.a,preInfo.lightDistance);
#endif
info.sheen=computeSheenLighting(preInfo,normalW,sheenOut.sheenColor,specularEnvironmentR90,AARoughnessFactor,light.vLightDiffuse.rgb);
#endif
#ifdef CLEARCOAT
preInfo.roughness=adjustRoughnessFromLightProperties(clearcoatOut.clearCoatRoughness,light.vLightSpecular.a,preInfo.lightDistance);info.clearCoat=computeClearCoatLighting(preInfo,clearcoatOut.clearCoatNormalW,clearcoatOut.clearCoatAARoughnessFactors.x,clearcoatOut.clearCoatIntensity,light.vLightDiffuse.rgb);
#ifdef CLEARCOAT_TINT
let absorption=computeClearCoatLightingAbsorption(clearcoatOut.clearCoatNdotVRefract,preInfo.L,clearcoatOut.clearCoatNormalW,clearcoatOut.clearCoatColor,clearcoatOut.clearCoatThickness,clearcoatOut.clearCoatIntensity);info.diffuse*=absorption;
#ifdef SS_TRANSLUCENCY
info.diffuseTransmission*=absorption;
#endif
#ifdef SPECULARTERM
info.specular*=absorption;
#endif
#endif
info.diffuse*=info.clearCoat.w;
#ifdef SS_TRANSLUCENCY
info.diffuseTransmission*=info.clearCoat.w;
#endif
#ifdef SPECULARTERM
info.specular*=info.clearCoat.w;
#endif
#ifdef SHEEN
info.sheen*=info.clearCoat.w;
#endif
#endif
result.diffuse+=info.diffuse;
#ifdef SS_TRANSLUCENCY
result.diffuseTransmission+=info.diffuseTransmission;
#endif
#ifdef SPECULARTERM
result.specular+=info.specular;
#endif
#ifdef CLEARCOAT
result.clearCoat+=info.clearCoat;
#endif
#ifdef SHEEN
result.sheen+=info.sheen;
#endif
}
batchOffset+=CLUSTLIGHT_BATCH;}
return result;}
#endif
`;e.IncludesShadersStoreWGSL[I]||(e.IncludesShadersStoreWGSL[I]=L);var R={name:I,shader:L},z=`pbrDirectLightingFunctions`,B=`#define CLEARCOATREFLECTANCE90 1.0
struct lightingInfo
{diffuse: vec3f,
#ifdef SS_TRANSLUCENCY
diffuseTransmission: vec3f,
#endif
#ifdef SPECULARTERM
specular: vec3f,
#endif
#ifdef CLEARCOAT
clearCoat: vec4f,
#endif
#ifdef SHEEN
sheen: vec3f
#endif
};fn adjustRoughnessFromLightProperties(roughness: f32,lightRadius: f32,lightDistance: f32)->f32 {
#if defined(USEPHYSICALLIGHTFALLOFF) || defined(USEGLTFLIGHTFALLOFF)
var lightRoughness: f32=lightRadius/lightDistance;var totalRoughness: f32=saturate(lightRoughness+roughness);return totalRoughness;
#else
return roughness;
#endif
}
fn computeHemisphericDiffuseLighting(info: preLightingInfo,lightColor: vec3f,groundColor: vec3f)->vec3f {return mix(groundColor,lightColor,info.NdotL);}
#if defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
fn computeAreaDiffuseLighting(info: preLightingInfo,lightColor: vec3f)->vec3f {return info.areaLightDiffuse*lightColor;}
#endif
fn computeDiffuseLighting(info: preLightingInfo,lightColor: vec3f)->vec3f {var diffuseTerm: vec3f=vec3f(1.0/PI);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_LEGACY
diffuseTerm=vec3f(diffuseBRDF_Burley(info.NdotL,info.NdotV,info.VdotH,info.roughness));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
diffuseTerm=vec3f(diffuseBRDF_Burley(info.NdotL,info.NdotV,info.VdotH,info.diffuseRoughness));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
var clampedAlbedo: vec3f=clamp(info.surfaceAlbedo,vec3f(0.1),vec3f(1.0));diffuseTerm=diffuseBRDF_EON(clampedAlbedo,info.diffuseRoughness,info.NdotL,info.NdotV,info.LdotV);diffuseTerm/=clampedAlbedo;
#endif
return diffuseTerm*info.attenuation*info.NdotL*lightColor;}
fn computeProjectionTextureDiffuseLighting(projectionLightTexture: texture_2d<f32>,projectionLightSampler: sampler,textureProjectionMatrix: mat4x4f,posW: vec3f)->vec3f{var strq: vec4f=textureProjectionMatrix* vec4f(posW,1.0);strq/=strq.w;var textureColor: vec3f=textureSample(projectionLightTexture,projectionLightSampler,strq.xy).rgb;return toLinearSpaceVec3(textureColor);}
#ifdef SS_TRANSLUCENCY
fn computeDiffuseTransmittedLighting(info: preLightingInfo,lightColor: vec3f,transmittance: vec3f)->vec3f {var transmittanceNdotL=vec3f(0.0);var NdotL: f32=absEps(info.NdotLUnclamped);
#ifndef SS_TRANSLUCENCY_LEGACY
if (info.NdotLUnclamped<0.0) {
#endif
var wrapNdotL: f32=computeWrappedDiffuseNdotL(NdotL,0.02);var trAdapt: f32=step(0.,info.NdotLUnclamped);transmittanceNdotL=mix(transmittance*wrapNdotL, vec3f(wrapNdotL),trAdapt);
#ifndef SS_TRANSLUCENCY_LEGACY
}
var diffuseTerm : vec3f=vec3f(1.0/PI);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_LEGACY
diffuseTerm=vec3f(diffuseBRDF_Burley(
info.NdotL,info.NdotV,info.VdotH,info.roughness));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
diffuseTerm=vec3f(diffuseBRDF_Burley(
info.NdotL,info.NdotV,info.VdotH,info.diffuseRoughness));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
var clampedAlbedo: vec3f=clamp(info.surfaceAlbedo,vec3f(0.1),vec3f(1.0));diffuseTerm=diffuseBRDF_EON(clampedAlbedo,info.diffuseRoughness,
info.NdotL,info.NdotV,info.LdotV);diffuseTerm/=clampedAlbedo;
#endif
return (transmittanceNdotL*diffuseTerm)*info.attenuation*lightColor;
#else
let diffuseTerm=diffuseBRDF_Burley(NdotL,info.NdotV,info.VdotH,info.roughness);return diffuseTerm*transmittanceNdotL*info.attenuation*lightColor;
#endif
}
#endif
#ifdef SPECULARTERM
fn computeSpecularLighting(info: preLightingInfo,N: vec3f,reflectance0: vec3f,fresnel: vec3f,geometricRoughnessFactor: f32,lightColor: vec3f)->vec3f {var NdotH: f32=saturateEps(dot(N,info.H));var roughness: f32=max(info.roughness,geometricRoughnessFactor);var alphaG: f32=convertRoughnessToAverageSlope(roughness);var modifiedFresnel: vec3f=fresnel;
#ifdef IRIDESCENCE
modifiedFresnel=mix(fresnel,reflectance0,info.iridescenceIntensity);
#endif
var distribution: f32=normalDistributionFunction_TrowbridgeReitzGGX(NdotH,alphaG);
#ifdef BRDF_V_HEIGHT_CORRELATED
var smithVisibility: f32=smithVisibility_GGXCorrelated(info.NdotL,info.NdotV,alphaG);
#else
var smithVisibility: f32=smithVisibility_TrowbridgeReitzGGXFast(info.NdotL,info.NdotV,alphaG);
#endif
var specTerm: vec3f=modifiedFresnel*distribution*smithVisibility;return specTerm*info.attenuation*info.NdotL*lightColor;}
#if defined(AREALIGHTUSED) && defined(AREALIGHTSUPPORTED)
fn computeAreaSpecularLighting(info: preLightingInfo,specularColor: vec3f,reflectance0: vec3f,reflectance90: vec3f)->vec3f {var fresnel:vec3f =reflectance0*specularColor*info.areaLightFresnel.x+( vec3f( 1.0 )-specularColor )*info.areaLightFresnel.y*reflectance90;return specularColor*fresnel*info.areaLightSpecular;}
fn computeOpenPBRAreaSpecularLighting(info: preLightingInfo,lightColor: vec3f,reflectance0: vec3f,reflectance90: vec3f)->vec3f {let fresnel: vec3f=reflectance0*info.areaLightFresnel.x+(reflectance90-reflectance0)*info.areaLightFresnel.y;return lightColor*fresnel*info.areaLightSpecular;}
#if CONDUCTOR_SPECULAR_MODEL==CONDUCTOR_SPECULAR_MODEL_OPENPBR
fn computeOpenPBRAreaConductorSpecularLighting(info: preLightingInfo,lightColor: vec3f,reflectance0: vec3f,edgeTint: vec3f)->vec3f {let b: vec3f=getF82B(reflectance0,edgeTint);let normalizedSchlickMoment: f32=clamp(info.areaLightFresnel.y/max(info.areaLightFresnel.x,Epsilon),0.0f,1.0f);let representativeOneMinusCosTheta: f32=pow(normalizedSchlickMoment,0.2f);let f82DipMoment: f32=info.areaLightFresnel.y*representativeOneMinusCosTheta*(1.0f-representativeOneMinusCosTheta);let fresnel: vec3f=reflectance0*info.areaLightFresnel.x+(vec3f(1.0f)-reflectance0)*info.areaLightFresnel.y-b*f82DipMoment;return lightColor*clamp(fresnel,vec3f(0.0f),vec3f(info.areaLightFresnel.x))*info.areaLightSpecular;}
#endif
fn computeOpenPBRAreaFresnel(info: preLightingInfo,reflectance0: f32,reflectance90: f32)->f32 {return reflectance0*info.areaLightFresnel.x+(reflectance90-reflectance0)*info.areaLightFresnel.y;}
#endif
#endif
#ifdef FUZZ
fn evalFuzz(L: vec3f,NdotL: f32,NdotV: f32,T: vec3f,B: vec3f,ltcLut: vec3f)->f32
{if (NdotL<=0.0f || NdotV<=0.0f) {return 0.0f;}
let M=mat3x3f(
vec3f(ltcLut.r,0.0f,0.0f),
vec3f(ltcLut.g,1.0f,0.0f),
vec3f(0.0f,0.0f,1.0f)
);let Llocal: vec3f=vec3f(dot(L,T),dot(L,B),NdotL);let Lwarp: vec3f=normalize(M*Llocal);let cosThetaWarp: f32=max(Lwarp.z,0.0f);return cosThetaWarp*NdotL;}
#endif
#if defined(ANISOTROPIC) && defined(ANISOTROPIC_OPENPBR)
fn computeAnisotropicSpecularLighting(info: preLightingInfo,V: vec3f,N: vec3f,T: vec3f,B: vec3f,anisotropy: f32,geometricRoughnessFactor: f32,lightColor: vec3f)->vec3f {var NdotH: f32=saturateEps(dot(N,info.H));var TdotH: f32=dot(T,info.H);var BdotH: f32=dot(B,info.H);var TdotV: f32=dot(T,V);var BdotV: f32=dot(B,V);var TdotL: f32=dot(T,info.L);var BdotL: f32=dot(B,info.L);var alphaG: f32=convertRoughnessToAverageSlope(info.roughness);var alphaTB: vec2f=getAnisotropicRoughness(alphaG,anisotropy);var distribution: f32=normalDistributionFunction_BurleyGGX_Anisotropic(NdotH,TdotH,BdotH,alphaTB);var smithVisibility: f32=smithVisibility_GGXCorrelated_Anisotropic(info.NdotL,info.NdotV,TdotV,BdotV,TdotL,BdotL,alphaTB);var specTerm: vec3f=vec3f(distribution*smithVisibility);return specTerm*info.attenuation*info.NdotL*lightColor;}
#elif defined(ANISOTROPIC)
fn computeAnisotropicSpecularLighting(info: preLightingInfo,V: vec3f,N: vec3f,T: vec3f,B: vec3f,anisotropy: f32,reflectance0: vec3f,reflectance90: vec3f,geometricRoughnessFactor: f32,lightColor: vec3f)->vec3f {var NdotH: f32=saturateEps(dot(N,info.H));var TdotH: f32=dot(T,info.H);var BdotH: f32=dot(B,info.H);var TdotV: f32=dot(T,V);var BdotV: f32=dot(B,V);var TdotL: f32=dot(T,info.L);var BdotL: f32=dot(B,info.L);var alphaG: f32=convertRoughnessToAverageSlope(info.roughness);var alphaTB: vec2f=getAnisotropicRoughness(alphaG,anisotropy);alphaTB=max(alphaTB,vec2f(geometricRoughnessFactor*geometricRoughnessFactor));var fresnel: vec3f=fresnelSchlickGGXVec3(info.VdotH,reflectance0,reflectance90);
#ifdef IRIDESCENCE
fresnel=mix(fresnel,reflectance0,info.iridescenceIntensity);
#endif
var distribution: f32=normalDistributionFunction_BurleyGGX_Anisotropic(NdotH,TdotH,BdotH,alphaTB);var smithVisibility: f32=smithVisibility_GGXCorrelated_Anisotropic(info.NdotL,info.NdotV,TdotV,BdotV,TdotL,BdotL,alphaTB);var specTerm: vec3f=fresnel*distribution*smithVisibility;return specTerm*info.attenuation*info.NdotL*lightColor;}
#endif
#ifdef CLEARCOAT
fn computeClearCoatLighting(info: preLightingInfo,Ncc: vec3f,geometricRoughnessFactor: f32,clearCoatIntensity: f32,lightColor: vec3f)->vec4f {var NccdotL: f32=saturateEps(dot(Ncc,info.L));var NccdotH: f32=saturateEps(dot(Ncc,info.H));var clearCoatRoughness: f32=max(info.roughness,geometricRoughnessFactor);var alphaG: f32=convertRoughnessToAverageSlope(clearCoatRoughness);var fresnel: f32=fresnelSchlickGGX(info.VdotH,uniforms.vClearCoatRefractionParams.x,CLEARCOATREFLECTANCE90);fresnel*=clearCoatIntensity;var distribution: f32=normalDistributionFunction_TrowbridgeReitzGGX(NccdotH,alphaG);var kelemenVisibility: f32=visibility_Kelemen(info.VdotH);var clearCoatTerm: f32=fresnel*distribution*kelemenVisibility;return vec4f(
clearCoatTerm*info.attenuation*NccdotL*lightColor,
1.0-fresnel
);}
fn computeClearCoatLightingAbsorption(NdotVRefract: f32,L: vec3f,Ncc: vec3f,clearCoatColor: vec3f,clearCoatThickness: f32,clearCoatIntensity: f32)->vec3f {var LRefract: vec3f=-refract(L,Ncc,uniforms.vClearCoatRefractionParams.y);var NdotLRefract: f32=saturateEps(dot(Ncc,LRefract));var absorption: vec3f=computeClearCoatAbsorption(NdotVRefract,NdotLRefract,clearCoatColor,clearCoatThickness,clearCoatIntensity);return absorption;}
#endif
#ifdef SHEEN
fn computeSheenLighting(info: preLightingInfo,N: vec3f,reflectance0: vec3f,reflectance90: vec3f,geometricRoughnessFactor: f32,lightColor: vec3f)->vec3f {var NdotH: f32=saturateEps(dot(N,info.H));var roughness: f32=max(info.roughness,geometricRoughnessFactor);var alphaG: f32=convertRoughnessToAverageSlope(roughness);var fresnel: f32=1.;var distribution: f32=normalDistributionFunction_CharlieSheen(NdotH,alphaG);/*#ifdef SHEEN_SOFTER
var visibility: f32=visibility_CharlieSheen(info.NdotL,info.NdotV,alphaG);
#else */
var visibility: f32=visibility_Ashikhmin(info.NdotL,info.NdotV);/* #endif */
var sheenTerm: f32=fresnel*distribution*visibility;return sheenTerm*info.attenuation*info.NdotL*lightColor;}
#endif
#if defined(CLUSTLIGHT_BATCH) && CLUSTLIGHT_BATCH>0
#include<clusteredLightingFunctions>
#include<pbrClusteredLightingFunctions>[0..maxSimultaneousLights]
#endif
`;e.IncludesShadersStoreWGSL[z]||(e.IncludesShadersStoreWGSL[z]=B);var V={name:z,shader:B},H=`pbrBlockNormalGeometric`,U=`var viewDirectionW: vec3f=normalize(scene.vEyePosition.xyz-input.vPositionW);
#ifdef NORMAL
var normalW: vec3f=normalize(input.vNormalW);
#else
var normalW: vec3f=normalize(cross(dpdx(input.vPositionW),dpdy(input.vPositionW)))*scene.vEyePosition.w;
#endif
var geometricNormalW: vec3f=normalW;
#if defined(TWOSIDEDLIGHTING) && defined(NORMAL)
geometricNormalW=select(-geometricNormalW,geometricNormalW,fragmentInputs.frontFacing);
#endif
`;e.IncludesShadersStoreWGSL[H]||(e.IncludesShadersStoreWGSL[H]=U);var W={name:H,shader:U},G=`depthPrePass`,K=`#ifdef DEPTHPREPASS
#if !defined(PREPASS) && !defined(ORDER_INDEPENDENT_TRANSPARENCY)
fragmentOutputs.color= vec4f(0.,0.,0.,1.0);
#endif
#ifndef DEPTHPREPASS_SKIP_EARLY_RETURN
return fragmentOutputs;
#endif
#endif
`;e.IncludesShadersStoreWGSL[G]||(e.IncludesShadersStoreWGSL[G]=K);var se={name:G,shader:K},q=`pbrBlockImageProcessing`,J=`#if defined(IMAGEPROCESSINGPOSTPROCESS) || defined(SS_SCATTERING)
#if !defined(SKIPFINALCOLORCLAMP)
finalColor=vec4f(clamp(finalColor.rgb,vec3f(0.),vec3f(30.0)),finalColor.a);
#endif
#else
finalColor=applyImageProcessing(finalColor);
#endif
finalColor=vec4f(finalColor.rgb,finalColor.a*mesh.visibility);
#ifdef PREMULTIPLYALPHA
finalColor=vec4f(finalColor.rgb*finalColor.a,finalColor.a);;
#endif
`;e.IncludesShadersStoreWGSL[q]||(e.IncludesShadersStoreWGSL[q]=J);var ce={name:q,shader:J},Y=`oitFragment`,X=`#ifdef ORDER_INDEPENDENT_TRANSPARENCY
var fragDepth: f32=fragmentInputs.position.z; 
#ifdef ORDER_INDEPENDENT_TRANSPARENCY_16BITS
var halfFloat: u32=pack2x16float( vec2f(fragDepth));var full: vec2f=unpack2x16float(halfFloat);fragDepth=full.x;
#endif
var fragCoord: vec2i=vec2i(fragmentInputs.position.xy);var lastDepth: vec2f=textureLoad(oitDepthSampler,fragCoord,0).rg;var lastFrontColor: vec4f=textureLoad(oitFrontColorSampler,fragCoord,0);fragmentOutputs.depth=vec2f(-MAX_DEPTH);fragmentOutputs.frontColor=lastFrontColor;fragmentOutputs.backColor= vec4f(0.0);
#ifdef USE_REVERSE_DEPTHBUFFER
var furthestDepth: f32=-lastDepth.x;var nearestDepth: f32=lastDepth.y;
#else
var nearestDepth: f32=-lastDepth.x;var furthestDepth: f32=lastDepth.y;
#endif
var alphaMultiplier: f32=1.0-lastFrontColor.a;
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth>nearestDepth || fragDepth<furthestDepth) {
#else
if (fragDepth<nearestDepth || fragDepth>furthestDepth) {
#endif
return fragmentOutputs;}
#ifdef USE_REVERSE_DEPTHBUFFER
if (fragDepth<nearestDepth && fragDepth>furthestDepth) {
#else
if (fragDepth>nearestDepth && fragDepth<furthestDepth) {
#endif
fragmentOutputs.depth=vec2f(-fragDepth,fragDepth);return fragmentOutputs;}
#endif
`;e.IncludesShadersStoreWGSL[Y]||(e.IncludesShadersStoreWGSL[Y]=X);var le={name:Y,shader:X},Z=`pbrDebug`,Q=`#if DEBUGMODE>0
if (input.vClipSpacePosition.x/input.vClipSpacePosition.w>=uniforms.vDebugMode.x) {var color: vec3f;
#if DEBUGMODE==1
color=fragmentInputs.vPositionW.rgb;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==2 && defined(NORMAL)
color=fragmentInputs.vNormalW.rgb;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==3 && defined(BUMP) || DEBUGMODE==3 && defined(PARALLAX) || DEBUGMODE==3 && defined(ANISOTROPIC)
color=TBN[0];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==4 && defined(BUMP) || DEBUGMODE==4 && defined(PARALLAX) || DEBUGMODE==4 && defined(ANISOTROPIC)
color=TBN[1];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==5
color=normalW;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==6 && defined(MAINUV1)
color= vec3f(input.vMainUV1,0.0);
#elif DEBUGMODE==7 && defined(MAINUV2)
color= vec3f(input.vMainUV2,0.0);
#elif DEBUGMODE==8 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)
color=clearcoatOut.TBNClearCoat[0];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==9 && defined(CLEARCOAT) && defined(CLEARCOAT_BUMP)
color=clearcoatOut.TBNClearCoat[1];
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==10 && defined(CLEARCOAT)
color=clearcoatOut.clearCoatNormalW;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==11 && defined(ANISOTROPIC)
color=anisotropicOut.anisotropicNormal;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==12 && defined(ANISOTROPIC)
color=anisotropicOut.anisotropicTangent;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==13 && defined(ANISOTROPIC)
color=anisotropicOut.anisotropicBitangent;
#define DEBUGMODE_NORMALIZE
#elif DEBUGMODE==20 && defined(ALBEDO)
color=albedoTexture.rgb;
#ifndef GAMMAALBEDO
#define DEBUGMODE_GAMMA
#endif
#elif DEBUGMODE==21 && defined(AMBIENT)
color=aoOut.ambientOcclusionColorMap.rgb;
#elif DEBUGMODE==22 && defined(OPACITY)
color=opacityMap.rgb;
#elif DEBUGMODE==23 && defined(EMISSIVE)
color=emissiveColorTex.rgb;
#ifndef GAMMAEMISSIVE
#define DEBUGMODE_GAMMA
#endif
#elif DEBUGMODE==24 && defined(LIGHTMAP)
color=lightmapColor;
#ifndef GAMMALIGHTMAP
#define DEBUGMODE_GAMMA
#endif
#elif DEBUGMODE==25 && defined(REFLECTIVITY) && defined(METALLICWORKFLOW)
color=reflectivityOut.surfaceMetallicColorMap.rgb;
#elif DEBUGMODE==26 && defined(REFLECTIVITY) && !defined(METALLICWORKFLOW)
color=reflectivityOut.surfaceReflectivityColorMap.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==27 && defined(CLEARCOAT) && defined(CLEARCOAT_TEXTURE)
color= vec3f(clearcoatOut.clearCoatMapData.rg,0.0);
#elif DEBUGMODE==28 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT) && defined(CLEARCOAT_TINT_TEXTURE)
color=clearcoatOut.clearCoatTintMapData.rgb;
#elif DEBUGMODE==29 && defined(SHEEN) && defined(SHEEN_TEXTURE)
color=sheenOut.sheenMapData.rgb;
#elif DEBUGMODE==30 && defined(ANISOTROPIC) && defined(ANISOTROPIC_TEXTURE)
color=anisotropicOut.anisotropyMapData.rgb;
#elif DEBUGMODE==31 && defined(SUBSURFACE) && defined(SS_THICKNESSANDMASK_TEXTURE)
color=subSurfaceOut.thicknessMap.rgb;
#elif DEBUGMODE==32 && defined(BUMP)
color=textureSample(bumpSampler,bumpSamplerSampler,fragmentInputs.vBumpUV).rgb;
#elif DEBUGMODE==40 && defined(SS_REFRACTION)
color=subSurfaceOut.environmentRefraction.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==41 && defined(REFLECTION)
color=reflectionOut.environmentRadiance.rgb;
#ifndef GAMMAREFLECTION
#define DEBUGMODE_GAMMA
#endif
#elif DEBUGMODE==42 && defined(CLEARCOAT) && defined(REFLECTION)
color=clearcoatOut.environmentClearCoatRadiance.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==50
color=diffuseBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==51 && defined(SPECULARTERM)
color=specularBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==52 && defined(CLEARCOAT)
color=clearCoatBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==53 && defined(SHEEN)
color=sheenBase.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==54 && defined(REFLECTION)
color=reflectionOut.environmentIrradiance.rgb;
#ifndef GAMMAREFLECTION
#define DEBUGMODE_GAMMA
#endif
#elif DEBUGMODE==60
color=surfaceAlbedo.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==61
color=clearcoatOut.specularEnvironmentR0;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==62 && defined(METALLICWORKFLOW)
color= vec3f(reflectivityOut.metallic);
#elif DEBUGMODE==71 && defined(METALLICWORKFLOW)
color=reflectivityOut.metallicF0;
#elif DEBUGMODE==63
color= vec3f(roughness);
#elif DEBUGMODE==64
color= vec3f(alphaG);
#elif DEBUGMODE==65
color= vec3f(NdotV);
#elif DEBUGMODE==66 && defined(CLEARCOAT) && defined(CLEARCOAT_TINT)
color=clearcoatOut.clearCoatColor;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==67 && defined(CLEARCOAT)
color= vec3f(clearcoatOut.clearCoatRoughness);
#elif DEBUGMODE==68 && defined(CLEARCOAT)
color= vec3f(clearcoatOut.clearCoatNdotV);
#elif DEBUGMODE==69 && defined(SUBSURFACE) && defined(SS_TRANSLUCENCY)
color=subSurfaceOut.transmittance;
#elif DEBUGMODE==70 && defined(SUBSURFACE) && defined(SS_REFRACTION)
color=subSurfaceOut.refractionTransmittance;
#elif DEBUGMODE==72
color= vec3f(microSurface);
#elif DEBUGMODE==73
color=uniforms.vAlbedoColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==74 && !defined(METALLICWORKFLOW)
color=uniforms.vReflectivityColor.rgb;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==75
color=uniforms.vEmissiveColor;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==80 && defined(RADIANCEOCCLUSION)
color= vec3f(seo);
#elif DEBUGMODE==81 && defined(HORIZONOCCLUSION) && defined(BUMP) && defined(REFLECTIONMAP_3D)
color= vec3f(eho);
#elif DEBUGMODE==82 && defined(MS_BRDF_ENERGY_CONSERVATION)
color= vec3f(energyConservationFactor);
#elif DEBUGMODE==83 && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
color=baseSpecularEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==84 && defined(CLEARCOAT) && defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
color=clearcoatOut.clearCoatEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==85 && defined(SHEEN) && defined(REFLECTION)
color=sheenOut.sheenEnvironmentReflectance;
#define DEBUGMODE_GAMMA
#elif DEBUGMODE==86 && defined(ALPHABLEND)
color= vec3f(luminanceOverAlpha);
#elif DEBUGMODE==87
color= vec3f(alpha);
#elif DEBUGMODE==88 && defined(ALBEDO)
color= vec3f(albedoTexture.a);
#elif DEBUGMODE==89
color=aoOut.ambientOcclusionColor;
#else
var stripeWidth: f32=30.;var stripePos: f32=abs(floor(input.position.x/stripeWidth));var whichColor: f32=((stripePos)%(2.));var color1: vec3f= vec3f(.6,.2,.2);var color2: vec3f= vec3f(.3,.1,.1);color=mix(color1,color2,whichColor);
#endif
color*=uniforms.vDebugMode.y;
#ifdef DEBUGMODE_NORMALIZE
color=normalize(color)*0.5+0.5;
#endif
#ifdef DEBUGMODE_GAMMA
color=toGammaSpaceVec3(color);
#endif
fragmentOutputs.color=vec4f(color,1.0);
#ifdef PREPASS
#if SCENE_MRT_COUNT>0 && (!defined(PREPASS_MESH_BLEND_TAG) || PREPASS_MESH_BLEND_TAG_INDEX != 0) && (!defined(PREPASS_OBJECT_ID) || PREPASS_OBJECT_ID_INDEX != 0)
fragmentOutputs.fragData0=vec4f(toLinearSpaceVec3(color),1.0); 
#endif
#if SCENE_MRT_COUNT>1 && (!defined(PREPASS_MESH_BLEND_TAG) || PREPASS_MESH_BLEND_TAG_INDEX != 1) && (!defined(PREPASS_OBJECT_ID) || PREPASS_OBJECT_ID_INDEX != 1)
fragmentOutputs.fragData1=vec4f(0.,0.,0.,0.); 
#endif
#endif
#ifdef DEBUGMODE_FORCERETURN
return fragmentOutputs;
#endif
}
#endif
`;e.IncludesShadersStoreWGSL[Z]||(e.IncludesShadersStoreWGSL[Z]=Q);var $={name:Z,shader:Q};export{f as _,W as a,a as b,oe as c,O as d,T as f,re as g,_ as h,se as i,ae as l,b as m,le as n,V as o,ie as p,ce as r,R as s,$ as t,j as u,ne as v,ee as x,te as y};