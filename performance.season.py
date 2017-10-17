#!/usr/bin/env python
"""
========
Ctang, A map of mean max and min of ensembles
        from CORDEX AFR-44, in Southern Africa
        Data was restored on titan
========
"""
import math
import os
import os.path as path
import subprocess
import numpy as np
import pdb
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
from scipy import stats
from matplotlib.ticker import AutoMinorLocator
from mpl_toolkits.basemap import Basemap , addcyclic
import textwrap


# to load my functions
import sys 
sys.path.append('/Users/ctang/Code/Python/')
import ctang

#=================================================== Definitions
RCM_Dir='/Users/ctang/climate/Modeling/333/plot/RCM/'
ERA_Dir='/Users/ctang/climate/Modeling/333/plot/ERAINT/'
GCM_Dir='/Users/ctang/climate/Modeling/333/plot/GCM/'
OBS_Dir='/Users/ctang/climate/Modeling/333/plot/OBS/'


VAR =('tas', 'pr', 'rsds' ,'clt') 

OBS=('CRU', 'GPCP', 'CLAAS','CLARA-A2')

Season='MJJASO'
Season='NDJFMA'
#=================================================== test
##

GCM_name=( 'ERAINT', 'HadGEM2-ES', 'GFDL-ESM2M')
RCM_name=('EIN15', 'Had', 'GFDL')

N_model=len(GCM_name)

LABLE='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
LABLE2='abcdefghijklmnopqrstuvwxyz'
#=================================================== reading data
# 21 * 4 table: 21 models vs 4 vars

OBS_remapfile=(\
        'cru_ts3.22.mon.mean.1996-2005.tmp.dat.1996-2005.'+str(Season)+'.remap.nc',\
        'precip.mon.mean.1996-2005.1996-2005.'+str(Season)+'.remap.nc',\
        'SISmm.CLAAS.mon.1996-2005.1996-2005.'+str(Season)+'.remap.nc',\
        'CLARA-A2.CFCmm.1995-2015.1996-2005.'+str(Season)+'.remap.nc',\
)




# Read lon,lat for model

lons,lats=np.array(ctang.read_lonlat_netcdf2(\
    RCM_Dir+RCM_name[1]+'_hist.1996-2005.'+str(Season)+'.nc'))
# print lons

lons_GCM=lons
lats_GCM=lats

#=================================================== functions
# m is model number; k is variable number
def PlotMap(array2D,lons,lats,m,k,axx,vmin,vmax,model_label):

    if ( model_label < 0):
        plt.title(OBS[k]+" "+Unit[k],fontsize= 8)
        cmap = CMAP_OBS[k]
    if ( model_label == 0):
        plt.title(GCM_name[m]+' - '+OBS[k]+' '+Unit[k],fontsize= 9)
        cmap = CMAP_Bias[k]
    if ( model_label > 0):
        plt.title('RegCM4_'+GCM_name[m]+" - "+OBS[k]+' '+Unit[k],fontsize= 9)
        cmap = CMAP_Bias[k]

    cmaplist = [cmap(i) for i in range(cmap.N)]
    bounds = np.linspace(vmin,vmax,21)
    norm = mpl.colors.BoundaryNorm(bounds, cmap.N)

    print lats.shape
    map=Basemap(projection='cyl',llcrnrlat=-39,urcrnrlat=-1,\
            llcrnrlon=2,urcrnrlon=108,resolution='l')
    ctang.setMap_nostick(map)

    x,y=map(lats,lons)

    map.pcolormesh(y,x,array2D,cmap=cmap,norm=norm,vmin=vmin,vmax=vmax)
    #axx.axis('off')
    axx.xaxis.set_visible(False)
    axx.yaxis.set_visible(False)


    cb=plt.colorbar(cmap=plt.cm.jet,orientation='horizontal',shrink=0.7) 
    cb.ax.tick_params(['{:.0f}'.format(x) for x in bounds ],labelsize=6) 
    axx.text(0.95, 0.8,str(Season), ha='right', va='center', transform=axx.transAxes)


    if(model_label ==0):
        axx.text(0.95, 0.1,'RMSE='+str("%.2f" % RMSE_GCM[m]), ha='right',va='center', transform=axx.transAxes)
        axx.text(0.95, 0.3,'MBE='+str("%.2f" % MeanBias_GCM[m]), ha='right',va='center', transform=axx.transAxes)
        axx.text(0.95, 0.5,'r='+str("%.2f" % COR_GCM[m]), ha='right',va='center', transform=axx.transAxes)
    if(model_label > 0):
        axx.text(0.95, 0.1,'RMSE='+str("%.2f" % RMSE_RCM[m]), ha='right',va='center', transform=axx.transAxes)
        axx.text(0.95, 0.3,'MBE='+str("%.2f" % MeanBias_RCM[m]), ha='right',va='center', transform=axx.transAxes)
        axx.text(0.95, 0.5,'r='+str("%.2f" % COR_RCM[m]), ha='right',va='center', transform=axx.transAxes)
