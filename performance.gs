** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
Plotvar.1='TEMP'
Plotvar.2='Precip'
Plotvar.3='SWD'
Plotvar.4='TCC'
* 2, Varibale units to be ploted:
Unit.1='degC'
Unit.2='mm/day'
Unit.3='W/m2'
Unit.4='%'
* 3, RegCM output tag:
RegCMtag.1='SRF'
RegCMtag.2='SRF'
RegCMtag.3='SRF'
RegCMtag.4='RAD'
* 4, model ouput var name in netCDF:
Modelvar.1='s01tas'
Modelvar.2='pr'
Modelvar.3='rsds'
Modelvar.4='clt'
* 5, obs cross factor:
Modelcrs.1='1'
Modelcrs.2='86400'
Modelcrs.3='1'
Modelcrs.4='100'
* 6, obs plus factor:
Modelpls.1='-273.5'
Modelpls.2='0'
Modelpls.3='0'
Modelpls.4='1'


* 7, chose the Radiation Scheme:
Radiation='CCM'
*Radiation='RRTM'

* 8, season:
season='summer'
season='winter'

*===================================== for the Plot
  biasmin.1=-6
  biasmax.1=6
  biasmin.2=-5
  biasmax.2=5
  biasmin.3=-100
  biasmax.3=100
  biasmin.4=-100
  biasmax.4=100

  obsmin.1=0
  obsmax.1=30
  obsmin.2=0
  obsmax.2=10
  obsmin.3=80
  obsmax.3=280
  obsmin.4=0
  obsmax.4=100


  couleur.1='blue->white->red'
  couleur.2='maroon->white->darkgreen'
  couleur.3='deepskyblue->white->deeppink'
  couleur.4='blue->white->crimson'

  OBScouleur.1='white->orange->red'
  OBScouleur.2='white->darkgreen'
  OBScouleur.3='white->violet->deeppink'
  OBScouleur.4='white->deepskyblue->darkblue'
*=========================================== prepare for ploting 
* 1, month label:
if(season='summer')
    monthlab='MJJASO'
  else
    monthlab='NDJFMA'
endif

* 2, obs plot title: 
OBSt=''Plotvar'_'OBSproj' ('Unit')'

* 3, output file name:
output='bias.turning.'season''
*output='standard'

* 4, title of the plot
TITLE='"biases vs 'OBSproj' of 'Plotvar'"'

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
ICTP='/Users/ctang/climate/Modeling/333/Had.G71E0001/output/pprcmdata/yearly'
ictp.1='GFDL_hist'
*ictp.2='CLM45_SUBEX_UW'
ictp.2='CLM45_Micro_UW'
*ictp.4='CLM45_Micro_UW-ocn0005'
ictp.3='CLM45_Micro_UW-ocn001'
ictp.4='CLM45_Micro_UW-ocn002'
ictp.5='CLM45_Micro_UW-ocn003'
*ictp.5='CLM45_Micro_UW-ocn005'
*ictp.8='CLM45_Micro_UW-ocn01'

ictpfname.1='SUBEX.Holt.CLM45.GE'
*ictpfname.2='SUBEX.UW.CLM45'
ictpfname.1='Micro.UW.CLM45'
ictpfname.1='Had_hist'
*ictpfname.4='Micro.UW.CLM45.ocn0005'
ictpfname.3='Micro.UW.CLM45.ocn001'
ictpfname.4='Micro.UW.CLM45.ocn002'
ictpfname.5='Micro.UW.CLM45.ocn003'
*ictpfname.5='Micro.UW.CLM45.ocn005'
*ictpfname.8='Micro.UW.CLM45.ocn01'
*=================================================== 
*=================================================== 
** model
k=1; kmax=1  
*================================================== 
** variable
j=1; jmax=4  
n=jmax*k+1
totalp=(2*kmax+1)*jmax
  say 'totalplot='totalp''

