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


Bias.1='-1.66'
Bias.2='0.21'
Bias.3='1.20'
Bias.4='-2.1'

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
  obsmin.3=-100
  obsmax.3=100


  couleur.2='white->red'
  couleur.4='maroon->white->darkgreen'
  couleur.1='deepskyblue->white->deeppink'
  couleur.1='crimson->white->green'
  couleur.2='white->crimson'
  couleur.1='->white->green'
  couleur.1='slateblue->white->orangered'
*=========================================== prepare for ploting 

* 3, output file name:
output='ele_trend_map'

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

Model.1='Had'
Model.2='GFDL'
* k

Name.1='HadGEM2-ES'
Name.2='GFDL-ESM2M'
ModelTag1.1='Had_hist'
ModelTag1.2='Had_rcp85'
ModelTag1.3='Had_rcp85'
* j

ModelTag2.1='GFDL_hist'
ModelTag2.2='GFDL_rcp85'
ModelTag2.3='GFDL_rcp85'

*=================================================== 
*=================================================== 
** model
k=1; kmax=2  
*================================================== 
** variable


*************** BEGIN to read Model data
*==================================================  had late
    say ' ============== open files ================== '
    'open /Users/ctang/climate/Modeling/333/Had.G71E0001/output/pprcmdata/yearly/Had_hist.SRF.timmean.1996-2005.nc.ctl'
    'set dfile 1'
    'q file'
    'define rsds0=(rsds)'
    'define tas0=(s01tas)-273.5'
    'close 1'

    'open /Users/ctang/climate/Modeling/333/Had.G71E0001/output.RCP85.2044-2055/pprcmdata/yearly/Had_rcp85.SRF.timmean.2046-2055.nc.ctl'
    'set dfile 1'
    'q file'
    'define rsds1=(rsds)'
    'define tas1=(s01tas)-273.5'
    'close 1'

    'open /Users/ctang/climate/Modeling/333/Had.G71E0001/output.RCP85.2088-2100/pprcmdata/yearly/Had_rcp85.SRF.timmean.2090-2099.nc.ctl'
    'set dfile 1'
    'q file'
    'define rsds2=(rsds)'
    'define tas2=(s01tas)-273.5'


* calculate
    'define a1=rsds1*(1-0.0045*(tas1-25))+0.1*log10(rsds1)'
    'define a2=rsds2*(1-0.0045*(tas2-25))+0.1*log10(rsds2)'

    'define b=rsds0*(1-0.0045*(tas0-25))+0.1*log10(rsds0)'

    'define cc1=(a1-b)*100/b'
    'define cc2=(a2-b)*100/b'

    'close 1'
*==================================================  GFDL

    say ' ============== open files ================== '
    'open /Users/ctang/climate/Modeling/333/GFDL.G71E0001/output/pprcmdata/yearly/GFDL_hist.SRF.timmean.1996-2005.nc.ctl'
    'set dfile 1'
    'q file'
    'define rsds0=(rsds)'
    'define tas0=(s01tas)-273.5'
    'close 1'

    'open /Users/ctang/climate/Modeling/333/GFDL.G71E0001/output.RCP85.2044-2055/pprcmdata/yearly/GFDL_rcp85.SRF.timmean.2046-2055.nc.ctl'
    'set dfile 1'
    'q file'
    'define rsds1=(rsds)'
    'define tas1=(s01tas)-273.5'
    'close 1'

    'open /Users/ctang/climate/Modeling/333/GFDL.G71E0001/output.RCP85.2088-2100/pprcmdata/yearly/GFDL_rcp85.SRF.timmean.2090-2099.nc.ctl'
    'set dfile 1'
    'q file'
    'define rsds2=(rsds)'
    'define tas2=(s01tas)-273.5'


* calculate
    'define a1=rsds1*(1-0.0045*(tas1-25))+0.1*log10(rsds1)'
    'define a2=rsds2*(1-0.0045*(tas2-25))+0.1*log10(rsds2)'

    'define b=rsds0*(1-0.0045*(tas0-25))+0.1*log10(rsds0)'

    'define cc3=(a1-b)*100/b'
    'define cc4=(a2-b)*100/b'