#=================================================== functions
vmin_obs=[10,0,80,0]
vmax_obs=[30,10,280,100]

vmin_bias=[-5,-5,-100,-100]
vmax_bias=[5,5,100,100]

Unit=( '($^\circ$C)','(mm/day)','($\mathregular{W/m^{2}}$)','(%)')

CMAP_OBS=( plt.cm.Reds, plt.cm.Greens, plt.cm.OrRd, plt.cm.GnBu)
CMAP_Bias=( plt.cm.bwr, plt.cm.BrBG, plt.cm.RdYlBu_r, plt.cm.coolwarm)

fig, axes = plt.subplots(nrows=7, ncols=4,\
        # sharex=True, sharey=True,\
        figsize=(14, 12),facecolor='w', edgecolor='k') # figsize=(w,h)
fig.subplots_adjust(left=0.05,right=0.95,bottom=0.05,hspace=0.4,top=0.96,wspace=0.05)
#=================================================== 
# LIMIT=np.array([ [60,360],[-100,100]])
    
    
print axes.shape
#=================================================== loop in VAR
#=================================================== loop in VAR
## k is the variable number

for k in range(len(VAR)):

    #=================================================== reading data
    GCM_remap=np.array([ctang.read_lonlatmap_netcdf(\
            VAR[k], GCM_Dir+GCM_name[i]+'.1996-2005.'+str(Season)+'.nc') for i in range(len(GCM_name))])
    
    print GCM_remap.shape
    
    RCM=np.array([ctang.read_lonlatmap_netcdf(\
            VAR[k], RCM_Dir+RCM_name[i]+'_hist.1996-2005.'+str(Season)+'.nc') for i in range(N_model)])
    RCM=np.reshape(RCM,(3,87,221))
    
    #=================================================== convert units
    # tas
    if(k==0):
        GCM_remap=GCM_remap-273.5
        RCM=RCM-273.5
    # pr
    if(k==1):
        GCM_remap[0]=GCM_remap[0]*1000
        GCM_remap[1]=GCM_remap[1]*86400
        GCM_remap[2]=GCM_remap[2]*86400
        RCM=RCM*86400
    
    print RCM.shape
    #=================================================== end unit
    
    
    OBS_remap=np.array(ctang.read_lonlatmap_netcdf(\
            VAR[k],OBS_Dir+OBS_remapfile[k]))
    print OBS_remap.shape

    #=================================================== missing value
    OBS_remap[OBS_remap > 999]=np.nan
    GCM_remap[GCM_remap > 999]=np.nan
    RCM[RCM > 999]=np.nan
    #=================================================== cal bias
    RCM_Bias=np.array([RCM[i]-OBS_remap for i in range(N_model)])
    GCM_Bias=np.array([GCM_remap[i]-OBS_remap for i in range(N_model)])
    
    # print RCM_Bias.shape
    # print GCM_Bias.shape
    
    print np.nanmax(RCM_Bias[2])
    print np.nanmin(RCM_Bias[2])
    print RCM_Bias[2].shape
    
    #=================================================== missing value
    RCM_Bias[RCM_Bias > 999] = np.nan
    GCM_Bias[GCM_Bias > 999] = np.nan
    
    # print OBS_remap
    #=================================================== 
    # statistic values:
    
    COR_GCM=np.zeros((N_model))
    RMSE_GCM=np.zeros((N_model))
    MeanBias_GCM=np.zeros((N_model))
    
    COR_RCM=np.zeros((N_model))
    RMSE_RCM=np.zeros((N_model))
    MeanBias_RCM=np.zeros((N_model))

    for n in range(N_model):
    
        # first, remove the OBS nan:
        OBS_remap_1d=OBS_remap.ravel()
        OBS_nonnan=np.array([value for value in OBS_remap_1d if not math.isnan(value)])
    
        GCM_nonnan=np.array([GCM_remap[n].ravel()[i] for i in range(len(OBS_remap_1d)) if not math.isnan(OBS_remap_1d[i])])
        RCM_nonnan=np.array([RCM[n].ravel()[i] for i in range(len(OBS_remap_1d)) if not math.isnan(OBS_remap_1d[i])])
        print OBS_remap_1d.shape,GCM_nonnan.shape,OBS_nonnan.shape
        print OBS_remap_1d.shape,RCM_nonnan.shape,OBS_nonnan.shape
    
        # now to remove the GCM/RCM nan:
        # note that I did not remove the RCM nan, not possible for me.
        OBS_nonnan2=np.array([OBS_nonnan[i] for i in range (len(GCM_nonnan)) if not math.isnan(GCM_nonnan[i])])
        GCM_nonnan2=np.array([value for value in GCM_nonnan if not math.isnan(value)])
        RCM_nonnan2=np.array([value for value in RCM_nonnan if not math.isnan(value)])
        print OBS_nonnan2.shape,GCM_nonnan2.shape
    
        GCM_nonnan=GCM_nonnan2
        RCM_nonnan=RCM_nonnan2
        OBS_nonnan=OBS_nonnan2
       
        # MeanBias:
        MeanBias_GCM[n]=np.mean(GCM_nonnan-OBS_nonnan) 
        MeanBias_RCM[n]=np.mean(RCM_nonnan-OBS_nonnan) 
    
    
        # spatial cor:
        COR_GCM[n]= np.ma.corrcoef(OBS_nonnan,GCM_nonnan)[0,1]
        COR_RCM[n]= np.ma.corrcoef(OBS_nonnan,RCM_nonnan)[0,1]
    
        # RMSE
        RMSE_GCM[n]=np.sqrt(np.mean((GCM_nonnan-OBS_nonnan)**2))
        RMSE_RCM[n]=np.sqrt(np.mean((RCM_nonnan-OBS_nonnan)**2))
    
    print COR_GCM,RMSE_GCM,MeanBias_GCM
    print COR_RCM,RMSE_RCM,MeanBias_RCM
    #=================================================== for plot
    
    print "==============",k
    # plot obs:
    
    m=0
    plt.sca(axes[m,k]) # active shis subplot for GCM
    
    PlotMap(OBS_remap,lons,lats,m,k,axes[0,k],vmin_obs[k],vmax_obs[k],-1)
    
    for m in range(N_model):
        p=m+1
        plt.sca(axes[p,k]) # active shis subplot for GCM
        PlotMap(GCM_Bias[m],lons,lats,m,k,axes[p,k],vmin_bias[k],vmax_bias[k],0)
    
        q=m+4
        plt.sca(axes[q,k]) # active shis subplot for GCM
        PlotMap(RCM_Bias[m],lons,lats,m,k,axes[q,k],vmin_bias[k],vmax_bias[k],1)
    
        
    
    # quit()
    
    # plt.suptitle(Title)
    
