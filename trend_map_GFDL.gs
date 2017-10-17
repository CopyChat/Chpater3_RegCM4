* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* bias.Temp.summer.RRTM.gs
* 
* This script creates Modelvar's maps of the differences 
* of RegCM4 minus OBS in season 
*
* Written by Chao.TANG Sep. 2014
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

*=================================================== 
* variables could be changed
*===================================== for the OBS
* 0, change the header

* 1, whether plot OBS
obs=1 


Bias.1='-0.84'
Bias.2='2.13'
Bias.3='0.70'
Bias.4='-1.86'
Bias.5='1.68'
Bias.6='3.72'
Bias.7='1.11'
Bias.8='2.60'


OBSproj.1='CRU'
OBSproj.1='ERA_Interim'
OBSproj.1='GHCN'

OBSproj.2='GPCP'
OBSproj.2='CMAP'

OBSproj.3='CERES'

OBSproj.4='MODIS'


* 2, obs project name for Temp, Precip, SWD, TCC:
if(OBSproj.1='ERA_Interim')
    OBSvar.1='t2m'
    OBScrs.1='1'
    OBSpls.1='-273.5'
endif
if(OBSproj.1='CRU')
    OBSvar.1='tmp'
    OBScrs.1='1'
    OBSpls.1='0'
endif
if(OBSproj.1='GHCN')
    OBSvar.1='air'
    OBScrs.1='1'
    OBSpls.1='-273.5'
endif


if(OBSproj.2='GPCP')
  OBSvar.2='precip'
  OBScrs.2='1'
  OBSpls.2='0'
endif

if(OBSproj.2='CMAP')
  OBSvar.2='precip'
  OBScrs.2='1'
  OBSpls.2='0'
endif

if(OBSproj.2='TRMM')
  OBSvar.2='hrf'
  OBScrs.2='1'
  OBSpls.2='0'
endif


if(OBSproj.3='CERES')
  OBSvar.3='sfc_sw_down_all'
  OBScrs.3='1'
  OBSpls.3='0'
endif


if(OBSproj.4='MODIS')
  OBSvar.4='clt'
  OBScrs.4='1'
  OBSpls.4='0'
endif


*=================================================== 

*=================================================== 

* 6, change the PATH of OBS file

*===================================== for the RegCM output
* 1, RegCM Variable to be ploted
Plotvar.1='rsds'
Plotvar.2='tas'
Plotvar.3='clt'
* 2, Varibale units to be ploted:
Unit.1='W/m2'
Unit.2='degC'
Unit.3='%'
* 3, RegCM output tag:
RegCMtag.1='SRF'
RegCMtag.2='SRF'
RegCMtag.3='RAD'
* 4, model ouput var name in netCDF:
Modelvar.1='rsds'
Modelvar.2='s01tas'
Modelvar.3='clt'
* 5, obs cross factor:
Modelcrs.1='1'
Modelcrs.2='1'
Modelcrs.3='100'
* 6, obs plus factor:
Modelpls.1='0'
Modelpls.2='-273.5'
Modelpls.3='0'

* 7, season:
season='summer'
season='winter'
*===================================== for the Plot

  obsmin.1=-5
  obsmax.1=5
  obsmin.2=0
  obsmax.2=5
  obsmin.3=-10
  obsmax.3=10


  couleur.2='white->red'

  couleur.1='deepskyblue->white->deeppink'
  couleur.2='white->crimson'
  couleur.3='maroon->white->darkgreen'
*=========================================== prepare for ploting 

* 3, output file name:
output='trend_map_GFDL'

* 4, title of the plot
TITLE='trend to mid & end of 21st century'

*=================================================== 


******************************** to plot
  'reinit'
  'set gxout shaded'
  'set grads off'
  'set grid off'
  'set mpdset hires'
*  'set hershey off'
  'set map 1 1 8'
  'set clopts -1 -1 0.13'
*  set strsiz hsiz <vsiz>
*  'set strsiz 1 1.6'
*  This command sets the string character size, 
*  where hsiz is the width of the characters, 
*  vsiz is the height of the characters, in virtual page inches. 
*  If vsiz is not specified, it will be set the the same value as hsiz.

  'set vpage 1 8.0 1 8'
*=================================================== 

****** open RegCM output CCM
*** sumer 2001-2005

ModelDIR='/Users/ctang/climate/Modeling/333'

physicstag='G71E0001'

Model.2='Had'
Model.1='GFDL'
* k

Name.2='HadGEM2-ES'
Name.1='GFDL-ESM2M'

ModelTag2.1='Had_hist'
ModelTag2.2='Had_rcp85'
ModelTag2.3='Had_rcp85'
* j

ModelTag1.1='GFDL_hist'
ModelTag1.2='GFDL_rcp85'
ModelTag1.3='GFDL_rcp85'

*=================================================== 
*=================================================== 
** model
k=1; kmax=1
*================================================== 
** variable
j=1; jmax=3  
totalp=(kmax)*jmax*2
  say 'totalplot='totalp''

*=================================================== 
*=================================================== 
while(j<=jmax)

