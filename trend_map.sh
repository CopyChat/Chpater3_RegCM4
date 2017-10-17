#!/bin/bash - 
#===============================================================================
#
#          FILE: trend_map.sh
# 
USAGE="./trend_map.sh  "
# 
#   DESCRIPTION:  
# 
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Tang (Tang), chao.tang.1@gmail.com
#  ORGANIZATION: le2p
#       CREATED: 11/30/15 10:17:12 CET
#      REVISION:  ---
#===============================================================================

#set -o nounset                             # Treat unset variables as an error
shopt -s extglob 							# "shopt -u extglob" to turn it off
source ~/Shell/functions.sh      			# TANG's shell functions.sh

#=================================================== 

Dir="/Users/tang/climate/Modeling/333/"
for model in GFDL.G71E0001 Had.G71E0001
do
    dir_ref="$model/output/pprcmdata/seasonal/"
    dir_mid="$model/output.RCP85.2044-2055/pprcmdata/seasonal/"
    dir_end="$model/output.RCP85.2088-2100/pprcmdata/seasonal/"

    for tag in RAD SRF
    do
        cdo mergetime *$tag.ymon.mean*