OutputImage='performance.'+str(Season)
    # plt.savefig(OutputImage+'.eps',format='eps')
    # plt.savefig(OutputImage+'.png')
plt.show()
    
    
quit()
    

print MeanBias[0]

#=================================================== end of statistics




#=================================================== plot
Title='Evaluation of the simulated SSR in the historical period 1990-2005 in '\
        +str(Season)
#=================================================== 
Unit=( '($\mathregular{W/m^{2}}$)','($\mathregular{W/m^{2}}$)')
#=================================================== 
TITLE2=('',' - '+str(OBS))
def PlotMap(array2D,lons,lats,m,k,axx,vmin,vmax,cmap):
    # cmap = plt.cm.jet
    cmaplist = [cmap(i) for i in range(cmap.N)]
    bounds = np.linspace(vmin,vmax,21)
    norm = mpl.colors.BoundaryNorm(bounds, cmap.N)

    print lats.shape
    map=Basemap(projection='cyl',llcrnrlat=-39,urcrnrlat=-1,\
            llcrnrlon=0.1,urcrnrlon=59,resolution='l')
    ctang.setMap_nostick(map)

    x,y=map(lats,lons)

    map.pcolormesh(y,x,array2D,cmap=cmap,norm=norm,vmin=vmin,vmax=vmax)

    plt.title(GCM_name[m]+TITLE2[k]+" "+Unit[k],fontsize= 8)

    cb=plt.colorbar(cmap=plt.cm.jet,orientation='horizontal',shrink=0.6) 
    cb.ax.tick_params(['{:.0f}'.format(x) for x in bounds ],labelsize=6) 
    axx.text(0.9, 0.9,str(Season), ha='center', va='center', transform=axx.transAxes)
    axx.text(0.95, 0.25,'r='+str("%.2f" % COR[m]), ha='right',va='center', transform=axx.transAxes)
    axx.text(0.95, 0.15,'MBE='+str("%.2f" % MeanBias[m]), ha='right',va='center', transform=axx.transAxes)
    axx.text(0.95, 0.05,'RMSE='+str("%.2f" % RMSE[m]), ha='right',va='center', transform=axx.transAxes)
    # if k==0:
        # axx.text(0.1, 0.9,'('+str(LABLE[m])+')', ha='center', va='center', transform=axx.transAxes)
    # else:
        # axx.text(0.1, 0.9,'('+str(LABLE2[m])+')', ha='center', va='center', transform=axx.transAxes)

    #cbar.ax.set_yticklabels(['{:.0f}'.format(x) for x in np.arange(cbar_min, cbar_max+cbar_step, cbar_step)], fontsize=16, weight='bold')