*************** BEGIN to read Model data
  k=1
  while(k<=kmax)
    say ' ============== open files ================== '
    say 'open 'ModelDIR'/'Model.k'.'physicstag'/output/pprcmdata/yearly/'Model.k'_hist.'RegCMtag.j'.timmean.1996-2005.nc.ctl'
    'open 'ModelDIR'/'Model.k'.'physicstag'/output/pprcmdata/yearly/'Model.k'_hist.'RegCMtag.j'.timmean.1996-2005.nc.ctl'
    'set dfile 1'
    'q file'
    'set lon 3 107'
    'set lat -37 -3'
    'define ref=('Modelvar.j')*('Modelcrs.j')+('Modelpls.j')'
    'close 1'

    say 'open 'ModelDIR'/'Model.k'.'physicstag'/output.RCP85.2044-2055/pprcmdata/yearly/'Model.k'_rcp85.'RegCMtag.j'.timmean.2046-2055.nc.ctl'
    'open 'ModelDIR'/'Model.k'.'physicstag'/output.RCP85.2044-2055/pprcmdata/yearly/'Model.k'_rcp85.'RegCMtag.j'.timmean.2046-2055.nc.ctl'
    'set dfile 1'
    'q file'
    'set lon 3 107'
    'set lat -37 -3'
    'define mid=('Modelvar.j')*('Modelcrs.j')+('Modelpls.j')'
    'close 1'

    say 'open 'ModelDIR'/'Model.k'.'physicstag'/output.RCP85.2088-2100/pprcmdata/yearly/'Model.k'_rcp85.'RegCMtag.j'.timmean.2090-2099.nc.ctl'
    'open 'ModelDIR'/'Model.k'.'physicstag'/output.RCP85.2088-2100/pprcmdata/yearly/'Model.k'_rcp85.'RegCMtag.j'.timmean.2090-2099.nc.ctl'
    'set dfile 1'
    'q file'
    'set lon 3 107'
    'set lat -37 -3'
    'define late=('Modelvar.j')*('Modelcrs.j')+('Modelpls.j')'

*=================================================== 
**** define the differences
** RRTM-CERES
** Interplation RegCM data to 'OBSproj' GRID
*    'define modvarremap=lterp(modvar,obsvar)'
*    'define biasmodvar=(modvarremap-obsvar)'
*=================================================== 

*************** END to read Model data

*************** BEGIN calculate diff

*    if(j=2)
      'define difmid=(mid-ref)*1'
      'define diflate=(late-ref)*1'
*    else 
*      'define difmid=(mid-ref)*100/(ref+0.0000001)'
*      'define diflate=(late-ref)*100/(ref+0.000001)'
*    endif

*============================ to plot model
*--------------------------------------------------- 
* plot num 
    m1=(j-1)*(kmax*2)+(k-1)*2+1
    say 'plot num of bias='m1''
    say '-------No. 'j' variable is 'Plotvar.j'--------model number is 'k'------ plot number is 'm1''
*--------------------------------------------------- 

    'subplot 'totalp' 'm1' 'jmax' '
* 20=total NO. of plots; m1= plot num.; 3 NO.of column

*--------------------------------------------------- 
    'set xlopts 1 4 0.15'
    'set ylopts 1 4 0.15'
    'set font 0.1 small small arial'
*   'sel xlopts color thckns size' for the axis
* string size horizental vertical' for 'monthlab'
*--------------------------------------------------- 
    'run colors.gs'
    'color 'obsmin.j' 'obsmax.j' -kind 'couleur.j''
* 'color -var difmid -kind blue->white->red'
    'd difmid'
*    if(j=2)
*      'draw title 'Name.k' trend to mid 21 century (degree)'
*    else
*      'draw title 'Name.k' trend to mid 21 century (%)'
*    endif
    'cbarn 0.6 0 5.5 1.2'
*    'drawstr -p 12 -k 5 -z 0.25 -t 'monthlab' -xo -0.3'
* ----------------------------- to draw mean bias
  'd aave(difmid,global)'
   meanbias1=sublin(result,1)
   meanbias = subwrd(meanbias1,4)
   say 'mean='meanbias
   'drawstr -p 12 -k 5 -z 0.25 -t "mean: 'Bias.m1'" -xo -0.5 -yo -1.8'
   'drawstr -p 12 -k 5 -z 0.25 -t "'Plotvar.j', 'Unit.j'" -xo -0.5 -yo -0.2'

************* to plot trend in late 21st 
************* to plot trend in late 21st 
************* to plot trend in late 21st 
************* to plot trend in late 21st 
    m1=m1+1
    'subplot 'totalp' 'm1' 'jmax' '
* 20=total NO. of plots; m1= plot num.; 3 NO.of column

    say '-------No. 'j' variable is 'Plotvar.j'--------model number is 'k'------ plot number is 'm1''
*--------------------------------------------------- 
    'set xlopts 1 4 0.15'
    'set ylopts 1 4 0.15'
    'set font 0.1 small small arial'
*   'sel xlopts color thckns size' for the axis
* string size horizental vertical' for 'monthlab'
*--------------------------------------------------- 
    'run colors.gs'
    'color 'obsmin.j' 'obsmax.j' -kind 'couleur.j''
*    'color -var diflate -kind blue->white->red'
    'd diflate'
    'cbarn 0.6 0 5.5 1.2'
*   'draw title 'Name.k' trend to late 21 century (%)'
* ----------------------------- to draw mean bias
   'd aave(diflate,global)'
   meanbias1=sublin(result,1)
   meanbias = subwrd(meanbias1,4)
   say 'mean='meanbias
   'drawstr -p 12 -k 5 -z 0.25 -t "mean: 'Bias.m1'" -xo -0.5 -yo -1.8'
   'drawstr -p 12 -k 5 -z 0.25 -t "'Plotvar.j', 'Unit.j'" -xo -0.5 -yo -0.2'
*============================ END to plot bias model-obs

    'close 1'
    k=k+1
  endwhile
  j=j+1
endwhile


*=================================================== 
    'set vpage off'
    'save 'output''
*=================================================== 
    say 'open 'output'.eps'
    '! killapp Preview'
    '! open 'output'.eps'
