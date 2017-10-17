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

OBSproj.1='GHCN'
OBSproj.1='ERAINT'
OBSproj.1='CRU'

OBSproj.2='CMAP'
OBSproj.2='ERAINT'
OBSproj.2='GPCP'

OBSproj.3='CERES'
OBSproj.3='SARAH-2'
OBSproj.3='ERAINT'
OBSproj.3='CLAAS'

OBSproj.4='MODIS'
OBSproj.4='ERAINT'
OBSproj.4='CLARA-A2'


* 2, obs project name for Temp, Precip, SWD, TCC:
ERAvar.1='t2m'
ERAcrs.1='1'
ERApls.1='-273.5'

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

ERAvar.2='tp'
ERAcrs.2='1000'
ERApls.2='0'

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
ERAvar.3='ssrd'
ERAcrs.3='1'
ERApls.3='0'



if(OBSproj.4='MODIS')
  OBSvar.4='clt'
  OBScrs.4='1'
  OBSpls.4='0'
endif
if(OBSproj.4='CLARA-A2')
  OBSvar.4='CFC'
  OBScrs.4='1'
  OBSpls.4='0'
endif
ERAvar.4='tcc'
ERAcrs.4='100'
ERApls.4='0'


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


GCMvar.1='tas'
GCMvar.2='pr'
GCMvar.3='rsds'
GCMvar.4='clt'

* 7, chose the Radiation Scheme:
Radiation='CCM'
*Radiation='RRTM'

* 8, season:
season='winter'
season='summer'

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
output='performance.'season''
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
ICTP='/Users/ctang/climate/Modeling/333/plot/RCM'

GCMDir='/Users/ctang/climate/Modeling/333/plot/GCM'
ictpfname.1='Had_hist'
ictpfname.2='GFDL_hist'
GCMfname.1='HadGEM2-ES'
GCMfname.2='GFDL-ESM2M'
*=================================================== 
*=================================================== 
** model
k=1; kmax=1  
*================================================== 
** variable
j=1; jmax=4  
n=jmax*k+1
totalp=(3)*jmax
  say 'totalplot='totalp''


*=================================================== 
*=================================================== 
n=1
while(j<=jmax)
****** BEGIN read the OBS data 
    if(OBSproj.j='ERAINT')
      if(OBSvar.j='ssrd')
        'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/ERA.ssrd.1979-2015.1996-2005.'monthlab'.nc'
      endif
      if(OBSvar.j='t2m')
        'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/ERA.t2m.mon.mean.1996-2005.1996-2005.'monthlab'.nc'
      endif
      if(OBSvar.j='tp')
        'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/ERA.tp.1996-2005.mon.1996-2005.'monthlab'.nc'
      endif
      if(OBSvar.j='tcc')
        'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/ERA_In.clt.mon.mean.1979-2017.1996-2005.'monthlab'.nc'
      endif
    endif
    if(OBSproj.j='GPCP')
      'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/precip.mon.mean.1996-2005.1996-2005.'monthlab'.nc'
    endif

    if(OBSproj.j='GHCN')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/GHCN/GHCN.air.timmean.2001-2005.nc'
    endif
    if(OBSproj.j='CMAP')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/CMAP/CMAP.precip.timmean.2001-2005.nc'
    endif

    if(OBSproj.j='CLAAS')
      'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/SISmm.CLAAS.mon.1996-2005.1996-2005.'monthlab'.nc'
    endif
    if(OBSproj.j='TRMM')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/TRMM/TRMM.hrf.timmean.mean.2001-2005.'monthlab'.nc'
    endif
    if(OBSproj.j='CRU')
      'sdfopen /Users/ctang/climate/GLOBALDATA/OBSDATA/CRU/3.20/cru_ts3.20.tmp.timmean.2001-2005.nc'
    endif
    if(OBSproj.j='CLARA-A2')
      'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/CLARA-A2.CFCmm.1995-2015.1996-2005.'monthlab'.nc'
      say 'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/CLARA-A2.CFCmm.1995-2015.1996-2005.'monthlab'.nc'
    endif
    'set dfile 1'
    'define obsvar=('OBSvar.j')*('OBScrs.j')+('OBSpls.j')'
    'close 1'
****************** Attention *****************
****** END read the OBS data 