*=================================================== 
*=================================================== 
n=1
while(j<=jmax)
****** BEGIN read the OBS data 
    if(OBSproj.j='ERA_Interim')
      if(OBSvar.j='t2m')
        'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/ERA_Interim/ERA.t2m.timmean.2001-2005.nc'
      else
        'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/ERA_Interim/ERA.tp.timmean.mean.2001-2005.'monthlab'.nc'
      endif
    endif
    if(OBSproj.j='GPCP')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/GPCP/precip.timmean.2001-2005.nc'
    endif

    if(OBSproj.j='GHCN')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/GHCN/GHCN.air.timmean.2001-2005.nc'
    endif
    if(OBSproj.j='CMAP')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/CMAP/CMAP.precip.timmean.2001-2005.nc'
    endif

    if(OBSproj.j='CERES')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/CERES/CERES_EBAF-TOA_Ed2.8_Subset.timmean.2001-2005.nc'
    endif
    if(OBSproj.j='TRMM')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/TRMM/TRMM.hrf.timmean.mean.2001-2005.'monthlab'.nc'
    endif
    if(OBSproj.j='CRU')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/CRU/3.20/cru_ts3.20.tmp.timmean.2001-2005.nc'
    endif
    if(OBSproj.j='MODIS')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/MODIS/clt_MODIS_L3_C5_.timmean.2001-2005.nc'
    endif
    'set dfile 1'
    'define obsvar=('OBSvar.j')*('OBScrs.j')+('OBSpls.j')'
    'close 1'
****************** Attention *****************
****** END read the OBS data 


*************** read Model data
*************** read Model data
  k=1
    say 'open 'ICTP'/'ictpfname.k'.'RegCMtag.j'.timmean.2001-2005.nc.ctl'
    'open 'ICTP'/'ictpfname.k'.'RegCMtag.j'.timmean.2001-2005.nc.ctl'
    'set dfile 1'
    'q file'
    'define modvar=('Modelvar.j')*('Modelcrs.j')+('Modelpls.j')'

*=================================================== 
**** define the differences
** RRTM-CERES
* Interplation RegCM data to 'OBSproj' GRID
    'define modvarremap=lterp(modvar,obsvar)'
    'define biasmodvar=(modvarremap-obsvar)'




*============================ to plot OBS ( have to start from 1 )
*============================ to plot OBS ( have to start from 1 )
* plot num of obs
  pnobs=(j-1)*(kmax*2)+(j-1)+1
  say 'plot num of obs='pnobs''
*--------------------------------------------------- 

    'subplot 'totalp' 'pnobs' 'jmax''
* 20=total NO. of plots; k= plot num.; 3 NO.of column

*--------------------------------------------------- 
    'set xlopts 1 4 0.15'
    'set ylopts 1 4 0.15'
*   'sel xlopts color thckns size' for the axis
*    'set strsiz 0.2 0.2'
* string size horizental vertical' for 'monthlab'
*--------------------------------------------------- 
  say '--------OBS OBS OBS OBS--- plot number is 'pnobs''
  'run colors.gs'
  'color 'obsmin.j' 'obsmax.j' -kind 'OBScouleur.j''
* 'color -var biasmodvar -kind blue->white->red'
  'd obsvar'
  'cbarn 0.6 0 5.5 1.5'
  'drawstr -p 12 -k 5 -z 0.25 -t 'monthlab' -xo -0.3'
  'draw title 'OBSproj.j' ('Unit.j')'
  'draw ylab 'season''

*  font thickness are controlled by cbarn.gs in /usr/local/grads-2.0.2/lib/scripts
*  by 'set string color <justification <thickness <rotation>>>'
*  'xcbar 0.6 0 5.5 1.5 -fw 0.15 -fh 0.18 -edge triangle -fs 2 -fo 1'
  'close 1'

  while(k<=kmax)


    say k

    say 'open 'ICTP'/'ictpfname.k'.'RegCMtag.j'.timmean.2001-2005.nc.ctl'
    'open 'ICTP'/'ictpfname.k'.'RegCMtag.j'.timmean.2001-2005.nc.ctl'
    'set dfile 1'
    'q file'
    'define modvar=ave('Modelvar.j',t=1,t=1)*('Modelcrs.j')+('Modelpls.j')'

