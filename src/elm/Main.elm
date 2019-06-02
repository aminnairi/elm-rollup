module Main exposing (main)

import Browser
import Messages exposing (Message)
import Model exposing (Model, init)
import Update exposing (update)
import View exposing (view)


main : Program () Model Message
main =
    Browser.sandbox
        { init = init
        , update = update
        , view = view
        }