* #=================================================== read ERA-Interim data

  
    if(j=3)
        'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/ERA.ssrd.1979-2015.1996-2005.'monthlab'.nc'
    endif

    if(j=1)
      'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/ERA.t2m.mon.mean.1996-2005.1996-2005.'monthlab'.nc'
    endif

    if(j=2)
      'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/ERA.tp.1996-2005.mon.1996-2005.'monthlab'.nc'
    endif

    if(j=4)
      'sdfopen /Users/ctang/climate/Modeling/333/plot/OBS/ERA_In.clt.mon.mean.1979-2017.1996-2005.'monthlab'.nc'
    endif

    'set dfile 1'
    'q file'
    'define eravar=('ERAvar.j')*('ERAcrs.j')+('ERApls.j')'
**** define the differences
** RRTM-CERES
* Interplation RegCM data to 'OBSproj' GRID
    'define obsvarremap=lterp(obsvar,eravar)'
    'define biaseravar=(eravar-obsvarremap)'
    'close 1'



*************** read GCMs data
*************** read GCMs data
    say 'open 'GCMDir'/'GCMfname.k'.1996-2005.'monthlab'.nc.ctl'
    'open 'GCMDir'/'GCMfname.k'.1996-2005.'monthlab'.nc.ctl'
    'set dfile 1'
    'q file'
    'define modvar=('GCMvar.j')*('Modelcrs.j')+('Modelpls.j')'


*=================================================== 
**** define the differences
** RRTM-CERES
* Interplation RegCM data to 'OBSproj' GRID
    'define modvarremap=lterp(modvar,obsvar)'
    'define biasmodvar=(modvarremap-obsvar)'


*============================ to plot OBS ( have to start from 1 )
*============================ to plot OBS ( have to start from 1 )
* plot num of obs
  pnobs=(j-1)*3+1
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
  'd obsvar'
  'cbarn 0.6 0 5.5 1.5'
  'drawstr -p 12 -k 5 -z 0.25 -t 'monthlab' -xo -0.3'
  'draw title 'OBSproj.j' ('Unit.j')'
  'draw ylab 'season''

*  font thickness are controlled by cbarn.gs in /usr/local/grads-2.0.2/lib/scripts
*  by 'set string color <justification <thickness <rotation>>>'
*  'xcbar 0.6 0 5.5 1.5 -fw 0.15 -fh 0.18 -edge triangle -fs 2 -fo 1'

*============================ to plot ERA ( have to start from 2 )
*============================ to plot ERA ( have to start from 2 )
* plot num of obs
  pnobs=(j-1)*3+2
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
  say '--------ERA ERA ERA ERA--- plot number is 'pnobs''

  'run colors.gs'
  'color 'biasmin.j' 'biasmax.j' -kind 'couleur.j''
  'd biaseravar'
  'draw title 'ictp.k' (ERAINT-obs)'
  'cbarn 0.6 0 5.5 1.5'
  'draw ylab 'season''
  'drawstr -p 12 -k 5 -z 0.25 -t 'monthlab' -xo -0.3'
* ----------------------------- to draw mean bias
  'd aave(biaseravar,global)'
  meanbias1=sublin(result,1)
  meanbias = subwrd(meanbias1,4)
*  meanbias = math_nint(meanbias1)
  say 'meanbias='meanbias
  'drawstr -p 12 -k 5 -z 0.25 -t 'meanbias' -xo -0.3 -yo -1.6'
*============================ END to plot bias erael-obs
*  font thickness are controlled by cbarn.gs in /usr/local/grads-2.0.2/lib/scripts
*  by 'set string color <justification <thickness <rotation>>>'
*  'xcbar 0.6 0 5.5 1.5 -fw 0.15 -fh 0.18 -edge triangle -fs 2 -fo 1'

*============================ to plot MOdel ( have to start from 1 )
* plot num of obs
  pnobs=(j-1)*3+3
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
  'color 'biasmin.j' 'biasmax.j' -kind 'OBScouleur.j''
  'd biasmodvar'
  'cbarn 0.6 0 5.5 1.5'
  'drawstr -p 12 -k 5 -z 0.25 -t 'monthlab' -xo -0.3'
  'draw title HadGEM2-ES ('Unit.j')'
  'draw ylab 'season''

*  font thickness are controlled by cbarn.gs in /usr/local/grads-2.0.2/lib/scripts
*  by 'set string color <justification <thickness <rotation>>>'
*  'xcbar 0.6 0 5.5 1.5 -fw 0.15 -fh 0.18 -edge triangle -fs 2 -fo 1'
* ----------------------------- to draw mean bias
  'd aave(biasmodvar,global)'
  meanbias1=sublin(result,1)
  meanbias = subwrd(meanbias1,4)
*  meanbias = math_nint(meanbias1)
  say 'meanbias='meanbias
  'drawstr -p 12 -k 5 -z 0.25 -t 'meanbias' -xo -0.3 -yo -1.6'
*============================ END to plot bias model-obs
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