#=================================================== 
#=================================================== ploting
fig, axes = plt.subplots(nrows=N_row, ncols=N_column,\
        # sharex=True, sharey=True,\
        figsize=(8, 20),facecolor='w', edgecolor='k') # figsize=(w,h)
# fig.subplots_adjust(hspace=0.2,top=0.96,wspace=0)
#=================================================== 
LIMIT=np.array([ [60,360],[-100,100]])

for m in range(N_row):
    if m < 1:
        for k in range(N_column):
            print 'm='+str(m),'k='+str(k)
            plt.sca(axes[m,k]) # active shis subplot for GCM
            axx=axes[m,k]
            if k == 0:
                cmap = plt.cm.jet
                PlotMap(timmean_CMIP5[m],lons[m],lats[m],m,k,axx,LIMIT[k][0],LIMIT[k][1],cmap)
            if k == 1:
                cmap = plt.cm.seismic
                PlotMap(Bias[m],lons[m],lats[m],m,k,axx,LIMIT[k][0],LIMIT[k][1],cmap)
    else:
        if GCM_Model[m] == 'CanESM2222':
            ctang.NotAvailable(axes[m,0])
            ctang.NotAvailable(axes[m,1])
        else:
            for k in range(N_column):
                print 'm='+str(m),'k='+str(k)
                plt.sca(axes[m,k]) # active shis subplot for gcm
                axx=axes[m,k]
                if k == 0:
                    cmap = plt.cm.jet
                    PlotMap(timmean_CMIP5[m],lons[m],lats[m],m,k,axx,LIMIT[k][0],LIMIT[k][1],cmap)
                if k == 1:
                    cmap = plt.cm.seismic
                    PlotMap(Bias[m],lons[m],lats[m],m,k,axx,LIMIT[k][0],LIMIT[k][1],cmap)

#TaylorPlot(samples,refstd,fig,rect,ax4):


#=================================================== test

plt.suptitle(Title)

OutputImage='evaluation.'+str(VAR)+'.'+str(OBS)+'.gcm.'+str(Season)
plt.savefig(OutputImage+'.eps',format='eps')
plt.savefig(OutputImage+'.png')
plt.show()

quit()