*=================================================== 
*=================================================== 
*=================================================== 

*=================================================== 
*=================================================== 
j=1
jmax=1
totalp=4
while(j<=jmax)
*--------------------------------------------------- 
* plot num 
    m1=j
    say 'plot num of bias='m1''
*--------------------------------------------------- 

    'subplot 'totalp' 'm1' 1 -tall 1'
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
    'd cc1'
*    if(j=2)
*      'draw title 'Name.k' trend to mid 21 century (degree)'
*    else
*      'draw title 'Name.k' trend to mid 21 century (%)'
*    endif
    'cbarn 0.6 0 5.5 1.0'
*    'drawstr -p 12 -k 5 -z 0.25 -t 'monthlab' -xo -0.3'
* ----------------------------- to draw mean bias
   'd aave(cc1,global)'
   meanbias1=sublin(result,1)
   meanbias = subwrd(meanbias1,4)
   say 'mean='meanbias
   'drawstr -p 12 -k 5 -z 0.25 -t "mean: 'Bias.m1'" -xo -0.5 -yo -2.2'
   'drawstr -p 12 -k 5 -z 0.25 -t "fraction change, %" -xo -0.3 -yo -0.2'

************* to plot trend in late 21st 
************* to plot trend in late 21st 
************* to plot trend in late 21st 
************* to plot trend in late 21st 
    m1=m1+1
    'subplot 'totalp' 'm1' 'jmax' -tall 1'
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
    'd cc2'
    'cbarn 0.6 0 5.5 1.0'
*   'draw title 'Name.k' trend to late 21 century (%)'
* ----------------------------- to draw mean bias
   'd aave(cc2,global)'
   meanbias1=sublin(result,1)
   meanbias = subwrd(meanbias1,4)
   say 'mean='meanbias
   'drawstr -p 12 -k 5 -z 0.25 -t "mean: 'Bias.m1'" -xo -0.5 -yo -2.2'
   'drawstr -p 12 -k 5 -z 0.25 -t "fraction change, %" -xo -0.3 -yo -0.2'
*============================ END to plot bias model-obs



************* to plot trend in late 21st 
    m1=m1+1
    'subplot 'totalp' 'm1' 'jmax' -tall 1'
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
    'd cc3'
    'cbarn 0.6 0 5.5 1.0'
*   'draw title 'Name.k' trend to late 21 century (%)'
* ----------------------------- to draw mean bias
   'd aave(cc3,global)'
   meanbias1=sublin(result,1)
   meanbias = subwrd(meanbias1,4)
   say 'mean='meanbias
   'drawstr -p 12 -k 5 -z 0.25 -t "mean: 'Bias.m1'" -xo -0.5 -yo -2.2'
   'drawstr -p 12 -k 5 -z 0.25 -t "fraction change, %" -xo -0.3 -yo -0.2'

************* to plot trend in late 21st 
    m1=m1+1
    'subplot 'totalp' 'm1' 'jmax' -tall 1'
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
    'd cc4'
    'cbarn 0.6 0 5.5 1.0'
*   'draw title 'Name.k' trend to late 21 century (%)'
* ----------------------------- to draw mean bias
   'd aave(cc4,global)'
   meanbias1=sublin(result,1)
   meanbias = subwrd(meanbias1,4)
   say 'mean='meanbias
   'drawstr -p 12 -k 5 -z 0.25 -t "mean: 'Bias.m1'" -xo -0.5 -yo -2.2'
   'drawstr -p 12 -k 5 -z 0.25 -t "fraction change, %" -xo -0.3 -yo -0.2'

    'close 1'
  j=j+1
endwhile


*=================================================== 
    'set vpage off'
    'save 'output''
*=================================================== 
    say 'open 'output'.eps'
    '! killapp Preview'
    '! open 'output'.eps'
