import{t as e}from"./shaderStore-D-XQlhUT.js";import{a as t,c as n,i as r,l as i,n as a,o,r as s,s as c,t as l}from"./bakedVertexAnimation-xLaKIOY3.js";import{n as u,t as d}from"./clipPlaneVertex-C59BO8JS.js";import{t as f}from"./instancesDeclaration-CJBvtBV5.js";var p=`pointCloudVertexDeclaration`,m=`#ifdef POINTSIZE
uniform float pointSize;
#endif
`;e.IncludesShadersStore[p]||(e.IncludesShadersStore[p]=m);var h={name:p,shader:m},g=`pointCloudVertex`,_=`#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
`;e.IncludesShadersStore[g]||(e.IncludesShadersStore[g]=_);var v={name:g,shader:_},y=`depthVertexShader`,b=`attribute vec3 position;
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
#include<clipPlaneVertexDeclaration>
#include<instancesDeclaration>
uniform mat4 viewProjection;uniform vec2 depthValues;
#if defined(ALPHATEST) || defined(NEED_UV)
varying vec2 vUV;uniform mat4 diffuseMatrix;
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#endif
#ifdef STORE_CAMERASPACE_Z
uniform mat4 view;varying vec4 vViewPos;
#endif
#include<pointCloudVertexDeclaration>
varying float vDepthMetric;
#define CUSTOM_VERTEX_DEFINITIONS
void main(void)
{vec3 positionUpdated=position;
#ifdef UV1
vec2 uvUpdated=uv;
#endif
#ifdef UV2
vec2 uv2Updated=uv2;
#endif
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);
#include<clipPlaneVertex>
gl_Position=viewProjection*worldPos;
#ifdef STORE_CAMERASPACE_Z
vViewPos=view*worldPos;
#else
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric=((-gl_Position.z+depthValues.x)/(depthValues.y));
#else
vDepthMetric=((gl_Position.z+depthValues.x)/(depthValues.y));
#endif
#endif
#if defined(ALPHATEST) || defined(BASIC_RENDER)
#ifdef UV1
vUV=vec2(diffuseMatrix*vec4(uvUpdated,1.0,0.0));
#endif
#ifdef UV2
vUV=vec2(diffuseMatrix*vec4(uv2Updated,1.0,0.0));
#endif
#endif
#include<pointCloudVertex>
}
`;e.ShadersStore[y]||(e.ShadersStore[y]=b);var x=[i,n,c,o,u,f,h,t,r,s,a,l,d,v];for(let t of x)e.IncludesShadersStore[t.name]||(e.IncludesShadersStore[t.name]=t.shader);var S={name:y,shader:b};export{S as depthVertexShader};