*=================================================== 
**** define the differences
** RRTM-CERES
* Interplation RegCM data to 'OBSproj' GRID
    'define modvarremap=lterp(modvar,obsvar)'
    'define biasmodvar=(modvarremap-obsvar)'

*============================ to plot bias model-obs
*============================ to plot bias model-obs
*--------------------------------------------------- 
* plot num of bias between model and obs
    m1=(j-1)*(kmax*2+1)+1+2*(k-1)+1
    say 'plot num of bias='m1''
    say '-------No. 'j' variable is 'Plotvar.j'--------model number is 'k'------ plot number is 'm''
*--------------------------------------------------- 

    'subplot 'totalp' 'm1' 'jmax' '
* 20=total NO. of plots; k= plot num.; 3 NO.of column

*--------------------------------------------------- 
    'set xlopts 1 4 0.15'
    'set ylopts 1 4 0.15'
    'set font 0.1 small small arial'
*   'sel xlopts color thckns size' for the axis
* string size horizental vertical' for 'monthlab'
*--------------------------------------------------- 
  'run colors.gs'
  'color 'biasmin.j' 'biasmax.j' -kind 'couleur.j''
* 'color -var biasmodvar -kind blue->white->red'
  'd biasmodvar'
  'draw title 'ictp.k' (model-obs)'
  'cbarn 0.6 0 5.5 1.5'
  'draw ylab 'season''
  'drawstr -p 12 -k 5 -z 0.25 -t 'monthlab' -xo -0.3'
* ----------------------------- to draw mean bias
  'd aave(biasmodvar,global)'
  meanbias1=sublin(result,1)
  meanbias = subwrd(meanbias1,4)
*  meanbias = math_nint(meanbias1)
  say 'meanbias='meanbias
  'drawstr -p 12 -k 5 -z 0.25 -t 'meanbias' -xo -0.3 -yo -1.6'
*============================ END to plot bias model-obs
*============================ to plot bias model-obs percentage
*============================ to plot bias model-obs percentage

*--------------------------------------------------- 
* plot num of bias between model and obs percentage
    m2=(j-1)*(kmax*2+1)+1+2*(k-1)+2
    say 'plot num of bias='m2''
*--------------------------------------------------- 


* caluate percentage (model-obs)*100/obs (%)
    'define percent=(biasmodvar*100)/obsvar'
*    'set gxout print'
*    'set prnopts %6.2f 1 1'
*%6.2f: c format, 1: values to plot on each line, ;space between values

* ----------------------------------------- to plot
    'subplot 'totalp' 'm2' 'jmax''
* 20=total NO. of plots; k= plot num.; 3 NO. of column

*--------------------------------------------------- 
    'set xlopts 1 4 0.15'
    'set ylopts 1 4 0.15'
  'set font 0.1 small small arial'
*   'sel xlopts color thckns size' for the axis
* string size horizental vertical' for 'monthlab'
*--------------------------------------------------- 
  'run colors.gs'

  if(j=2)
  'color -100 100 -kind 'couleur.j''
  else
  'color -50 50 -kind 'couleur.j''
  endif
* 'color -var biasmodvar -kind blue->white->red'
  'd percent'
  'cbarn 0.6 0 5.5 1.5'
  'drawstr -p 12 -k 5 -z 0.25 -t 'monthlab' -xo -0.3'
  'draw title 'ictp.k' (bias in %)'
  'draw ylab 'season''
* ----------------------------- to draw mean bias
  'd aave(percent,global)'
  meanbias1=sublin(result,1)
  meanbias = subwrd(meanbias1,4)
*  meanbias = math_nint(meanbias1)
  say 'meanbias='meanbias
  'drawstr -p 12 -k 5 -z 0.25 -t "'meanbias'%" -xo -0.3 -yo -1.6'
*============================ END to plot bias model-obs percentage


  'close 1'
  k=k+1
endwhile
*************** END plot Model data

************** END to plot OBS
  j=j+1
endwhile





*=================================================== 
    'set vpage off'
    'save 'output''
*=================================================== 
    say 'open 'output'.eps'
    '! killapp Preview'
    '! open 'output'.eps'
