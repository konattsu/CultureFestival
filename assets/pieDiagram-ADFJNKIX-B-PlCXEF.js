import{R as S,V as F,aG as j,_ as p,g as q,s as H,a as Z,b as J,q as K,p as Q,l as z,c as X,D as Y,H as ee,a4 as te,e as ae,y as re,F as ne}from"./Magazine-fJEurSnw.js";import{p as ie}from"./chunk-4BX2VUAB-DNKMJbom.js";import{p as se}from"./treemap-75Q7IDZK-lQq28hTT.js";import{d as I}from"./arc-DXgSEF2y.js";import{o as oe}from"./ordinal-Cboi1Yqb.js";import"./index-BYkX6PAe.js";import"./arrow-left-DKPWIvsU.js";import"./clock-CDKCew_s.js";import"./_baseUniq-0AmAI8s4.js";import"./_basePickBy-BONDYlvn.js";import"./clone-CwkQRQqU.js";import"./init-Gi6I4Gst.js";function le(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function ce(e){return e}function ue(){var e=ce,a=le,f=null,y=S(0),s=S(F),l=S(0);function o(t){var n,c=(t=j(t)).length,d,x,h=0,u=new Array(c),i=new Array(c),v=+y.apply(this,arguments),w=Math.min(F,Math.max(-F,s.apply(this,arguments)-v)),m,C=Math.min(Math.abs(w)/c,l.apply(this,arguments)),$=C*(w<0?-1:1),g;for(n=0;n<c;++n)(g=i[u[n]=n]=+e(t[n],n,t))>0&&(h+=g);for(a!=null?u.sort(function(A,D){return a(i[A],i[D])}):f!=null&&u.sort(function(A,D){return f(t[A],t[D])}),n=0,x=h?(w-c*$)/h:0;n<c;++n,v=m)d=u[n],g=i[d],m=v+(g>0?g*x:0)+$,i[d]={data:t[d],index:n,value:g,startAngle:v,endAngle:m,padAngle:C};return i}return o.value=function(t){return arguments.length?(e=typeof t=="function"?t:S(+t),o):e},o.sortValues=function(t){return arguments.length?(a=t,f=null,o):a},o.sort=function(t){return arguments.length?(f=t,a=null,o):f},o.startAngle=function(t){return arguments.length?(y=typeof t=="function"?t:S(+t),o):y},o.endAngle=function(t){return arguments.length?(s=typeof t=="function"?t:S(+t),o):s},o.padAngle=function(t){return arguments.length?(l=typeof t=="function"?t:S(+t),o):l},o}var pe=ne.pie,G={sections:new Map,showData:!1},T=G.sections,N=G.showData,de=structuredClone(pe),ge=p(()=>structuredClone(de),"getConfig"),fe=p(()=>{T=new Map,N=G.showData,re()},"clear"),me=p(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(e)||(T.set(e,a),z.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),he=p(()=>T,"getSections"),ve=p(e=>{N=e},"setShowData"),Se=p(()=>N,"getShowData"),L={getConfig:ge,clear:fe,setDiagramTitle:Q,getDiagramTitle:K,setAccTitle:J,getAccTitle:Z,setAccDescription:H,getAccDescription:q,addSection:me,getSections:he,setShowData:ve,getShowData:Se},ye=p((e,a)=>{ie(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),xe={parse:p(async e=>{const a=await se("pie",e);z.debug(a),ye(a,L)},"parse")},we=p(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),Ae=we,De=p(e=>{const a=[...e.values()].reduce((s,l)=>s+l,0),f=[...e.entries()].map(([s,l])=>({label:s,value:l})).filter(s=>s.value/a*100>=1).sort((s,l)=>l.value-s.value);return ue().value(s=>s.value)(f)},"createPieArcs"),Ce=p((e,a,f,y)=>{z.debug(`rendering pie chart
`+e);const s=y.db,l=X(),o=Y(s.getConfig(),l.pie),t=40,n=18,c=4,d=450,x=d,h=ee(a),u=h.append("g");u.attr("transform","translate("+x/2+","+d/2+")");const{themeVariables:i}=l;let[v]=te(i.pieOuterStrokeWidth);v??=2;const w=o.textPosition,m=Math.min(x,d)/2-t,C=I().innerRadius(0).outerRadius(m),$=I().innerRadius(m*w).outerRadius(m*w);u.append("circle").attr("cx",0).attr("cy",0).attr("r",m+v/2).attr("class","pieOuterCircle");const g=s.getSections(),A=De(g),D=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let b=0;g.forEach(r=>{b+=r});const R=A.filter(r=>(r.data.value/b*100).toFixed(0)!=="0"),E=oe(D);u.selectAll("mySlices").data(R).enter().append("path").attr("d",C).attr("fill",r=>E(r.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(R).enter().append("text").text(r=>(r.data.value/b*100).toFixed(0)+"%").attr("transform",r=>"translate("+$.centroid(r)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const W=[...g.entries()].map(([r,M])=>({label:r,value:M})),k=u.selectAll(".legend").data(W).enter().append("g").attr("class","legend").attr("transform",(r,M)=>{const P=n+c,V=P*W.length/2,B=12*n,U=M*P-V;return"translate("+B+","+U+")"});k.append("rect").attr("width",n).attr("height",n).style("fill",r=>E(r.label)).style("stroke",r=>E(r.label)),k.append("text").attr("x",n+c).attr("y",n-c).text(r=>s.getShowData()?`${r.label} [${r.value}]`:r.label);const _=Math.max(...k.selectAll("text").nodes().map(r=>r?.getBoundingClientRect().width??0)),O=x+t+n+c+_;h.attr("viewBox",`0 0 ${O} ${d}`),ae(h,d,O,o.useMaxWidth)},"draw"),$e={draw:Ce},Pe={parser:xe,db:L,renderer:$e,styles:Ae};export{Pe as diagram};
//# sourceMappingURL=pieDiagram-ADFJNKIX-B-PlCXEF.js.map
