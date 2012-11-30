#!/bin/sh

## Def Paths

SPRITE_SHEETS=Graphic_components/Spritesheets
TARGET_FOLDER=Game/App/img

## Sprite Sheets

bin/spritesheeter.sh $SPRITE_SHEETS/hero_100x100/hero_100x100 $TARGET_FOLDER/hero_100x100.png 100
bin/spritesheeter.sh $SPRITE_SHEETS/clone_100x100/clone_100x100 $TARGET_FOLDER/clone_100x100.png 100

#montage $SPRITE_SHEETS/Playground/start/start_open.png $SPRITE_SHEETS/Playground/start/start_close.png -tile x2 -geometry 269x117+0+0 -background none $TARGET_FOLDER/start.png
#montage $SPRITE_SHEETS/Playground/start/end_open.png $SPRITE_SHEETS/Playground/start/end_close.png -tile x2 -geometry 269x117+0+0 -background none $TARGET_FOLDER/end.png

montage "$SPRITE_SHEETS/Playground/path/line.png" "$SPRITE_SHEETS/Playground/path/branch_up.png" "$SPRITE_SHEETS/Playground/path/branch_down.png" -tile x1 -geometry 166x170+0+0 -background none "$TARGET_FOLDER/path.png"

# cp $SPRITE_SHEETS/Playground/line.png $TARGET_FOLDER