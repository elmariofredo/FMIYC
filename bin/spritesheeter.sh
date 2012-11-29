#!/bin/sh

files=$(ls $1*.png | sort -t '-' -n -k 2 | tr '\n' ' ')
montage $files -tile x5 -geometry $3x$3+0+0 -background none $2